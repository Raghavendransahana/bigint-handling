import * as cbor from "cbor";

export function encode(data: unknown): Uint8Array {
  return cbor.encode(data);
}

export function decode<T>(buffer: ArrayBuffer): T {
  return cbor.decodeFirstSync(Buffer.from(buffer));
}
