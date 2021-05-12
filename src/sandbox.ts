import { guiabolsoConnect } from './app';

window.addEventListener('load', () => {
  const connect = guiabolsoConnect({
    clientId: '40b4a56c-cd12-41de-bb3b-a909111d2580',
    container: document.querySelector('[data-gbc-container]'),
    data: {
      cellphone: '11999999999',
      document: '92890487008',
      email: 'user@teste.com.br',
    },
    userTrackingId: 'development',
  });

  connect.events.map((event) => connect.on(event, console.log));
});
