import React from "react";
import DashboardProvider from "./provider";
import { ThemeProvider } from "./_components/theme-provider";
import './globals.css'; // ✅ Make sure this line is present and correct


function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <DashboardProvider>
            {children}
          </DashboardProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default DashboardLayout;