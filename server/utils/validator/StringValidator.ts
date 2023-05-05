import Validator from "./Validator";
import * as yup from "yup";
import Error from "../Error/Error";
import type { NextApiResponse } from "next";

export default class StringValidator extends Validator {
  private readonly MIN_LENGTH: number = 0;
  private readonly MAX_LENGTH: number = 255;

  constructor(
    res: NextApiResponse,
    required?: boolean,
    min?: number,
    max?: number
  ) {
    super(res, required);

    if (min) this.MIN_LENGTH = min;
    if (max) this.MAX_LENGTH = max;
  }

  /**
   * Validate field
   * @param value
   * @param message
   * @private
   */
  public async validate(value: number | string | null, message?: string) {
    if (!this.res) return;

    let validationSchema = yup
      .string()
      .min(this.MIN_LENGTH)
      .max(this.MAX_LENGTH);
    if (this.REQUIRED) validationSchema = validationSchema.required();

    const isValid = await validationSchema.isValid(value);

    if (!isValid) {
      Error.res(
        this.res,
        400,
        message ??
          `Invalid value: ${value}. Allowed number of characters: ${this.MIN_LENGTH} - ${this.MAX_LENGTH}`
      );

      throw new Error();
    }
  }
}
