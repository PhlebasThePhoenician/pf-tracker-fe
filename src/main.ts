import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { AccountService , accountServiceKey} from './accounts/accounts.service';

import App from './App.vue'
import router from './router'

import './assets/main.css'
import { ApiService } from './service/api.service';
import { ExpenseTypeService, expenseTypeServiceKey } from './expense-types/expense-type.service';

const app = createApp(App)

app.use(createPinia())
app.use(router)

const apiService = new ApiService();
const accountService = new AccountService(apiService);
const expenseTypeService = new ExpenseTypeService(apiService);

app.provide<AccountService>(accountServiceKey, accountService);
app.provide<ExpenseTypeService>(expenseTypeServiceKey, expenseTypeService);

app.mount('#app')
