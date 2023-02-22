import { AppBaseException } from "./AppBaseException";
import Errors from "../config/constant/Errors";

export class UnAuthorizedException extends AppBaseException{
  constructor() {
    super(Errors.auth.UnAuthorized);
  }
}