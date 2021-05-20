import { events, EventsConnectKeys } from './core/events';
import { CallbackPayload } from './app';

globalThis.document.querySelector('#app')?.innerHTML?.concat(`
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;width: 100%">
        <h1>Events</h1>
        ${events.map(
          (event) =>
            `<button id="${event}" style="margin: 4px;">${event}</button>`
        )}
    </div>
`);

function gbEmmiterToIframe<T extends EventsConnectKeys>(
  eventName: T,
  payload?: Parameters<CallbackPayload<T>>[0]
) {
  (globalThis.opener || globalThis.parent)?.postMessage(
    {
      eventName,
      payload,
    },
    '*'
  );
}

setTimeout(() => {
  events.map((event) =>
    globalThis.document
      .querySelector(`#${event}`)
      ?.addEventListener('click', () => gbEmmiterToIframe(event))
  );
});
