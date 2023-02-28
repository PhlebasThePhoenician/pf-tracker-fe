<script setup lang="ts">
import { useAccountStore } from '@/stores/account.store';
import { storeToRefs } from 'pinia';

const store = useAccountStore();
//const {error, accounts, loadAccounts } = useAccountStore();
store.loadAccounts();
const { accounts } = storeToRefs(store);

</script>
<template>
<div id="accounts-banner">
    <div v-for="account in accounts">{{ account.name }}: {{ account.balance }}</div>
</div>
</template>