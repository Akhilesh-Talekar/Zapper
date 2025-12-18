import Link from 'next/link';
import React from 'react'

const Homelayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className='flex flex-col h-screen bg-black p-4'>
            <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg px-6 py-4">
                <Link href="/" className="text-white text-3xl font-bold">Zapper</Link>
            </div>
            <div className='flex-1 mt-4 overflow-auto text-white'>
                {children}
            </div>
        </div>
    )
}

export default Homelayout
