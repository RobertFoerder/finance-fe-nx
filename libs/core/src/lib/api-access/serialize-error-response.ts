import { HttpErrorResponse } from '@angular/common/http';

export type SerializedError = Readonly<{
  message: string;
  status: number;
  statusText: string;
  ok: boolean;
  url: string | null;
}>;

export function serializeErrorResponse(
  error: HttpErrorResponse
): SerializedError {
  const { message, status, statusText, ok, url } = error;

  return { message, status, statusText, ok, url };
}
