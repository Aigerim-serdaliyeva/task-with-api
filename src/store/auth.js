import axios from 'axios';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';

export const auth = {
    namespaced: true,

    state: {
        accessToken: sessionStorage.getItem('access_token')
    },

    getters: {
        accessToken: ({ accessToken }) => {
            if(accessToken === "undefined" || accessToken === null) {
                return false
            } else {
                return accessToken
            }
        }
    },

    mutations: {
        [LOGIN_SUCCESS](state, token) {
            state.accessToken = token
        },

        [LOGOUT](state) {
            state.accessToken = null
        }
    },

    actions: {
        async login({ commit }, credentials) {
            /* eslint-disable no-debugger */
            debugger
            const res = await axios.post("http://localhost:3003/auth/login", credentials);
            const token = await res.data;

            sessionStorage.setItem('access_token', token);

            commit(LOGIN_SUCCESS, token);
        },

        async logout({ commit }) {
            commit(LOGOUT)
            sessionStorage.removeItem("access_token")
        }
    }
}