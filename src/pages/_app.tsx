import { AppProps } from "next/app" // defininir tipagem para os componentes
import { Header } from "../components/Header"
import "../styles/global.scss"  

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header></Header>
      <Component {...pageProps} />
    </>
    
  )
}
