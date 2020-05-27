<template>
    <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8 col-sm-10 col-12">
            <ValidationObserver ref="form">
                <form @submit.prevent="onSubmit" >
                    <ValidationProvider
                        rules="required"
                        v-slot="{ errors }"
                        class="form-group"
                        tag="div"
                    >
                        <label for="title">Заголовок</label>
                        <input 
                            type="text"
                            v-model="title"
                            placeholder="Заголовок"
                            class="form-control"
                            :class="{invalid: errors.length > 0}"
                            id="title"
                        >
                        <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <ValidationProvider
                        rules="required"
                        v-slot="{ errors }"
                        class="form-group"
                        tag="div"
                    >
                        <label for="text">Текст задачи</label>
                        <textarea
                            v-model="text"
                            type="text"
                            class="form-control"
                            placeholder="Текст задачи"
                            :class="{invalid: errors.length > 0}"
                            id="text"
                            rows="5"
                        />
                        <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>
                    
                    <ValidationProvider
                        rules="required"
                        v-slot="{ errors }"
                        class="form-group"
                        tag="div"
                    >
                        <label for="title">Срок выполнения (часы)</label>
                        <input 
                            type="number"
                            v-model="duration"
                            placeholder="Срок выполнения (часы)"
                            class="form-control"
                            :class="{invalid: errors.length > 0}"
                            id="title"
                        >
                        <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <button
                        type="submit"
                        class="btn btn-primary"
                    >
                        Сохранить
                    </button>
                </form>
            </ValidationObserver>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        initialTitle: {
            type: String,
            default: ''
        },
        initialText: {
            type: String,
            default: ''
        },
        initialDuration: {
            type: Number
        }
    },
    data() {
        return {
            title: this.initialTitle,
            text: this.initialText,
            duration: this.initialDuration
        }
    },

    methods: {
        onSubmit() {
            this.$refs.form.validate().then(success => {
                if(!success) {
                    return;
                }

                const data = {
                    title: this.title,
                    text: this.text,
                    duration: Number(this.duration)
                }

                this.$emit('onSave', data);

                this.title = this.text = this.duration = '';

                this.$nextTick(() => {
                    if(this.$refs.form) {
                        this.$refs.form.reset();
                    }
                })
            })
        }
    }
}
</script>