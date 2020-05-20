<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand" href="/">Todo</a>

                <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">

                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" :class="{ active: isTaskPage }" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Задачи
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <router-link to="/tasks" exact class="dropdown-item">Все задачи</router-link>
                                <router-link to="/tasks/completed" exact class="dropdown-item">Выполненные задачи</router-link>
                                <router-link to="/tasks/uncompleted" exact class="dropdown-item">Невыполненные задачи</router-link>
                            </div>
                        </li>

                        <router-link
                            to="/tasks/add"
                            v-slot="{ href, route, navigate, isExactActive }"
                        >
                            <li
                                :class="[isExactActive && 'active']"
                                class="nav-item"
                            >
                                <a :href="href" @click="navigate" class="nav-link">Добавить задачу</a>
                            </li>
                        </router-link>
                    </ul>

                    <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                        <router-link
                            to="/login"
                            v-slot="{ href, route, navigate, isExactActive }"
                        >
                            <li
                                :class="[isExactActive && 'active']"
                                class="nav-item"
                            >
                                <a :href="href" @click="navigate" class="nav-link">Логин</a>
                            </li>
                        </router-link>

                        <router-link
                            to="/registration"
                            v-slot="{ href, route, navigate, isExactActive }"
                        >
                            <li
                                :class="[isExactActive && 'active']"
                                class="nav-item"
                            >
                                <a :href="href" @click="navigate" class="nav-link" >Регистрация</a>
                            </li>
                        </router-link>
                    </ul>

                    <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                        <li>
                            <a href="#" @click.prevent="logout" class="nav-link">Выйти</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    computed: {
        isTaskPage() {
            return this.$route.meta.isTaskPage
        }
    },

    methods: {
        ...mapActions({
            logout: "auth/logout"
        })
    }
}
</script>