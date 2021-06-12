export class CarSyncError extends Error {
  private readonly statusCode: number;

  constructor(message, statusCode = 500) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }

  toJSON() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      stackTrace: this.stack,
    };
  }
}

export class BadRequestError extends CarSyncError {
  constructor(message = "Bad request, double check values.", statusCode = 400) {
    super(message, statusCode);
  }
}

export class SecretCodeError extends CarSyncError {
  constructor(message = "Secret code is invalid!", statusCode = 400) {
    super(message, statusCode);
  }
}

export class SecretCodeExpiredError extends CarSyncError {
  constructor(message = "Secret code expired, it is only valid for 5 minutes.", statusCode = 400) {
    super(message, statusCode);
  }
}

export class NotFoundError extends CarSyncError {
  constructor(message = "Not found", statusCode = 404) {
    super(message, statusCode);
  }
}
