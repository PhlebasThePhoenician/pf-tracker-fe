import type { Account } from "@/accounts/account.type"
import { accountServiceKey, type AccountService } from "@/accounts/accounts.service";
import { defineStore } from "pinia";
import { inject, ref } from "vue";


export const useAccountStore = defineStore('accounts', () => {
    const accountService = inject<AccountService>(accountServiceKey) as AccountService;
    const error = ref('');
    const accounts = ref<Account[]>([]);

    function loadAccounts(): void {
        try {
            accountService.getAccounts().then((result) => {
                if (!result) {
                    error.value = 'Error loading account data!';
                }
                accounts.value = result;

            })
        } catch (e) {
            error.value = "Error loading accounts"
        }
    }

    return { error, accounts, loadAccounts}
});