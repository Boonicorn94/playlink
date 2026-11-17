import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PLAYLINK — Find your next thing",
  description: "Discover activities, meet people, play together and host your own experiences.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}