
const toggleFavorite = ( id: number) => {

    let favorites: number[] = JSON.parse(localStorage.getItem('favoritos') || '[]' );

    if(favorites.includes(id)){
        favorites = favorites.filter(pokeId => pokeId !== id)
    }else{
        favorites.push(id);
    }

    localStorage.setItem('favoritos', JSON.stringify(favorites) );
}

const exitInFavorites = ( id: number ): boolean => {

    if ( typeof window === 'undefined' ) return false;

    const favorites: number[] = JSON.parse(localStorage.getItem('favoritos') || '[]' );

    return favorites.includes(id)
}

const pokemons = (): number[] => {
    return JSON.parse( localStorage.getItem('favoritos') || '[]' );
}

export default {
    toggleFavorite,
    exitInFavorites,
    pokemons,
}