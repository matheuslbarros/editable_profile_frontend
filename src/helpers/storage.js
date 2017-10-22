
const storage = {
    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    get: (key, value) => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : value;
    },
    remove: (key) => {
        localStorage.removeItem(key);
    }
};

export default storage;