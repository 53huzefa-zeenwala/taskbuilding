import Head from 'next/head'
import React from 'react'

export default function HeadComponent() {
    return (
        <Head>
            <title>Tsks - Track Your Task</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
            <meta property="og:description" content="Tsks Track Your Task is an innovative and convenient way to help you manage all your tasks and prioritize whats most important." />
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/favicon/apple-touch-icon.png"
            />
            <link
                rel="icon"
                sizes="192x192"
                type="image/png"
                href="/favicon/android-chrome-192x192.png"
            />
            <link
                rel="icon"
                sizes="512x512"
                type="image/png"
                href="/favicon/android-chrome-512x512.png"
            />

            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicon/favicon-32x32.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicon/favicon-16x16.png"
            />
            <link rel="manifest" href="/favicon/site.webmanifest" />
            <meta property="og:type" content="website" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#000" />

            <meta property="og:title" content="Tsks - Track Your Task" />
            <meta property="og:image" content="/favicon/favicon-32x32.png" />
            <meta property="og:site_name" content="Tsks - Track Your Task" />
            <meta property="twitter:title" content="Tsks - Track Your Task" />
            <meta property="twitter:description" content="Tsks Track Your Task is an innovative and convenient way to help you manage all your tasks and prioritize whats most important." />
        </Head>
    )
}
