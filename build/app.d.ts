declare const events: readonly ["load", "onboard", "signup", "bank_list", "find_my_bank", "bank_selected", "bank_offline", "synced", "complete", "back", "exit", "error"];
type EventsConnectKeys = typeof events[number];
type RenderIframeParams = {
    container?: HTMLElement;
    src: string;
    config?: {
        height?: number | string;
        width?: number | string;
    };
};
type RenderButtonParams = {
    container?: HTMLElement;
    onClick(event: ElementEventMap['fullscreenchange']): any;
    config?: {
        allowIcon?: boolean;
        label?: string;
    };
};
type Envs = 'production' | 'sandbox';
export type GuiabolsoConnectParams = {
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
export type CallbackPayload<K extends EventsConnectKeys> = {
    load(): void;
    onboard(): void;
    signup(): void;
    bank_list(): void;
    find_my_bank(): void;
    bank_selected(): void;
    bank_offline(): void;
    synced(): void;
    complete(params: {
        oauthcode: string;
    }): void;
    back(): void;
    exit(params: {
        reason: 'back_finished' | 'bank_not_found' | 'unknow' | 'user_cancel' | 'missing_params';
    }): void;
    error(err: Error): void;
}[K];
export function guiabolsoConnect({ container, config, data, clientId, userTrackingId, callbackURL, fallbackURL, environment, }: GuiabolsoConnectParams): Promise<{
    on: <T extends "error" | "exit" | "complete" | "load" | "onboard" | "signup" | "bank_list" | "find_my_bank" | "bank_selected" | "bank_offline" | "synced" | "back">(event: T, cb: CallbackPayload<T>) => void;
    openNewWindow: () => void;
    events: readonly ["load", "onboard", "signup", "bank_list", "find_my_bank", "bank_selected", "bank_offline", "synced", "complete", "back", "exit", "error"];
    destroy: () => void;
}>;
