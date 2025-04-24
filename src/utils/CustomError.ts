class CustomError<T = undefined> extends Error {
  data?: T;

  constructor(message: string, data?: T) {
    super(message);
    this.name = this.constructor.name;
    this.data = data;
  }
}

export default CustomError;
