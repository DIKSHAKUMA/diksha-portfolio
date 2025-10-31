# Pinia vs Pinia Colada with GraphQL

## Core Differences

### Pinia (Direct)
- **Core State Management**: Handles client-side state management
- **Manual Implementation**: Requires manual setup for data fetching, loading states, and error handling
- **Flexibility**: More control over how and when data is fetched
- **Boilerplate**: More code needed for common data fetching patterns
- **Caching**: No built-in request deduplication or caching

### Pinia Colada
- **Data Fetching Layer**: Built on top of Pinia specifically for data fetching
- **Automatic States**: Handles loading, success, and error states automatically
- **Built-in Caching**: Automatic request deduplication and response caching
- **Optimistic Updates**: Built-in support for optimistic UI updates
- **Less Boilerplate**: Reduces repetitive code for common data fetching patterns
- **Suspense Support**: First-class support for Vue's Suspense

## Code Comparison

### Current Implementation (Pinia Only)
```typescript
// store/useBlogStore.ts
export const useBlogStore = defineStore('blog', {
  state: () => ({
    data: ref(),
    error: ref()
  }),
  
  actions: {
    async fetchData() {
      try {
        const response = await $fetch('/api/graphql', {
          method: 'POST',
          body: { query: `...` }
        })
        this.data = response.data
        this.error = null
      } catch (error) {
        this.error = error
      }
    }
  }
})
```

### With Pinia Colada
```typescript
// store/useBlogStore.ts
export const useBlogStore = defineStore('blog', () => {
  const { data, error, isLoading } = useQuery(
    'blog-posts',  // Cache key
    async () => {
      const response = await $fetch('/api/graphql', {
        method: 'POST',
        body: { 
          query: `...` 
        }
      })
      return response.data
    },
    {
      staleTime: 1000 * 60 * 5, // 5 minutes cache
      refetchOnWindowFocus: true
    }
  )

  return {
    posts: data,
    error,
    isLoading
  }
})
```

## Server-Side Setup (Unchanged)

Your `graphql.post.ts` remains exactly the same, as it's just a proxy to your GraphQL server:

```typescript
// server/api/graphql.post.ts
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
```

## Deduplication in Pinia Colada

### Key Features:

1. **Automatic Request Deduplication**
   - Multiple components requesting the same data? Only one network request is made
   - All components receive the same cached response

2. **Cache Key Based**
   ```typescript
   // Both components use the same cache key 'blog-posts'
   const { data } = useQuery('blog-posts', fetchBlogPosts)
   const { data: sameData } = useQuery('blog-posts', fetchBlogPosts) // Uses cache
   ```

3. **Stale-While-Revalidate**
   - Returns cached data immediately if available (even if stale)
   - Fetches fresh data in the background
   - Updates all components when new data arrives

4. **Dependent Queries**
   ```typescript
   // Second query waits for userId
   const { data: user } = useQuery('current-user', fetchUser)
   const { data: posts } = useQuery(
     ['user-posts', user.value?.id], 
     () => fetchUserPosts(user.value.id),
     { enabled: !!user.value?.id }
   )
   ```

## When to Use Which?

### Choose Pinia directly when:
- You need maximum control over data fetching
- Your data fetching needs are simple
- You don't need caching or request deduplication
- You're building a small application

### Choose Pinia Colada when:
- You're making multiple similar requests
- You want automatic loading/error states
- You need request deduplication
- You want background data refreshing
- You're building a data-heavy application

## Migration Tips
1. Start by adding Pinia Colada to your project:
   ```bash
   npm install pinia-colada
   ```

2. Wrap your app with the plugin in `plugins/colada.ts`:
   ```typescript
   import { createPiniaColada } from 'pinia-colada'
   
   export default defineNuxtPlugin((nuxtApp) => {
     const colada = createPiniaColada()
     nuxtApp.vueApp.use(colada)
   })
   ```

3. Gradually migrate stores to use `useQuery` instead of manual fetching
