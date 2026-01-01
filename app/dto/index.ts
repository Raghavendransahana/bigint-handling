
export interface UserDTO {
  username: bigint;  
  password: string;
}
export interface AuthRequestDTO {
  username: bigint;  
  password: string;
}

export interface AuthResponseDTO {
  success: boolean;
  username?: bigint;  
  message?: string;   
}

export function createSuccessResponse(username: bigint): AuthResponseDTO {
  return {
    success: true,
    username
  };
}

export function createErrorResponse(message: string): AuthResponseDTO {
  return {
    success: false,
    message
  };
}
