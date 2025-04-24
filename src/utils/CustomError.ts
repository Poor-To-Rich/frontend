class CustomError<T = undefined> extends Error {
  data?: T;

  constructor(message: string, data?: T) {
    super(message);
    this.name = 'CustomError';
    this.data = data;
  }
}

export default CustomError;
