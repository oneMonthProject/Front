import { Cookies } from "react-cookie";
import { Cookie, CookieSetOptions } from "universal-cookie";
const cookies = new Cookies();

export const setCookie = (name: string, value: string, option?: CookieSetOptions) => {
  try {
    cookies.set(name, value, { ...option });
  } catch (error) {
    console.error(error);
  }
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const removeCookie = (name: string) => {
  cookies.remove(name);
};
