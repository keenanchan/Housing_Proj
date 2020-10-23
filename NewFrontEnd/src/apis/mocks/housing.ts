import { backEndAPIFake } from '../apiBases';

export const getHousingFake = async (): Promise<any[] | undefined> => {
  try {
    const result = await backEndAPIFake.get('/fakeRoom');
    console.log(result);
    // handle errors
    if (result.request?.status !== 200) throw Error('Bad request');
    return result.data;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

getHousingFake().then((response) => {
  console.log(response);
});
