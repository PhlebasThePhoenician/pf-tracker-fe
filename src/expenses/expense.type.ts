import type { ExpenseType } from "@/expense-types/expense-type.type";
import type { PaymentMethod } from "@/payment-methods/payment-method.type";

export type Expense = {
    id: string;
    when: number;
    where?: string;
    sum: number;
    paymentMethod: PaymentMethod;
    expenseType: ExpenseType;
}

/** no id (generated), method and type only as id. */
export type NewExpense = {
    when: number;
    where?: string;
    sum: number;
    paymentMethod: string;
    expenseType: string;
}