import httpService from "@/services/http.service";

export const getAllTotalTicket = async () => {
    try {
        const response = await httpService.get('/tickets/total-count');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

export const getPriorityCount = async () => {
    try {
        const response = await httpService.get('/tickets/priority-count');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

export const getStatusCount = async () => {
    try {
        const response = await httpService.get('/tickets/status-count');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}