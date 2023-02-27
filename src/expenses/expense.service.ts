import type { ApiService } from "@/service/api.service";
import type { InjectionKey } from "vue";
import type { Expense } from "./expense.type";

export const expenseServiceKey = Symbol() as InjectionKey<ExpenseService>;

export class ExpenseService {
    constructor(
        private readonly apiService: ApiService
    ) {}

    async getAll(): Promise<Expense[]> {
        const expenses =  await this.apiService.get<Expense[]>('/api/expenses');
        if (!expenses) {
            return [];
        }
        return expenses;
    }

    async addExpense(expense: Expense): Promise<Expense | undefined> {
        return await this.apiService.post('/api/expenses', expense);
    }
}