import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pawly — Grooming your dog actually enjoys",
  description:
    "Gentle, vet-approved grooming tools and coat care that turn bath-time battles into tail wags. Backed by the 90-day Pawly Promise.",
  openGraph: {
    title: "Pawly — Grooming your dog actually enjoys",
    description:
      "Gentle, vet-approved grooming tools and coat care that turn bath-time battles into tail wags. Backed by the 90-day Pawly Promise.",
    type: "website",
  },
};

/* System font stack (no webfont download) keeps first paint fast and
   font-related CLS at zero — part of the Lighthouse 90+ budget. */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-sans">
      <body>{children}</body>
    </html>
  );
}
