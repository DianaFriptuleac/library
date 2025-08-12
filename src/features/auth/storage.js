export const read = (key, fallback = null) => {
    try{
        const v = localStorage.getItem(key);
        return v ? JSON.parse(v) : fallback;
    } catch{
        return fallback;
    }
}

export const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
export const remove = (key) => localStorage.removeItem(key);

export const readUsers = () => read("users", []);
export const writeUsers = (users) => write("users", users);

export const readAuth = () => read("auth", null);
export const writeAuth = (auth) => write("auth", auth);
export const removeAuth = () => remove("auth");

export const getToken = () => 
(crypto?.randomUUID?.() || Math.random().toString(36).slice(2));