import { NextPage, GetStaticProps } from 'next'
import { Inter } from 'next/font/google'
//import { Button } from '@nextui-org/react'
import { Layout } from '../../components/layouts'
import { pokeApi } from '../../api'
import { PokemonListResponse, SmallPokemon } from '../../interfaces';
import { Grid } from '@nextui-org/react';
import { PokemonCard } from '../../components/pokemon';

const inter = Inter({ subsets: ['latin'] })

interface Props {
  pokemons : SmallPokemon[]
}

const HomePage: NextPage<Props> = ({pokemons}) => {

  //console.log({pokemons});

  return (
    
    <Layout title='Listado de Pokemons'>

      <Grid.Container gap={2} justify='flex-start'>
      {/*<Button color="gradient">Hola mundo...</Button>*/}

        {
          pokemons.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon}/>
          ))
        }

      </Grid.Container>
    </Layout>
  )
}

//If you export a function called getStaticProps (Static Site Generation) from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps.
export const getStaticProps: GetStaticProps = async(ctx) => {

  const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  //console.log({data});
  // añadimos el id y la img
  const pokemons: SmallPokemon[] = data.results.map((poke,i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${ i + 1 }.png`,
  }))

  return {
    // props del componente
    props: {
      //name: 'Jorge RG',
      //pokemons: data.results
      pokemons
    }
  }
}

export default HomePage;
