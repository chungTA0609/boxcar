export function useTokenCookie() {
  let token = null;

  // Set a cookie with a bearer token
  const setTokenCookie = (tokenValue, days = 1) => {
    token = tokenValue;
    let expires = "";
    const payload = JSON.parse(atob(tokenValue.split(".")[1]));

    if (days) {
      const date = new Date(payload.exp * 1000); // Convert to milliseconds
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `token=${tokenValue};${expires}; path=/`;
  };

  // Get the bearer token from the cookie
  const getTokenCookie = () => {
    const nameEQ = "token=";
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      while (cookie.charAt(0) === " ") cookie = cookie.substring(1);
      if (cookie.indexOf(nameEQ) === 0) {
        token = cookie.substring(nameEQ.length);
        return token;
      }
    }
    return null;
  };

  // Delete the token cookie
  const deleteTokenCookie = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    token = null;
  };

  return { token, setTokenCookie, getTokenCookie, deleteTokenCookie };
}
