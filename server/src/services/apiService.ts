import axios from "axios";
import { setupCache } from "axios-cache-adapter";
import { IUserProfile, IUser } from "../types/user";

// Create `axios` instance with pre-configured `axios-cache-adapter` attached to it
const cache = setupCache({
  maxAge: 15 * 60 * 1000, // 15 minutes
});

const api = axios.create({
  adapter: cache.adapter,
});

/**
 *
 * @returns {Promise<{userProfiles: IUserProfile, users: IUser}>}
 */
export async function fetchUsersFromApi() {
  try {
    const userProfilesResponse = await api.get(
      "https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json"
    );
    const usersResponse = await api.get("https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json");

    const userProfiles = userProfilesResponse.data;
    const users = usersResponse.data;

    return { userProfiles, users };
  } catch (error) {
    console.error(error);
  }
}
