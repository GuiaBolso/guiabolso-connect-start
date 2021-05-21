export type Envs = 'production' | 'sandbox';
export const getOrigin = (env: Envs) =>
  ((
    {
      production: 'https://connect.guiabolso.com.br',
      sandbox:
        process.env.NODE_ENV === 'development'
          ? 'http://connect.beto:4000'
          : 'https://connect.guiabolso.com.br',
    } as Record<Envs, string>
  )[env]);
