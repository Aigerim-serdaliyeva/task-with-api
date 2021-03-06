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
            if(accessToken === "undefined" || !accessToken) {
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
            try {
                const token = await axios.post("/auth/login", credentials);
    
                sessionStorage.setItem('access_token', token);
    
                commit(LOGIN_SUCCESS, token);
            } catch (err) {
                throw new Error(err.response.data.message)
            }
        },

        async register( context, credentials ) {
            try {
                await axios.post("/auth/register", credentials);
            } catch (err) {
                throw new Error(err.response.data.message)
            }
        },

        async logout({ commit }) {
            commit(LOGOUT)
            sessionStorage.removeItem("access_token")
        }
    }
}