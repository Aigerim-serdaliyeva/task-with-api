<template>
    <div>
        <h1 class="page-title">Редактирование задачи</h1>
        <TaskForm
            v-if="selectedTask"
            :initialTitle="selectedTask.title"
            :initialText="selectedTask.text"
            :initialDuration="selectedTask.duration"
            @onSave="onEditTask"
        />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TaskForm from './TaskForm.vue';

export default {
    components: { TaskForm },

    mounted() {
        this.fetchTask(this.id)
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
            editTask: 'task/editTask'
        }),
        onEditTask(task) {
            task.id = this.selectedTask.id
            this.editTask(task)
                .then(() => this.$router.push('/tasks'))
        }
    }
}
</script>