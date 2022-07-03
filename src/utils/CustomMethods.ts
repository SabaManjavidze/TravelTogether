export const setParam = (
  search: string,
  pathname: string,
  name: string,
  value: any,
  prevValue: any
) => {
  const orderByThis = `${name}=${value}`;
  const url = search.includes(`${name}=`)
    ? search.replace(`${name}=${prevValue}`, orderByThis)
    : `${search}&${orderByThis}`;
  return `${pathname}${url}`;
};
