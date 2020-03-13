<template>
    <div v-if="task.category === category">
        <div class="bg-white card-body rounded m-2">
            <div class="card-body">
                <h5 class="card-title">{{ task.title }}</h5>
                <p class="card-text">{{ task.description }}</p>
                <button @click="deleteData(task.id)" class="btn btn-danger">Delete</button>
                <button @click="nextStep(task.id, task.category)" class="btn btn-success m-2">Next</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    props: ['task', 'showData', 'category'],
    data(){
        return {
            endpoint: 'https://damp-oasis-32768.herokuapp.com'
        }
    },
    methods: {
        deleteData(id) {
            axios({
                method: 'delete',
                url: `${this.endpoint}/tasks/${id}`,
                headers: {token: localStorage.getItem('token')}
            })
                .then(res=>{
                    this.showData();
                })
        },

        nextStep(id, category){
            let newCategory;

            if(category === 'backlog'){
                newCategory = 'todo'
            }else if(category === 'todo'){
                newCategory = 'done'
            }else if(category === 'done'){
                newCategory = 'complete'
            }else{
                this.deleteData(id)
            }
            
            axios({
                method: 'put',
                url: `${this.endpoint}/tasks/${id}`,
                headers: {token: localStorage.getItem('token')},
                data: {
                    category: newCategory
                }
            })
                .then(res=>{
                    this.showData();
                })


        }
    }
}
</script>