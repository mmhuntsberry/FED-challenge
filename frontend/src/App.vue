<template>
  <div id="app">
    <header class="header">
      <Nav />
      <input type="text" v-model="state.searchText" />
      <div v-if="state.tloading">Loading...</div>

      <select v-else v-model="state.selected" required>
        <option disabled value="">Type</option>
        <option value="All">All</option>
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
    <!-- <router-view v-else :pokemons="state.filterByText" /> -->
    <router-view v-else :pokemons="state.filterPokemons" />
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import { ALL_POKEMON_QUERY, ALL_TYPES_QUERY } from "./graphql/queries";
import { useQuery } from "@vue/apollo-composable";
import { ref, reactive, computed } from "@vue/composition-api";
import _ from "lodash";

export default {
  components: { Nav },
  data() {
    return {};
  },
  computed: {},
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
      selected: "",
      searchText: "",
      filterPokemons: computed(() => {
        let filter = new RegExp(state.selected, "i");
        if (state.selected === "All") {
          return state.result.pokemons.edges.filter(p =>
            p.name.toLowerCase().includes(state.searchText.toLowerCase())
          );
        }
        const filtered = state.result.pokemons.edges.reduce(
          (filtered, curr) => {
            curr.types.filter(type => {
              if (type.match(filter)) {
                filtered.push(curr);
              }
            });
            return _.uniq(filtered, "id");
          },
          []
        );
        return filtered.filter(p =>
          p.name.toLowerCase().includes(state.searchText.toLowerCase())
        );
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
