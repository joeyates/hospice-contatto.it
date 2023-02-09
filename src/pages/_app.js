import localFont from '@next/font/local'

import Nav from '@/components/nav'
import './_app.sass'

const ubuntuFont = localFont({src: './fonts/Ubuntu-Regular.ttf'})

const App = ({Component, pageProps}) => (
  <div className={ubuntuFont.className}>
    <Nav/>
    <Component {...pageProps} />
  </div>
)

export default App
