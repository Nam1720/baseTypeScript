import { APP_CONFIG } from 'utils/env';
import { getCookie, delCookie, saveCookie } from 'utils/helpers';

export const getAccessToken = () => {
  return getCookie(APP_CONFIG.tokenKey) || null;
};

export const getAuth = () => {
  return JSON.parse(getCookie(APP_CONFIG.profileKey)) || null;
};

export const saveAuth = (auth: any, exdays = 1) => {
  saveCookie({ name: APP_CONFIG.profileKey, value: JSON.stringify(auth), exdays });
};

export const saveToken = (accessToken: string, exdays = 1) => {
  saveCookie({ name: APP_CONFIG.tokenKey, value: accessToken, exdays });
};
export const destroyLogged = () => {
  delCookie(APP_CONFIG.tokenKey);
  delCookie(APP_CONFIG.profileKey);
  localStorage.clear();
};

/**
 * Check Auth login App
 **/
export const isLogin = () => {
  const token = getCookie(APP_CONFIG.tokenKey);
  // const authInfo = getCookie(APP_CONFIG.tokenKey);
  return token;
};
