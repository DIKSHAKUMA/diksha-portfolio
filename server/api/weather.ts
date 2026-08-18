/**
 * Local weather/time widget for the contact page.
 *
 * This must never throw: the route is prerendered at build time, and a 500
 * here would fail the static build. With no API key configured it returns a
 * time-only payload so the widget still renders.
 */
const CITY = 'Ballari'
const COUNTRY = 'IN'
const TIME_ZONE = 'Asia/Kolkata'

const localTimeNow = () =>
  new Date().toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: TIME_ZONE,
  })

const fallback = () => ({
  temperature: null,
  humidity: null,
  condition: '',
  location: CITY,
  timezone: 19800 /* IST offset in seconds */,
  localTime: localTimeNow(),
})

export default defineEventHandler(async () => {
  const apiKey = useRuntimeConfig().openWeatherApiKey

  /* No key configured — skip the network call entirely. */
  if (!apiKey) return fallback()

  try {
    const weather: any = await $fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY}&units=metric&appid=${apiKey}`
    )

    return {
      temperature: Math.round(weather.main.temp),
      humidity: weather.main.humidity,
      condition: weather.weather[0].main.toLowerCase(),
      location: weather.name,
      timezone: weather.timezone,
      /* dt is a Unix timestamp */
      localTime: new Date(weather.dt * 1000).toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: TIME_ZONE,
      }),
    }
  } catch (error: any) {
    console.warn('Weather API unavailable, using fallback:', error?.message)
    return fallback()
  }
})
