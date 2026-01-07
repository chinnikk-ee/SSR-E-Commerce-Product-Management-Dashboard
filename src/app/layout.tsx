import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "SSR E-commerce Admin Dashboard"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
