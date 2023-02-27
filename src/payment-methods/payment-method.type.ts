
import type { Account } from "@/accounts/account.type";

export type PaymentMethod = {
    id: string;
    type: string;
    description: string;
    account?: Account;
}