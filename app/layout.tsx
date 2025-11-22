import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { AuthProvider } from "../src/contexts/AuthContext";
import { Toaster } from "sonner"; // 👈 si usas sonner para notificaciones
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  openGraph: {
    title: "La Era de la IA: Descifrando la Inteligencia Artificial | Babelink",
    description:
      "Te ofrece una visión clara y concisa de las últimas innovaciones y tendencias en inteligencia artificial, ayudándote a comprender cómo esta tecnología está moldeando el futuro. Ideal para quienes desean estar al día con el mundo de la IA.",
    url: "https://babelink.com.mx",
    siteName: "Babelink",
    images: [
      {
        url: "https://babelink.com.mx/_next/image?url=%2Fimages%2FImagen%20provi.jpg&w=640&q=75", // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: "https://babelink.com.mx/_next/image?url=%2Fimages%2FImagen%20provi.jpg&w=640&q=75", // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  alternates: {
    canonical: "https://babelink.com.mx",
  },
  title: "La Era de la IA: Descifrando la Inteligencia Artificial | Babelink",
  description:
    "Te ofrece una visión clara y concisa de las últimas innovaciones y tendencias en inteligencia artificial, ayudándote a comprender cómo esta tecnología está moldeando el futuro. Ideal para quienes desean estar al día con el mundo de la IA.",
  icons: {
    icon: "https://babelink.com.mx/_next/image?url=%2Fimages%2FLogo%20Babelink%2FLogo%20sin%20fondo%20para%20uso%20general%20(5).png&w=48&q=75",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "La Era de la IA: Descifrando la Inteligencia Artificial | Babelink",
    description:
      '"Te ofrece una visión clara y concisa de las últimas innovaciones y tendencias en inteligencia artificial, ayudándote a comprender cómo esta tecnología está moldeando el futuro. Ideal para quienes desean estar al día con el mundo de la IA.',
    creator: "@nextjs",
    images: [
      "https://babelink.com.mx/_next/image?url=%2Fimages%2FImagen%20provi.jpg&w=640&q=75",
    ], // Must be an absolute URL
  },
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const renderPage = () => {
    return children; // 👈 Next.js renderiza aquí la página actual
  };

  return (
    <html lang="en" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <div className="min-h-screen bg-white">
            <Header />
            {renderPage()}
            <Footer />
            <Toaster position="top-center" richColors />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
