import { isCSPVersion2 } from './verify-csp';

describe('Verify Content Security Police', () => {
  it('should return TRUE to a valid CSP', () => {
    // eslint-disable-next-line quotes
    const validCSP2 = `object-src 'none'; script-src 'sha256-vbqjgmO/1eNbI0KDULUkt+jCEUo/oA6kabtWCGf0HDc=' 'strict-dynamic' 'unsafe-inline' https: http:; base-uri 'none'; connect-src 'self' https://ssl.google-analytics.com; child-src 'none'`;

    expect(isCSPVersion2(validCSP2)).toBeTruthy();
  });

  it('should return FALSE to a not valid CSP', () => {
    // eslint-disable-next-line quotes
    const notValidCSP2 = `object-src 'none'; script-src 'sha256-vbqjgmO/1eNbI0KDULUkt+jCEUo/oA6kabtWCGf0HDc=' 'strict-dynamic' 'unsafe-inline' https: http:; connect-src 'self' https://ssl.google-analytics.com;`;

    expect(isCSPVersion2(notValidCSP2)).toBeFalsy();
  });
});
