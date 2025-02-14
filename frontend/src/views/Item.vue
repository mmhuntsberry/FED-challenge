<template>
  <keep-alive>
    <div class="item__container">
      <div class="item__image-container">
        <button class="button__sound" @click="playSound(getPokemon.sound)">
          <img src="../assets/speaker.svg" alt="Speaker" />
        </button>
        <img
          class="item__image"
          :src="getPokemon.image"
          :alt="getPokemon.name"
        />
      </div>
      <div class="item__details-container">
        <div class="item__name-container">
          <div>
            <h4 class="card__title">{{ getPokemon.name }}</h4>
            <ul class="types__container">
              <li class="card__subtext">
                {{ getPokemon.types.join(", ") }}
              </li>
            </ul>
          </div>
          <button class="list__button" @click="handleClick(getPokemon)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16px"
              height="16px"
              viewBox="0 0 16 16"
              class="card__favorite"
            >
              <path
                :class="[!getPokemon.isFavorite ? 'heart' : 'heart--is-active']"
                d="M8
          2.945312C6.117188-.851562 0 .238281 0 5.125c0 4.847656 6.601562
          7.292969 8 10.207031C9.398438 12.417969 16 9.972656 16 5.125 16
          .242188 9.886719-.855469 8 2.945312zm0 0"
              />
            </svg>
          </button>
        </div>
        <div class="item__powers-container">
          <div class="power__container">
            <span class="powerbar powerbar--cp"></span>
            <span>CP: {{ getPokemon.maxCP }}</span>
          </div>
          <div class="power__container">
            <span class="powerbar powerbar--hp"></span>
            <span>HP: {{ getPokemon.maxHP }}</span>
          </div>
        </div>
        <div class="item__attibutes-container">
          <div class="item__attibute">
            <span class="attribute__title">Weight</span>
            <span class="attibute"
              >{{ getPokemon.weight.minimum }} -
              {{ getPokemon.weight.maximum }}</span
            >
          </div>
          <div class="item__attibute">
            <span class="attribute__title">Height</span>
            <span class="attibute"
              >{{ getPokemon.height.minimum }} -
              {{ getPokemon.height.maximum }}</span
            >
          </div>
        </div>
      </div>
      <div class="evolutions__container">
        <h4>Evolutions</h4>
        <ul class="evolutions__list" v-if="getEvolutions.length">
          <Evolution
            v-for="pokemon in getEvolutions"
            :key="pokemon.id"
            :pokemon="pokemon"
            :isFavorite="pokemon.isFavorite"
          />
        </ul>
        <div v-else>No evolutions</div>
      </div>
    </div>
  </keep-alive>
</template>

<script>
import Evolution from "@/components/Evolution.vue";

export default {
  components: { Evolution },
  props: ["param", "pokemons"],
  data() {
    return {
      name: this.$route.params.name
    };
  },
  computed: {
    favorites() {
      return this.$store.state.favorites;
    },
    viewLayout() {
      return this.$store.state.viewLayout;
    },
    getPokemon() {
      return this.pokemons.find(
        pokemon => pokemon.name.toLowerCase() === this.param.name.toLowerCase()
      );
    },
    getEvolutions() {
      const found = this.pokemons.find(pokemon => {
        return pokemon.name.toLowerCase() === this.param.name.toLowerCase();
      });

      return this.pokemons.reduce((filtered, curr) => {
        found.evolutions.filter(pokemon => {
          if (curr.name === pokemon.name) {
            filtered.push(curr);
          }
        });
        return filtered;
      }, []);
    }
  },
  methods: {
    playSound(sound) {
      if (sound) {
        var audio = new Audio(sound);
        audio.play();
      }
    },
    handleClick(pokemon) {
      if (!pokemon.isFavorite) {
        pokemon.isFavorite = !pokemon.isFavorite;
        this.favorites.push(pokemon);
      } else {
        const foundIndex = this.favorites.findIndex(
          p => p.name.toLowerCase() === pokemon.name.toLowerCase()
        );
        pokemon.isFavorite = !pokemon.isFavorite;
        this.favorites.splice(foundIndex, 1);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.item__container {
  border: 1px solid var(--grey-01);
  margin: var(--spacing-02);
}
.item__image-container {
  display: grid;
  grid-template-columns: 25px 1fr;
  padding: var(--spacing-02) 0;
}

.button__sound {
  align-self: end;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  padding-left: var(--spacing-06);
  padding-bottom: var(--spacing-02);
}

.item__image {
  justify-self: center;
}

.item__details-container {
  display: grid;
  background-color: var(--white-01);
}

.item__name-container {
  display: grid;
  grid-template-columns: 1fr 24px;
  justify-content: space-between;
  padding: var(--spacing-04);
}

.types__container {
  margin: 0;
}

.power__container {
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr 70px;
  padding: 0 var(--spacing-04) var(--spacing-02);

  &:last-child {
    margin-bottom: var(--spacing-04);
  }
}

.powerbar {
  margin-right: var(--spacing-01);
  align-self: center;
  display: block;
  border-radius: 5px;
  height: 10px;

  &--cp {
    background-color: var(--purple);
  }

  &--hp {
    background-color: var(--green);
  }
}

.evolutions__container {
  margin-left: var(--spacing-04);
}

.evolutions__list {
  display: flex;
  gap: var(--spacing-02);
}

.item__attibutes-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-content: center;
  height: 100px;
  border: 1px solid var(--grey-01);
}

.item__attibute {
  width: 100%;
  height: 100px;
  display: grid;
  justify-items: center;

  &:last-child {
    border-left: 1px solid var(--grey-01);
  }
}

.attribute__title {
  align-self: end;
  margin-bottom: var(--spacing-02);
}
</style>
