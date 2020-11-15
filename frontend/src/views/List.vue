<template>
  <div>
    <div v-if="loading">
      <h2>Loading</h2>
    </div>
    <div v-else-if="error">
      <h2>{{ error }}</h2>
    </div>
    <ul v-else class="card__container">
      <Card v-for="pokemon in pokemons" :key="pokemon.id" :pokemon="pokemon" />
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";
export default {
  name: "list",
  components: {
    Card
  },
  props: ["pokemons"]
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
