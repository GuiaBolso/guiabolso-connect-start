type CallToActionProps = {
    label: string;
    icon: boolean;
};
type AccessConfigProps = {
    cpf: string;
    email?: string;
    phone?: string;
    userTrackingId: string;
    clientId: string;
    callbackURL: string;
    fallbackURL: string;
};
type ConfigurationProps = {
    accessParameters: AccessConfigProps;
    container: Element;
    buttonConfig?: Partial<CallToActionProps>;
    iframeConfig?: {
        height: number;
        width: number;
    };
};
type RenderIframeProps = Omit<ConfigurationProps, 'buttonConfig'>;
type RenderButtonProps = Omit<ConfigurationProps, 'iframeConfig'>;
type MessageAuthCodeProps = {
    data: {
        oauthcode: string;
    };
    origin: string;
};
export const gbConnect: () => {
    start: ({ accessParameters, container, buttonConfig, iframeConfig, }: ConfigurationProps) => void;
    createAccessUrl: (accessParameters: AccessConfigProps) => string;
    openPopup: (url: string) => void;
    addStyleInPage: () => void;
    renderButton: ({ container, accessParameters, buttonConfig, }: RenderButtonProps) => void;
    renderIframe: ({ container, accessParameters, iframeConfig, }: RenderIframeProps) => void;
    closeIframeAfterReceiveOAuthcode: (message: MessageAuthCodeProps) => void;
};