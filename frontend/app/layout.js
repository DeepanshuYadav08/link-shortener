import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Link Shortener - Modern URL Shortening Service',
    description: 'Shorten your URLs with our modern, fast, and secure link shortening service',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                    <Navbar />
                    <main>{children}</main>
                </div>
            </body>
        </html>
    )
}
