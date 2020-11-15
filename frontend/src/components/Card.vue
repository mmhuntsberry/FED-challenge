<template>
  <li class="card">
    <img class="card__image" :src="pokemon.image" :alt="pokemon.name" />
    <div class="card__details-container">
      <div class="card__details">
        <h4 class="card__title">{{ pokemon.name }}</h4>
        <ul>
          <li class="card__subtext">{{ pokemon.types.join(", ") }}</li>
        </ul>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16pt"
        height="16pt"
        viewBox="0 0 16 16"
        class="card__favorite"
      >
        <path
          class="heart heart--is-active"
          d="M8 2.945312C6.117188-.851562 0 .238281 0 5.125c0 4.847656 6.601562 7.292969 8 10.207031C9.398438 12.417969 16 9.972656 16 5.125 16 .242188 9.886719-.855469 8 2.945312zm0 0"
        />
      </svg>
    </div>
  </li>
</template>

<script>
export default {
  name: "Card",
  props: ["pokemon"]
};
</script>

<style lang="scss" scoped>
.card {
  display: grid;
  grid-template-rows: 1fr 20%;
  border: 1px solid var(--grey-01);
  width: 200px;
  height: 350px;
}

.card__image {
  align-self: center;
  max-width: 100%;
  padding: 0px var(--spacing-04);
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

.card__favorite {
  align-self: center;
  overflow: visible;
}

.heart {
  fill: none;
  stroke: var(--red);
}

.heart.heart--is-active {
  fill: var(--red);
}

.card__subtext {
  display: inline;
  font-weight: lighter;
}
</style>
