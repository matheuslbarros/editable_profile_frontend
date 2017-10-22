import axios from 'axios';
import storage from './helpers/storage';
import { serverUrl } from './config';

const AuthorizationToken = storage.get('token');

axios.defaults.baseURL = serverUrl;

if (AuthorizationToken) {
    axios.defaults.headers.common['Authorization'] = AuthorizationToken;
}

const getFormData = (data) => {
    var form = new FormData();
    var value = null;

    for (var key in data) {
        value = data[key];
        
        if (value instanceof Object && value.constructor === {}.constructor) {
            value = JSON.stringify(value);
        }

        form.append(key, value);
    }

    return form;
};

export const auth = {
    signIn: (data) => {
        return axios.post('/api/auth/signin', data).then((response) => response.data);
    },
    signUp: (data) => {
        return axios.post('/api/auth/signup', getFormData(data)).then((response) => response.data);
    }
};

export const profile = {
    get: () => {
        return axios.get('/api/profile').then((response) => response.data);
    },
    update: (data) => {
        return axios.put('/api/profile', getFormData(data)).then((response) => response.data);
    }
};

export const cities = {
    findAll: () => {
        return axios.get('/api/cities').then((response) => response.data);
    }
};

export const singleChoiceAttributes = {
    findAll: () => {
        return axios.get('/api/single_choice_attributes').then((response) => response.data);
    }
};
