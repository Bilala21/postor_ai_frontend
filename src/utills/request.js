async function request({ method = "GET", endpoint, body }) {
  const url = `${process.env.REACT_APP_BACKEND_URL}${endpoint}`;
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const isFormData = body instanceof FormData;
  if (!isFormData) headers["Content-Type"] = "application/json";

  body = ["PUT", "POST", "PATCH"].includes(method)
    ? isFormData
      ? body
      : JSON.stringify(body)
    : undefined;

  const response = await fetch(url, { headers, method, body });

  const json = await response.json();
  return json;
}

export default request;
