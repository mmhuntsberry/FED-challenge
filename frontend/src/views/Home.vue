<template>
  <div>
    <div v-if="loading">
      <h2>Loading</h2>
    </div>
    <div v-else-if="error">
      <h2>{{ error }}</h2>
    </div>
    <ul v-else class="card__container">
      <Card
        v-for="pokemon in result.pokemons.edges"
        :key="pokemon.id"
        :pokemon="pokemon"
      />
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import { gql } from "apollo-boost";
import { useQuery } from "@vue/apollo-composable";
import Card from "@/components/Card.vue";

const ALL_POKEMON_QUERY = gql`
  query {
    pokemons(query: {}) {
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

export default {
  name: "home",
  components: {
    Card
  },
  setup() {
    let { result, loading, error } = useQuery(ALL_POKEMON_QUERY);

    return {
      result,
      loading,
      error
    };
  }
};
</script>

<style lang="scss" scoped>
.card__container {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-04);
  margin: 0;
  justify-content: center;
}
</style>
