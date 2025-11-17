import apiClient from '../index'

export const getItemsRequest = () => apiClient.get('/items')

export const postItemRequest = (payload: { name: string; description?: string }) =>
  apiClient.post('/items', payload)

export const getItemRequest = (id: string) => apiClient.get(`/items/${id}`)

export const patchItemRequest = (
  id: string,
  payload: { name?: string; description?: string },
) => apiClient.put(`/items/${id}`, payload)

export const deleteItemRequest = (id: string) => apiClient.delete(`/items/${id}`)
