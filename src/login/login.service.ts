import { ApiService } from "@/service/api.service";
import type { Credentials } from "./Credentials.type";
import type { LoginResponseDto } from "./login.response.dto";


export class LoginService {
    constructor(
        private readonly apiService: ApiService
    ) {}

    async login(credentials: Credentials): Promise<LoginResponseDto | undefined> {
        const response = await this.apiService.post<Credentials, LoginResponseDto>('/api/auth/login', credentials);
        // todo: some meaningfull response check
        if (!response) {
            return undefined;
        }

        return response;
    }
}

export const loginService = new LoginService(new ApiService);