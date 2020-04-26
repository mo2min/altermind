export const base64Encode = (content: string) => {
  return btoa(unescape(encodeURIComponent(content)));
};

export const base64Decode = (content: string) => {
  return decodeURIComponent(escape(atob(content)));
};
