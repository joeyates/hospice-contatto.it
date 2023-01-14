import localFont from '@next/font/local'

import '@/styles/globals.css'

const ubuntuFont = localFont({src: './fonts/Ubuntu-Regular.ttf'})

export default function App({ Component, pageProps }) {
  return (
    <main className={ubuntuFont.className}>
      <Component {...pageProps} />
    </main>
  )
}
