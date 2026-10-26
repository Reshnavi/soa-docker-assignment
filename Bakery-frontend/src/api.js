import axios from 'axios';

// Set VITE_API_URL in your environment or let it default to http://localhost:8080
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Updated to match your backend controller: /bakery/view, /bakery/add, /bakery/delete/{id}
export const getBakeries = () => api.get('/bakery/view').then((res) => res.data);

export const createBakery = (payload) =>
  api.post('/bakery/add', payload).then((res) => res.data);

export const deleteBakery = (id) => api.delete(`/bakery/delete/${id}`);

/** Converts any axios error into { message, fieldErrors } for display. */
export function extractError(err) {
  if (err.response) {
    const data = err.response.data;
    return {
      message:
        (data && data.message) ||
        `Request failed with status ${err.response.status}. Please try again.`,
      fieldErrors: (data && data.fieldErrors) || {},
    };
  }
  if (err.code === 'ECONNABORTED') {
    return { message: 'The request timed out. Please try again.', fieldErrors: {} };
  }
  return {
    message: 'Cannot reach the server. Please check that the backend is running.',
    fieldErrors: {},
  };
}