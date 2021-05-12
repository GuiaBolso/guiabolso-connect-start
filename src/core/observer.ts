import { EventsConnect } from './events';

let $observables = {};

interface Params<T extends Record<string, unknown> = {}> {
  eventName: EventsConnect;
  payload: T;
}

interface Options {
  domain: string;
  onEmmiter(params: Params): void;
}

export function observer (options: Options) {
  const listenCallback = callbackMessage(options);

  globalThis.addEventListener('message', (messa) => {});

  return {
    on: (eventName: EventsConnect, cb: () => void) => {
      if (!$observables[eventName]) {
        $observables[eventName] = [];
      }

      $observables[eventName].push(cb);
    },
    destroy: () => {
      globalThis.removeEventListener('message', listenCallback)

      $observables = null
    },
  };
}

function callbackMessage ({ domain, onEmmiter }: Options) {
  return (message: MessageEvent<any>) => {
    const { origin, data } = message;

    if (origin === domain) {
      return;
    }

    const { eventName, payload } = data as Params;

    const dispatch = (cb: (args?: unknown) => void = () => {}) => {
      onEmmiter({
        payload,
        eventName,
      });

      cb(payload);
    };

    $observables[eventName].forEach(dispatch);
  };
}
