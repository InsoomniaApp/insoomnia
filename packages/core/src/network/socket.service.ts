import io from 'socket.io-client';
import { BASE_URL } from '../config';
import { SocketClientOptions } from '../types';
import { isResponseSuccess } from '../utils';

export class SocketClient {
  private socket: any;

  constructor(options: SocketClientOptions) {
    this.initSocket(options);
  }

  public callToSocket = async (event: string, payload: any) => {
    try {
      const data = await this.promisifySocketCall(event, payload);
      return { data, error: null };
    } catch (ex) {
      return {
        data: null,
        error: ex,
      };
    }
  };

  public listenToSocket = async (event: string) => {
    try {
      const data = await this.promisifySocketListener(event);
      return { data, error: null };
    } catch (ex) {
      return {
        data: null,
        error: ex,
      };
    }
  };

  private promisifySocketCall = (event: string, payload: any) =>
    new Promise<any>((res, rej) => {
      this.socket.emit(event, payload, (response: any) => {
        if (!isResponseSuccess(response.status)) rej(response);
        res(response.data);
      });
    });

  private promisifySocketListener = (event: string) =>
    new Promise<any>((res, rej) => {
      this.socket.on(event, (response: any) => {
        if (!isResponseSuccess(response.status)) rej(response);
        res(response.data);
      });
    });

  private initSocket = (options: SocketClientOptions) => {
    const { accessToken, apiKey, applicationId } = options;
    this.socket = io(BASE_URL, {
      extraHeaders: {
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        'X-API-KEY': apiKey,
        'X-APPLICATION-ID': applicationId,
      },
    });
  };
}