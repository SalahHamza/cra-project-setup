/**
 * Concatenates an indefinite number of strings
 * (classNames) into one
 * @returns {String}
 */
export const getClassName = (...rest) =>
  [...rest]
    // only keep strings
    .filter(s => typeof s === "string" || s instanceof String)
    .join(" ")
    .trim();

/**
 * Utility functions to help persist jwt token
 * to local storage
 * Tweak it as needed for your application
 */
export const authStorage = {
  /**
   * Removes auth data (token & token expiration date)
   * from local storage
   */
  clear: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpDate");
  },

  /**
   * persist auth data (token & token expiration date) to
   * local storage
   * @param {String} token - auth access token
   * @param {Number} tokenExp
   */
  persist: (token, expriseIn) => {
    // expiration date is current time + expires_in
    const tokenExpDate = new Date(new Date().getTime() + expriseIn * 1000);
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpDate", tokenExpDate);
  }
};

/**
 * Delays the mounting of a lazy loaded
 * component for a (minimum) period of time
 * @param {Function} importFunct - Same function React.lazy receives
 * @param {Number} delay - the period of time you want to defer the component (seconds)
 * @returns {Function} - a function received by React.lazy
 */
export const deferedLoading = (importFunc, delay = 250) => {
  return () =>
    Promise.all([
      importFunc(),
      new Promise(resolve => setTimeout(resolve, delay))
    ]).then(([moduleExports]) => moduleExports);
};
