import "./globals.css";

export const metadata = {
  title: "Editor — Draft",
  description: "Um editor de texto para blog no estilo Medium",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
