export const isCSPVersion2 = (csp: string) =>
  /(frame-src|child-src|form-action|frame-ancestors|plugin-types|base-uri)/gim.test(
    csp
  );

export const verifyCSP = (): Promise<boolean> =>
  Promise.race([
    fetch(document.location.href).then((res) =>
      res?.headers.get('Content-Security-Policy')
    ),
    new Promise<string>((resolve) =>
      document.addEventListener('securitypolicyviolation', (CSPEvent) =>
        resolve(CSPEvent?.originalPolicy)
      )
    ),
  ]).then(isCSPVersion2);
