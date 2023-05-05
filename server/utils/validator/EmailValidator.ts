import Validator from "./Validator";
import * as yup from "yup";
import Error from "../Error/Error";

export default class EmailValidator extends Validator {
  /**
   * Validate field
   * @param value
   * @param message
   * @private
   */
  public async validate(value: number | string | null, message?: string) {
    if (!this.res) return;

    let validationSchema = yup.string().email();
    if (this.REQUIRED) validationSchema = validationSchema.required();
    const isValid = await validationSchema.isValid(value);

    if (!isValid) {
      Error.res(this.res, 400, message ?? `Invalid email value: ${value}`);

      throw new Error();
    }
  }
}
