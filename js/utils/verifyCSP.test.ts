import { IsCSPVersion2 } from './index';

describe('Verify Content Security Police', () => {
  it('should return TRUE to a valid CSP', () => {
    const validCSP2 = `object-src 'none'; script-src 'sha256-vbqjgmO/1eNbI0KDULUkt+jCEUo/oA6kabtWCGf0HDc=' 'strict-dynamic' 'unsafe-inline' https: http:; base-uri 'none'; connect-src 'self' https://ssl.google-analytics.com; child-src 'none'`;

    expect(IsCSPVersion2(validCSP2)).toBeTruthy();
  });

  it('should return FALSE to a not valid CSP', () => {
    const notValidCSP2 = `object-src 'none'; script-src 'sha256-vbqjgmO/1eNbI0KDULUkt+jCEUo/oA6kabtWCGf0HDc=' 'strict-dynamic' 'unsafe-inline' https: http:; connect-src 'self' https://ssl.google-analytics.com;`;

    expect(IsCSPVersion2(notValidCSP2)).toBeFalsy();
  });
});
