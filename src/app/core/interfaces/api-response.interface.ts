export interface ApiResponse<T> {
  data: T;
  errors: string;
  message: string;
  success: boolean;
}
