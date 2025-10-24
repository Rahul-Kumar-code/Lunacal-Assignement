import "@fontsource/inter";
import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Lunacal Assignment",
  description: "Prototype assignment by Rahul",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-gray-100 font-sans">
        <div className="flex h-screen">{children}</div>
      </body>
    </html>
  );
}
