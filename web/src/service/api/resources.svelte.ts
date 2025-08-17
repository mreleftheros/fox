import {PUBLIC_API_URL} from "$env/static/public";

const BASE = PUBLIC_API_URL + "/v1/resources";

export const resources_get = async () => {
  const res = await fetch(BASE, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res.json()) as ApiResponse<Resources>;
};
