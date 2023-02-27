import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet"/>
        <link rel="shortcut icon" href="favicon.png" type="image/png" />
      </Head>
      <body>
        <Main />
        <NextScript /> {/*ONDE O NEXT COLOCARÁ AS APLICAÇÕES JSX*/}
      </body>
    </Html>
  )
}
