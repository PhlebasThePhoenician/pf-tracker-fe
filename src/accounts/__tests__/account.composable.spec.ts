import { flushPromises, mount } from "@vue/test-utils";
//import { describe } from "node:test";
import { vi, expect, it, describe, test } from "vitest";
import { defineComponent } from "vue";
import useAccount from "@/accounts/account.composable";
import { AccountService, accountServiceKey } from "../accounts.service";
import type { Account } from "../account.type";

vi.mock('../accounts.service');

const AccountServiceMock = vi.mocked<AccountService>(AccountService.prototype);

const TestComponent = defineComponent({
    props: {
        accountId: {
            type: String,
            required: false,
        }
    },
    setup(props) {
        return {
            ...useAccount()
        }
    },
    template: '<div>Test Component</div>',
});

function mountTestComponent(accountId?: string) {
    return mount(TestComponent, {
        props: {
            accountId
        },
        global: {
            provide: {
                [accountServiceKey as symbol]: AccountServiceMock,
            },
        },

    });
}

describe('useAccount', () => {
    test('load accoutns', async () => {
        const accountMock: Account =  {
            id: 'mock-id',
            name: 'mock-name',
            balance: 1234,
            balanceType: 'debit'
        }
        AccountServiceMock.getAccounts.mockResolvedValueOnce([accountMock]);
        const wrapper = mountTestComponent();
        await flushPromises();
        expect(AccountServiceMock.getAccounts).toBeCalled();
        expect(wrapper.vm.accounts).toEqual([accountMock]);
    })
})