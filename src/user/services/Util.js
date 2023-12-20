export const saveInLocalStorage = (localStorageKey, data) => {
    localStorage.setItem(localStorageKey, btoa(data));
}

export const getFromLocalStorage = (localStorageKey) => {
    const data = localStorage.getItem(localStorageKey);
    return data ? atob(data) : '{}';
}