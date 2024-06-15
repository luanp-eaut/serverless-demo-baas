// "use server";

import "../styles/globals.css";
import Footer from "@/components/Footer";
import { ThemeProvider } from "next-themes";
import { cookies } from "next/headers";
import {
  SESSION_COOKIE_NAME,
  ROLL_CALL_ROUTE,
  ROOT_ROUTE,
} from "@/lib/constants";
import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";
import { AuthProvider } from "@/components/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = cookies().get(SESSION_COOKIE_NAME)?.value || null;

  async function createSession(uid: string) {
    "use server";
    cookies().set(SESSION_COOKIE_NAME, uid, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // One day
      path: "/",
    });
    redirect(ROOT_ROUTE);
  }

  async function removeSession() {
    "use server";
    cookies().delete(SESSION_COOKIE_NAME);
    redirect(ROOT_ROUTE);
  }
  return (
    <html lang="en">
      <head />
      <body className="dark:bg-stone-900">
        <ThemeProvider enableSystem={true} attribute="class">
          <AuthProvider>
            <div className="h-screen w-full flex flex-col justify-between overflow-hidden">
              <Navbar
                session={session}
                createSession={createSession}
                removeSession={removeSession}
              />
              <div className="flex flex-grow justify-center overflow-hidden w-full">
                <div className="m-auto w-full h-full">{children}</div>
              </div>
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
