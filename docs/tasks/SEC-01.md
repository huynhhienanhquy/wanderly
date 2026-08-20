# SEC-01 — Input validation và output encoding

Review/report text dùng shared safe-text transform để loại control characters và giới hạn kích thước trước persistence. API bổ sung `nosniff`, deny framing, Referrer Policy và CSP chặt cho JSON/Swagger responses; React tiếp tục escape text mặc định khi render.
