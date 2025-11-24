import apiClient from '../index'

export const getRepositories = () => apiClient.get('/bitbucket/repositories')

export const createRepository = (payload: any) =>
  apiClient.post('/bitbucket/repositories', payload)

export const addRepository = (payload: any) =>
  apiClient.post('/bitbucket/repositories/add', payload)

export const getRepository = (id: string | number) =>
  apiClient.get(`/bitbucket/repositories/${id}`)

export const updateRepository = (id: string | number, payload: any) =>
  apiClient.put(`/bitbucket/repositories/${id}`, payload)

export const getRepositoryBranches = (id: string | number) =>
  apiClient.get(`/bitbucket/repositories/${id}/branches`)

export const updateRepositoryBranches = (id: string | number, payload: any) =>
  apiClient.put(`/bitbucket/repositories/${id}/branches`, payload)
