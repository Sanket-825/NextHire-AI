// Normalizes axios/backend error shapes into one displayable string.
// Backend sends either { message } or { message, errors: [{ field, message }] }
// (see middleware/validateMiddleware.js on the backend).
export default function getErrorMessage(error, fallback = "Something went wrong. Please try again.") {
  const data = error?.response?.data;
  if (!data) return fallback;

  if (Array.isArray(data.errors) && data.errors.length > 0) {
    return data.errors[0].message;
  }

  return data.message || fallback;
}
