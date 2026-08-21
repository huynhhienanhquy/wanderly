# SEC-02 — Rate limiting

Auth giới hạn 30 request/phút, AI 10 request/phút theo IP và route. Fixed-window limiter reset đúng hạn, trả HTTP 429, giới hạn bucket và dọn entry hết hạn khi đạt ngưỡng để tránh tăng bộ nhớ không giới hạn.
