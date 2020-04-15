<template>
  <div>
    <div class="container">
    <div class="row">
    <div class="center">
        <h3>Login</h3>
    </div>
      <div class="col s12 m8 offset-m2">
        <div class="login card-panel grey darken-2 white-text center">
          <form action="index.html">
            <div class="row">
            <div class="input-field">
              <i class="material-icons prefix white-text">email</i>
              <input type="email" id="email" v-model="email">
              <label class="white-text" for="email">Email Address</label>
            </div>
            <div class="input-field">
              <i class="material-icons prefix white-text">lock</i>
              <input type="password" id="password" v-model="password">
              <label class="white-text" for="password">Password</label>
            </div>
                <button v-on:click="login" class="btn btn-large btn-extended orange white-text">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'login',
  data: function() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login: function(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert('You are logged');
            this.$router.go({ path: this.$router.path });
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
    }
  }
};
</script>