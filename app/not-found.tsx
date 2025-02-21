import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function NotFoundPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
        <div className="text-center">
            <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-4">
                Page not found
            </h2>
            <p className="text-muted-foreground mb-8">
                Sorry, we couldn&apos;t find the page you&apos;re looking for.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href='/' className='flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors'>
                    <ArrowLeft className='mr-2 h-4 w-4' />
                    Back to Dashboard
                </Link>
            </div>
            <footer className="mt-12 text-center text-sm text-muted-foreground">
                If you think this is a mistake, please contact us at
                <a href="mailto:fernandesalvesfabien@gmail.com" className="text-primary font-medium underline ml-2">
                    fernandesalvesfabien@gmail.com
                </a>
            </footer>
        </div>
    </div>
  )
}

export default NotFoundPage