import Image from "next/image"
import NextLink from 'next/link'
import { useTheme, Text, Spacer, Link } from "@nextui-org/react"

export const Navbar = () => {

  const { theme } = useTheme()

  return (
    <div style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '0 20px',
        backgroundColor: theme?.colors.gray100.value
    }}>
        <Image
            // realizar configuracion en next.config
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/132.png"
            alt="Icono de la app"
            width={90}
            height={90}
        />

        <NextLink href="/" passHref>
            <Text color='white' h2>Pokémon</Text>
        </NextLink>

        <Spacer style={{ flex : '1'}}/>

        <NextLink href="/favorites" passHref>
            <Text color='white' h3>Favoritos</Text>
        </NextLink>
      
    </div>
  )
}
