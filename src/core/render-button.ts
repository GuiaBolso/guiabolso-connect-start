export declare type RenderButtonParams = {
  container: HTMLElement;
  onClick(event: MouseEvent): void;
  config?: {
    allowIcon?: boolean;
    label?: string;
  };
};

export const dataElement = 'data-gbc-style-button';

export function renderButton ({
  container,
  onClick,
  config,
}: RenderButtonParams) {
  const { allowIcon = true, label = 'Conectar com Guiabolso' } = config;

  insertStyleButton();
  const iconElement = allowIcon ? getSvgIcon() : '';

  const buttonElement = getButton({ iconElement, label });

  container.innerHTML = buttonElement;

  const $button = globalThis.document.querySelector('#gbc-open');
  $button.addEventListener('click', onClick);
}

function insertStyleButton () {
  globalThis.document.head.insertAdjacentHTML(
    'beforeend',
    `
        <style ${dataElement}>
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
      `
  );
}

function getButton ({
  iconElement,
  label,
}: {
  iconElement: string;
  label: string;
}) {
  return `
    <button id="gbc-open" type="button">
      <span class="gbc-open__label">
        ${iconElement}
        ${label}
      </span>
    </button>
  `;
}

function getSvgIcon () {
  return `
    <svg 
        class="gbc-open__icon"
        width="20"
        height="25"
        fill="none"
    >
        <path 
            d="M19.2094 9.25008L10.9592 12.6876V15.2501L17.2392 12.6876C17.1161 16.6251 13.9145 19.8126 10.0357 19.8126C6.09531 19.8126 2.83218 16.5001 2.83218 12.4376C2.83218 8.37508 6.03374 5.06258 10.0357 5.06258C11.6981 5.06258 12.8063 5.43758 13.9145 6.31258L16.4388 5.25008C15.0228 3.68758 12.7447 2.62508 10.0357 2.62508C4.67923 2.62508 0.307861 7.00008 0.307861 12.4376C0.307861 17.8751 4.67923 22.2501 9.97414 22.2501C15.269 22.2501 19.702 17.8126 19.702 12.4376C19.702 11.3126 19.5788 10.2501 19.2094 9.25008Z" 
            fill="#00C1EB"
        >
        </path>
        <path
            d="M19.702 5.12501L10.9592 8.81251V11.375L19.702 7.75001V5.12501Z"
            fill="#F9386A"
        >
        </path>
    </svg>`;
}
