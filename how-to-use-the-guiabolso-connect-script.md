# Guiabolso Connect Start

O [Guiabolso Connect Start](https://github.com/GuiaBolso/guiabolso-connect-start#readme) é um script com o objetivo de facilitar a conexão com a aplicação do [Guiabolso Connect](https://guiabolsoconnect.com.br/)

<br />

## Como usar

Você pode encontrar e itilizar usar o nosso script:

- [Nosso repositório do GitHub](https://github.com/GuiaBolso/guiabolso-connect-start#readme)
- [Diretamente do NPM](https://www.npmjs.com/package/@guiabolsobr/guiabolso-connect-start) através do comando `npm i @guiabolsobr/guiabolso-connect-start`
- Ou via CDN:
  - [jsdelivr](https://cdn.jsdelivr.net/npm/@guiabolsobr/guiabolso-connect-start@1.1.0/build/app.min.js)
  - AWS - #To-do: Colocar o link do nosso CDN

<br />

### Exemplo com o NPM:

Instalar o pacote via NPM com o comando:

```sh
npm i @guiabolsobr/guiabolso-connect-start
```

Fazer a importação no seu arquivo javascript

```javascript
import { gbConnect } from './js/app.js';

const { start } = gbConnect();

window.addEventListener('load', () => {
  start({
    // Configurações do Guiabolso Connect
    // ...
  });
});
```

<br />

### Parâmetros de configuração:

A função start espera um `objeto` com as configurações para que a aplicação seja iniciada. São eles:

<br />

| Parâmetros necessários | Valores possíveis                 | Observação                                                                                |
| ---------------------- | --------------------------------- | ----------------------------------------------------------------------------------------- |
| `cpf` \*               | 99999999999                       | Número do CPF do usuário<br />**Somente números**                                         |
| `email`                | email-do-usuario@email.com.br     | Email do usuário                                                                          |
| `phone`                | 11999999999                       | Número de telefone do usuário<br />**Somente números**                                    |
| `clientId` \*          | id-recebido-do-guiabolso-connect  | ID recebido ao contratar o serviço                                                        |
| `callbackURL` \*       | https://url-de-callback.com.br/   | URL para redirecionar o usuário depois da Conexão com o Guiabolso Connect                 |
| `fallbackURL` \*       | https://url-de-fallback.com.br/   | Caso ocorra um erro e/ou o usuário queira sair da aplicação, mandaremos ele para essa URL |
| `userTrackingId` \*    | um-identificador-unico-do-cliente | Um identificador fornecido pelo cliente afim de trackear os usuários dele                 |

**_\* parâmetros obrigatórios_**

<br />

### Passando os parâmetros de configuração para a função `Start`

Você pode chamar no seu arquivo javascript ou diretamente no HTML.
Abaixo o exemplo está no HTML para contemplar tudo o que deve ser feito:

```html
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Guiabolso Connect Start</title>
  </head>

  <body>
    <!--
      Container onde o botão do Guiabolso Connect ou a
      experiência completa do Guiabolso Connect será apresentado
    -->
    <div data-gbc-container></div>

    <!-- Script inicializador diretamente do CDN -->
    <script src="https://cdn.jsdelivr.net/npm/@guiabolsobr/guiabolso-connect-start@1.1.0/build/app.min.js"></script>

    <!--
      Função `start` recebendo todos os parâmetros
      iniciais que o Guiabolso Connect precisa
    -->
    <script>
      const { start } = gbConnect();

      window.addEventListener('load', () => {
        start({
          container: document.querySelector('[data-gbc-container]'),
          accessParameters: {
            cpf: '99999999999',
            email: 'email-do-usuario@email.com.br',
            phone: '11999999999',
            userTrackingId: 'um-identificador-unico-do-cliente',
            clientId: 'id-recebido-do-guiabolso-connect',
            callbackURL: 'https://url-de-callback.com.br/',
            fallbackURL: 'https://url-de-fallback.com.br/',
          },
        });
      });
    </script>

    <!--
      Função que recebe o código de autorização
      depois da conexão bem sucedida do usuário
    -->
    <script>
      const handleGBData = message => {
        const hasAuthCode = message?.data?.oauthcode;
        const isGBCOrigin = message?.origin === 'https://connect.guiabolso.com.br;

        if (isGBCOrigin && hasAuthCode) {
          const oauthcode = message?.data?.oauthcode;
          alert(`@oauthcode: ${oauthcode}`);
        }
      };

      window.addEventListener('message', handleGBData, false);
    </script>
  </body>
</html>
```

<br />

## Resultado da configuração

Com tudo isso configurado, você deve conseguir visualizar o resultado no container que você definiu.
Caso a sua página esteja minimamente aderente com as Políticas de Segurança nível 2 (`Content-Security-Policy - CSP Level 2`) você conseguirá visualizar a experiência completa do Guiabolso Connect embedada dentro da página, do contrário, você verá o botão de conexão do Guiabolso Connect.

### Apresentando a experiência completa de maneira embedada

https://user-images.githubusercontent.com/3269950/107271432-fcf4bb80-6a2a-11eb-8e31-38c845737421.mov

### Apresentando a experiência com o botão de conexão

https://user-images.githubusercontent.com/3269950/107271454-05e58d00-6a2b-11eb-981b-a839442cc567.mov
