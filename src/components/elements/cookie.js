import Cookies from "universal-cookie";

// Set Cookies
export const setCookie = args => {
  let cookie = new Cookies();
  for (let i = 0; i < args.length; i++) {
    cookie.set(args.key[i], args.value[i], {
      path: "/",
      maxAge: args.age
    });
  }
};
// Get Cookies
export const getCookie = name => {
  let cookie = new Cookies();
  let info = cookie.get(name);
  //   edit here, if expiry date is greater to the current date, delete it, else reutrn it.
  return info;
};

// Remove cookies
export const deleteCookie = args => {
  let cookie = new Cookies();
  for (let i = 0; i < args.length; i++) {
    cookie.remove(args.key[i]);
  }
};
