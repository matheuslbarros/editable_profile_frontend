import storage from '../helpers/storage';

const defaultState = {
    redirectTo: null,
    token: null,
    profile: null,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'LOAD':
            return {
                ...state,
                token: storage.get('token'),
                profile: storage.get('profile'),
            };
        case 'REDIRECT_TO':
            return {
                ...state,
                redirectTo: action.redirectTo,
            };
        case 'REDIRECT':
            return {
                ...state,
                redirectTo: null
            };
        case 'LOGIN':
            storage.set('token', action.payload.token);
            storage.set('profile', action.payload.profile);

            return {
                redirectTo: '/',
                token: action.payload.token,
                profile: action.payload.profile,
            };
        case 'LOGOUT':
            storage.remove('token');
            storage.remove('profile');

            return {
                redirectTo: '/',
                token: null,
                profile: null,
            };
        default: return state
    }
};
