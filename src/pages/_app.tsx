import { AppProps } from "next/app" // defininir tipagem para os componentes
import "../styles/global.scss"  

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
