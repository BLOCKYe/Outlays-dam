import Validator from "./Validator";
import * as yup from "yup";
import Error from "../Error/Error";
import type { NextApiResponse } from "next";

export default class StringValidator extends Validator {
  private readonly MIN_PASSWORD_LENGTH: number = 1;

  constructor(res: NextApiResponse, min: number) {
    super(res);
    this.MIN_PASSWORD_LENGTH = min;
  }

  /**
   * Validate field
   * @param value
   * @param message
   * @private
   */
  public async validate(value: number | string | null, message?: string) {
    if (!this.res) return;

    const validationSchema = yup
      .string()
      .min(this.MIN_PASSWORD_LENGTH)
      .required();
    const isValid = await validationSchema.isValid(value);

    if (!isValid) {
      return Error.res(this.res, 400, message ?? `Invalid value: ${value}`);
    }

    return true;
  }
}
