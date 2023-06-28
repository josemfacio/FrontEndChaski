import { BASE_API } from "../utils/constants";
export async function serchTallerUserApi(serch) {
  try {
    const url = `${BASE_API}/api/userTalle/?search=${serch}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
export async function TallerUsersApi() {
  try {
    const url = `${BASE_API}/api/userTalleUser/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
