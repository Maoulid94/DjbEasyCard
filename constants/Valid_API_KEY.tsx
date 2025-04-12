import { API_URL } from "./variables";

const verifyApiKey = async (apiKey: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/verify?apiKey=${apiKey}`);
    if (!response.ok) return false;

    const result = await response.json();
    return result?.valid === true;
  } catch (error) {
      console.log("Error verifying API key:", error);
    return false;
  }
};
export default verifyApiKey;
