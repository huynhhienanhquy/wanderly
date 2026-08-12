import {
  Controller,
  Get,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  placeListQuerySchema,
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
}
