import Validator from "./Validator";
import * as yup from "yup";
import Error from "../Error/Error";
import type { NextApiResponse } from "next";

export default class TypeValidator extends Validator {
  private readonly types: any[] = [];

  constructor(res: NextApiResponse, types: any[], required?: boolean) {
    super(res, required);

    this.types = types;
  }

  /**
   * Validate field
   * @param value
   * @param message
   * @private
   */
  public async validate(value: number | string | null, message?: string) {
    if (!this.res) return;

    let validationSchema = yup.string().oneOf(this.types);
    if (this.REQUIRED) validationSchema = validationSchema.required();
    const isValid = await validationSchema.isValid(value);

    if (!isValid) {
      Error.res(
        this.res,
        400,
        message ??
          `Invalid value: ${value}. Allowed types: ${this.types.join(", ")}`
      );

      throw new Error();
    }
  }
}
