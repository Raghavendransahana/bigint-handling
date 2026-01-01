import { decode, encode } from "@/app/utils/cbor";
import { AuthRequestDTO, createSuccessResponse, createErrorResponse } from "@/app/dto";
import { userRepository } from "@/app/dal/userRepository";
import { NextResponse } from "next/server";

const cborResponse = (data: any, status = 200) =>
  new NextResponse(encode(data) as unknown as BodyInit, {
    status,
    headers: { "Content-Type": "application/cbor" },
  });

export async function POST(req: Request) {
  const body = decode<AuthRequestDTO>(await req.arrayBuffer());

  if (userRepository.exists(body.username)) {
    return cborResponse(createErrorResponse("User already exists"), 409);
  }

  if (!userRepository.create({ username: body.username, password: body.password })) {
    return cborResponse(createErrorResponse("Failed to create user"), 500);
  }

  return cborResponse(createSuccessResponse(body.username));
}
