import Vue from 'vue'
import VueRouter from 'vue-router'

import { store } from '../store'

Vue.use(VueRouter)

export const router = new VueRouter({
    linkActiveClass: "active",
    mode: 'history',
    scrollBehavior() {
        return { x: 0, y: 0 }
    },
    routes: [
        {
            path: '/registration',
            name: 'registration',
            component: () => import('../components/Registration.vue')
        },

        {
            path: '/login',
            name: 'login',
            component: () => import('../components/Login.vue')
        },

        {
            path: '/',
            redirect: '/tasks'
        },

        {
            path: '/tasks',
            name: 'tasks',
            meta: {isTaskPage: true},
            component: () => import('../components/task/AllTasks.vue')
        },

        {
            path: '/tasks/add',
            name: 'add',
            component: () => import('../components/task/TaskAdd.vue')
        },

        {
            path: '/tasks/completed',
            name: 'completed',
            meta: { isTaskPage: true },
            component: () => import('../components/task/CompletedTasks.vue')
        },

        {
            path: '/tasks/uncompleted',
            name: 'uncompleted',
            meta: { isTaskPage: true },
            component: () => import('../components/task/UncompletedTasks.vue')
        },

        {
            path: '/tasks/details/:id',
            name: 'details',
            meta: {isTaskPage: true},
            component: () => import('../components/task/TaskDetails.vue')
        },

        {
            path: '/tasks/edit/:id',
            name: 'edit',
            component: () => import('../components/task/TaskEdit.vue')
        }


    ]
}) 

router.beforeEach((to, from, next) => {
    const accessToken = store.getters["auth/accessToken"];
    if (
        to.name === 'login' || 
        to.name === 'registration'
    ) {
        return accessToken ? next('/') : next();
    }
    return accessToken ? next() : next('/login')
})