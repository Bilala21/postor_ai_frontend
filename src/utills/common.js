/**
 * Converts an object into a query parameter string.
 * @param {Object} params - The object to be converted.
 * @returns {string} - The query parameter string.
 */
export function makeQP(params = {}) {
  const query = Object.keys(params)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
    )
    .join("&");
  return query ? "?" + query : query;
}
