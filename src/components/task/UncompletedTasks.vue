<template>
    <div>
        <h1 class="page-title">Невыполненные задачи</h1>
        <TaskList :tasks="uncompletedTasks" />
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
            uncompletedTasks: 'task/uncompletedTasks'
        })
    },

    methods: {
        ...mapActions({
            fetchTasks: 'task/fetchTasks'
        })
    }
}
</script>