<script lang="ts" setup>
import { useField } from "vee-validate";

const props = defineProps<{
  name: string;
}>();

const { errorMessage } = useField(
  () => props.name,
  {},
  { validateOnValueUpdate: false }
);
</script>

<template>
  <small class="text-rose-500">{{ errorMessage }}</small>
</template>
