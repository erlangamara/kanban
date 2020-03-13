<template>
    <b-modal
        id="modal-1"
        ref="modal"
        title="Create new task"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
        >
        <form ref="form" @submit.stop.prevent="createData">
            <b-form-group
            :state="addState"
            label="Title"
            label-for="name-input"
            invalid-feedback="Title is required"
            >
            <b-form-input
                id="name-input"
                v-model="titleAdd"
                :state="addState"
                required
            ></b-form-input>
            </b-form-group>
            <b-form-group
            :state="addState"
            label="Description"
            label-for="description-input"
            invalid-feedback="Description is required"
            >
            <b-form-input
                id="description-input"
                v-model="descriptionAdd"
                :state="addState"
                required
            ></b-form-input>
            </b-form-group>
        </form>
    </b-modal>
</template>
<script>
export default {
    props: ['showData'],
    data(){
        return {
            endpoint: 'https://damp-oasis-32768.herokuapp.com',
            addState: null,
            titleAdd: null,
            descriptionAdd: null
        }
    },
    methods: {
        checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.addState = valid
        return valid
        },
        resetModal() {
        this.titleAdd = ''
        this.descriptionAdd = ''
        this.addState = null
        },
        handleOk(bvModalEvt) {

        bvModalEvt.preventDefault()
      
        this.createData()
        },
        createData() {
  
        if (!this.checkFormValidity()) {
            return
        }
        
        axios({
                method: 'post',
                url: `${this.endpoint}/tasks`,
                headers: {token: localStorage.getItem('token')},
                data: {
                    title: this.titleAdd,
                    description: this.descriptionAdd,
                    category: 'backlog'
                }
            })
                .then(res=>{
                    this.page = 'main';
                    this.showData();
                })

      
        this.$nextTick(() => {
            this.$bvModal.hide('modal-1')
        })
        }
    }
}
</script>