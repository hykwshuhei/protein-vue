<script lang="ts">
export default {
  name: "HeaderCom",
};
</script>

<template>
  <header class="text-white bg-blue-400">
    <div class="container mx-auto flex flex-wrap p-5 flex-col items-center">
      <span class="text-xl pt-2">
        <RouterLink
          :to="{
            name: 'list',
          }"
          class="text-white hover:bg-blue-400"
        >
          Rakutein
        </RouterLink>
      </span>
    </div>
  </header>
</template>
