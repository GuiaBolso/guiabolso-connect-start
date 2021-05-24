# Guiabolso Connect Start

O [Guiabolso Connect Start](https://github.com/GuiaBolso/guiabolso-connect-start#readme) é um script com o objetivo de facilitar a conexão com a aplicação do [Guiabolso Connect](https://guiabolsoconnect.com.br/)

Ele serve para apresentar o botão do Guiabolso Connect e também apresentar a experiência de maneira incorporada na página.

### Apresentando a experiência completa de maneira embedada e o botão de conexão

<br />

<!-- prettier-ignore -->
| Experiência embedada | Conexão com o botão |
| -------------------- | ------------------- |
| ![guiabolso-connect-start__conexao-com-botao](https://user-images.githubusercontent.com/3269950/107272829-07b05000-6a2d-11eb-8acf-d17d321b96f0.gif) | ![guiabolso-connect-start__experiencia-embedada](https://user-images.githubusercontent.com/3269950/107272838-0b43d700-6a2d-11eb-8835-c32c53c0235c.gif) |

<br />

## Como usar

Você pode encontrar e utilizar o nosso script:

- [Nosso repositório do GitHub](https://github.com/GuiaBolso/guiabolso-connect-start#readme)
- [Diretamente do NPM](https://www.npmjs.com/package/@guiabolsobr/guiabolso-connect-start) através do comando `npm i @guiabolsobr/guiabolso-connect-start`
- Ou usar diretamente via CDN:
  - https://connect-start.guiabolso.com.br/app.js
  - https://cdn.jsdelivr.net/npm/@guiabolsobr/guiabolso-connect-start@1.4.2/build/app.min.js

<br />

### Exemplo de uso com a importação via `NPM`:

<!-- prettier-ignore -->
Instalar o pacote via NPM com o comando:

```sh
npm i @guiabolsobr/guiabolso-connect-start
```

Fazer a importação no seu arquivo javascript

```ts
import { guiabolsoConnect } from '@guiabolsobr/guiabolso-connect-start';

(async () => {
  const connect = await guiabolsoConnect({
    /* Parâmetros de configuração do Guiabolso Connect */
  });

  connect.on('load', () => {
    console.log('aplicação carregou');
  });

  connect.on('complete', ({ oauthcode }) => {
    console.log('code', oauthcode);
  });
})();
```

<br />

### Exemplo de uso com a importação via `CDN`:

```html
<!DOCTYPE html>
<html lang="pt-br">
  <body>
    <!-- Importação do CDN -->
    <script src="https://connect-start.guiabolso.com.br/app.js"></script>

    <script>
      (async () => {
        const connect = await guiabolsoConnect({
          /* Parâmetros de configuração do Guiabolso Connect */
        });

        connect.on('load', () => {
          console.log('aplicação carregou');
        });

        connect.on('complete', ({ oauthcode }) => {
          console.log('code', oauthcode);
        });
      })();
    </script>
  </body>
</html>
```

<br />

## Funções disponíveis:

<br />

### Parâmetros de configuração da função `guiabolsoConnect`:

A função `guiabolsoConnect` espera um objeto com as configurações para que a aplicação seja iniciada. São eles:

<br />

<!-- prettier-ignore -->
| Parâmetros           | Tipo       | Obrigatoriedade | Exemplo de valores                     | Descrição              |
| -------------------- | ---------- | --------------- | -------------------------------------- | ---------------------- |
| **`data.cpf`**            | _`String`_ | **Obrigatório** | 99999999999                            | Número do CPF do usuário<br />**Somente números** |
| `data.email`              | _`String`_ | Opcional        | email-do-usuario@email.com.br          | Email do usuário                                  |
| `data.phone`              | _`String`_ | Opcional        | 11999999999                            | Número de telefone do usuário com DDD<br />**Somente números**  |
| **`clientId`**       | _`String`_ | **Obrigatório** | id-recebido-do-guiabolso-connect       | ID da sua chave de API recebido ao contratar o serviço do Guiabolsoo Conect |
| **`callbackURL`**    | _`String`_ | **Obrigatório** | https://url-de-callback.com.br/        | Redirecionaremos o usuário para essa URL logo após ele fazer a conexão com o Guiabolso Connect |
| **`fallbackURL`**    | _`String`_ | **Obrigatório** | https://url-de-fallback.com.br/        | Caso ocorra um erro e/ou o usuário queira sair da aplicação, mandaremos ele para essa URL |
| **`userTrackingId`** | _`String`_ | **Obrigatório** | `273117c3-e374-436c-a7ad-adba544872ba` | Esse ID do usuário deve ser único e não sensível, ou seja, não use o CPF do usuário aqui mas use um UUID, por exemplo.<br />Essa informação será usada para rastrearmos seu usuário dentro da nossa plataforma. |
| **`environment`** | _`sandbox` | `production` _ | **Obrigatório** | Para o desenvolvimento de testes, use o `sandbox` e `production` para o ambiente de produção. Ex: `process.env.NODE_ENV !== 'production' ? 'sandbox' : 'production' ` |
| **`container`** | _HTMLElement_ | **Obrigatório** | Elemento ao qual iremos renderizar o iframe |
| **`config`** | _Object_ | Opcional | Configurações diversas |

_\* Lembrando que a página onde o iframe será renderizado precisar estar minimamente aderente às Políticas de Segurança nível 2 (`Content-Security-Policy - CSP Level 2`)._

### Ao executar a função `guiabolsoConnect`, é retornado funções de auxílio:

<br />

<!-- prettier-ignore -->
| Função            | Descrição         |
| ----------------- | ----------------- |
| `on`           | função principal responsável por receber os eventos e chamar os [callbacks](#Eventos-e-Callbacks)|
| `openNewWindow` | abre a experiência pop up do Guiabolso Connect. |
| `destroy`    | função responsável por "limpar" remover alocações de memória e eventos |

<br />

### Eventos e Callbacks

|    evento    | parâmetro | descrição |
| :---------: | :----------: | :----------: |
| load | void | evento é emitido quando carrega a aplicação |
| onboard | void | evento é emitido quando carrega a tela onboarding |
| signup | void | evento é emitido quando carrega a tela de signup |
| bank_list | void | evento é emitido quando carrega a tela de lista de bancos |
| find_my_bank | void | evento é emitido quando carrega a tela de procurar banco |
| bank_selected | void | evento é emitido quando carrega a tela de registro de banco |
| bank_offline | void | evento é emitido quando o banco está offline |
| synced | void | evento é emitido quando termina de sincronizar o banco |
| complete | ``` { oauthcode: string } ``` | evento executa quando termina o fluxo |
| back | void | evento é emitido quando o usuário clica no botão voltar  |
| exit | ```{ reason: 'back_finished' 'bank_not_found' 'unknow' 'user_cancel' }``` | evento é emitido quando o usuário sai da aplicação |
| error | Error | evento é emitido quando o usuário recebe um erro |

<br />

### Iniciando a aplicação com todas as configurações:

Container onde o botão do Guiabolso Connect ou a experiência completa do Guiabolso Connect será apresentado.
Esse botão deve ter um seletor único que será referenciado na função `start`.

```html
<!-- ... -->
<body>
  <div data-gbc-container></div>
</body>
<!-- ... -->
```

<br />

Depois é necessário ter o nosso script na página.
O exemplo abaixo considera a importação via CDN, mas é possível importar fazendo uso do `npm`, caso o seu projeto contemple isso.

```html
<!-- ... -->
<body>
  <script src="https://connect-start.guiabolso.com.br/app.js"></script>
</body>
<!-- ... -->
```

<br />

Depois disso, é necessário passar todos os parâmetros de configuração para a função `start`, assim o Guiabolso Connect vai iniciar corretamente.

```html
<!-- ... -->
<body>
  <script>
    window.addEventListener('load', async () => {
      const connect = await guiabolsoConnect({
        clientId: '40b4a56c-cd12-41de-bb3b-a909111d2580',
        container: document?.querySelector('[data-gbc-container]'),
        environment: 'sandbox',
        callbackURL: 'https://url-de-callback.com.br/',
        fallbackURL: 'https://url-de-fallback.com.br/',
        config: {
          hiddenHeader: false,
        },
        data: {
          cpf: '99999999999',
          phone: '11999999999',
          email: 'email-do-usuario@email.com.br',
        },
        userTrackingId: 'um-identificador-unico-do-cliente',
      });

      connect.on('complete', ({ oauthcode }) => {
        console.log(`@oauthcode: ${oauthcode}`);
      });
    });
  </script>
</body>
<!-- ... -->
```

<br />

Agora, tudo junto:

```html
<body>
  <h1>Guiabolso Connect Start</h1>

  <!-- Container onde o botão do Guiabolso Connect ou a experiência completa do Guiabolso Connect será apresentado. -->
  <div data-gbc-container></div>

  <!-- Importação do script do Guiabolso Connect via CDN -->
  <script src="https://connect-start.guiabolso.com.br/app.js"></script>

  <!-- Inicialização da função start do Guiabolso Connect -->
  <script>
    window.addEventListener('load', async () => {
      const connect = await guiabolsoConnect({
        clientId: '40b4a56c-cd12-41de-bb3b-a909111d2580',
        container: document?.querySelector('[data-gbc-container]'),
        environment: 'sandbox',
        callbackURL: 'https://url-de-callback.com.br/',
        fallbackURL: 'https://url-de-fallback.com.br/',
        config: {
          hiddenHeader: false,
        },
        data: {
          cpf: '99999999999',
          phone: '11999999999',
          email: 'email-do-usuario@email.com.br',
        },
        userTrackingId: 'um-identificador-unico-do-cliente',
      });

      connect.on('complete', ({ oauthcode }) => {
        console.log(`@oauthcode: ${oauthcode}`);
      });
    });
  </script>
</body>
```

<br />
<br />

## Exemplo

Você pode usar [esse arquivo modelo](https://github.com/GuiaBolso/guiabolso-connect-start/blob/master/_example/index.html) como referência para a implementação.

PS: _É necessário servir a página através de um servidor._

<br />

<br />

## Resultado da configuração

Com tudo isso configurado, você deve conseguir visualizar o resultado no container que você definiu.
Caso a sua página esteja minimamente aderente com as Políticas de Segurança nível 2 (`Content-Security-Policy - CSP Level 2`) você conseguirá visualizar a experiência completa do Guiabolso Connect embedada dentro da página, do contrário, você verá o botão de conexão do Guiabolso Connect.

<br />

<!-- prettier-ignore -->
| Experiência embedada | Conexão com o botão |
| -------------------- | ------------------- |
| ![guiabolso-connect-start__conexao-com-botao](https://user-images.githubusercontent.com/3269950/107272829-07b05000-6a2d-11eb-8acf-d17d321b96f0.gif) | ![guiabolso-connect-start__experiencia-embedada](https://user-images.githubusercontent.com/3269950/107272838-0b43d700-6a2d-11eb-8835-c32c53c0235c.gif) |

<br />
