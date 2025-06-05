import { useMutation } from "@tanstack/react-query";
import { api } from '../api';

interface ICreateAgent {
    instanceName: string;
    additionalContext: string;
    additionalMatherial: string;
    agentFeeling: string;
    agentAnswers: string;
    script?: {
        value: string;
        answer: string;
    }[];
  status: string;
  template: string;
}

export function useAgentsCreate() {
    return useMutation(
        ["createAgents"],
        async (data: ICreateAgent) => {
            try {
                const response = await api.post(`/agents`, data);
                const agent = response.data;

                return agent;
            } catch (e: any) {
                throw new Error(e.response?.data.code);
            }
        },
        { retry: false },
    );
}
