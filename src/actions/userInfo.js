export const SAVE_USER_INFO = "SAVE_USER_INFO"

export const saveUserInfo = user => {
    console.log(user);
    return {
        type: SAVE_USER_INFO,
        user,
    }
};