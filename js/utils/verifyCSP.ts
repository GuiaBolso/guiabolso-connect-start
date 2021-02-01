export const IsCSPVersion2 = (csp: string) => {
  const regex = /(frame-src|child-src|form-action|frame-ancestors|plugin-types|base-uri)/gim;
  const hasCSP2 = regex.test(csp);

  return hasCSP2;
};

export const verifyCSP = (callbackFunction: (hasCSP2: boolean) => void) => {
  document.addEventListener('securitypolicyviolation', CSPEvent => {
    const csp = CSPEvent?.originalPolicy;
    const hasAValidCSP = IsCSPVersion2(csp);

    return callbackFunction(hasAValidCSP);
  });

  fetch(document.location.href).then(resp => {
    const csp = resp?.headers.get('Content-Security-Policy');
    const hasAValidCSP = IsCSPVersion2(csp);

    return callbackFunction(hasAValidCSP);
  });
};
