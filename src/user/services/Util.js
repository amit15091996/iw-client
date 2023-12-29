export const saveInLocalStorage = (localStorageKey, data) => {
    localStorage.setItem(localStorageKey, btoa(data));
}

export const getFromLocalStorage = (localStorageKey) => {
    const data = localStorage.getItem(localStorageKey);
    return data ? atob(data) : '{}';
}

export const isAdmin = () => {
    let loggedInUserData = getFromLocalStorage('userInfo');
    // console.log("loggedInUserData", loggedInUserData);
    let userJson = JSON.parse(loggedInUserData);
    let roles = [];
    roles = userJson.userRoles;
    if (roles.includes("ADMIN_ROLE")) {
        console.log("---- Admin role ----");
        return true;
    }
    console.log("---- Normal role ----");
    return false;
}