<template>
    <div id="new-profile">
        <h3>New Profile</h3>
        <div class="row">
            <form @submit.prevent="saveUser" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="user_id" required/>
                        <label>User ID</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="first_name" required/>
                        <label>First Name</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="last_name" required/>
                        <label>Last Name</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="phone" required/>
                        <label>Phone</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="age" required/>
                        <label>Age</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="address" required/>
                        <label>Address</label>
                    </div>
                </div>
                <button type="submit" class="btn">Submit</button>
                <router-link to="/" class="btn grey">Cancel</router-link>
            </form>
        </div>
    </div>
</template>

<script>
import db from './firebaseinit'
export default {
    name: 'new-profile',
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
    methods: {
        saveUser (){
            db.collection('user_profiles').add({
                user_id: this.user_id,
                first_name: this.first_name,
                last_name: this.last_name,
                phone: this.phone,
                age: this.age,
                address: this.address
            })
            .then(docRef => this.$router.push('/'))
            .catch(error => console.log(err))
        }
    }
}
</script>