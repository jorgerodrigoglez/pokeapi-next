
import { useState } from 'react'
import { GetStaticProps, NextPage, GetStaticPaths } from 'next'
//import { useRouter } from "next/router"
import { Card, Grid, Button, Text, Container } from '@nextui-org/react'
import confetti from 'canvas-confetti'
import { pokeApi } from '../../../api';
import { Layout } from "../../../components/layouts"
import { Pokemon } from '../../../interfaces'
import Image from 'next/image';
import { localFavorites } from '../../../utils';
import { getPokemonInfo } from '../../../utils/getPokemonInfo';


interface Props {
  pokemon: Pokemon
}


const PokemonPage: NextPage<Props> = ({ pokemon }) => {

  //console.log(pokemon);
  //const router = useRouter();
  //console.log(router.query);

  const [isInFavorites, setIsInFavorites] = useState(localFavorites.exitInFavorites( pokemon.id ));

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite( pokemon.id );
    setIsInFavorites(!isInFavorites);

    // canvas-conffety
    // instalar types - yarn add -D @types/canvas-confetti
    if ( isInFavorites ) return;
        
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      }
    })
  }
  

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: '5px' }} gap={ 2 }>
        <Grid xs={ 12 } sm={ 4 } >
          <Card isHoverable css={{ padding: '30px' }}>
              <Card.Body>
                <Card.Image 
                  src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png' }
                  alt={ pokemon.name }
                  width="100%"
                  height={ 200 }
                />
              </Card.Body>
          </Card>
        </Grid>

        <Grid xs={ 12 } sm={ 8 }>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform='capitalize'>{ pokemon.name }</Text>

              <Button
                color="gradient"
                ghost={ !isInFavorites }
                onClick={ onToggleFavorite }
              >
                { isInFavorites ? 'En Favoritos' : 'Guardar en favoritos' }
              </Button>
            </Card.Header>

            <Card.Body>

              <Container direction='row' display='flex' gap={ 0 }>
                  <Image 
                    src={ pokemon.sprites.front_default }
                    alt={ pokemon.name }
                    width={ 100 }
                    height={ 100 }
                  />
                  <Image 
                    src={ pokemon.sprites.back_default }
                    alt={ pokemon.name }
                    width={ 100 }
                    height={ 100 }
                  />
                  <Image 
                    src={ pokemon.sprites.front_shiny }
                    alt={ pokemon.name }
                    width={ 100 }
                    height={ 100 }
                  />
                  <Image 
                    src={ pokemon.sprites.back_shiny }
                    alt={ pokemon.name }
                    width={ 100 }
                    height={ 100 }
                  />

              </Container>

            </Card.Body>  
           </Card>
         </Grid>
      </Grid.Container>
    </Layout>
  )
}

// If a page has Dynamic Routes and uses getStaticProps, it needs to define a list of paths to be statically generated.
export const getStaticPaths: GetStaticPaths = async(ctx) => {

  const pokemons151 = [...Array(151)].map(( value, index ) => `${index + 1}`);
  //console.log({pokemons151})

  return {
    /*paths: [
      {
        params: { id: '1' }
      },
      {
        params: { id: '2' }
      },
      {
        params: { id: '3' }
      },
    ],*/
    paths: pokemons151.map( id => ({
      params: { id }
    })),

    fallback: 'blocking'
    // si la página no existe muestra error 404
    // fallback: false
  }
}


//If you export a function called getStaticProps (Static Site Generation) from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps.
export const getStaticProps: GetStaticProps = async({params}) => {
  //console.log(ctx.params);
  const { id } = params as { id: string };

  const {data} = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

  const pokemon = await getPokemonInfo(id);

  if(!pokemon){
    return{
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    // props del componente
    props: {
      //id: 1,
      //name: 'Picachu'
      pokemon
    },
    //revalidate: 86400 // 60*60*24
  }
}

export default PokemonPage