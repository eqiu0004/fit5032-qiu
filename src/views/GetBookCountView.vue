<script setup>
import { ref } from 'vue'
import axios from 'axios'

const count = ref(null)
const error = ref('')

const getBookCount = async () => {
  try {
    error.value = ''

    // Cloud Function URL will be added in Week 9.4
    const response = await axios.get('YOUR_CLOUD_FUNCTION_URL')

    count.value = response.data.numberOfBooks
  } catch (err) {
    console.error(err)
    error.value = 'Unable to get book count'
  }
}
</script>

<template>
  <div class="container mt-5">
    <h1>Book Counter</h1>

    <button
      class="btn btn-primary mt-3"
      @click="getBookCount"
    >
      Get Book Count
    </button>

    <p v-if="count !== null" class="mt-3">
      Total number of books: {{ count }}
    </p>

    <p v-else-if="error" class="mt-3">
      {{ error }}
    </p>
  </div>
</template>