export const mobileLocale = { locale: 'vi-VN', currency: 'VND' } as const;
export const formatMobileMoney = (value: number | null) => value === null ? 'Không giới hạn' : `${value.toLocaleString(mobileLocale.locale)}đ`;
