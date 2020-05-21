<template>
    <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8 col-sm-10 col-12">
            <ValidationObserver ref="form">
                <div class="form-title">Авторизация</div>
                <form @submit.prevent="onSubmit" >
                    <ValidationProvider
                        rules="required"
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
                    
                    <button
                        type="submit"
                        class="btn btn--center btn-primary"
                    >
                        Войти
                    </button>
                </form>
            </ValidationObserver>
        </div>

        <div class="col-md-8" v-if="errorMessage">
            <div class="alert alert-danger" role="alert">
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
            errorMessage: ''
        }
    },

    methods: {
        ...mapActions({
            authorizeUser: "auth/login"
        }),
        
        onSubmit() {
            this.$refs.form.validate().then(success => {
                if(!success) {
                    return 
                }

                const user = {
                    login: this.login,
                    password: this.password
                }

                    this.authorizeUser(user)
                    .then(() => this.$router.push("/tasks"))
                    .catch((e) => this.errorMessage = e.message)

                this.login = this.password = this.errorMessage = '';
                
                this.$nextTick(() => {
                    this.$refs.form.reset();
                })
            })
        }
    }
}
</script>