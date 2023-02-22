import { AppBaseException } from "./AppBaseException";
import Errors from "../config/constant/Errors";

export class ExtendCallLimitException extends AppBaseException{
  constructor() {
    super(Errors.auth.ExtendCallLimit);
  }
}