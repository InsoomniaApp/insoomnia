export type SdkMethod = 'flow' | 'jwt';

export interface ApiClientOptions {
  apiKey: string;
  applicationId: string;
}

export interface SocketClientOptions extends ApiClientOptions {
  accessToken: string;
}
