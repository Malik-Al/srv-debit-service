export interface IResponse<T> {
  success: boolean;
  code: number;
  data?: T | T[];
}
