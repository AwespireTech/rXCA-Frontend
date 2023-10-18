import "./globals.css"
import type { Metadata } from "next"
import { Monda } from "next/font/google"
import { XCAProvider } from "@/hooks/useXCA"
import Header from "@/components/organisms/header"

const monda = Monda({ weight: "400", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RXCA",
  description: "RXCA"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`m-0 h-screen w-full bg-primary p-0 text-white ${monda.className}`}>
        <main className="relative m-auto flex min-h-full w-[90%] flex-col items-center gap-12 bg-primary px-8 py-4 xl:w-[70%]">
          <XCAProvider>
            <Header />
            {children}
          </XCAProvider>
        </main>
      </body>
    </html>
  )
}
