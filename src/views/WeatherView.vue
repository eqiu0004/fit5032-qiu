<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const apikey = (import.meta.env.VITE_OPENWEATHER_API_KEY || '').trim()

const city = ref('')
const weatherData = ref(null)
const loading = ref(false)
const error = ref('')

const temperature = computed(() => {
  return weatherData.value
    ? Math.round(weatherData.value.main.temp)
    : null
})

const iconUrl = computed(() => {
  if (!weatherData.value) return ''

  const icon = weatherData.value.weather[0].icon
  return `https://openweathermap.org/payload/api/media/file/${icon}@2x.png`
})

const checkApiKey = () => {
  if (apikey) return true

  error.value = 'The weather service is not configured yet.'
  return false
}

const fetchWeatherData = async (params) => {
  error.value = ''
  weatherData.value = null

  if (!checkApiKey()) return

  loading.value = true

  try {
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          ...params,
          appid: apikey,
          units: 'metric',
        },
        timeout: 10000,
      },
    )

    weatherData.value = response.data
  } catch (err) {
    const status = err.response?.status

    if (status === 404) {
      error.value =
        'City not found. Try a city and country code, such as Clayton, AU.'
    } else if (status === 401) {
      error.value =
        'The weather API key is invalid or has not been activated.'
    } else {
      error.value = 'Unable to load weather. Please try again.'
    }
  } finally {
    loading.value = false
  }
}

const searchByCity = async () => {
  const query = city.value
    .split(',')
    .map((part) => part.trim())
    .join(',')

  if (!query.replaceAll(',', '').trim()) {
    weatherData.value = null
    error.value = 'Please enter a city.'
    return
  }

  await fetchWeatherData({ q: query })
}

const fetchCurrentLocationWeather = () => {
  error.value = ''
  weatherData.value = null

  if (!checkApiKey()) return

  if (!navigator.geolocation) {
    error.value =
      'Location is unavailable. Please search by city instead.'
    return
  }

  loading.value = true

  navigator.geolocation.getCurrentPosition(
    (position) => {
      fetchWeatherData({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      })
    },
    (locationError) => {
      loading.value = false

      error.value = locationError.code === 1
        ? 'Location access was denied. You can still search by city.'
        : 'Unable to find your location. Please search by city instead.'
    },
    {
      timeout: 10000,
      maximumAge: 300000,
    },
  )
}

onMounted(fetchCurrentLocationWeather)
</script>

<template>
  <div class="container mt-4">
    <h1>Weather Check</h1>

    <form class="mt-4" @submit.prevent="searchByCity">
      <label for="city" class="form-label">
        City and country code
      </label>

      <div class="d-flex flex-wrap gap-2">
        <input
          id="city"
          v-model="city"
          class="form-control"
          style="max-width: 320px"
          type="text"
          placeholder="Clayton, AU"
          :disabled="loading"
        />

        <button
          type="submit"
          class="btn btn-primary"
          :disabled="loading"
        >
          Search
        </button>

        <button
          type="button"
          class="btn btn-outline-primary"
          :disabled="loading"
          @click="fetchCurrentLocationWeather"
        >
          Use Current Location
        </button>
      </div>
    </form>

    <p v-if="loading" class="mt-3" role="status">
      Loading weather...
    </p>

    <p
      v-if="error"
      class="alert alert-warning mt-3"
      role="alert"
    >
      {{ error }}
    </p>

    <main
      v-if="weatherData"
      class="card mt-4"
      aria-live="polite"
    >
      <div class="card-body">
        <h2>
          {{ weatherData.name }}, {{ weatherData.sys.country }}
        </h2>

        <div class="d-flex align-items-center gap-3">
          <img
            :src="iconUrl"
            :alt="weatherData.weather[0].description"
            width="100"
            height="100"
          />

          <p class="display-5 mb-0">
            {{ temperature }} °C
          </p>
        </div>

        <p class="text-capitalize mb-0">
          {{ weatherData.weather[0].description }}
        </p>
      </div>
    </main>
  </div>
</template>