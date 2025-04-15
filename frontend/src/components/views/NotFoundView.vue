<template>
  <section class="bg-white dark:bg-app-text-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-sm text-center">
        <h1
          class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-app-green-600"
        >
          404
        </h1>
        <p
          class="mb-4 text-3xl tracking-tight font-bold text-app-text md:text-4xl"
        >
          Something's missing.
        </p>
        <p class="mb-4 text-lg font-light text-app-text-300">
          Sorry, we can't find that page. You'll find lots to explore on the
          home page.
        </p>

        <RouterLink to="/">
          <button
            class="inline-flex text-white font-bold bg-app-green-600 hover:bg-app-green-700 focus:ring-4 focus:outline-none focus:ring-app-green-300 rounded-lg text-sm px-5 py-2.5 text-center my-4 cursor-pointer transform hover:scale-101"
          >
            Back to Homepage
          </button>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup></script>
