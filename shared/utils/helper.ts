export const arrayRange = (start: number, stop: number, step: number) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step,
  );

export const CurrencyFormator = (num: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
  }).format(num);

export const DateFormator = (date: any) => {
  var currentDate = new Date(date);
  return currentDate.toLocaleDateString('en-US');
};

export const UpdateObjectKey = (
  oldKey?: string,
  newKey?: string,
  obj?: any,
) => {
  const oldK = oldKey || '';
  const newK = newKey || '';
  const objectValue = obj || [];
  let stringfyObj = JSON.stringify(objectValue).replaceAll(oldK, newK) || '';
  return stringfyObj ? JSON.parse(stringfyObj) : '';
};

export const IsPermissionGranted = (
  permissions: Array<{ name: string; isGranted: boolean }>,
  name: string,
) => {
  const permissionExist = permissions?.filter(
    (p: { name: string }) => p.name === name,
  );
  return permissionExist.length > 0 ? permissionExist[0].isGranted : false;
};
