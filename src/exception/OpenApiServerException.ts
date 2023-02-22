import { AppBaseException } from "./AppBaseException";
import Errors from "../config/constant/Errors";

export class OpenApiServerException extends AppBaseException{
  constructor( ) {
    super(Errors.auth.OpenApiServerError);
  }

}