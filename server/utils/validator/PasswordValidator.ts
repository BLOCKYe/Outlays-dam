import Validator from "./Validator";
import * as yup from "yup";
import Error from "../Error/Error";

export default class PasswordValidator extends Validator {
  private readonly MIN_PASSWORD_LENGTH = 5;

  /**
   * Validate field
   * @param value
   * @param message
   * @private
   */
  public async validate(value?: number | string | null, message?: string) {
    if (!this.res) return;

    const validationSchema = yup
      .string()
      .min(this.MIN_PASSWORD_LENGTH)
      .required();
    const isValid = await validationSchema.isValid(value);

    if (!isValid) {
      return Error.res(
        this.res,
        400,
        message ??
          `The password should contain at least ${this.MIN_PASSWORD_LENGTH} characters`
      );
    }

    return true;
  }
}
