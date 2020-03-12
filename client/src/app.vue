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
                    <h3 class="p-2" style="color: burlywood;">Kanbun</h3>
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
                <div class="p-2 col-3 m-2 bg-primary text-center rounded" style="height: 100%;">
                    <div class="bg-primary text-center rounded">
                        <h5 class="p-2">Backlog<hr></h5>
                    </div>
                    <div v-for="task in backlog" :key="task.id">
                        <Card :task="task" :showData="showData"></Card>
                    </div>
                </div>
                <div class="p-2 col-3 m-2 bg-warning text-center rounded" style="height: 100%;">
                    <div class="bg-warning text-center rounded">
                        <h5 class="p-2">Todo<hr></h5>
                    </div>
                    <div v-for="task in todo" :key="task.id">
                        <Card :task="task" :showData="showData"></Card>
                    </div>
                </div>
                <div class="p-2 col-3 m-2 bg-danger text-center rounded" style="height: 100%;">
                    <div class=" bg-danger text-center rounded">
                        <h5 class="p-2">Done<hr></h5>
                    </div>
                    <div v-for="task in done" :key="task.id">
                        <Card :task="task" :showData="showData"></Card>
                    </div>
                </div>
                <div class="p-2 col-3 m-2 bg-success text-center rounded" style="height: 100%;">
                    <div class="bg-success text-center rounded">
                        <h5 class="p-2">Complete<hr></h5>
                    </div>
                    <div v-for="task in complete" :key="task.id">
                        <Card :task="task" :showData="showData"></Card>
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
        backlog: [],
        todo: [],
        done: [],
        complete: [],
        endpoint: 'http://localhost:3000',
        tasks: []}
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
            this.page = 'login';
        },

        showData(){
            axios({
                method: 'get',
                url: `${this.endpoint}/tasks`,
                headers: {token: localStorage.getItem('token')}
            })
                .then(res=>{
                    this.backlog = [];
                    this.todo = [];
                    this.done = [];
                    this.complete= [];

                    res.data.forEach(task => {

                        if(task.category === 'backlog'){
                            this.backlog.push(task)
                        }else if(task.category === 'todo'){
                            this.todo.push(task)
                        }else if(task.category === 'done'){
                            this.done.push(task)
                        }else{
                            this.complete.push(task)
                        }
                    });
                })
        }
    }
}
</script>