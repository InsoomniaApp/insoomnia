import { ApiClient } from '@insoomnia/core'
import { SdkCredentials } from '../interfaces';

export let appData: any;

export const initSDK = async (sdkCredentials: SdkCredentials) => {
  const { applicationId, apiKey } = sdkCredentials;
  try {
    const { callToSdkApi } = new ApiClient({
      apiKey,
      applicationId
    })

    const data = await callToSdkApi('jwt');
    appData = data;
  } catch (ex) {
    console.log(ex);
  }
};
