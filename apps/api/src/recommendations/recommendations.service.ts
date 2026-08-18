import { Injectable } from '@nestjs/common';
import type { CandidateRequest, CandidateResponse, PlaceSummary } from '@wanderly/contracts';
import { PrismaService } from '../database/prisma.service';
import { matchesHardConstraints } from './hard-constraint-filter';
import { scoreCandidate } from './candidate-scoring';
import { recommendationReason } from './recommendation-reason';

@Injectable()
export class RecommendationsService {
  constructor(private readonly prisma: PrismaService) {}
  async candidates(request: CandidateRequest): Promise<CandidateResponse> {
    const rows = await this.prisma.place.findMany({ where: { status: 'ACTIVE', deletedAt: null }, take: 200, orderBy: { popularityScore: 'desc' }, include: { categories: { include: { category: true } }, images: { where: { isCover: true }, take: 1 }, openingHours: true } });
    const data = rows.filter((place) => matchesHardConstraints({ latitude: Number(place.latitude), longitude: Number(place.longitude), priceMin: place.priceMin === null ? null : Number(place.priceMin), categories: place.categories.map(({ category }) => category.slug), openingHours: place.openingHours.map((period) => ({ dayOfWeek: period.dayOfWeek, openMinutes: period.openTime ? period.openTime.getUTCHours() * 60 + period.openTime.getUTCMinutes() : null, closeMinutes: period.closeTime ? period.closeTime.getUTCHours() * 60 + period.closeTime.getUTCMinutes() : null, isClosed: period.isClosed })) }, request.constraints)).map((place) => {
      const summary: PlaceSummary = { id: place.id, slug: place.slug, name: place.name, description: place.description, address: place.address, district: place.district, city: place.city, latitude: Number(place.latitude), longitude: Number(place.longitude), rating: place.rating === null ? null : Number(place.rating), reviewCount: place.reviewCount, priceMin: place.priceMin === null ? null : Number(place.priceMin), priceMax: place.priceMax === null ? null : Number(place.priceMax), typicalDurationMinutes: place.typicalDurationMinutes, indoorOutdoor: place.indoorOutdoor, categories: place.categories.map(({ category }) => ({ slug: category.slug, name: category.name })), coverImageUrl: place.images[0]?.url ?? null };
      const scored = scoreCandidate({ latitude: summary.latitude, longitude: summary.longitude, rating: summary.rating, priceMin: summary.priceMin, popularity: Number(place.popularityScore), categories: summary.categories.map(({ slug }) => slug) }, request.constraints);
      return { place: summary, ...scored, reason: recommendationReason({ rating: summary.rating, priceMin: summary.priceMin, categories: summary.categories.map(({ slug }) => slug) }, request.constraints, scored.components) };
    }).sort((left, right) => right.score - left.score || left.place.id.localeCompare(right.place.id)).slice(0, request.limit);
    return { data };
  }
}
