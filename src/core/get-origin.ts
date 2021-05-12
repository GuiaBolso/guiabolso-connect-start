export type Envs = 'production' | 'sandbox';
export const getOrigin = (env: Envs) =>
  (({
    production: 'https://connect.guiabolso.com.br',
    sandbox: 'https://sandbox.connect.guiabolso.com.br',
  } as Record<Envs, string>)[env]);
