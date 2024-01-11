import { modelGetUserByEmail } from "../model/userModel.js";
import { USER_ERROR_MESSAGE } from "../utils/constants.js";

const validateUser = async (email) => {
  const { user } = await modelGetUserByEmail(email);

  if (!user) {
    throw new Error(USER_ERROR_MESSAGE.BAD_REQUEST.UNREGISTERED_ACCOUNT);
  }

  return { user };
};

export { validateUser };
