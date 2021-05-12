import { buildQueryParams } from './utils/build-query-params';
import { observer } from './core/observer';
import {
  iframeId,
  renderIframe,
  RenderIframeParams,
} from './core/render-iframe';
import { renderButton, RenderButtonParams } from './core/render-button';
import { Envs, getOrigin } from './core/get-origin';
import { verifyCSP } from './utils/verify-csp';
import { events } from './core/events';

export declare type GuiabolsoConnectParams = {
  config?: Partial<{
    hiddenHeader: boolean;
    hiddenOnboarding: boolean;
    hiddenRegister: boolean;
    allowRegisterInGb: boolean;
    allowBackButton: boolean;
    showSignInWithGb: boolean;
    iframe: RenderIframeParams['config'];
    window: RenderIframeParams['config'];
    button: RenderButtonParams['config'];
  }>;
  /**
   * deprecated! This is deprecated in favor the blob
   */
  data: {
    document: string;
    email: string;
    cellphone: string;
  };
  environment?: Envs;
  /**
   * the hash encrypted Guiabolso Connect
   */
  blob?: string;
  userTrackingId: string;
  clientId: string;
  /**
   * only when open a new window
   */
  callbackURL?: string;
  /**
   * only when open a new window
   */
  fallbackURL?: string;
  /**
   * DOM element to render iframe or button
   */
  container?: HTMLElement;
};

export function guiabolsoConnect ({
  container,
  config,
  data,
  environment = 'sandbox',
}: GuiabolsoConnectParams) {
  const env = (process.env.GUIABOSLO_CONNECT_ENVIRONMENT as Envs) || environment;
  const domain = getOrigin(env);
  const queryString = buildQueryParams({});
  const src = `${domain}/#/integracao${queryString}`;

  const observable = observer({
    domain,
    onEmmiter: ({ eventName }) => {
      if (['leave', 'complete'].includes(eventName)) {
        globalThis.document.getElementById(iframeId).remove();
      }
    },
  });

  const openNewWindow = () =>
    window.open(
      src,
      'gbConnectWindow',
      `width=${config?.window?.width || 992},height=${
        config?.window?.height || 820
      }`
    );

  verifyCSP().then((hasCsp) => {
    if (hasCsp) {
      renderIframe({ config: config.iframe, src, container });

      return;
    }

    renderButton({ config: config.button, container, onClick: openNewWindow });
  });

  return {
    on: observable.on,
    openNewWindow,
    events,
    destroy: () => {},
  };
}

globalThis.guiabolsoConnect = guiabolsoConnect;
