import "./globals.css";
import { Provider } from "@/components/ui/provider"

export const metadata = {
  title: "Andrew Dashboard",
  description: "A dashboard for Andrew to track his life",
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
