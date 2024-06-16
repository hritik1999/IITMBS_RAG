/* eslint-disable vue/multi-word-component-names */
<script>

export default {
  name: 'chatBot',
  data() {
    return {
      question: '',
      answer: '',
      loading: false,
      expanded:[]
    };
  },
  methods: {
    async query() {
      this.answer = '';
      this.loading = true;
  const res = await fetch('http://127.0.0.1:5001/api/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      question: this.question
    })
  });
  const data = await res.json();
  this.loading = false;
  this.answer = data;
},
toggleExpanded(index) {
  this.expanded.splice(index, 1, !this.expanded[index]);
}
  },

}


</script>

<template>
    <div class="text-center text-white bg-dark" style="padding: 10px 10px 10px 10px;">
      <h1 class="">Q&A with IITM Bs Degree Progamme!</h1>
    </div>
    <br><br>
    <div class="info">
      <p class="text-center">This application is made for BS Degree students to ask questions about the IITM BS Degree Programme. 
        You can ask it about anything you want to know about the programme. For example when is quiz 1 / oppe1 for java?, What is the grading pattern for PDSA? , How many subjects to clear Diploma in Programming? What is Paradox? etc.  </p>
    </div>
    <br>
    <div class="form text-center">
      <form @submit.prevent="query">
          <input type="text" class="form-control input" id="question" v-model="question" placeholder="Ask a question">
          <br>
          <button type="submit" class="btn btn-primary">Ask</button>
      </form>
    </div>
    <br>
    <div class="container" v-if="answer">
      <p><b>Answer:</b> {{ answer['answer'] }}</p>
      <p><b>Citation:</b> </p>
      <ul>
    <li v-for="(cite, index) in answer.citations" :key="index">
      <div v-if="!expanded[index]">
        {{ cite.slice(0, 100) + '...' }}
        <button  @click="toggleExpanded(index)" id="citation">Show more</button>
      </div>
      <div v-if="expanded[index]">
        {{ cite }}
        <button  @click="toggleExpanded(index)" id="citation">Show less</button>
      </div>
      
    </li>
  </ul>
    </div>
    <div class="text-center" v-if="loading"> 
        <img src="../assets/ZKZg.gif" height="50" width="50">
    </div>
  </template>
  
  <style>
  p {
    font-size: large;
  }

  #question {
    border-radius: 20px solid #000000;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
  }
  .answer {
    font-size:large;
  }

  #citation {
    font-size: small;
    margin-left: 10px;
  background-color: transparent;
  border: none;
  color: blue;
  cursor: pointer;
  text-decoration: underline;
  }
  
  </style>