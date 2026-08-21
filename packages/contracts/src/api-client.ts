import { apiErrorSchema, type ApiError } from './common';

export type RuntimeSchema<T> = { parse(value: unknown): T };

export class ApiClientError extends Error {
  constructor(
    public readonly status: number,
    public readonly error: ApiError,
  ) {
    super(error.message);
    this.name = 'ApiClientError';
  }
}

export type ApiClientOptions = {
  baseUrl: string;
  getAccessToken?: () => string | null | Promise<string | null>;
  refreshAccessToken?: () => string | null | Promise<string | null>;
  fetch?: typeof globalThis.fetch;
  createRequestId?: () => string;
};

export type ApiRequestOptions<T> = Omit<RequestInit, 'body'> & {
  body?: unknown;
  schema: RuntimeSchema<T>;
  requestId?: string;
};

const normalizeBaseUrl = (baseUrl: string) => baseUrl.replace(/\/$/, '');

export class WanderlyApiClient {
  private readonly fetcher: typeof globalThis.fetch;

  constructor(private readonly options: ApiClientOptions) {
    this.fetcher = options.fetch ?? globalThis.fetch;
  }

  async request<T>(path: string, options: ApiRequestOptions<T>): Promise<T> {
    const requestId = options.requestId ?? this.options.createRequestId?.() ?? crypto.randomUUID();
    let accessToken = await this.options.getAccessToken?.() ?? null;
    let response = await this.send(path, options, requestId, accessToken);

    if (response.status === 401 && this.options.refreshAccessToken) {
      accessToken = await this.options.refreshAccessToken();
      if (accessToken) response = await this.send(path, options, requestId, accessToken);
    }

    if (!response.ok) throw await this.toError(response, requestId);
    return options.schema.parse(await response.json());
  }

  private send<T>(path: string, options: ApiRequestOptions<T>, requestId: string, accessToken: string | null) {
    const { body, requestId: _requestId, schema: _schema, ...requestInit } = options;
    const headers = new Headers(options.headers);
    headers.set('accept', 'application/json');
    headers.set('x-request-id', requestId);
    if (accessToken) headers.set('authorization', `Bearer ${accessToken}`);
    if (body !== undefined) headers.set('content-type', 'application/json');

    return this.fetcher(`${normalizeBaseUrl(this.options.baseUrl)}/${path.replace(/^\//, '')}`, {
      ...requestInit,
      body: body === undefined ? undefined : JSON.stringify(body),
      headers,
    });
  }

  private async toError(response: Response, requestId: string) {
    const parsed = apiErrorSchema.safeParse(await response.json().catch(() => null));
    return new ApiClientError(response.status, parsed.success ? parsed.data : {
      code: `HTTP_${response.status}`,
      message: response.statusText || 'Request failed',
      requestId,
    });
  }
}
