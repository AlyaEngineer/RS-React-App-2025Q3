import type { ApiError } from '@/features/types/apiTypes';

export class ApiErrorClass extends Error implements ApiError {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export function throwApiError(status: number, message: string): never {
  throw new ApiErrorClass(status, message);
}
