import Axios from 'axios';
import { API_URL, ENDPOINT } from '../constants';

interface Sdk {
  applicationId: string;
  apiKey: string;
}

export let appData: any;

export const initSDK = async ({ applicationId, apiKey }: Sdk) => {
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
