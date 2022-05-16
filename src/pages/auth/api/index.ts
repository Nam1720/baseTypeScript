import HttpService from 'utils/http';
import { LoginReq } from './../model/LoginModel';
import { saveToken, saveAuth } from 'utils/jwt';

export const login = async (loginData: LoginReq) => {
  // Fake for FE pass Login:
  // const { email, password } = loginData;
  // if (email === 'admin@admin.com' && password === 'admin') {
  //   const token = 'testtokenloginapp';
  //   await saveToken(token);
  //   return Promise.resolve(token);
  // } else {
  //   return Promise.reject({ code: 401, data: null, message: ['Email/Password invalid'] });
  // }
  const apiEndpoint = 'login';
  return HttpService.post(apiEndpoint, loginData)
    .then(async (res: any) => {
      if (!res?.accessToken) {
        return;
      }
      const token = res?.accessToken;
      const profile = res?.use;
      if (token) await saveToken(token);
      if (profile) await saveAuth(profile);
      // console.log('Repson login', token);
      return res || {};
    })
    .catch(() => {
      return false;
    });
};
