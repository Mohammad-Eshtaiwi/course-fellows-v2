// utils/responseBuilder.ts
import { NextResponse } from "next/server";

type SuccessResponse<T> = {
  success: true;
  data: T;
};

type ErrorResponse = {
  success: false;
  error: {
    message: string;
    code?: number | string;
    details?: unknown;
  };
};

const ERROR_MESSAGES: Record<number, string> = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
  500: "Internal Server Error",
  502: "Bad Gateway",
  503: "Service Unavailable",
};

function buildErrorMessage(statusCode: number, message?: string): string {
  const errorPrefix = ERROR_MESSAGES[statusCode] ?? "Unknown Error";
  const validErrorMessage = `${errorPrefix} | `;
  return `${validErrorMessage}${message}`;
}

export function buildSuccessResponse<T>(
  data: T,
  statusCode: number = 200
): NextResponse {
  const response: SuccessResponse<T> = {
    success: true,
    data,
  };
  return NextResponse.json(response, { status: statusCode });
}

export function buildErrorResponse(
  statusCode: number,
  message?: string,
  options?: {
    code?: number | string;
    details?: unknown;
  }
): NextResponse {
  const errorMessage = buildErrorMessage(statusCode, message);
  const response: ErrorResponse = {
    success: false,
    error: {
      message: errorMessage,
      code: options?.code,
      details: options?.details,
    },
  };
  return NextResponse.json(response, { status: statusCode });
}
