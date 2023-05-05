import Validator from "./Validator";
import * as yup from "yup";
import Error from "../Error/Error";
import type { NextApiResponse } from "next";

export default class NumberValidator extends Validator {
  private readonly ONLY_POSITIVE: boolean = false;

  constructor(res: NextApiResponse, required?: boolean, positive?: boolean) {
    super(res, required);

    if (positive) this.ONLY_POSITIVE = positive;
  }

  /**
   * Validate field
   * @param value
   * @param message
   * @private
   */
  public async validate(value: number | string | null, message?: string) {
    if (!this.res) return;

    let validationSchema = yup.number();
    if (this.REQUIRED) validationSchema = validationSchema.required();
    if (this.ONLY_POSITIVE) validationSchema = validationSchema.positive();

    const isValid = await validationSchema.isValid(value);

    if (!isValid) {
      Error.res(this.res, 400, message ?? `Invalid value: ${value}.`);
      throw new Error();
    }
  }
}
