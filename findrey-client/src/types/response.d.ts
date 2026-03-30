export interface SuccessResponseType<T> {
  count: number;
  data: T;
}

export interface ErrorResponseType {
  error: null;
}
