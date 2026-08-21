# MOB-41 — Offline mutation queue

Thêm queue SecureStore cho mutation thất bại và tích hợp favorites sync để enqueue khi mất mạng, giới hạn 50 mutation và flush tuần tự.

## Hoàn thành

- Queue giữ tối đa 50 mutation và dừng flush tại lỗi đầu tiên để bảo toàn thứ tự.
- Mutation được gửi kèm access token; queue được giữ nguyên nếu chưa có session.
- Root layout tự flush queue khi ứng dụng khởi động.
- Có test cho flush có xác thực và trường hợp thiếu session.
