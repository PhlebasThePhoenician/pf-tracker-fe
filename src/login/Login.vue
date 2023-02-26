<script setup lang="ts">
import { reactive } from 'vue';
import { ApiService } from '@/service/api.service';
import { LoginService } from './login.service';
import type { Credentials } from './Credentials.type';
import { userStore } from '@/stores/user.store';


const loginService = new LoginService(new ApiService());

const loginData = reactive<Credentials>({
    username: '',
    password: ''
});
const store = userStore();

const login = async () => {
    //const result = await loginService.login(loginData);
    const result = await store.login(loginData);
    /*
    if (result) {
        console.log('login success');
    } else {
        console.log('login fail!');
    }
    */
}

</script>
<template>
    <h2>login</h2>
    <form>
        Username: <input type="text" v-model="loginData.username"/><br />
        Password: <input type="password" v-model="loginData.password"/><br />
        <button type="submit" value="Login" @click.prevent.self="login()">LOGIN</button>
    </form>
</template>