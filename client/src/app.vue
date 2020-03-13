<template>
    <div>
        <!-- Login -->
        <Login :dataPage="page" @loginSuccess="loginSuccess" @registerPage="registerPage"></Login>

        <!-- Register -->
        <Register :dataPage="page" @registerSuccess="registerSuccess" @loginPage="loginPage"></Register>

        <!-- Modal -->
        <ModalAdd :showData="showData"></ModalAdd>

        <!-- Main Page -->
        <div v-if="page === 'main'">
            <div class="d-flex flex-row bd-highlight mb-3 justify-content-between bg-dark">
                <div class="m-1 flex-grow-1 text-center">
                    <h1 class="text-light" style="font-family: monospace;">KanBun</h1>
                </div>
                <div class="p-2 m-1 bd-highlight">
                    <b-button v-b-modal.modal-1 class="btn btn-success">+ Add</b-button>
                </div>
                <div class="p-2 m-1 bd-highlight">
                    <button @click="logout" class="btn btn-danger">Logout</button>
                </div>
            </div>
        </div>

        <div v-if="page === 'main'" class="container">
            <div class="d-flex flex-row bd-highlight mb-3 justify-content-center">
                <div v-for="category in categories" :key="category.index" :class= category.class style="height: 100%;">   
                    <h5 class="p-2">{{category.name}}<hr></h5>
                
                    <div v-for="task in tasks" :key="task.id">
                        <Card :task="task" :showData="showData" :category="category.card"></Card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Login from './components/login.vue';
import Card from './components/card';
import Register from './components/register.vue';
import ModalAdd from './components/modalAdd.vue';

export default {
    components:{
        Login,
        Card,
        Register,
        ModalAdd
    },
    data() {
      return {
        addNew:'test',
        addState: null,
        titleAdd: null,
        descriptionAdd: null,
        page: null,
        tasks: [],
        endpoint: 'https://damp-oasis-32768.herokuapp.com',
        tasks: [],
        categories: [
            {
            name: 'Backlog',
            card: 'backlog',
            class: 'p-2 col-3 m-2 bg-primary text-center rounded' 
            },
            {
            name: 'Todo',
            card: 'todo',
            class: 'p-2 col-3 m-2 bg-warning text-center rounded' 
            },
            {
            name: 'Done',
            card: 'done',
            class: 'p-2 col-3 m-2 bg-danger text-center rounded' 
            },
            {
            name: 'Completed',
            card: 'complete',
            class: 'p-2 col-3 m-2 bg-success text-center rounded' 
            },
        ]
        }
    },
    created(){
        if(localStorage.getItem('token')) {
            this.showData()
            this.page = 'main'
        }else{
            this.page = 'login'
        }
    },

    methods: {
        loginSuccess(payload){
            this.page = payload;
            this.showData();
        },

        registerPage(payload){
            this.page = payload;
        },

        loginPage(payload){
            this.page = payload;
        },

        registerSuccess(payload){
            this.page = payload;
        },

        logout(){
            localStorage.removeItem('token');
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
            console.log('User signed out.');
            });
            this.page = 'login';
        },

        showData(){
            axios({
                method: 'get',
                url: `${this.endpoint}/tasks`,
                headers: {token: localStorage.getItem('token')}
            })
                .then(res=>{
                    this.tasks = [];

                    res.data.forEach(task => {
                        this.tasks.push(task)
                    });
                })
        }
    }
}
</script>