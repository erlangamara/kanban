<template>
    <div class="container" style="text-align: center;">
        <div v-if="dataPage === 'register'">
            <h1 style="font-family: monospace; font-size: 8vw">KanBun</h1>
            <h3>Register</h3>
            <div class="d-flex flex-row bd-highlight mb-3 justify-content-center">
                <div class="card h-auto m-2 bg-dark" style="opacity: 85%;">
                    <div class="card-body">
                        <form v-on:submit.prevent="register">
                            <div class="form-group">
                                <label class="text-light" for="exampleInputEmail1">Email address</label>
                                <input v-model="emailRegister" type="email" class="form-control" aria-describedby="emailHelp">
                            </div>
                            <div class="form-group">
                                <label class="text-light" for="exampleInputPassword1">Password</label>
                                <input v-model="passwordRegister" type="password" class="form-control">
                            </div>
                            <div class="form-group">
                                <label class="text-light" for="exampleInputPassword1">Confirm Password</label>
                                <input v-model="passwordConfirmRegister" type="password" class="form-control">
                            </div>
                            <button type="submit" class="btn btn-success">Register</button>
                            <button @click="loginPage" type="submit" class="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>            
    </div>
</template>
<script>
export default {
    props: ['dataPage'],
    data(){
        return {
            emailRegister: null,
            passwordRegister: null,
            passwordConfirmRegister: null,
            endpoint: 'https://damp-oasis-32768.herokuapp.com'
        }
    },
    methods: {
        loginPage(){
            this.$emit('loginPage', 'login');
            this.emailRegister = null;
            this.passwordRegister = null;
            this.passwordConfirmRegister = null;
        },

         register(){
            if(this.passwordRegister === this.passwordConfirmRegister){
                axios({
                    method: 'post',
                    url: `${this.endpoint}/users/register`,
                    data: {
                        email: this.emailRegister,
                        password: this.passwordRegister
                    }
                })
                    .then(res=>{
                        localStorage.setItem('token', res.data);
                        this.$emit('registerSuccess', 'main');
                        this.emailRegister = null;
                        this.passwordRegister = null;
                        this.passwordConfirmRegister = null;
                    })
            }
        } 
    }
}
</script>