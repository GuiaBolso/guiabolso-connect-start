import { buildQueryParams } from './build-query-params';

describe('build query params', () => {
  it('should transform object in query params', () => {
    const obj = {
      a: 1,
    };
    const queryString = '?a=1';
    expect(buildQueryParams(obj)).toBe(queryString);
  });

  it('should transform large object in query params', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    };
    const queryString = '?a=1&b=2&c=3&d=4';
    expect(buildQueryParams(obj)).toBe(queryString);
  });
});
