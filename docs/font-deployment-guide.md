# Netlify Font Deployment Guide

## Preventing Race Conditions in Font Loading

### 1. Sequential Font Loading
```typescript
// nuxt.config.ts
fonts: {
  families: [
    {
      name: 'Your Font',
      provider: 'google',
      styles: ['normal'],
      preload: true
    }
  ],
  defaults: {
    display: 'swap'
  }
}
```

### 2. Netlify Configuration
Create/update `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_OPTIONS = "--max_old_space_size=4096"
  NPM_FLAGS = "--prefer-offline"
```

### 3. Font Preloading
Add to `app.vue` or layout:
```typescript
useHead({
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
      crossorigin: 'anonymous'
    }
  ]
})
```

### 4. Build Script
Update `package.json`:
```json
{
  "scripts": {
    "build": "NODE_OPTIONS=--max_old_space_size=4096 nuxt build",
    "build:retry": "npm run build || npm run build"
  }
}
```

### 5. Error Handling
Add to `nuxt.config.ts`:
```typescript
hooks: {
  'build:error': (error) => {
    if (error.message.includes('font')) {
      console.warn('Font loading issue detected')
    }
  }
}
```

### Additional Tips:
- Consider using a CDN like Bunny Fonts
- Subset fonts when possible
- Set up Netlify build notifications
- Monitor build logs for font-related issues
