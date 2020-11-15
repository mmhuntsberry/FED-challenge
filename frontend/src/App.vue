<template>
  <div id="app">
    <header class="header">
      <Nav />
      <input type="text" />
      <div v-if="state.tloading">Loading...</div>

      <select v-else required>
        <option disabled value="">Add a New label</option>
        <option
          v-for="type in state.tresult.pokemonTypes"
          :value="type"
          :key="type"
          >{{ type }}</option
        >
      </select>
    </header>
    <div v-if="state.loading">Loading....</div>
    <div v-else-if="state.error">{{ error }}</div>
    <router-view v-else :pokemons="state.filterByLabel" />
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import { ALL_POKEMON_QUERY, ALL_TYPES_QUERY } from "./graphql/queries";
import { useQuery } from "@vue/apollo-composable";
import { ref, reactive, computed } from "@vue/composition-api";

export default {
  components: { Nav },
  data() {
    return {
      selected: ""
    };
  },
  computed: {
    // filterByLabel() {
    //   console.log(this.result);
    //   let filter = new RegExp(this.selected, "i");
    //   return result.pokemons.edges.filter(el =>
    //     el.types.forEach(type => type.match(filter))
    //   );
    // }
  },
  setup() {
    let { result, loading, error } = useQuery(ALL_POKEMON_QUERY);
    let { result: tresult, loading: tloading, error: terror } = useQuery(
      ALL_TYPES_QUERY
    );

    const state = reactive({
      result,
      loading,
      error,
      tresult,
      tloading,
      terror,
      filterByLabel: computed(() => {
        // let filter = new RegExp("fire", "i");
        return state.result.pokemons.edges.filter(el => {
          console.log(el.types);
          return el.types.forEach(type => type.includes(this.selected));
        });
      })
    });

    return {
      state
    };
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  height: 120px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.25);
  border-bottom: 1px solid var(--grey-01);
  margin-bottom: var(--spacing-04);
  padding: var(--spacing-04) var(--spacing-04) 0;
}
</style>
