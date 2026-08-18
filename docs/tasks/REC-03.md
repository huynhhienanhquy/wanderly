# REC-03 — Triển khai ranking

## Trạng thái

Done — 2026-08-18.

## Kết quả

- Candidate vượt hard filter được chấm điểm, sort giảm dần và giới hạn theo request.
- Tie-break dùng Place ID để kết quả deterministic.
- API trả `place`, `score` và từng score component theo shared contract.

## Kiểm thử

- Scoring unit test, API suite và typecheck workspace đạt.
