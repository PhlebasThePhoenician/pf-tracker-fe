export class ApiService {

    private baseUrl = 'http://localhost:8080';

    
    async get<T>(url: string): Promise<T | undefined> {
        const response =  await fetch(this.baseUrl + url);
        if (response) {
            try {
                const data = await response.json();
                return data as T;
            } catch (e) {
                console.log(e);
            }
        }
        return undefined
    }

    async post<D, T>(url: string, data: D): Promise<T | undefined> {
        const response = await fetch(this.baseUrl + url, {
            method: 'POST',
            mode: 'cors', // no-cors, *cors, same-origin
            credentials: 'include', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        
        });
        if (response) {
            if (response.status === 401) {
                window.location.href = '/login'
            }
            try {
                const data = await response.json();
                return data as T;
            } catch (e) {
                console.log(e);
            }
        }
        return undefined
    }

    async remove<T>(url: string): Promise<T | undefined> {
        const response =  await fetch(this.baseUrl + url);
        if (response) {
            try {
                const data = await response.json();
                return data as T;
            } catch (e) {
                console.log(e);
            }
        }
        return undefined
        
    }

}