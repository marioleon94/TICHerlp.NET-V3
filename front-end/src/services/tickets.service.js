import httpService from "@/services/http.service";

export const getAllTickets = async () => {
    try {
        const response = await httpService.get('/tickets');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

export const createTicket = async (ticketData) => {
    try {
        const response = await httpService.post('/tickets', ticketData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

export const getTicketById = async (id) => {
    try {
        const response = await httpService.get('/tickets/' + id);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}
export const updateTicket = async (id, ticketData) => {
    try {
        const response = await httpService.patch('/tickets/' + id, ticketData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

export const deletedTicket = async (id) => {
    try {
        const response = await httpService.delete('/tickets/' + id);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}