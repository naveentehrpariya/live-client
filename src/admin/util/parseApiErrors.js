import toast from "react-hot-toast";

/**
 * Parses backend API validation error response and returns a structured object.
 * @param {Object} apiErrorResponse - The `errors` array from your backend.
 * @returns {Object} - { fieldName: errorMessage }
 *
 * Example input:
 * [
 *   { field: "description", message: "Description too short" },
 *   { field: "title", message: "Title is required" }
 * ]
 *
 * Example output:
 * {
 *   description: "Description too short",
 *   title: "Title is required"
 * }
 */
export function parseApiErrors(errorLists) {
  const parsed = {};
  const array = errorLists.response.data.errors;
  array.forEach((err) => {
   toast.error(err.message);
    if (err.field && err.message) {
      parsed[err.field] = err.message;
    }
  });
  return parsed;
}
