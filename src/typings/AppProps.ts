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

type MessageAuthCodeProps = {
  data: { oauthcode: string };
  origin: string;
};

type ConfigurationProps = {
  accessParameters: AccessConfigProps;
  container: Element;
  onSuccess?: (value?: any) => any;
  buttonConfig?: Partial<CallToActionProps>;
  iframeConfig?: {
    height: number;
    width: number;
  };
};

type RenderIframeProps = Omit<ConfigurationProps, 'buttonConfig'>;

type RenderButtonProps = Omit<ConfigurationProps, 'iframeConfig'>;

type HandleSuccessProps = (oauthcode: string) => void;

export {
  AccessConfigProps,
  ConfigurationProps,
  RenderIframeProps,
  RenderButtonProps,
  MessageAuthCodeProps,
  HandleSuccessProps,
};
