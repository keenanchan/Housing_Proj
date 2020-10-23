import { backEndAPI } from './apiBases';

export const getHousing = async (): Promise<string | undefined> => {
  try {
    const result = await backEndAPI.get('/getRoom');
    console.log(result);
    // handle errors
    if (result.request?.status !== 200) throw Error('Bad request');
    return result.data as string;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

getHousing().then((response) => {
  console.log(response);
});
