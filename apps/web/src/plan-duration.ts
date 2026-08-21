import type { LocalPlanItem } from './plan-storage';

export type Coordinates = { latitude: number; longitude: number };
export type DurationResult = {
  activityMinutes: number;
  travelMinutes: number;
  totalMinutes: number;
  issues: string[];
};

const AVERAGE_CITY_SPEED_KMH = 25;

function minutes(value: string): number {
  const [hours = 0, mins = 0] = value.split(':').map(Number);
  return hours * 60 + mins;
}

export function distanceKilometers(from: Coordinates, to: Coordinates): number {
  const earthRadiusKm = 6371;
  const radians = (degrees: number) => degrees * Math.PI / 180;
  const latitudeDelta = radians(to.latitude - from.latitude);
  const longitudeDelta = radians(to.longitude - from.longitude);
  const a = Math.sin(latitudeDelta / 2) ** 2
    + Math.cos(radians(from.latitude)) * Math.cos(radians(to.latitude)) * Math.sin(longitudeDelta / 2) ** 2;
  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function estimateTravelMinutes(from: Coordinates, to: Coordinates): number {
  return Math.max(1, Math.ceil(distanceKilometers(from, to) / AVERAGE_CITY_SPEED_KMH * 60));
}

export function validateDurations(
  items: LocalPlanItem[],
  durations: Record<string, number | null | undefined>,
  endTime: string,
  locations: Record<string, Coordinates | undefined> = {},
): DurationResult {
  const issues: string[] = [];
  let activityMinutes = 0;
  let travelMinutes = 0;

  items.forEach((item, index) => {
    const duration = durations[item.id];
    if (!duration) {
      issues.push(`${item.name} chưa có thời lượng.`);
      return;
    }

    activityMinutes += duration;
    const next = items[index + 1];
    let travelToNext = 0;
    const currentLocation = locations[item.id];
    const nextLocation = next ? locations[next.id] : undefined;
    if (currentLocation && nextLocation) {
      travelToNext = estimateTravelMinutes(currentLocation, nextLocation);
      travelMinutes += travelToNext;
    }
    const finish = minutes(item.startTime) + duration;
    if (next && finish + travelToNext > minutes(next.startTime)) {
      issues.push(`${item.name} không đủ thời gian hoạt động và di chuyển tới ${next.name}.`);
    }
    if (endTime && finish > minutes(endTime)) issues.push(`${item.name} kết thúc sau khung kế hoạch.`);
  });

  return { activityMinutes, travelMinutes, totalMinutes: activityMinutes + travelMinutes, issues };
}
