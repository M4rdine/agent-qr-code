import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { api } from "../api";

export interface IFindQRCode {
  pairingCode: string;
  code: string;
  base64: string;
  counter: number;
  instance?: { state: string };
}

export function useQueryFindQRCode() {
    return useMutation(
        ["qr-code"],
        async (instanceName: string) => {
            console.log(instanceName);
            try {
                const response = await api.post(`/whatsapp/connect`, { instanceName: instanceName });
                const connect = response.data as IFindQRCode;

                return connect;
            } catch (e: any) {
                throw new Error(e.response?.data.code);
            }
        },
        { retry: false },
    );
}
