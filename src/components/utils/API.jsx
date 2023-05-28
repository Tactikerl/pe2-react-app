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
