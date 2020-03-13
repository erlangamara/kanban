<template>
    <div v-if="task.category === category">
        <!-- Card Modal -->
        <b-modal
        id="modal-2"
        ref="modal"
        title="View task"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
        >
            <form ref="form" @submit.stop.prevent="editData">
                <b-form-group
                :state="editState"
                label="Title"
                label-for="title-input"
                invalid-feedback="Title is required"
                >
                    <b-form-input
                        id="title-input"
                        v-model= "title"
                        :state="editState"
                        required
                    >
                    </b-form-input>
                </b-form-group>
                <b-form-group
                :state="editState"
                label="Description"
                label-for="description-input"
                invalid-feedback="Description is required"
                >
                    <b-form-input
                        id="description-input"
                        v-model= 'description'
                        :state="editState"
                        required
                    >
                    </b-form-input>
                </b-form-group>
            </form>
        </b-modal>


        
        <div class="bg-white card-body rounded m-2">
            <div class="card-body">
                <h5 class="card-title">{{ task.title }}</h5>
                <p class="card-text">{{ task.description }}</p>
                <button v-b-modal.modal-2 class="btn btn-info">View</button>
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
            endpoint: 'https://damp-oasis-32768.herokuapp.com',
            editState: null,
            title: this.task.title,
            description: this.task.description,
            id: this.task.id,
            
        }
    },
    methods: {
        checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.editState = valid
        return valid
        },
        resetModal() {
        this.titleAdd = ''
        this.descriptionAdd = ''
        this.editState = null
        },
        handleOk(bvModalEvt) {

        bvModalEvt.preventDefault()
      
        this.editData()
        },

        editData(){
            if (!this.checkFormValidity()) {
                return
            }

            axios({
                method: 'put',
                url: `${this.endpoint}/tasks/${this.id}`,
                headers: {token: localStorage.getItem('token')},
                data: {
                    title: this.title,
                    description: this.description
                }
            })
                .then(res=>{
                    this.showData();
                })

            this.$nextTick(() => {
                this.$bvModal.hide('modal-2')
            })
        },

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