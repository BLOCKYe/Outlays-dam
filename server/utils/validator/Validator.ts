import Error from "../Error/Error";
import * as yup from "yup";
import type { NextApiResponse } from "next";

export default class Validator {
  protected readonly res: NextApiResponse | null = null;

  constructor(res: NextApiResponse) {
    this.res = res;
  }

  /**
   * Validate field
   * @param value
   * @param message
   * @private
   */
  public async validate(value: number | string | null, message?: string) {
    if (!this.res) return;

    const validationSchema = yup.string().min(1).required();
    const isValid = await validationSchema.isValid(value);

    if (!isValid) {
      return Error.res(this.res, 400, message ?? `Invalid field: ${value}`);
    }

    return true;
  }
}
