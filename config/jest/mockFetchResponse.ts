/**
 * jsdom не предоставляет Response, а fetchBaseQuery работает с его API.
 * Собираем минимальный объект с методами, которые использует RTK Query.
 */
export const createJsonResponse = (data: unknown, status = 200): Response => {
  const body = JSON.stringify(data);

  const buildResponse = () => ({
    ok: status >= 200 && status <= 299,
    status,
    statusText: status >= 200 && status <= 299 ? "OK" : "Error",
    headers: new Headers({ "content-type": "application/json" }),
    text: () => Promise.resolve(body),
    json: () => Promise.resolve(data),
    clone: () => buildResponse(),
  });

  return buildResponse() as unknown as Response;
};
