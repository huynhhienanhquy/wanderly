import { BadRequestException } from '@nestjs/common';

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function encodePlaceCursor(id: string): string {
  return Buffer.from(JSON.stringify({ id })).toString('base64url');
}

export function decodePlaceCursor(cursor: string): string {
  try {
    const value = JSON.parse(
      Buffer.from(cursor, 'base64url').toString('utf8'),
    ) as { id?: unknown };
    if (typeof value.id !== 'string' || !uuidPattern.test(value.id))
      throw new Error('invalid id');
    return value.id;
  } catch {
    throw new BadRequestException('Cursor không hợp lệ.');
  }
}
