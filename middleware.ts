import { type NextRequest, NextResponse } from "next/server";
import {
  ROLL_CALL_ROUTE,
  LECTURE_ROUTE,
  ROOT_ROUTE,
  SESSION_COOKIE_NAME,
} from "./lib/constants";

const protectedRoutes = [ROLL_CALL_ROUTE, LECTURE_ROUTE];

export default function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value || "";

  if (!session && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL(ROOT_ROUTE, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
