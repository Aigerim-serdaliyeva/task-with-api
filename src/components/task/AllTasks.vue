<template>
    <div>
        <h1 class="page-title">Все задачи</h1>
        <TaskList :tasks="allTasks" />
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
            allTasks: 'task/allTasks'
        })
    },

    methods: {
        ...mapActions({
            fetchTasks: "task/fetchTasks"
        })
    }
}
</script>