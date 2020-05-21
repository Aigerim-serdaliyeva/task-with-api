import Vue from 'vue'
import VueRouter from 'vue-router'

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
            component: () => import('../components/task/AllTasks.vue')
        }


    ]
}) 