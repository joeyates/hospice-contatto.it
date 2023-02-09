import localFont from '@next/font/local'

import Nav from '@/components/nav'
import './_app.sass'

const ubuntuFont = localFont({src: './fonts/Ubuntu-Regular.ttf'})

export default function App({ Component, pageProps }) {
  return (
    <div className={ubuntuFont.className}>
      <Nav/>
      <Component {...pageProps} />
    </div>
  )
}
