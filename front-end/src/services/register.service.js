import httpService from "@/services/http.service";

const register = async (userData) => {
    try {
        const response = await httpService.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export default register;
