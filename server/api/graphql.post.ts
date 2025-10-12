export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  
  if (!config.gqlHost) {
    throw createError({
      statusCode: 500,
      statusMessage: 'GraphQL host not configured'
    })
  }
  
  try {
    const response = await $fetch(config.gqlHost as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    
    return response
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'GraphQL request failed'
    })
  }
})
