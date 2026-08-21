import {
  Controller,
  Get,
  Param,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  placeSlugSchema,
  placeListQuerySchema,
  type PlaceDetail,
  type PlaceListResponse,
} from '@wanderly/contracts';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
  constructor(private readonly places: PlacesService) {}

  @Get()
  list(@Query() rawQuery: unknown): Promise<PlaceListResponse> {
    const result = placeListQuerySchema.safeParse(rawQuery);
    if (!result.success) {
      throw new UnprocessableEntityException({
        message: 'Tham số danh sách địa điểm không hợp lệ.',
        issues: result.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      });
    }
    return this.places.list(result.data);
  }

  @Get(':slug')
  detail(@Param('slug') rawSlug: string): Promise<PlaceDetail> {
    const result = placeSlugSchema.safeParse(rawSlug);
    if (!result.success) {
      throw new UnprocessableEntityException('Slug địa điểm không hợp lệ.');
    }
    return this.places.detail(result.data);
  }
}
