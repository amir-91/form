<template>
  <div id="app">
   <contact-form></contact-form>
  </div>
</template>

<script> 
import ContactForm from './components/ContactForm.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

export default {
  name: 'App',
  components: {
    ContactForm
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 60%;
  margin: auto;
}
</style>
