import {PUBLIC_API_URL} from "$env/static/public";

const BASE = PUBLIC_API_URL + "/v1/users";

export const users_signup_post = async (us: UserSignup) => {
  const res = await fetch(BASE + "/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(us),
  });
  return (await res.json()) as ApiResponse<User, UserErrors>;
};

export const users_login_post = async (ul: UserLogin) => {
  const res = await fetch(BASE + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(ul),
  });
  return (await res.json()) as ApiResponse<User>;
};

export const users_current_get = async () => {
  const res = await fetch(BASE + "/current", {
    credentials: "include",
  });
  return (await res.json()) as ApiResponse<User>;
};

export const users_logout_post = async () => {
  const res = await fetch(BASE + "/logout", {
    method: "POST",
    credentials: "include",
  });
  return res.ok && res.status === 204;
};

export const users_idParam_verify_get = async (id: User["id"]) => {
  const res = await fetch(BASE + `/${id}/verify`, {
    credentials: "include",
  });
  return res.ok && res.status === 204;
};
