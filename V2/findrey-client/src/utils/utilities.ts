export const getValueById = <T extends { id: string }>(
  id: string,
  obj?: Array<T>,
): T | undefined => obj?.find((type) => type.id === id);

export const getIdByValue = <T>(
  value: string,
  field: keyof T,
  obj?: Array<T>,
): T | undefined => obj?.find((item) => item[field] === value);

export function convertToTitleCase(str: string) {
  if (!str) {
    return '';
  }
  return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
}
