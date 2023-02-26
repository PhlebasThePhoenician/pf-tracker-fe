import type { ApiService } from "@/service/api.service";
import type { InjectionKey } from "vue";
import type { ExpenseType } from "./expense-type.type";


export const expenseTypeServiceKey = Symbol() as InjectionKey<ExpenseTypeService>;

export class ExpenseTypeService {
    constructor(
        private readonly apiService: ApiService
    ) {}

    async getExpenseTypes(): Promise<ExpenseType[]> {
        const expenseTypes = await this.apiService.get<ExpenseType[]>('/api/expense-types');
        if (!expenseTypes) {
            return [];
        }
        return expenseTypes;
    }

    async addExpenseType(expenseType: ExpenseType): Promise<ExpenseType | undefined> {
        return await this.apiService.post('/api/expense-types', expenseType);
    }

    async removeExepnseType(id: string): Promise<boolean> {
        const result = await this.apiService.remove('/api/expense-types/' + id);
        return !!result;
    }
}