export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const usernamePattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;
export const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
export const alphaOnlyNamePattern = /^[A-Za-z\s]+$/;

export const isValidEmail = (value) => emailPattern.test(String(value).trim());

export const isValidUsername = (value) =>
  usernamePattern.test(String(value).trim());

export const isStrongPassword = (value) =>
  passwordPattern.test(String(value).trim());

export const isAlphabeticName = (value) =>
  alphaOnlyNamePattern.test(String(value).trim());

export const isRequiredText = (value) => String(value).trim().length > 0;
