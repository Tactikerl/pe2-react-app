import { API_LOGIN } from "./url";

export function alertErrors(json) {
  if (json.errors.length > 0) {
    alert(json.errors.map((err) => err.message).join("\n"));
  }
}

export async function handlingServerError(response) {
  if (!response.ok) {
    const json = await response.json();
    alertErrors(json);
    throw Error(`HTTP error! status: ${response.status}`);
  }
}

export async function loginUser(email, password) {
  const loginData = {
    email: email,
    password: password,
  };
  const res = await fetch(`${API_LOGIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (res.status !== 200) {
    await handlingServerError(res);
  }
  const json = await res.json();
  return json;
}
