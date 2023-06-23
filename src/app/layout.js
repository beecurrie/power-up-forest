import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Power Up Forest',
    description: 'Power Up Forest is a web app that helps you build habits and achieve your goals.',
}

export default function RootLayout({ children }) {
return (
    <html lang="en">
        <body className={inter.className}>
            {children}
        </body>
    </html>
)
}
