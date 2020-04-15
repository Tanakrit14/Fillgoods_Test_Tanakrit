<template>
    <div id="dashboard">
        <h3>Dashboard</h3>
        <ul class="collection with-header">
            <li class="collection-header">
                <h4>Show All Profiles </h4>
            </li>
            <li v-for="user_profile in user_profiles" v-bind:key="user_profile.id" class="collection-item">
                {{user_profile.first_name}} &nbsp; {{user_profile.last_name}}

                <router-link class="secondary-content" v-bind:to="{name:'view-profile', params: {user_id: user_profile.user_id}}">
                    <i class="fa fa-eye"></i> View
                </router-link>
            </li>
        </ul>
        <div class="right">
            <router-link to="/new-profile" class="btn btn-small blue"> Add Profile </router-link>
        </div>
    </div>
</template>

<script>
import db from './firebaseinit'
export default {
    name: 'dashboard',
    data () {
        return {
            user_profiles: []
        }
    },
    created (){
        db.collection('user_profiles').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
            // console.log(doc.id);
            const data = {
                'id': doc.id,
                'user_id': doc.data().user_id,
                'first_name': doc.data().first_name,
                'last_name': doc.data().last_name,
                'phone': doc.data().phone,
                'age': doc.data().age,
                'address': doc.data().address

            }
            this.user_profiles.push(data)
        })
    })
    }
}
</script>