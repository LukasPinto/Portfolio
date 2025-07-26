'use server'
import { Geist } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Roboto } from "next/font/google";
import { responsiveFontSizes } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme";
import { ColorModeProvider } from "../components/ui/color-mode"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
import { Provider } from "../components/ui/provider"

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});


// const darkTheme = responsiveFontSizes(theme)
export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html lang="en" className={roboto.variable} suppressHydrationWarning>
      <body >
        <Provider>
          {children}
        </Provider>

      </body>
    </html>
  );
}
