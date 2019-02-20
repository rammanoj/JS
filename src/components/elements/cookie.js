import Cookies from "universal-cookie";

// Set Cookies
export const setCookie = args => {
  let cookie = new Cookies();
  for (let i = 0; i < args.key.length; i++) {
    cookie.set(args.key[i], args.value[i], {
      path: "/",
      maxAge: args.age
    });
  }
};
// Get Cookies
export const getCookie = name => {
  let cookie = new Cookies();
  if (
    cookie.get("Authorization") !== undefined &&
    cookie.get("Authorization").age < Date.now()
  ) {
    console.log(Date.now());
    console.log(cookie.get("Authorization").age);
    console.log(cookie.get("Authorization").age < Date.now());
    console.log("came here to delete the cookie");
    deleteCookie(["Authorization", "UserId", "user"]);
    return cookie.get(name);
  } else {
    return cookie.get(name);
  }
};

// Remove cookies
export const deleteCookie = args => {
  let cookie = new Cookies();
  for (let i = 0; i < args.length; i++) {
    cookie.remove(args[i]);
  }
};
