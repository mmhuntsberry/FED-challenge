<template>
  <nav class="nav">
    <ul class="nav__list">
      <router-link to="/" class="nav__item" tag="li" role="link"
        >All</router-link
      >
      <router-link to="/favorites" class="nav__item" tag="li" role="link"
        >Favorites</router-link
      >
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.nav {
  height: 36px;
  border: 1px solid var(--green);
}

.nav__list {
  height: 100%;
  display: flex;
  margin: 0;
}

.nav__item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  color: var(--green);
  cursor: pointer;
}

.nav__item.router-link-exact-active {
  background-color: var(--green);
  color: var(--white);
}
</style>
