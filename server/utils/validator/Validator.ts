import type { NextApiResponse } from "next";

export default class Validator {
  protected readonly res: NextApiResponse | null = null;
  protected readonly REQUIRED: boolean = false;

  constructor(res: NextApiResponse, required?: boolean) {
    this.res = res;

    if (required) this.REQUIRED = required;
  }
}
