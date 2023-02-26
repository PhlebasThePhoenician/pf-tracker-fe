import type { ApiService } from "@/service/api.service";
import type { InjectionKey } from "vue";
import type { Account } from "./account.type";

export const accountServiceKey = Symbol() as InjectionKey<AccountService>;

export class AccountService {
    constructor(
        private readonly apiService: ApiService
    ) {}

    async getAccountById(id:string): Promise<Account | undefined> {
        const account = await this.apiService.get<Account>('/api/accounts/' + id);
        return account;
    }

    async getAccounts(): Promise<Account[]> {
        const accounts = await this.apiService.get<Account[]>('/api/accounts/');
        if (!accounts) {
            return [];
        }
        return accounts;
    }

    async addAccount(account: Account): Promise<Account|undefined> {
        return await this.apiService.post('/api/accounts', account);
    }

    async removeAccount(accountId: string): Promise<boolean> {
        const result = await this.apiService.remove('/api/accounts/' + accountId);
        return !!result;
    }
}