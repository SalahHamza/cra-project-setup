export const login = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        access_token: "AUTH_TOKEN",
        user_id: 1,
        expires_in: 3600
      });
    }, 250);
  });
};

export const signup = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        access_token: "AUTH_TOKEN",
        user_id: 1,
        expires_in: 3600
      });
    }, 250);
  });
};
