import type { ApiService } from "@/service/api.service";
import type { InjectionKey } from "vue";
import type { PaymentMethod } from "./payment-method.type";

export const paymentMethodServiceKey = Symbol() as InjectionKey<PaymentMethodService>;

export class PaymentMethodService {
    constructor(
        private readonly apiService: ApiService
    ) {}

    async getPaymentMethods(): Promise<PaymentMethod[]> {
        const paymentMethods = await this.apiService.get<PaymentMethod[]>('/api/payment-methods');
        if (!paymentMethods) {
            return [];
        }
        return paymentMethods;
    }
}