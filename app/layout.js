'use client'

import localFont from '@next/font/local'

import './globals.sass'
import Footer from '@components/Footer'
import Nav from '@components/Nav'

const SITE_TITLE = 'Progetto CONTATTO'

const ubuntuFont = localFont({src: './fonts/Ubuntu-Regular.ttf'})

const RootLayout = ({children}) => (
  <html lang="it" className={ubuntuFont.className}>
    <body>
      <Nav/>
      {children}
      <Footer/>
    </body>
  </html>
)

const metadata = {
  title: SITE_TITLE,
  description: 'Per un Hospice nel Valdarno Fiorentino e nella Valdisieve'
}

export {metadata}
export default RootLayout
