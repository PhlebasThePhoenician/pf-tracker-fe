import { inject, ref, type Ref } from "vue"
import type { Account } from "./account.type";
import { AccountService, accountServiceKey } from "./accounts.service";


export default function useAccount(): {
    accounts: Ref<Account[]>,
    addAccount: (newAccount: Account) => Promise<void>,
    removeAccount: (account: Account) => Promise<void>,
} {

    const accountService = inject<AccountService>(accountServiceKey) as AccountService;
    const accounts = ref<Account[]>([]);
    accountService.getAccounts().then( (result) => {
        console.log('Got result ');
        console.log(result);
        accounts.value = result;
    });
    const addAccount = async (newAccount: Account) => {
        const account = await accountService.addAccount(newAccount);
        if (account) {
            accounts.value.push(account);
        }
    }

    const removeAccount = async (account: Account) => {
        const result = await accountService.removeAccount(account.id);
        if (result) {
            const removed = accounts.value.indexOf(account);
            if (removed > -1) {
                accounts.value.splice(removed, 1);
            }
        }
    }
    return  {
        accounts: accounts,
        addAccount: addAccount,
        removeAccount: removeAccount
    }
}