import httpService from './http.service';

export const authService = {
    async login(email, password) {
        try {
            const response = await httpService.post('/auth/login', {
                email: email,
                password: password
            });
            return response.data;
        } catch (error) {
            throw error.response.data.error;
        }
    }
};

export function isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
}

export async function logout() {
    try {
         await httpService.post('/auth/logout');
        localStorage.removeItem('accessToken');
        window.location.replace('/auth/login');
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        throw new Error('Error al cerrar sesión');
    }
}