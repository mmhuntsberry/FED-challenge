<template>
  <ul :class="[viewLayout.isGrid ? 'card__container' : 'list__container']">
    <Card
      v-for="pokemon in favorites"
      :key="pokemon.id"
      :viewLayout="viewLayout"
      :pokemon="pokemon"
      :isFavorite="isFavorite"
      :favorites="favorites"
    />
  </ul>
</template>

<script>
import Card from "@/components/Card.vue";
export default {
  props: ["favorites", "viewLayout", "isFavorite"],
  components: {
    Card
  }
};
</script>

<style lang="scss"></style>
