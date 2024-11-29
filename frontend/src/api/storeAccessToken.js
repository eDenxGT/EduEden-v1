import Cookies from "js-cookie";

const storeAccessToken = (role, token, expiresInMinutes = 13) => {
  if (!role || !token) {
    console.error("Role and token are required to store the access token.");
    return;
  }
  const expiresInDays = expiresInMinutes / (24 * 60);

  Cookies.set(`${role}_access_token`, token, { expires: expiresInDays });

  console.log(`${role}_access_token stored successfully with a ${expiresInMinutes}-minute expiry.`);
};

export default storeAccessToken;
