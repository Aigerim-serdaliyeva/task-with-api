<template>
    <div>
        <div class="form-title">Добавление задачи</div>
        <TaskForm />
    </div>
</template>

<script>
import TaskForm from './TaskForm.vue'

export default {
    components: { TaskForm }
}
</script>