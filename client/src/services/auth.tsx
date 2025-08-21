const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002/api/v1";

export const getGoogleAuthURL = () => {
  return `${API_URL}/auth/google`;
};