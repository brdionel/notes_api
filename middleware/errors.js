import config from "../config/index.js";

function withErrorStack(error, stack) {
  if (config.dev) {
    return { ...error, stack };
  }
  return error;
}

export function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}

export function wrapErrors(err, req, res, next) {
  const badImplementationError = {
    stack: err.stack,
    output: {
      statusCode: 500,
      payload: {
        error: "Internal Server Error",
        message: err.message,
      },
    },
  };

  next(badImplementationError);
}

export function errorHandler(err, req, res, next) {
  const { stack, output } = err;
  res.status(output.statusCode);
  res.json(withErrorStack(output.payload, stack));
}
