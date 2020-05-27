import axios from "axios";
import { store } from "../store";
import { router } from "../router";

axios.defaults.baseURL =
    process.env.NODE_ENV === "production"
        ? "http://localhost:3003"
        : "http://localhost:3003";

axios.interceptors.request.use(config => {
    const accessToken = store.getters["auth/accessToken"];

    config.headers["Content-type"] = "application/json";

    if (accessToken) {
        config.headers.Authorization = "Bearer " + accessToken;
        config.headers.Accept = "application/json";
    } else {
        config.headers.Authorization = null;
    }

    return config;
});

axios.interceptors.response.use(
    res => res.data,
    err => {
        if (401 === err.response.status ) {
            store.dispatch("auth/logout", true);
            router.push('/login')
        }
        return Promise.reject(err)
    }
);
