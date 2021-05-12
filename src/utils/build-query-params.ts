export const buildQueryParams = (
  obj: Record<string, string | boolean | number>
) =>
  `?${Object.keys(obj)
    .map((key: string) => `${key}=${encodeURIComponent(obj[key])}`)
    .join('&')}`;
