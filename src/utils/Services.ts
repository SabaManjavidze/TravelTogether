export const getDateFromParams = (
  params: URLSearchParams,
  property: string
) => {
  const param = params.get(property);
  if (!param) return "";
  return param;
};
