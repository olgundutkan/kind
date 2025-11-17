import axios from 'axios'

const apiClient = axios.create({
  baseURL: '/idp-backend/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

const unbox = (response) => response.data

export const fetchItems = () => apiClient.get('/items').then(unbox)

export const createItem = (payload) =>
  apiClient.post('/items', payload).then(unbox)

export const deleteItem = (id) =>
  apiClient.delete(`/items/${id}`).then(() => id)

export const fetchTraefikOverview = () =>
  apiClient.get('/traefik/overview').then(unbox)
