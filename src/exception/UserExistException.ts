import { AppBaseException } from "./AppBaseException";
import Errors from "../config/constant/Errors";

export class UserExistException extends AppBaseException {
  constructor() {
    super(Errors.auth.UserExist);
  }
}
