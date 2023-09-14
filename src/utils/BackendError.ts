export default class BackendError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);

    this.name = "BackendError";
    this.statusCode = statusCode;
  }
}
