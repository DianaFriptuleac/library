// Funzioni generiche
//1. Read nel localStorage
export const read = (key, fallback = null) => {
    try{
        const v = localStorage.getItem(key);
        return v ? JSON.parse(v) : fallback;  //torna il valore o fallback
    } catch{
        return fallback;
    }
}
//2. Scrivere nel localStorage
export const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
//3. Remove dal localStorage
export const remove = (key) => localStorage.removeItem(key);

//Funzione x users
export const readUsers = () => read("users", []);
export const writeUsers = (users) => write("users", users);

// Funzione x autenticazione
export const readAuth = () => read("auth", null);
export const writeAuth = (auth) => write("auth", auth);
export const removeAuth = () => remove("auth");

//Genera fake token
export const getToken = () => 
(crypto?.randomUUID?.() || Math.random().toString(36).slice(2));  //nr. + lettere casuali
//crypto - oggetto globale del Web Crypto API