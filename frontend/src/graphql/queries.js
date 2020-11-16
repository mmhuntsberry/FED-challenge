import { gql } from "apollo-boost";

export const ALL_POKEMON_QUERY = gql`
  query allPokemonQuery($limit: Int) {
    pokemons(query: { limit: $limit }) {
      edges {
        id
        name
        classification
        types
        resistant
        weaknesses
        weight {
          minimum
          maximum
        }
        height {
          minimum
          maximum
        }
        fleeRate
        evolutionRequirements {
          amount
          name
        }
        evolutions {
          name
        }
        maxCP
        maxHP
        attacks {
          fast {
            name
            type
            damage
          }
          special {
            name
            type
            damage
          }
        }
        image
        sound
        isFavorite
      }
    }
  }
`;

export const ALL_TYPES_QUERY = gql`
  query {
    pokemonTypes
  }
`;
