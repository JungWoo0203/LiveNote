import qs from "qs";

export const paramsSerializer = (params: Record<string, unknown>): string => {
  return qs.stringify(params, { arrayFormat: "repeat" });
};
