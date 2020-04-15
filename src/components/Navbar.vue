<template>
    <nav>
        <div class="nav-wrapper orange darken-1">
            <div class="container">
                <router-link to="/" class="brand-logo">Profile Manager</router-link>
                <div class="right">
                    <ul>
                        <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li>
                        <li v-if="!isLoggedIn"><router-link to="/register">Register</router-link></li>
                       <li v-if="isLoggedIn"><button v-on:click="logout" class="btn red">Logout</button></li>
                    </ul>
                </div>
                
            </div>
        </div>

    </nav>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'navbar',
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
           this.$router.go({ path: this.$router.path });
        });
    }
  }
};
</script>