import * as qs from 'query-string';

import { verifyCSP } from './utils';

import {
  AccessConfigProps,
  ConfigurationProps,
  RenderIframeProps,
  RenderButtonProps,
  MessageAuthCodeProps,
} from './typings/AppProps';

export const gbConnect = () => {
  'use strict';

  const GBC_URL = process.env.APP_ORIGIN || 'https://connect.guiabolso.com.br';

  const createAccessUrl = (accessParameters: AccessConfigProps) => {
    const urlParameters = qs.stringify(accessParameters);
    const url = `${GBC_URL}/#/integracao?${urlParameters}`;

    return url;
  };

  const openPopup = (url: string) => {
    url && window.open(url, 'gbConnectWindow', 'width=992,height=800');
  };

  const addStyleInPage = () => {
    const $body = document.querySelector('body');
    const buttonStyle = `
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap');

          #gbc-open {
            align-items: center;
            background-color: #250048;
            border-radius: 0.5rem;
            border: 0;
            box-shadow: none;
            box-sizing: border-box;
            cursor: pointer;
            display: inline-flex;
            justify-content: center;
            margin: 0;
            min-height: 3rem;
            min-width: 312px;
            outline: 0;
            padding: 0px 1.5rem;
            position: relative;
            user-select: none;
          }

          #gbc-open .gbc-open__label {
            pointer-events: none;
            user-select: none;
            line-height: 1.75;
            letter-spacing: 0.02857em;
            font-size: 1rem;
            color: #ffffff;
            box-sizing: border-box;
            width: 100%;
            align-items: inherit;
            justify-content: inherit;
            display: flex;
            font-family: 'Open Sans';
            font-weight: 600;
            text-transform: none;
          }

          #gbc-open .gbc-open__icon {
            user-select: none;
            width: 20;
            height: 25;
            fill: none;
            box-sizing: border-box;
            margin-right: 0.625rem;
          }
        </style>
      `;
    const iframeStyle = `
        <style>
          #gbc-iframe {
            background: #ffffff;
            border-radius: 6px;
            border: 1px solid #f2f2f2;
            box-shadow: 0px 0px 1px rgba(13, 13, 13, 0.2),
              0px 2px 2px rgba(13, 13, 13, 0.14);
          }
        </style>
      `;

    $body?.insertAdjacentHTML(
      'beforeend',
      `<div id="gbc-style">
        ${buttonStyle}
        ${iframeStyle}
      </div>`
    );
  };

  const renderButton = ({
    container,
    accessParameters,
    buttonConfig = {},
  }: RenderButtonProps) => {
    if (!container) return;

    const url = createAccessUrl(accessParameters);
    const { icon = true, label = 'Conectar com Guiabolso' } = buttonConfig;
    const $icon = `<svg class="gbc-open__icon" width="20" height="25" fill="none"><path d="M19.2094 9.25008L10.9592 12.6876V15.2501L17.2392 12.6876C17.1161 16.6251 13.9145 19.8126 10.0357 19.8126C6.09531 19.8126 2.83218 16.5001 2.83218 12.4376C2.83218 8.37508 6.03374 5.06258 10.0357 5.06258C11.6981 5.06258 12.8063 5.43758 13.9145 6.31258L16.4388 5.25008C15.0228 3.68758 12.7447 2.62508 10.0357 2.62508C4.67923 2.62508 0.307861 7.00008 0.307861 12.4376C0.307861 17.8751 4.67923 22.2501 9.97414 22.2501C15.269 22.2501 19.702 17.8126 19.702 12.4376C19.702 11.3126 19.5788 10.2501 19.2094 9.25008Z" fill="#00C1EB"></path><path d="M19.702 5.12501L10.9592 8.81251V11.375L19.702 7.75001V5.12501Z" fill="#F9386A"></path></svg>`;
    const $button = `
      <button id="gbc-open" type="button">
        <span class="gbc-open__label">
          ${icon ? $icon : ''}
          ${label}
        </span>
      </button>
    `;

    container.insertAdjacentHTML('beforeend', $button);
    container.addEventListener('click', clickEvent => {
      // @ts-ignore
      if (clickEvent.target.id === 'gbc-open') {
        openPopup(url);
      }
    });
  };

  const renderIframe = ({
    container,
    accessParameters,
    iframeConfig = { height: 800, width: 395 },
  }: RenderIframeProps) => {
    if (!container) return;

    const { height, width } = iframeConfig;

    const url = createAccessUrl(accessParameters);
    const $iframe = `
      <iframe
        id="gbc-iframe"
        frameborder="0"
        src="${url}"
        height="${height}"
        width="${width}"
      ></iframe>
    `;

    container.insertAdjacentHTML('beforeend', $iframe);
  };

  const closeIframeAfterReceiveOAuthcode = (message: MessageAuthCodeProps) => {
    const hasAuthCode = message?.data?.oauthcode;
    const $iframe = document.querySelector('#gbc-iframe');
    const isGBCOrigin = message?.origin === GBC_URL;

    if (isGBCOrigin && hasAuthCode) {
      $iframe?.remove();
    }
  };

  const start = ({
    accessParameters,
    container,
    buttonConfig,
    iframeConfig,
  }: ConfigurationProps) => {
    addStyleInPage();

    verifyCSP((hasCSP2: boolean) => {
      if (hasCSP2) {
        renderIframe({ container, accessParameters, iframeConfig });

        window.addEventListener(
          'message',
          closeIframeAfterReceiveOAuthcode,
          false
        );

        return;
      }

      renderButton({ container, accessParameters, buttonConfig });
    });
  };

  return {
    start,
    createAccessUrl,
    openPopup,
    addStyleInPage,
    renderButton,
    renderIframe,
    closeIframeAfterReceiveOAuthcode,
  };
};

// @ts-ignore
window.gbConnect = gbConnect;
