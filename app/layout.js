import localFont from '@next/font/local'

import './globals.sass'
import Footer from '@components/Footer'
import Nav from '@components/Nav'
import {DEFAULTS} from '@lib/metadata'
import styles from './layout.module.sass'

const ubuntuFont = localFont({src: './fonts/Ubuntu-Regular.ttf'})

const RootLayout = ({children}) => (
  <html lang="it" className={`${ubuntuFont.className} ${styles.html}`}>
    <body className={styles.body}>
      <Nav/>
      {children}
      <Footer/>
    </body>
  </html>
)

const metadata = DEFAULTS

export {metadata}
export default RootLayout
