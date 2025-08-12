import { LOGIN_USER, LOGOUT_USER, REGISTER_USER } from "./authAction";
import { readAuth } from "./storage";

const savedAuth = readAuth();

const initialState = {
  userId: savedAuth?.user?.id || null,
  token: savedAuth?.token || null,
  user: savedAuth?.user || null,
  isAuthenticated: !!savedAuth,
  lastRegistrated: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        lastRegistrated: action.payload,
      };

    case LOGIN_USER:
      return {
        ...state,
        userId: action.payload.user.id,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
      };

    case LOGOUT_USER:
      return {
        userId: null,
        token: null,
        user: null,
        isAuthenticated: false,
        lastRegistrated: null,
      };

    default:
      return state;
  }
};
export default authReducer;
