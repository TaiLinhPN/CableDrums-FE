import { CreateUserApi,  createUserApi, getAllUsersApi, removeUserApi } from "../api/userApi";
import { messageError, messageSuccess } from "../utils/notify";

export const fetchAccountsData = async () => {
  try {
    const response = await getAllUsersApi();
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Error fetching accounts:", error);
  }

  return [];
};

export const removeUser = async (userId: string) => {
  try {
    const response = await removeUserApi(userId);
    if (response.status === 204) {
      messageSuccess("User has been removed");
      return true;
    }
  } catch (error) {
    console.log("Error remove accounts:", error);
    messageError(error);
  }
  return false;
};

export const createUser = async (user: CreateUserApi)=>{
try {
  const response = await createUserApi(user)
  if (response.status === 200) {
    messageSuccess("User created successfully")
    return true
  }
} catch (error) {
  console.log("Error create accounts:", error);
    messageError(error);
  }
  return false
}

