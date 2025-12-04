import api from './api';

export const vehicleService = {
    getAll: async (filters = {}) => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.append(key, value);
        });
        const response = await api.get('/veiculos', { params });
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/veiculos/${id}`);
        return response.data;
    },

    create: async (data) => {
        const response = await api.post('/veiculos', data);
        return response.data;
    },

    update: async (id, data) => {
        const response = await api.put(`/veiculos/${id}`, data);
        return response.data;
    },

    delete: async (id) => {
        await api.delete(`/veiculos/${id}`);
    },
};
