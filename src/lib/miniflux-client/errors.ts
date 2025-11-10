export class MinifluxError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class MinifluxAuthError extends MinifluxError {
  constructor() {
    super("Authentication failed. Please check your credentials.");
  }
}

export class MinifluxBadRequestError extends MinifluxError {
  constructor() {
    super("Bad request. Please check your request parameters.");
  }
}

export class MinifluxNotFoundError extends MinifluxError {
  constructor() {
    super("The requested resource was not found.");
  }
}

export class MinifluxServerError extends MinifluxError {
  constructor() {
    super("An unexpected server error occurred.");
  }
}
