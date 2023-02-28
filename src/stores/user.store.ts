import type { Credentials } from "@/login/Credentials.type";
import { loginService } from "@/login/login.service";
import router from "@/router";
import { defineStore } from "pinia";


export type User = {
    id: string;
    username: string;
    isAuthenticated: boolean;
}

export type UserStoreState = {
    user: User | null;
    returnUrl: string | null;
    error: string | null ;
}

export const userStore = defineStore({
    id: 'auth',
    state: () => {
        return {
            user: null,
            returnUrl: null,
            error: null,
        } as UserStoreState;
    },
    actions: {
        async login(credentials: Credentials): Promise<void> {
            try {
                const userdata = await loginService.login(credentials);
                if (userdata) {
                    this.user = {
                        id: userdata.id,
                        username: userdata.username,
                        isAuthenticated: true
                    }
                }
                console.log('Set user as logged-in');
                await router.push(this.returnUrl || '/');
            } catch (e) {
                this.error = 'Authentication failed!';
            }
        },
        logout(): void {
            // todo : logout
            this.user = null;
            router.push('/');
        },
        validSession(): boolean {
            return this.user?.isAuthenticated || false;
        }
    }
});

export type UserStore = ReturnType<typeof userStore>