import { AppProps } from "next/app" // defininir tipagem para os componentes
import { Header } from "../components/Header"
import { SessionProvider } from "next-auth/react"

import "../styles/global.scss"  

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Header></Header>
        <Component {...pageProps} />
      </SessionProvider>  
    </>
    
  )
}
