# REC-02 — Thiết kế scoring model

## Trạng thái

Done — 2026-08-18.

## Kết quả

- Score chuẩn hóa 0–1 từ preference, distance, rating, budget và popularity.
- Trọng số công khai, cố định: 35%, 20%, 20%, 15%, 10%.
- Thiếu budget/vị trí dùng điểm trung lập 0.5 thay vì loại candidate.
- Trả cả tổng điểm và component để giải thích/rà soát ranking.

## Kiểm thử

- Test candidate phù hợp, rating cao và giá hợp lý đạt điểm cao hơn candidate yếu.
