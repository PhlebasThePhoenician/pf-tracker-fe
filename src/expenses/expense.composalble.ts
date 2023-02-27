import { ExpenseTypeService, expenseTypeServiceKey } from "@/expense-types/expense-type.service";
import type { ExpenseType } from "@/expense-types/expense-type.type";
import { PaymentMethodService, paymentMethodServiceKey } from "@/payment-methods/payment-method.service";
import type { PaymentMethod } from "@/payment-methods/payment-method.type";
import { inject, ref, type Ref } from "vue"
import { ExpenseService, expenseServiceKey } from "./expense.service";
import type { Expense, NewExpense } from "./expense.type";

export default function useExpense(id?: string): {
    expenses: Ref<Expense[]>,
    expenseTypes: Ref<ExpenseType[]>,
    paymentMethods: Ref<PaymentMethod[]>,
    addExpense: (newExpense: NewExpense) => Promise<void>,
} {
    const expenseService = inject<ExpenseService>(expenseServiceKey) as ExpenseService;
    const expenseTypeService = inject<ExpenseTypeService>(expenseTypeServiceKey) as ExpenseTypeService;
    const paymentMethodService = inject<PaymentMethodService>(paymentMethodServiceKey) as PaymentMethodService;

    const expenses = ref<Expense[]>([]);
    const expenseTypes = ref<ExpenseType[]>([]);
    const paymentMethods = ref<PaymentMethod[]>([]);

    expenseService.getAll().then( (result) => {
        expenses.value = result;
    });
    
    expenseTypeService.getExpenseTypes().then( (result) => {
        expenseTypes.value = result;
    });
    paymentMethodService.getPaymentMethods().then( (result) => {
        paymentMethods.value = result;
    })

    const addExpense = async (newExpense: NewExpense) => {
        console.log('NEW EXPENSE');
        console.log(newExpense);
        const expense = {
            when: newExpense.when,
            sum: newExpense.sum,
            where: newExpense.where ?? '',
            paymentMethod: {
                id: newExpense.paymentMethod,
            },
            expenseType: {
                id: newExpense.expenseType,
            }
        } as unknown as Expense;
        const addedExpense = await expenseService.addExpense(expense);
        if (addedExpense) {
            expenses.value.push(addedExpense);
        } 
        // todo: emit balance update signal
    }


    return {
        expenses: expenses,
        expenseTypes: expenseTypes,
        paymentMethods: paymentMethods,
        addExpense: addExpense
    }

}