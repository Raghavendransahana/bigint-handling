import axios from "axios";
import { encode, decode } from "@/app/utils/cbor";
import { AuthRequestDTO, AuthResponseDTO } from "@/app/dto";

class CborClient {
  async post<TRequest, TResponse>(url: string, data: TRequest): Promise<TResponse> {
    const binaryBody = encode(data);

    const response = await axios.post(url, binaryBody, {
      headers: {
        "Content-Type": "application/cbor",
      },
      responseType: "arraybuffer",
    });

    const decodedResponse = decode<TResponse>(response.data);

    return decodedResponse;
  }
}

const client = new CborClient();

export async function signup(username: bigint, password: string): Promise<AuthResponseDTO> {
  const request: AuthRequestDTO = { username, password };
  return client.post<AuthRequestDTO, AuthResponseDTO>("/api/signup", request);
}

export async function login(username: bigint, password: string): Promise<AuthResponseDTO> {
  const request: AuthRequestDTO = { username, password };
  return client.post<AuthRequestDTO, AuthResponseDTO>("/api/login", request);
}
