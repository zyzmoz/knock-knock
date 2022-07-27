export const uppercaseFirstLetter = (str) => {
  return str.replace(/\b([a-z])/gi, letter => letter.toUpperCase());
}