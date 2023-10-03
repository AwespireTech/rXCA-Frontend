import "./globals.css"
import type { Metadata } from "next"
import { Monda } from "next/font/google"
import Header from "./components/organisms/header"

const monda = Monda({ weight: "400", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "dXCA",
  description: "dXCA"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`m-0 h-screen w-full bg-primary p-0 text-white ${monda.className}`}>
        <main className="flex h-full w-full flex-col items-center gap-8 bg-primary px-8 py-4">
          {children}
        </main>
      </body>
    </html>
  )
}
