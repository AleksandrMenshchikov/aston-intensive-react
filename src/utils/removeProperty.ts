// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function removeProperty<T extends Record<any, any>>(obj: T, prop: keyof T) {
  const newObj = { ...obj };
  delete newObj[prop];
  return newObj;
};
