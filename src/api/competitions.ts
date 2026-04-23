import type { CompetitionsResponse, MatchesResponse } from '../types';
import { apiClient } from './client';

export function fetchCompetitions(): Promise<CompetitionsResponse> {
  return apiClient.request<CompetitionsResponse>('/competitions');
}

export function fetchCompetitionMatches(
  id: number,
  params?: { dateFrom?: string; dateTo?: string },
): Promise<MatchesResponse> {
  return apiClient.request<MatchesResponse>(`/competitions/${id}/matches`, { params });
}
