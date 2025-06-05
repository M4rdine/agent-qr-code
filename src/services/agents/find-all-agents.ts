import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { api } from "../api";

export interface IAgentsList {
  instanceName: string;
  id: string;
  additionalContext: string,
  additionalMatherial: string,
  agentFeeling: string;
  agentName: string;
  agentDescription: string;
  createdAt: string;
  status: string;
  template: string;
}

export function useQueryAgentsList(): UseQueryResult<IAgentsList[]> {
  return useQuery<IAgentsList[]>(
    ["agents"],
    () =>
      api
        .get(`/agents`)
        .then((response) => {
          return response.data;
        }),
  );
}
