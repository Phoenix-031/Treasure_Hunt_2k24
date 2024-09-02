import type { Metadata } from "next";
import '../sass/global.scss';
import { Fonts } from "@/lib/fonts";

import StoreProvider from "@/store/StoreProvider";
import QueryProvider from "@/query/QueryProvider";
import PermissionPopupWrapper from "@/components/PermissionPopup/PermissionPopupWrapper";

import { Toaster } from "sonner";


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
      <body className={`${Fonts.inter.className} ${Fonts.roboto.className}`}>
        <StoreProvider>
          <QueryProvider>
            {children}
            <Toaster position="top-right" richColors/>
            {/* <PermissionPopupWrapper /> */}
          </QueryProvider>
        </StoreProvider>

      </body>
    </html>
  );
}