import {
  getToken,
  readUsers,
  removeAuth,
  writeAuth,
  writeUsers,
} from "./storage";

//tipi di action
export const REGISTER_USER = "REGISTER_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

//Register user localmente
export const registerUserLocal = (userData) => (dispatch) => {
  const users = readUsers();
  const exists = users.some(
    (u) => u.email.toLowerCase() === userData.email.toLowerCase()
  );
  if (exists) {
    throw new Error("Email already registered.");
  }

  // new user object
  const newUser = {
    firstName: userData.firstName.trim(),
    lastName: userData.lastName.trim(),
    birthDate: userData.birthDate,
    email: userData.email.trim(),
    password: userData.password,
  };

  writeUsers([...users, newUser]); //salva la nuova lista utenti

  //Aggiorna stato Redux con l'ultimo utente registrato
  dispatch({
    type: REGISTER_USER,
    payload: {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    },
  });
  return { ok: true, user: newUser };
};

//Login
export const loginUserLocal =
  ({ email, password }) =>
  (dispatch) => {
    const users = readUsers();
    const found = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) {
      throw new Error("Incorrect credentials");
    }

    const token = getToken();
    const auth = {
      token,
      user: {
        id: found.email,
        firstName: found.firstName,
        lastName: found.lastName,
        birthDate: found.birthDate,
        email: found.email,
      },
    };
    writeAuth(auth); //salva dati di autenticazione nel localStorage
    dispatch({
      type: LOGIN_USER,
      payload: { token: auth.token, user: auth.user },
    });
    return { ok: true };
  };

//Logout
export const logoutUser = () => (dispatch) => {
  removeAuth();
  dispatch({ type: LOGOUT_USER });
};
