<template>
  <ul class="card__container">
    <Card
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      :pokemon="pokemon"
      :viewLayout="viewLayout"
    />
  </ul>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";
export default {
  name: "list",
  components: {
    Card
  },
  props: ["pokemons", "loading", "error", "viewLayout"]
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
