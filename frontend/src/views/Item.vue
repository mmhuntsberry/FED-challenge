<template>
  <div>
    <!-- <div v-if="state.loading">Loading....</div>
    <div v-else-if="state.error">{{ state.error }}</div> -->
    {{ state.getPokemon }}
  </div>
</template>

<script>
import { useQuery } from "@vue/apollo-composable";
import { ALL_POKEMON_QUERY } from "../graphql/queries";
import { reactive, computed } from "@vue/composition-api";

export default {
  props: ["param"],
  data() {
    return {
      name: this.$route.params.name
    };
  },
  setup(props) {
    let { result, loading, error } = useQuery(ALL_POKEMON_QUERY);
    const state = reactive({
      result,
      loading,
      error,
      getPokemon: computed(() => {
        return state.result.pokemons.edges.find(
          pokemon =>
            pokemon.name.toLowerCase() === props.param.name.toLowerCase()
        );
      })
    });
    return {
      state
    };
  }
};
</script>

<style lang="scss" scoped></style>
