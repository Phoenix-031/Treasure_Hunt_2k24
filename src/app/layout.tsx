import type { Metadata } from "next";
import '../sass/global.scss';
import { Fonts } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Fonts.inter.className} ${Fonts.roboto.className}`}>{children}</body>
    </html>
  );
}
