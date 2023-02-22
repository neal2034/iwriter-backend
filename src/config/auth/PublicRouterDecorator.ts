import { SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_ROUTER_KEY = "isPublicRouter"
export const PublicRouter = ()=> SetMetadata(IS_PUBLIC_ROUTER_KEY, true);