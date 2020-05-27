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

            <div class="alert alert-success" role="alert" v-if="isSuccess">
                Пользователь добавлен. Перейдите по 
                <router-link to="/login" class="alert-link">ссылке</router-link> 
                чтобы авторизоваться.
            </div>

            <div class="alert alert-danger" role="alert" v-if="errorMessage"> 
                {{ errorMessage }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            login: '',
            password: '',
            confirm: '',
            errorMessage: '',
            isSuccess: false
        }
    },

    methods: {
        ...mapActions({
            register: 'auth/register'
        }),

        onSubmit() {
            this.$refs.form.validate().then(success => {
                if(!success) {
                    return;
                }

                const user = {
                    login: this.login,
                    password: this.password
                }

                this.register(user)
                    .then(() => this.isSuccess = true)
                    .catch((e) => this.errorMessage = e.message)

                this.login = this.password = this.confirm = this.errorMessage = '';

                this.$nextTick(() => {
                    this.$refs.form.reset();
                })
            })
        }
    }
}
</script>