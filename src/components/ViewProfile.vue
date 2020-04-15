<template>
    <div id="view-profile">
        <h3>View Profile</h3>
        <ul class="collection with-header">
            <li class="collection-header">
                <h4>{{first_name}} &nbsp; {{last_name}}</h4>
            </li>
            <li class="collection-item">
               User ID: #{{user_id}}
            </li>
            <li class="collection-item">
                Age: {{age}}
            </li>
            <li class="collection-item">
                Phone: {{phone}}
            </li>
            <li class="collection-item">
                Address: {{address}}
            </li>
        </ul>
        <router-link to="/" class="btn grey">Back</router-link>
        <button @click="deleteUser" class="btn red">Delete</button>

        <div class="fixed-action-btn">
            <router-link v-bind:to="{name: 'edit-profile', params:{user_id: user_id}}" class="btn-floating btn-large green">
            <i class="fa fa-pencil"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
import db from './firebaseinit'
export default {
    name: 'view-profile',
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
        deleteUser (){
            if(confirm('Are you sure?')){
                 db.collection('user_profiles').where('user_id', '==', this.$route.params.user_id).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                   doc.ref.delete()
                   this.$router.push('/')
                })
            })
            }
        }
    }
}
</script>