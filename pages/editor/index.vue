<template>
  <div class="w-full border h-[68px] flex bg-gray-50 flex-col">
    <div class="h-[32px]">
      <Dropdown class="h-[28px]" />
    </div>
    <div class="h-[32px]">
      <Button label="Ж" class="h-[30px] w-[30px] p-0 bg-gray-100 hover:bg-gray-200 text-zinc-900 border-zinc-300 m-1" />
      <Button
        label="К"
        class="h-[30px] w-[30px] p-0 bg-gray-100 hover:bg-gray-200 text-zinc-900 border-zinc-300 m-1 italic"
      />
      <Button
        label="Ч"
        class="h-[30px] w-[30px] p-0 bg-gray-100 hover:bg-gray-200 text-zinc-900 border-zinc-300 m-1 underline"
      />
      <Button
        label="Ч"
        class="h-[30px] w-[30px] p-0 bg-gray-100 hover:bg-gray-200 text-zinc-900 border-zinc-300 m-1 underline"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
onMounted(async () => {
  const fontFaces = [...document.fonts.values()];
  console.log("🚀 -> onMounted -> fontFaces:", fontFaces)

})
</script>
