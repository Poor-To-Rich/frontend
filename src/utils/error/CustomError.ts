class CustomError<T = undefined> extends Error {
  statusCode: number;
  data?: T;

  constructor(message: string, statusCode: number, data?: T) {
    super(message);
    this.name = this.constructor.name;
    this.data = data;
    this.statusCode = statusCode;
  }
}

export default CustomError;
