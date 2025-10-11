export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const apiKey = config.openWeatherApiKey
    const city = 'Barcelona'

    try {
        const weather = await $fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},ES&units=metric&appid=${apiKey}`)

        return {
            temperature: Math.round((weather as any).main.temp),
            humidity: (weather as any).main.humidity,
            condition: (weather as any).weather[0].main.toLowerCase(),
            location: (weather as any).name,
            timezone: (weather as any).timezone,
            /* Format as en GB, dt is Unix timestamp */
            localTime: new Date((weather as any).dt * 1000).toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZone: 'Europe/Madrid' /* Barcelona timezone */
            })
        }
    } catch (error: any) {
        console.error('Weather API Error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: `Failed to fetch weather data: ${error.message}`
        })
    }
})


