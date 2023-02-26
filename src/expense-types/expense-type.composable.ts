import { inject, ref, type Ref } from "vue"
import { ExpenseTypeService, expenseTypeServiceKey } from "./expense-type.service";
import type { ExpenseType } from "./expense-type.type";

export default function useExpenseType(id?: string): {
    expenseTypes: Ref<ExpenseType[]>,
    addExpenseType: (newExpenseType: ExpenseType) => Promise<void>,
    removeExpenseType: (expenseType: ExpenseType) => Promise<void>,
} {
    const expenseTypeService = inject<ExpenseTypeService>(expenseTypeServiceKey) as ExpenseTypeService;

    const expenseTypes = ref<ExpenseType[]>([]);

    expenseTypeService.getExpenseTypes().then( (result) => {
        console.log('Got result');
        expenseTypes.value = result;
    })
    const addExpenseType = async (newExpenseType : ExpenseType) => {
        const expenseType = await expenseTypeService.addExpenseType(newExpenseType);
        if (expenseType)  {
            expenseTypes.value.push(expenseType);
        }

    }
    const removeExpenseType = async (expenseType: ExpenseType) => {
        const result = await expenseTypeService.removeExepnseType(expenseType.id);
        if (result) {
            const removed = expenseTypes.value.indexOf(expenseType);
            if (removed > -1) {
                expenseTypes.value.splice(removed, 1);
            }
        }
    } 

    return {
        expenseTypes: expenseTypes,
        addExpenseType: addExpenseType,
        removeExpenseType: removeExpenseType
    }
}