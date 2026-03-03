import "./globals.css";
import Providers from "./provider";

export const metadata = {
  title: "Andrew Dashboard",
  description: "A dashboard for Andrew to track his life",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers> {children}</Providers>
      </body>
    </html>
  );
}
