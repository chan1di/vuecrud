<template>
  <div id="container" class="container">
    <div class="row">
      <div class="col-sm-8 offset-sm-2">
        <div class="alert alert-warning" v-show="showError" >
          <button type="button" class="close" @click="hideMessage()">X</button>
          <strong>Error!</strong>
        </div>
        <h1>Create a Todo</h1>
        <div class="info-form">
          <form v-on:submit.prevent="createTodo" style="margin-bottom: 20px;">
            <div class="form-group">
              <label for="name">Todo name</label>
              <input v-model="name" type="text" class="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter Name">
              <small id="nameHelp" class="form-text text-muted">Enter your todo's name</small>
            </div>
            <button class="btn btn-primary" v-if="this.isEdit==false" type="submit"><span>Create</span></button>
          <button class="btn btn-primary" v-else @click="updateTodo()" type="button"><span>Update</span></button>
          </form>
          
        </div>
        <table class="table">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(todo, index) in todos" v-bind:key="todo.id">
        <td>{{index}}</td>
        <td>{{todo.name}}</td>
        <td><button class="btn btn-primary"  @click="editTodo(todo._id,todo.name)" ><span>Edit</span></button></td>
        <td><button class="btn btn-primary"  @click="deleteTodo(todo._id)" ><span>Delete</span></button></td>
      </tr>
    </tbody>
  </table>
      </div>
    </div>
  </div>
</template>
<script>

  // import { APIService } from '../APIService';
  import axios from 'axios';


// const apiService = new APIService();

export default {

  name: 'CreateTodo',

  components: {},

  data() {
    return {
      showError: false,
      name: null,
      todos: null,
      testing: null,
      isEdit: false,
      id: ''
    };

  },
  methods: {
    getTodo(){
      axios.get('http://localhost:3000/api/todos')
      .then(response => (this.todos = response.data))
    },
    createTodo() {
      axios
        .post('http://localhost:3000/api/createTodo',{
          name: this.name
         })
        .then(response => (
          this.name = null,
          this.getTodo()
        ))
        .catch(error => console.log(error))
    },
    editTodo(id,name){
      this.id = id
      this.name = name
      this.isEdit = true
    },
    updateTodo(){
      axios.put('http://localhost:3000/api/updateTodo/'+this.id,{
        name: this.name
      })
      .then(response => (
        this.name = null,
        this.isEdit = false,
        this.getTodo()
      ))
    },   
    deleteTodo(id){
      axios.get('http://localhost:3000/api/deleteTodos/'+id)
      .then(response => (this.getTodo()))
    }
  },
  mounted() {
   this.getTodo()
  },
} 
</script> 
<style scoped >
  .aform {
    margin-left: auto;
    width: 60%;
  } 
  </style>