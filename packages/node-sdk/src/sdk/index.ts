import Axios from 'axios';
import { SdkCredentials } from '../interfaces';
import { API_URL, ENDPOINT } from '../constants';

export let appData: any;

export const initSDK = async (sdkCredentials: SdkCredentials) => {
  const { applicationId, apiKey } = sdkCredentials;
  try {
    const axios = Axios.create({
      baseURL: API_URL,
    });
    const { data } = await axios.request({
      method: 'get',
      url: ENDPOINT,
      headers: {
        'X-APPLICATION-ID': applicationId,
        'X-API-KEY': apiKey,
      },
    });

    appData = data;
  } catch (ex) {
    console.log(ex);
  }
};
