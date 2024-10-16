export class ApiException extends Error {
  constructor(statusCode, message) {
    super(message);

    this.statusCode = statusCode;
    console.error(message);
  }
}
