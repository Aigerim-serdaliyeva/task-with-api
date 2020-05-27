<template>
    <div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/tasks">Задачи</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">{{ selectedTask && selectedTask.title }}</li>
            </ol>
        </nav>
        <h1 class="page-title">Просмотр задачи</h1>
        <div>
            <table class="table" v-if="selectedTask">
                <tbody>
                    <tr>
                        <th class="th" scope="row">Заголовок</th>
                        <td>{{ selectedTask.title }}</td>
                    </tr>
                    <tr>
                        <th class="th" scope="row">Текст задачи</th>
                        <td>{{ selectedTask.text }}</td>
                    </tr>
                    <tr>
                        <th class="th" scope="row">Срок выполнения</th>
                        <td>{{ selectedTask.duration }} ч.</td>
                    </tr>
                    <tr>
                        <th class="th" scope="row">Статус</th>
                        <td>
                            <select class="custom-select" id="status" v-model="taskStatus" @change="onChangeStatus" >
                                <option value="0">Не выполнено</option>
                                <option value="1">Выполнено</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="buttons">
                <router-link
                    :to="{ name: 'edit', params: { id: id } }"
                    class="btn btn-outline-primary"
                >
                    Редактировать
                </router-link>
                <button class="btn btn-outline-danger" @click="onDeleteTask">Удалить</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            taskStatus: 0
        }
    },
    mounted() {
        this.fetchTask(this.id)
        .then(() => this.taskStatus = this.selectedTask.status)
    },
    computed: {
        id() {
            return Number(this.$route.params.id)
        },
        ...mapGetters({
            selectedTask: 'task/selectedTask'
        })
    },
    methods: {
        ...mapActions({
            fetchTask: 'task/fetchTask',
            deleteTask: 'task/deleteTask',
            changeStatus: 'task/changeStatus'
        }),
        async onDeleteTask() {
            await this.deleteTask(this.id)
            this.$router.push('/tasks')
        },
        onChangeStatus() {
            this.changeStatus({id: this.id, status: Number(this.taskStatus) })
            .then(() => alert('Статус изменен'))
        }
    }
}
</script>