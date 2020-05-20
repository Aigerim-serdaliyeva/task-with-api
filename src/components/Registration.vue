<template>
    <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8 col-sm-10 col-12">
            <ValidationObserver ref="form">
                <div class="form-title">Регистрация</div>
                <form @submit.prevent="onSubmit" >
                    <ValidationProvider
                        rules="required|startLatin|login"
                        v-slot="{ errors }"
                        class="form-group"
                        tag="div"
                    >
                        <input 
                            type="text"
                            v-model="login"
                            placeholder="Логин"
                            class="form-control"
                            :class="{invalid: errors.length > 0}"
                        >
                        <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <ValidationProvider
                        rules="required"
                        v-slot="{ errors }"
                        vid="confirmation"
                        class="form-group"
                        tag="div"
                    >
                        <input 
                            type="password"
                            v-model="password"
                            placeholder="Пароль"
                            class="form-control"
                            :class="{invalid: errors.length > 0}"
                        >
                        <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <ValidationProvider
                        rules="required|confirmed:confirmation"
                        v-slot="{ errors }"
                        class="form-group"
                        tag="div"
                    >
                        <input 
                            type="password"
                            v-model="confirm"
                            placeholder="Повторите пароль"
                            class="form-control"
                            :class="{invalid: errors.length > 0}"
                        >
                        <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <button
                        type="submit"
                        class="btn btn--center btn-primary"
                    >
                        Зарегистрироваться
                    </button>
                </form>
            </ValidationObserver>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            login: '',
            password: '',
            confirm: ''
        }
    },

    methods: {
        onSubmit() {
            this.$refs.form.validate().then(success => {
                if(!success) {
                    return;
                }

                this.login = this.password = this.confirm = '';

                this.$nextTick(() => {
                    this.$refs.form.reset();
                })
            })
        }
    }
}
</script>