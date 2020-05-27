<template>
    <div>
        <div class="form-title">Добавление задачи</div>
        <TaskForm @onSave="onAddTask" />
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import TaskForm from './TaskForm.vue'

export default {
    components: { TaskForm },
    methods: {
        ...mapActions({
            addTask: 'task/addTask'
        }),
        onAddTask(task) {
            this.addTask(task)
                .then(() => this.$router.push('/tasks'))                
        }
    }
}
</script>