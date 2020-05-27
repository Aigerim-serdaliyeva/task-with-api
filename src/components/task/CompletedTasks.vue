<template>
    <div>
        <h1 class="page-title">Выполненные задачи</h1>
        <TaskList :tasks="completedTasks" />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TaskList from './TaskList.vue'

export default {
    components: { TaskList },
    mounted() {
        this.fetchTasks()
    },
    computed: {
        ...mapGetters({
            completedTasks: 'task/completedTasks'
        })
    },
    methods: {
        ...mapActions({
            fetchTasks: 'task/fetchTasks'
        })
    }
}
</script>