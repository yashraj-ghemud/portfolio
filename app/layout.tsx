import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Dev Ninja Portfolio",
  description: "Modern developer portfolio with animations",
  formatDetection: { telephone: false, email: false, address: false, date: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="bg-neutral-950 text-neutral-100 antialiased" suppressHydrationWarning>
        <div suppressHydrationWarning>
          {children}
          <Navbar />
        </div>
      </body>
    </html>
  );
}
