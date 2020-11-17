<template>
  <ul :class="[viewLayout.isGrid ? 'card__container' : 'list__container']">
    <Card
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      :pokemon="pokemon"
      :viewLayout="viewLayout"
      :isFavorite="isFavorite"
      data-testid="list-items"
    />
  </ul>
</template>

<script>
import Card from "@/components/Card.vue";
export default {
  name: "list",
  components: {
    Card
  },
  props: ["pokemons", "loading", "error", "viewLayout", "isFavorite"],
  computed: {
    favorites() {
      return this.$store.state.favorites;
    }
  }
};
</script>

<style lang="scss">
.card__container {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-04);
  margin: 0;
  justify-content: center;
}

.list__container {
  display: block;
  margin: 0 auto;
  width: 600px;
}
</style>
