import Head from "next/head"
import { FC, ReactNode } from 'react';
import { Navbar } from '../ui';

interface Props {
  title?: string;
  children?:ReactNode;
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin;

export const Layout: FC<Props> = ({children, title}) => {

  return (
    <>
        <Head>
            <title>{ title || 'PokemonApp' }</title>
            <meta name="author" content="Jorge RG"/>
            <meta name="description" content={ `Información sobre el pokemon ${title}` }/>
            <meta name="keywords" content={`${title}, pokemons, pokedex `}/>
         
            <meta property="og:title" content={`Información sobre ${ title }`} />
            <meta property="og:description" content={`Esta es la página sobre ${ title }`} />
            <meta property="og:image" content={`${ origin }/img/banner.png`} />

        </Head>

        {/* <NavBar/> */}
        <Navbar/>

        <main style={{
          padding: '0 20px'
        }}>
            {children}
        </main>
    </>
  )
}
