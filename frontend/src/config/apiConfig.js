
/*export const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8543';*/

export const API_ENDPOINTS = {
    USER_LOGIN: '/user/login',
    USER_REGISTER: '/user/register',
    USER_LOGOUT: '/user/logout',
    USER_SESSION_CHECK: '/user/check',
    USER_MAIN: '/user/:userId',
    USER_BIO: '/user/bio/:userId',
    GET_MAPBOX_ACCESS_TOKEN: '/getMapboxAccessToken',
    USER_ROUTE: '/route/get/:userId',
    SAVE_ROUTE: '/route/insert/:userId',
    UPDATE_ROUTE: '/route/update/:userId',
    DELETE_ROUTE: '/route/delete/:userId',
    DETAIL_ROUTE: '/route/details/:routeId',
};
