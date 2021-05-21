import 'regenerator-runtime/runtime';
import './utils/globalthis-polyfill';

import { buildQueryParams } from './utils/build-query-params';
import { observer } from './core/observer';
import {
  renderIframe,
  RenderIframeParams,
  dataStyleIframe,
} from './core/render-iframe';
import {
  renderButton,
  dataButtonStyle,
  RenderButtonParams,
} from './core/render-button';
import { Envs, getOrigin } from './core/get-origin';
import { verifyCSP } from './utils/verify-csp';
import { events, EventsConnectKeys } from './core/events';
import {
  destroyInstances,
  getInstance,
  setInstanceValue,
} from './utils/singleton';

export declare type GuiabolsoConnectParams = {
  config?: Partial<{
    hiddenHeader: boolean;
    labelShareButton: string;
    iframe: RenderIframeParams['config'];
    window: RenderIframeParams['config'];
    button: RenderButtonParams['config'];
  }>;
  data: {
    cpf?: string;
    email: string;
    phone: string;
  };
  environment?: Envs;
  userTrackingId: string;
  clientId: string;
  callbackURL: string;
  fallbackURL: string;
  /**
   * DOM element to render iframe or button
   */
  container: HTMLElement;
};

export declare type CallbackPayload<K extends EventsConnectKeys> = {
  load(): void;
  onboard(): void;
  signup(): void;
  // eslint-disable-next-line camelcase
  bank_list(): void;
  // eslint-disable-next-line camelcase
  find_my_bank(): void;
  // eslint-disable-next-line camelcase
  bank_selected(): void;
  // eslint-disable-next-line camelcase
  bank_offline(): void;
  synced(): void;
  complete(params: { oauthcode: string }): void;
  back(): void;
  exit(params: {
    reason: 'back_finished' | 'bank_not_found' | 'unknow' | 'user_cancel';
  }): void;
  error(err: Error): void;
}[K];

setInstanceValue('isDestroyed', false);

export async function guiabolsoConnect({
  container,
  config,
  data,
  clientId,
  userTrackingId,
  callbackURL,
  fallbackURL = '',
  environment = 'sandbox',
}: GuiabolsoConnectParams) {
  const env =
    (process.env.GUIABOSLO_CONNECT_ENVIRONMENT as Envs) || environment;
  const domain = getOrigin(env);
  const embedded = (await verifyCSP()) && Boolean(container);

  const {
    iframe: iframeConfig,
    button: buttonConfig,
    window: windowConfig,
    ...configConnect
  } = config ?? {};

  const queryString = buildQueryParams({
    ...data,
    ...configConnect,
    callbackURL,
    clientId,
    fallbackURL,
    userTrackingId: environment === 'sandbox' ? 'development' : userTrackingId,
    embedded,
  });

  const src =
    process.env.TEST_EMITTER || `${domain}/#/integracao${queryString}`;

  const observable = observer({
    domain,
    onEmmiter: ({ eventName }) => {
      if (['exit', 'complete'].includes(eventName)) {
        if (getInstance('windowParent')) {
          getInstance('windowParent')?.close();
        }
      }
    },
  });

  const openNewWindow = () => {
    if (
      process.env.GUIABOSLO_CONNECT_ENVIRONMENT === 'sandbox' &&
      getInstance('isDestroyed')
    ) {
      throw new Error("You executed destroy function. Events don't work");
    }

    setInstanceValue(
      'windowParent',
      window.open(
        src,
        'gbConnectWindow',
        `width=${windowConfig?.width || 992},height=${
          windowConfig?.height || 820
        }`
      ) as Window & typeof globalThis
    );
  };

  if (embedded) {
    renderIframe({
      config: iframeConfig,
      src,
      container,
    });
  }

  if (!embedded) {
    renderButton({ config: buttonConfig, container, onClick: openNewWindow });
  }

  return {
    on: observable.on as <T extends EventsConnectKeys>(
      event: T,
      cb: CallbackPayload<T>
    ) => void,
    openNewWindow,
    events,
    destroy: () => {
      setTimeout(() => {
        destroyInstances();
        globalThis.document?.querySelector(`[${dataButtonStyle}]`)?.remove();
        globalThis.document?.querySelector(`[${dataStyleIframe}]`)?.remove();
        container?.remove();
        observable.destroy();
        setInstanceValue('isDestroyed', true);
      }, 2000);
    },
  };
}

// @ts-ignore
globalThis.guiabolsoConnect = guiabolsoConnect;
