const endpoint = 'http://localhost:3000';

let app = new Vue({
    el: '#app',
    data: {
      addNew:'test',
      seen: true,
      emailLogin: null,
      passwordLogin: null,
      emailRegister: null,
      passwordRegister: null,
      passwordConfirmRegister: null,
      titleAdd: null,
      descriptionAdd: null,
      page: null,
      tasks: []
    },
    created(){
        if(localStorage.getItem('token')) {
            this.showData()
            this.page = 'main'
        }else{
            this.page = 'login'
        }
    },
    watch: {

    },
    methods: {
        registerPage(){
            this.page = 'register';
        },

        register(){
            console.log(this.passwordRegister)
            if(this.passwordRegister === this.passwordConfirmRegister){
                axios({
                    method: 'post',
                    url: `${endpoint}/users/register`,
                    data: {
                        email: this.emailRegister,
                        password: this.passwordRegister
                    }
                })
                    .then(res=>{
                        localStorage.setItem('token', res.data);
                        this.page = 'main';
                    })
            }
        },

        loginPage(){
            this.page = 'login';
        },

        login(){
            axios({
                method: 'post',
                url: `${endpoint}/users/login`,
                data: {
                    email: this.emailLogin,
                    password: this.passwordLogin
                }
                })
                    .then(res=>{
                        localStorage.setItem('token', res.data);
                        this.page = 'main';
                    })
        },

        logout(){
            localStorage.removeItem('token');
            this.page = 'login';
        },

        showData(){
            axios({
                method: 'get',
                url: `${endpoint}/task`,
                headers: {token: localStorage.getItem('token')}
            })
                .then(res=>{
                    this.tasks = res.data
                })
        },

        addData() {
            axios({
                method: 'post',
                url: `${endpoint}/task`,
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
        },

        deleteData(id) {
            console.log(id)
            axios({
                method: 'delete',
                url: `${endpoint}/task/${id}`,
                headers: {token: localStorage.getItem('token')}
            })
                .then(res=>{
                    this.showData()
                })
        }
    }
  })