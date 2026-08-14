export const metadata = {
  title: "RedFlow AI",
  description: "AI content operating assistant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
