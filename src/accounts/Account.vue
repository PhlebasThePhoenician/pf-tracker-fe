<script setup lang="ts">
import { ref, reactive } from 'vue';
import useAccount from './account.composable'
;
import type { Account } from './account.type';
defineProps<{
  id?: string
}>()

const newAccount = reactive<Account>(
    {
        id: '',
        name: '',
        balance: 0,
        balanceType: 'debit'
    }
);

const { accounts, addAccount, removeAccount } = useAccount();



</script>
<template>
    <h2>Account list</h2>
    <table>
        <tr>
            <th>Name</th><th>Balance</th><th>BalanceType</th><th>limit?</th>
        </tr>
        <tr v-for="account in accounts" key="account.id">
            <td>{{ account.name }}</td>
            <td>{{ account.balance }}</td>
            <td>{{ account.balanceType }}</td>
            <td>{{ account.limit }}</td>
            <td><button @click="removeAccount(account)">REMOVE</button></td>
        </tr>
        <tr>
            <td><input v-model="newAccount.name"/></td>
            <td><input v-model="newAccount.balance"></td>
            <td><select name="balanceType" v-model="newAccount.balanceType">
                <option value="debit">debit</option>
                <option value="credit">credit</option>
            </select></td>
            <td><input v-model="newAccount.limit"></td>
            <td><button @click="addAccount(newAccount)">ADD</button></td>
        </tr>
    </table>
</template>