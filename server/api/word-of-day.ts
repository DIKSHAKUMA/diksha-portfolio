export default defineEventHandler(async (event) => {
  try {
    // Merriam-Webster Word of the Day RSS feed (free, no API key needed)
    const response = await $fetch('https://www.merriam-webster.com/wotd/feed/rss2', {
      parseResponse: txt => txt
    })
    
    // Parse the RSS XML to extract word data
    const wordMatch = response.match(/<title><!\[CDATA\[(.+?)\]\]><\/title>/)
    const descriptionMatch = response.match(/<description><!\[CDATA\[(.+?)\]\]><\/description>/)
    
    if (wordMatch && descriptionMatch) {
      const fullTitle = wordMatch[1]
      const word = fullTitle.split(':')[0].trim()
      const definition = descriptionMatch[1]
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .trim()
      
      return {
        word,
        definition: definition.substring(0, 200) + (definition.length > 200 ? '...' : ''),
        date: new Date().toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      }
    }
    
    throw new Error('Could not parse word data')
    
  } catch (error) {
    console.error('Word of day API error:', error)
    
    // Fallback word if API fails
    return {
      word: 'Serendipity',
      definition: 'The occurrence and development of events by chance in a happy or beneficial way.',
      date: new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    }
  }
})
