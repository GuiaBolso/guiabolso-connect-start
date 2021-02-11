import { gbConnect } from './app';

import dotenv from 'dotenv';

dotenv.config();

describe('Guiabolso Connect Start', () => {
  const {
    createAccessUrl,
    openPopup,
    addStyleInPage,
    renderButton,
    renderIframe,
  } = gbConnect();

  const accessParameters = {
    cpf: '92890487008',
    email: 'user@teste.com.br',
    phone: '11999999999',
    userTrackingId: 'development',
    clientId: '40b4a56c-cd12-41de-bb3b-a909111d2580', // GB Connect
    callbackURL: 'https://connect.guiabolso.com.br/#/callback',
    fallbackURL: 'https://connect.guiabolso.com.br/#/fallback',
  };
  const validGuiabolsoConnectUrl =
    'https://connect.guiabolso.com.br/#/integracao?cpf=92890487008&email=user%40teste.com.br&phone=11999999999&userTrackingId=development&clientId=40b4a56c-cd12-41de-bb3b-a909111d2580&callbackURL=https%3A%2F%2Fconnect.guiabolso.com.br%2F%23%2Fcallback&fallbackURL=https%3A%2F%2Fconnect.guiabolso.com.br%2F%23%2Ffallback';

  const { open } = window;

  beforeEach(() => {
    window.open = jest.fn();
  });

  afterAll(() => {
    window.open = open;
  });

  it('should return a valid Guiabolso Connnect URL', () => {
    const createdUrl = createAccessUrl(accessParameters);

    expect(createdUrl).toEqual(validGuiabolsoConnectUrl);
  });

  it('should open a popup window', () => {
    openPopup(validGuiabolsoConnectUrl);

    expect(window.open).toBeCalled();
  });

  it('should add the Guiabolso Connect elements style on page', () => {
    addStyleInPage();

    expect(document.querySelector('.gbc-style')).toBeTruthy();
  });

  it('should render the Guiabolso Connect button with custom label', () => {
    renderButton({
      container: document.querySelector('body'),
      accessParameters,
      buttonConfig: { label: 'Guiabolso Connect Button' },
    });

    const $button = document.querySelector('#gbc-open');

    expect($button).toBeTruthy();
    expect($button.textContent.trim()).toEqual('Guiabolso Connect Button');
  });

  it('should open a popup when button is clicked', () => {
    renderButton({
      container: document.querySelector('body'),
      accessParameters,
    });

    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    const $button = document.querySelector('#gbc-open');

    $button.dispatchEvent(clickEvent);

    expect(window.open).toBeCalled();
  });

  it('should render the Guiabolso Connect iframe with config props', () => {
    renderIframe({
      container: document.querySelector('body'),
      accessParameters,
      iframeConfig: { height: 500, width: 500 },
    });

    const $iframe = document.querySelector('#gbc-iframe');

    expect($iframe).toBeTruthy();
    expect($iframe.getAttribute('width')).toEqual('500');
    expect($iframe.getAttribute('height')).toEqual('500');
  });
});
