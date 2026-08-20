# EXT-03 — Chọn LLM provider/model

OpenAI Responses API là provider chính, model mặc định `gpt-5.6-terra`, Structured Outputs bật và `store:false`. `OPENAI_MODEL` cho phép đổi model không sửa code; khi thiếu key hoặc provider lỗi, parser local tiếp tục làm fallback.
