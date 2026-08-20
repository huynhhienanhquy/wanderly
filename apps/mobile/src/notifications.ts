import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function schedulePlanReminder(title: string, date: string): Promise<Date> {
  const permission = await Notifications.requestPermissionsAsync();
  if (!canRequestNotifications(permission.status)) throw new Error('Bạn đã tắt quyền thông báo.');
  if (!permission.granted) throw new Error('Bạn chưa cấp quyền thông báo.');
  if (Platform.OS === 'android') await Notifications.setNotificationChannelAsync('plans', { name: 'Nhắc lịch trình', importance: Notifications.AndroidImportance.HIGH });
  const departure = new Date(`${date}T08:00:00`);
  const triggerDate = departure.getTime() > Date.now() + 60_000 ? new Date(departure.getTime() - 60 * 60 * 1000) : new Date(Date.now() + 60_000);
  await Notifications.scheduleNotificationAsync({ content: { title: 'Sắp đến giờ khám phá!', body: title, data: { route: '/plan' } }, trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: triggerDate, channelId: Platform.OS === 'android' ? 'plans' : undefined } });
  return triggerDate;
}
import { canRequestNotifications } from './next-features';
