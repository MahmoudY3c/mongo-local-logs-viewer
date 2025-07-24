import { asyncHandler } from '../handlers/error';
import { validationResult } from 'express-validator';

const sendExpressValidatorErrors = asyncHandler(function (req, res, next) {
  //  validating the query
  const result = validationResult(req);
  if (result.isEmpty() === false) {
    const errors = result.array();
    return res.status(400).json({
      error: {
        errors,
        message: errors.map(e => e.msg).join('\n '),
      },
    });
  }

  next();
});

export default sendExpressValidatorErrors;
