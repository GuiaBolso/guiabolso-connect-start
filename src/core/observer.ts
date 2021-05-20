import { getInstance, setInstanceValue } from '../utils/singleton';
import { EventsConnectKeys } from './events';

interface Params<T extends Record<string, unknown> = {}> {
  eventName: EventsConnectKeys;
  payload: T;
}

interface Options {
  domain: string;
  onEmmiter(params: Params): void;
  window?: any;
}

export function observer({ window = globalThis, ...options }: Options) {
  const listenCallback = callbackMessage(options);

  window.addEventListener('message', listenCallback, false);

  if (!getInstance('observer')) {
    setInstanceValue('observer', {});
  }

  return {
    on: (eventName: EventsConnectKeys, cb: (payload?: unknown) => void) => {
      if (!getInstance('observer')[eventName]) {
        getInstance('observer')[eventName] = [];
      }

      getInstance('observer')[eventName].push(cb);
    },
    destroy: () => {
      window.removeEventListener('message', listenCallback);

      setInstanceValue('observer', undefined);
    },
  };
}

function callbackMessage({ domain, onEmmiter }: Omit<Options, 'window'>) {
  return (message: MessageEvent<Params>) => {
    const { origin, data } = message;

    if (origin !== domain) {
      return;
    }

    const { eventName, payload = {} } = data ?? {};

    if (!eventName) {
      return;
    }

    const dispatch = (cb: (args?: unknown) => void = () => {}) => {
      onEmmiter({
        payload,
        eventName,
      });

      cb(payload);
    };

    getInstance('observer')[eventName]?.forEach(dispatch);
  };
}
