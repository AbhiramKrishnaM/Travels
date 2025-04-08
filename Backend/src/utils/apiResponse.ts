class APIResponse<T> {
  success: boolean;
  status: number;
  data: T;
  message: string;

  constructor(success: boolean, status: number, data: T, message: string) {
    this.success = success;
    this.status = status;
    this.data = data;
    this.message = message;
  }
}

export { APIResponse };
