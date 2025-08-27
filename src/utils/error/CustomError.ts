import type { AxiosError, AxiosResponse } from 'axios';

class CustomError<T = any, D = any> extends Error implements AxiosError<T, D> {
  config!: AxiosError<T, D>['config'];
  code?: string;
  request?: any;
  response?: AxiosResponse<T, D>;
  isAxiosError = true as const;

  statusCode: number;
  data?: T;

  constructor(message: string, statusCode: number, data?: T) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.data = data;

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  toJSON() {
    return {
      message: this.message,
      name: this.name,
      statusCode: this.statusCode,
      code: this.code,
      config: this.config,
      response: this.response,
    };
  }
}

export default CustomError;
