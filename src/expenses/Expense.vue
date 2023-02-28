<script setup lang="ts">
import { ref, reactive } from 'vue';
import useExpense from './expense.composalble';
import type { Expense, NewExpense } from './expense.type';
import type { ExpenseType } from '@/expense-types/expense-type.type';
import type { PaymentMethod } from '@/payment-methods/payment-method.type';

import { useAccountStore } from '@/stores/account.store';

const {error, accounts, loadAccounts } = useAccountStore();

const newExpense = reactive<NewExpense>(
    {
        when: Math.trunc(Date.now()/1000),
        where: '',
        sum: 0,
        paymentMethod: '6f93e2ae-58f3-45f9-b005-bbfb05930aee',
        expenseType: 'f53e232e-6cdc-4061-8cb8-4b8972818ae9',
    }

)

const {expenses, expenseTypes, paymentMethods, addExpense} = useExpense();

const handleAddExpense = async (expense: NewExpense) => {
    await addExpense(newExpense);
    loadAccounts();
}
</script>
<template>
    <h2>New expense {{ newExpense.where }}</h2>
    <table>
        <tr>
            <th>sum</th><th>when</th><th>where</th><th>PM</th><th>type</th><th>&nbsp;</th>
        </tr>
        <tr>
            <td><input type="text" v-model="newExpense.sum" /></td>
            <td><input type="text" v-model="newExpense.when" /></td>
            <td><input type="text" v-model="newExpense.where"/></td>
            <td>
                <select v-model="newExpense.paymentMethod">
                    <option v-for="paymentMethod in paymentMethods" :value="paymentMethod.id" >{{ paymentMethod.description }}</option>
            </select></td>
            <td><select name="expenseType" v-model="newExpense.expenseType">
                <option v-for="expenseType in expenseTypes" :value="expenseType.id">{{ expenseType.name }}</option>
            </select></td>
            <td colspan="2"><button @click="handleAddExpense(newExpense)">Add</button></td>
        </tr>
        
    </table>
    <h2>Previous expenses</h2>
    <table styel="width: 100%">
        <tr>
            <th>sum</th><th>when</th><th>where</th><th>PM</th><th>type</th><th>&nbsp;</th>
        </tr>
        <tr v-for="expense in expenses">
            <td>{{ expense.sum }}</td>
            <td>{{ expense.when }}</td>
            <td>{{ expense.where }}</td>
            <td>{{ expense.paymentMethod.description }}</td>
            <td>{{ expense.expenseType.name }}</td>
            <td>edit</td>
        </tr>
        </table>
</template>