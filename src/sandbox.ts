import { guiabolsoConnect } from './app';

window.addEventListener('load', () => {
  guiabolsoConnect({
    clientId: '40b4a56c-cd12-41de-bb3b-a909111d2580',
    container: document?.querySelector('[data-gbc-container]'),
    environment: 'sandbox',
    callbackURL: 'https://connect.guiabolso.com.br/#/callback',
    config: {
      hiddenHeader: true,
      labelShareButton: '',
    },
    data: {
      phone: '11999999999',
      cpf: '99999999999',
      email: 'user@teste.com.br',
    },
    userTrackingId: 'development',
  }).then((connect) => {
    globalThis.document.querySelector('#list-events').innerHTML = connect.events
      .map((event) => {
        connect.on(event, (payload) => {
          globalThis.document.querySelector(`#${event}-status`).innerHTML =
            '✅';
          globalThis.document.querySelector(`#${event}-payload`).innerHTML =
            JSON.stringify(payload);
        });

        return `
          <tr>
            <td>${event}</td>
            <td id="${event}-status"></td>
            <td id="${event}-payload"></td>
          </tr>
        `;
      })
      .join('');
  });
});
