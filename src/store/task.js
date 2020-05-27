import axios from 'axios'

const SET_TASKS = 'SET_TASKS'
const SET_TASK = 'SET_TASK'

export const task = {
    namespaced: true,

    state: {
        tasks: [],
        selectedTask: null
    },

    getters: {
        allTasks: ({ tasks }) => tasks,
        completedTasks: ({ tasks }) => tasks.filter((t) => t.status === 1),
        uncompletedTasks: ({ tasks }) => tasks.filter((t) => t.status === 0),
        selectedTask: ({ selectedTask }) => selectedTask
    },

    mutations: {
        [SET_TASKS](state, tasks) {
            state.tasks = tasks
        },
        [SET_TASK](state, task) {
            state.selectedTask = task
        }
    },

    actions: {
        async fetchTasks({commit}) {
            // /* eslint-disable no-debugger */
            // debugger
            try {
                const tasks = await axios.get('/tasks')
                commit(SET_TASKS, tasks)
            } catch(err) {
                throw new Error(err.response.data.message)
            }
        },

        async addTask(context, data) {
            try {
                await axios.post('/tasks', data)
            } catch(err) {
                throw new Error(err.response.data.message)
            }
        },

        async fetchTask({ commit }, id) {
            try {
                const task = await axios.get(`/tasks/${id}`)
                commit(SET_TASK, task)
            } catch(err) {
                throw new Error(err.response.data.message)
            }
        },

        async changeStatus(context, task) {
            try {
                await axios.put(`/tasks/${task.id}/status`, { status: task.status })
            } catch(err) {
                throw new Error(err.response.data.message)
            }
        },

        async editTask({ commit }, task) {
            try {
                await axios.put(`/tasks/${task.id}`, task)
                commit(SET_TASK, task)
            } catch(err) {
                throw new Error(err.response.data.message)
            }
        },

        async deleteTask(context, id) {
            try {
                await axios.delete(`/tasks/${id}`)
            } catch(err) {
                throw new Error(err.response.data.message)
            }
        }
    }
}