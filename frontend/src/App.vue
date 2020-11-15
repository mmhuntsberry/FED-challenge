<template>
  <div id="app">
    <header class="header">
      <Nav />
      <input type="text" />
      <select name="types" id="type-select">
        <option value="">--Please choose an option--</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="hamster">Hamster</option>
        <option value="parrot">Parrot</option>
        <option value="spider">Spider</option>
        <option value="goldfish">Goldfish</option>
      </select>
    </header>
    <router-view :pokemons="result.pokemons.edges" />
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import { ALL_POKEMON_QUERY } from "./graphql/queries";
import { useQuery } from "@vue/apollo-composable";

export default {
  components: { Nav },
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
