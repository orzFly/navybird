import { notEnumerableProp } from '../helpers/notEnumerableProp';

export class TimeoutError extends Error {
  constructor(message: string) {
    super(message);

    notEnumerableProp(this, "name", "TimeoutError");
    notEnumerableProp(this, "message", message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}