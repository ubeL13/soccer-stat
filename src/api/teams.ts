import type { TeamsResponse, Team, MatchesResponse } from '../types';
import { apiClient } from './client';

export function fetchTeams(): Promise<TeamsResponse> {
  return apiClient.request<TeamsResponse>('/teams');
}

export function fetchTeam(id: number): Promise<Team> {
  return apiClient.request<Team>(`/teams/${id}`);
}

export function fetchTeamMatches(
  id: number,
  params?: { dateFrom?: string; dateTo?: string },
): Promise<MatchesResponse> {
  return apiClient.request<MatchesResponse>(`/teams/${id}/matches`, { params });
}
