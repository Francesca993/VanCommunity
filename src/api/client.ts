import axios from 'axios';
import { Group, SearchRequest, JoinRequest, JoinResponse, UpcomingGroup } from './types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchGroups = async (payload: SearchRequest): Promise<Group[]> => {
  const response = await api.post<Group[]>('/api/groups/search', payload);
  return response.data;
};

export const joinGroup = async (groupId: string, payload: JoinRequest): Promise<JoinResponse> => {
  const response = await api.post<JoinResponse>(`/api/groups/${groupId}/join`, payload);
  return response.data;
};

export const checkHealth = async (): Promise<{ status: string }> => {
  const response = await api.get('/health');
  return response.data;
};

export const fetchUpcomingGroups = async (): Promise<UpcomingGroup[]> => {
  const response = await api.get<UpcomingGroup[]>('/api/groups/upcoming');
  return response.data;
};

export const createGroup = async (payload: Omit<any, 'id' | 'whatsapp_link'>) => {
  const response = await api.post('/api/groups', payload);
  return response.data;
};
