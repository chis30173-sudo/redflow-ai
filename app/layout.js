import "./globals.css";

export const metadata = {
  title: "RedFlow AI",
  description: "AI 内容运营工作台"
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
