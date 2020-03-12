<template>
    <div class="container" style="text-align: center;">
            <div v-if="dataPage === 'login'">
                <h1>Login</h1>
                <div class="d-flex flex-row bd-highlight mb-3 justify-content-center">
                    <div class="card h-auto m-2 bg-dark" style="opacity: 85%;">
                        <div class="card-body">
                            <form v-on:submit.prevent="login">
                                <div class="form-group">
                                <label class="text-light" for="exampleInputEmail1">Email address</label>
                                <input v-model="emailLogin" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                                </div>
                                <div class="form-group">
                                <label class="text-light" for="exampleInputPassword1">Password</label>
                                <input v-model="passwordLogin" type="password" class="form-control" id="exampleInputPassword1">
                                </div>
                                <button type="submit" class="btn btn-success">Login</button>
                                <button @click="registerPage" type="submit" class="btn btn-primary">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
</template>
<script>
import axios from 'axios';
export default {
    props: ['dataPage'],
    data(){
        return{
            emailLogin: null,
            passwordLogin: null,
            endpoint: 'http://localhost:3000'
        }
    },
    methods: {
        registerPage(){
            this.$emit('registerPage', 'register');
        },

        login(){
            axios({
                method: 'post',
                url: `${this.endpoint}/users/login`,
                data: {
                    email: this.emailLogin,
                    password: this.passwordLogin
                }
                })
                    .then(res=>{
                        localStorage.setItem('token', res.data);
                        this.$emit('loginSuccess', 'main')
                    })
        }
    }
}
</script>