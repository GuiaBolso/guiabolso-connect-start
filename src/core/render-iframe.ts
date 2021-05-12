export declare type RenderIframeParams = {
  container: HTMLElement;
  src: string;
  config?: {
    height?: number;
    width?: number;
  };
};

export const dataIframe = 'data-guiabolso-connect-embedded'
export const iframeId = 'guiabolso-connect-embedded';

export function renderIframe ({ container, src, config }: RenderIframeParams) {
  injectIframeStyle();

  const { height = 800, width = 395 } = config;

  container.innerHTML = `
        <iframe
          id="${iframeId}"
          frameborder="0"
          src="${src}"
          height="${height}"
          width="${width}"
        ></iframe>
      `;
}

function injectIframeStyle () {
  globalThis.document.head.insertAdjacentHTML(
    'beforeend',
    `
    <style ${dataIframe}>
      #${iframeId} {
        background: #ffffff;
        border-radius: 6px;
        border: 1px solid #f2f2f2;
        box-shadow: 0px 0px 1px rgba(13, 13, 13, 0.2),
          0px 2px 2px rgba(13, 13, 13, 0.14);
      }
    </style>
  `
  );
}
