<template>
  <div id="app">
    <header class="header">
      <Nav />
      <div class="header__controls">
        <input
          class="controls__filter"
          type="text"
          v-model="state.searchText"
          role="Search"
        />
        <div v-if="state.tloading">Loading...</div>
        <select
          class="controls__select"
          v-else
          v-model="state.selected"
          required
        >
          <option disabled value="">Type</option>
          <option value="All">All</option>
          <option
            v-for="type in state.tresult.pokemonTypes"
            :value="type"
            :key="type"
            >{{ type }}</option
          >
        </select>
        <div class="controls__view-container">
          <button class="view__button" @click="isListView">
            <img src="./assets/list.svg" alt="list view" />
          </button>
          <span class="vertical-rule">|</span>
          <button class="view__button" @click="isGridView">
            <img src="./assets/grid.svg" alt="grid view" />
          </button>
        </div>
      </div>
    </header>
    <div v-if="state.loading">Loading....</div>
    <div v-else-if="state.error">{{ error }}</div>
    <router-view
      v-else
      :pokemons="state.filterPokemons"
      :viewLayout="viewLayout"
    />
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import { ALL_POKEMON_QUERY, ALL_TYPES_QUERY } from "./graphql/queries";
import { useQuery } from "@vue/apollo-composable";
import { reactive, computed } from "@vue/composition-api";
import _ from "lodash";

export default {
  components: { Nav },
  data() {
    return {
      viewLayout: {
        isGrid: true,
        isList: false
      }
    };
  },
  methods: {
    isGridView() {
      this.viewLayout.isGrid = true;
    },
    isListView() {
      this.viewLayout.isGrid = false;
    }
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
      selected: "",
      searchText: "",
      filterPokemons: computed(() => {
        let filter = new RegExp(state.selected, "i");
        // handles the case if 'all' is selected but you still want to filter on text also
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

.header__controls {
  display: grid;
  grid-template-columns: 2fr 1fr 80px;
  gap: 8px;
  margin-top: 16px;
  height: 36px;
}

.controls__filter {
  border: 0;
  background-color: var(--white-01);
}

.controls__select {
  border: none;
  background-color: var(--white-01);
  appearance: none;
  background-image: url("./assets/caret.svg");
  background-repeat: no-repeat, repeat;
  /* arrow icon position (1em from the right, 50% vertical) , then gradient position*/
  background-position: right 0.7em top 50%, 0 0;
  /* icon size, then gradient */
  background-size: 0.65em auto, 100%;
  cursor: pointer;
}

.controls__view-container {
  display: flex;
}

.view__button {
  border: 0;
  background-color: #fff;
  cursor: pointer;
}
.vertical-rule {
  display: inline-block;
  height: 100%;
  background-color: var(--white-01);
  width: 1px;
}
</style>
