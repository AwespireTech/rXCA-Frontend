import "./globals.css"
import type { Metadata } from "next"
import { Noto_Sans_SC } from "next/font/google"
import { XCAProvider } from "@/hooks/useXCA"
import Header from "@/components/organisms/header"

const noto = Noto_Sans_SC({ weight: "400", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RXCA",
  description: "RXCA",
  icons: "/favicon.ico"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`m-0 min-h-screen w-full bg-primary p-0 text-white ${noto.className}`}>
        <XCAProvider>
          <Header />
          <main className="relative m-auto flex min-h-full flex-col items-center gap-12 bg-primary px-8 py-24 xl:w-[70%]">
            {children}
          </main>
        </XCAProvider>
      </body>
    </html>
  )
}
