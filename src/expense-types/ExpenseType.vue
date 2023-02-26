<script setup lang="ts">
import { stringifyExpression } from '@vue/compiler-core';
import { reactive } from 'vue';
import useExpenseType from './expense-type.composable';
import type { ExpenseType } from './expense-type.type';


const props = defineProps<{
    id?: string;
}>();

const newExpenseType = reactive<ExpenseType>(
    {
        id: '',
        name: '',
    }
);

const { expenseTypes, addExpenseType, removeExpenseType } = useExpenseType(props.id);
</script>
<template>
    <h2>Expense types</h2>
    <table>
        <tr>
            <th>Name</th>
        </tr>
        <tr v-for="expenseType in expenseTypes" key="expenseType.id">
            <td>{{ expenseType.name }}</td>
        </tr>
    </table>

</template>