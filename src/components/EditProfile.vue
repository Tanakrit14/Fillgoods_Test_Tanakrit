<template>
    <div id="edit-profile">
        <h3>Edit Profile</h3>
        <div class="row">
            <form @submit.prevent="updateUser" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input disabled type="text" v-model="user_id" required/>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="first_name" required/>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="last_name" required/>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="phone" required/>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="age" required/>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="address" required/>
                    </div>
                </div>
                <button type="submit" class="btn">Update</button>
                <router-link to="/" class="btn grey">Cancel</router-link>
            </form>
        </div>
    </div>
</template>

<script>
import db from './firebaseinit'
export default {
    name: 'edit-profile',
    data () {
        return {
            user_id: null,
            first_name: null,
            last_name: null,
            phone: null,
            age: null,
            address: null
        }
    },
    beforeRouteEnter(to, from, next){
      db.collection('user_profiles').where('user_id','==', to.params.user_id).get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
              next(vm => {
                  vm.user_id = doc.data().user_id
                  vm.first_name = doc.data().first_name
                  vm.last_name = doc.data().last_name
                  vm.phone = doc.data().phone
                  vm.age = doc.data().age
                  vm.address = doc.data().address
              })
          })
      })  
    },
    watch: {
        '$route':'fetchData'
    },
    methods:{
        fecthData(){
            db.collection('user_profiles').where('user_id', '==', this.$route.params.user_id).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.user_id = doc.data().user_id
                    this.first_name = doc.data().first_name
                    this.last_name = doc.data().last_name
                    this.phone = doc.data().phone
                    this.age = doc.data().age
                    this.address = doc.data().address
                })
            })
        },
        updateUser(){
             db.collection('user_profiles').where('user_id', '==', this.$route.params.user_id).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                   doc.ref.update({
                        user_id: this.user_id,
                        first_name: this.first_name,
                        last_name: this.last_name,
                        phone: this.phone,
                        age: this.age,
                        address: this.address
                   })
                   .then(() => {
                       this.$router.push({name: 'view-profile', params:{user_id: this.user_id}})
                   })
                })
            })
        }
    }
}
</script>