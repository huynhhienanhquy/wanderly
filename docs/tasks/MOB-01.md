# MOB-01 — Expo React Native bootstrap

## Mục tiêu

Khởi tạo Mobile app dùng Expo/React Native, chạy được trên Android, iOS và Web export.

## Thay đổi

- Xác nhận Expo 54, React Native 0.81, new architecture và package identifiers Android/iOS.
- Giữ `wanderly` custom scheme và automatic system appearance.
- Thêm runtime config chuẩn hóa `EXPO_PUBLIC_API_URL`, local fallback và protocol validation.
- Hiển thị API endpoint trong development để dễ chẩn đoán thiết bị/emulator.

## Kiểm tra

```bash
pnpm --filter @wanderly/mobile typecheck
pnpm --filter @wanderly/mobile build
```

## Kết quả

Task hoàn tất ngày 2026-08-20; Expo web export được dùng làm smoke build tự động, native projects được tạo qua Expo prebuild/EAS khi cần.
