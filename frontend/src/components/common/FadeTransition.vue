<template>
  <TransitionGroup name="fade" tag="div">
    <slot />
  </TransitionGroup>
</template>

<style>
.fade-enter-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter-from {
  opacity: 0;
}

.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-leave-to {
  opacity: 0;
}
</style>
