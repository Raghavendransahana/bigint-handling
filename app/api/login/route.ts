
import { decode, encode } from "@/app/utils/cbor";
import { AuthRequestDTO, createSuccessResponse, createErrorResponse } from "@/app/dto";
import { userRepository } from "@/app/dal/userRepository";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
 
  const buffer = await req.arrayBuffer();
  const body = decode<AuthRequestDTO>(buffer);
  const user = userRepository.validateCredentials(body.username, body.password);
  
  if (!user) {
    const responseDTO = createErrorResponse("Invalid username or password");
    const response = encode(responseDTO);
    return new NextResponse(response as unknown as BodyInit, {
      status: 401,
      headers: { "Content-Type": "application/cbor" }
    });
  }
  const responseDTO = createSuccessResponse(user.username);
  const response = encode(responseDTO);
  
  return new NextResponse(response as unknown as BodyInit, {
    headers: { "Content-Type": "application/cbor" }
  });
}
