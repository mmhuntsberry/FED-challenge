<template>
  <li :class="[viewLayout.isGrid ? 'card' : 'list']">
    <router-link class="card__image-link" :to="'/' + pokemon.name">
      <img
        :class="[viewLayout.isGrid ? 'card__image' : 'list__image']"
        :src="pokemon.image"
        :alt="pokemon.name"
      />
    </router-link>
    <div
      :class="[
        viewLayout.isGrid
          ? 'card__details-container'
          : 'list__details-container'
      ]"
    >
      <div :class="[viewLayout.isGrid ? 'card__details' : 'list__details']">
        <router-link :to="'/' + pokemon.name">
          <h4 class="card__title">{{ pokemon.name }}</h4>
        </router-link>
        <ul>
          <li class="card__subtext">{{ pokemon.types.join(", ") }}</li>
        </ul>
      </div>
      <button
        :class="[viewLayout.isGrid ? 'card__button' : 'list__button']"
        @click="handleClick"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16px"
          height="16px"
          viewBox="0 0 16 16"
          class="card__favorite"
        >
          <path
            :class="[!this.pokemon.isFavorite ? 'heart' : 'heart--is-active']"
            d="M8
          2.945312C6.117188-.851562 0 .238281 0 5.125c0 4.847656 6.601562
          7.292969 8 10.207031C9.398438 12.417969 16 9.972656 16 5.125 16
          .242188 9.886719-.855469 8 2.945312zm0 0"
          />
        </svg>
      </button>
    </div>
  </li>
</template>

<script>
export default {
  name: "Card",
  props: ["pokemon", "viewLayout", "isFavorite", "favorites"],
  methods: {
    handleClick() {
      if (!this.pokemon.isFavorite) {
        this.pokemon.isFavorite = !this.pokemon.isFavorite;
        this.favorites.push(this.pokemon);
      } else {
        const foundIndex = this.favorites.findIndex(
          p => p.name.toLowerCase() === this.pokemon.name.toLowerCase()
        );
        this.pokemon.isFavorite = !this.pokemon.isFavorite;
        this.favorites.splice(foundIndex, 1);
      }
    }
  }
};
</script>

<style lang="scss">
.card {
  display: grid;
  grid-template-rows: 1fr 20%;
  border: 1px solid var(--grey-01);
  width: 200px;
  height: 350px;
}

.card__image {
  align-content: center;
  max-width: 100%;
  padding: 0px var(--spacing-04);
}

.card__image-link {
  display: grid;
  align-content: center;
}

.card__title {
  margin: 0;
}

.card__details-container {
  display: flex;
  justify-content: space-between;
  align-self: end;
  height: 60px;
  padding: 0px var(--spacing-04);
  background-color: var(--white-01);
}

.card__details {
  align-self: center;
}

.card__button {
  border: 0;
  padding: 0;
  height: 16px;
  align-self: center;
  cursor: pointer;
}

.card__favorite {
  overflow: visible;
  stroke-width: 2;
}

.heart {
  fill: none;
  stroke: var(--red);
}

.heart--is-active {
  fill: var(--red);
}

.card__subtext {
  display: inline;
  font-weight: lighter;
}

.list {
  display: grid;
  grid-template-columns: 75px 1fr 24px;
  border-top: 1px solid var(--grey-01);
  padding: 4px;

  &:first-child {
    border-top: none;
  }
}

.list__image {
  align-self: center;
  max-width: 100%;
  padding: 0px var(--spacing-04);
}

.list__details-container {
  display: grid;
  grid-template-columns: 1fr 24px;
  justify-content: space-evenly;
  background-color: var(--white);
  max-width: 100%;
}

.list__details {
  display: grid;
  grid-template-columns: 150px 1fr;
  align-content: center;
}

.list__button {
  background-color: transparent;
  border: 0;
  padding: 0;
  height: 16px;
  align-self: center;
  cursor: pointer;
}
</style>
