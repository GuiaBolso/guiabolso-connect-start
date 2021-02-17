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

Você pode encontrar e itilizar usar o nosso script:

- [Nosso repositório do GitHub](https://github.com/GuiaBolso/guiabolso-connect-start#readme)
- [Diretamente do NPM](https://www.npmjs.com/package/@guiabolsobr/guiabolso-connect-start) através do comando `npm i @guiabolsobr/guiabolso-connect-start`
- Ou usar diretamente via CDN:
  - https://connect-start.guiabolso.com.br/app.js
  - https://cdn.jsdelivr.net/npm/@guiabolsobr/guiabolso-connect-start@1.2.0/build/app.min.js

<br />

### Exemplo de uso com a importação via `NPM`:

<!-- prettier-ignore -->
Instalar o pacote via NPM com o comando:

```sh
npm i @guiabolsobr/guiabolso-connect-start
```

Fazer a importação no seu arquivo javascript

```javascript
import { gbConnect } from '@guiabolsobr/guiabolso-connect-start';

window.addEventListener('load', () => {
  const { start } = gbConnect();

  start({
    /* Parâmetros de configuração do Guiabolso Connect */
  });
});
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
      window.addEventListener('load', () => {
        const { start } = gbConnect();

        start({
          /* Parâmetros de configuração do Guiabolso Connect */
        });
      });
    </script>
  </body>
</html>
```

<br />

## Funções disponíveis:

<br />

<!-- prettier-ignore -->
| Função            | Descrição         |
| ----------------- | ----------------- |
| `start`           | É a função principal. Responsável por verificar a política de segurança necessária para funcionamento da experiência de forma embedada.<br />Recebe os [`parâmetros de configuração`](#parâmetros-de-configuração-da-função-start) e inicia a aplicação, apresentando o botão do Guiabolso Connect ou a experiência de maneira incorporada na página.|
| `createAccessUrl` | Recebe os [`parâmetros de configuração`](#parâmetros-de-configuração-da-função-start) e retorna uma URL válida para acesso ao Guiabolso Connect. |
| `renderButton`    | Recebe os [`parâmetros de configuração`](#parâmetros-de-configuração-da-função-start) e um `container` que é um elemento html onde o botão será renderizado.<br />Adicionalmente, é possível configurar o botão através do parâmetro `buttonConfig`, onde é possível alterar a `label` do botão e definir se o `icon`, deve ser exibido ou não. |
| `renderIframe`    | Recebe os [`parâmetros de configuração`](#parâmetros-de-configuração-da-função-start) e um `container` que é um elemento html onde o iframe será renderizado. Adicionalmente é possível configurar o iframe através do parâmetro `iframeConfig`, onde é possível alterar o `height` e o `width` do iframe. |

<br />

### Parâmetros de configuração da função `start`:

A função `start` espera um objeto do tipo `accessParameters` com as configurações para que a aplicação seja iniciada. São eles:

<br />

<!-- prettier-ignore -->
| Parâmetros           | Tipo       | Obrigatoriedade | Exemplo de valores                     | Descrição              |
| -------------------- | ---------- | --------------- | -------------------------------------- | ---------------------- |
| **`cpf`**            | _`String`_ | **Obrigatório** | 99999999999                            | Número do CPF do usuário<br />**Somente números** |
| `email`              | _`String`_ | Opcional        | email-do-usuario@email.com.br          | Email do usuário                                  |
| `phone`              | _`String`_ | Opcional        | 11999999999                            | Número de telefone do usuário com DDD<br />**Somente números**  |
| **`clientId`**       | _`String`_ | **Obrigatório** | id-recebido-do-guiabolso-connect       | ID da sua chave de API recebido ao contratar o serviço do Guiabolsoo Conect |
| **`callbackURL`**    | _`String`_ | **Obrigatório** | https://url-de-callback.com.br/        | Redirecionaremos o usuário para essa URL logo após ele fazer a conexão com o Guiabolso Connect |
| **`fallbackURL`**    | _`String`_ | **Obrigatório** | https://url-de-fallback.com.br/        | Caso ocorra um erro e/ou o usuário queira sair da aplicação, mandaremos ele para essa URL |
| **`userTrackingId`** | _`String`_ | **Obrigatório** | `273117c3-e374-436c-a7ad-adba544872ba` | Esse ID do usuário deve ser único e não sensível, ou seja, não use o CPF do usuário aqui mas use um UUID, por exemplo.<br />Essa informação será usada para rastrearmos seu usuário dentro da nossa plataforma. |

<br />

Adicionalmente, a função `start` precisa e pode receber outros parâmetros:

| Parâmetros                                                            | Tipo         | Obrigatoriedade | Exemplo de valores                                                        | Descrição                                                                                                                                                               |
| --------------------------------------------------------------------- | ------------ | --------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[`accessParameters`](#parâmetros-de-configuração-da-função-start)** | _`Objeto`_   | **Obrigatório** | [`accessParameters`](#parâmetros-de-configuração-da-função-start)         | Parâmetros de configuração                                                                                                                                              |
| **`container`**                                                       | _`Element`_  | **Obrigatório** | `document.querySelector('[data-gbc-container]')`                          | Elemento HTML (container) onde a aplicação deve ser renderizada                                                                                                         |
| **`onSuccess`**                                                       | _`Function`_ | **Obrigatório** | `getOAuthCodeAndDoSomething(oAuthCode) => { console.log({ oAuthCode }) }` | Elemento HTML (container) onde a aplicação deve ser renderizada                                                                                                         |
| `buttonConfig`                                                        | _`Object`_   | Opcional        | `{ label: string, icon: boolean }`                                        | Com essas configurações é possível trocar o texto do botão e, devidir se ele deve ou não apresentar a identidade do Guiabolso Connect                                   |
| `iframeConfig`                                                        | _`Object`_   | Opcional        | `{ height: number, width: number }`                                       | Com essas configurações é possível definir o tamanho da área onde a experiência será apresentada.<br />Por padrão, o tamanho da área é de `{ height: 800, width: 395 }` |

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
    window.addEventListener('load', () => {
      const { start } = gbConnect();

      start({
        accessParameters: {
          cpf: '99999999999',
          email: 'email-do-usuario@email.com.br',
          phone: '11999999999',
          userTrackingId: 'um-identificador-unico-do-cliente',
          clientId: '273117c3-e374-436c-a7ad-adba544872ba',
          callbackURL: 'https://url-de-callback.com.br/',
          fallbackURL: 'https://url-de-fallback.com.br/',
        },
        container: document.querySelector('[data-gbc-container]'),
        onSuccess: oauthcode => {
          console.log(`@oauthcode: ${oauthcode}`);
        },
      });
    });
  </script>
</body>
<!-- ... -->
```

<br />

Tudo junto agora:

```html
<body>
  <h1>Guiabolso Connect Start</h1>

  <!-- Container onde o botão do Guiabolso Connect ou a experiência completa do Guiabolso Connect será apresentado. -->
  <div data-gbc-container></div>

  <!-- Importação do script do Guiabolso Connect via CDN -->
  <script src="https://connect-start.guiabolso.com.br/app.js"></script>

  <!-- Inicialização da função start do Guiabolso Connect -->
  <script>
    window.addEventListener('load', () => {
      const { start } = gbConnect();

      start({
        accessParameters: {
          cpf: '99999999999',
          email: 'email-do-usuario@email.com.br',
          phone: '11999999999',
          userTrackingId: 'um-identificador-unico-do-cliente',
          clientId: '273117c3-e374-436c-a7ad-adba544872ba',
          callbackURL: 'https://url-de-callback.com.br/',
          fallbackURL: 'https://url-de-fallback.com.br/',
        },
        container: document.querySelector('[data-gbc-container]'),
        onSuccess: oauthcode => {
          console.log(`@oauthcode: ${oauthcode}`);
        },
      });
    });
  </script>
</body>
```

<br />
<br />

## Exemplo

Você pode usar [esse arquivo modelo](https://github.com/GuiaBolso/guiabolso-connect-start/blob/master/_example/index.htmlß) como referência para a implementação.

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
