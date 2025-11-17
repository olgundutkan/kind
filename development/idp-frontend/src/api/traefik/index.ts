import apiClient from '../index'

export const fetchTraefikOverview = () =>
  apiClient.get('/traefik/overview')
