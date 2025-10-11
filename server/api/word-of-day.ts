export default defineEventHandler(async (event) => {
  try {
    /* Merriam-Webster Word of the Day RSS feed (free, no API key needed) */
    const response = await $fetch('https://www.merriam-webster.com/wotd/feed/rss2', {
      parseResponse: txt => txt
    }) as string
    
    /* Parse the RSS XML to extract word data
     * Look for the first item's title and description (skip channel title) */
    const itemMatch = response.match(/<item>.*?<\/item>/s)
    if (!itemMatch) {
      throw new Error('No item found in RSS feed')
    }
    
    const item = itemMatch[0]

    const wordMatch = item.match(/<title><!\[CDATA\[(.+?)\]\]><\/title>/)
    const descriptionMatch = item.match(/<description><!\[CDATA\[([\s\S]+?)\]\]><\/description>/)

    if (wordMatch && descriptionMatch) {
      const fullTitle = wordMatch[1]
      const word = fullTitle.split(':')[0].trim()
      
      /* Extract the main definition from the complex HTML structure */
      let definition = descriptionMatch[1]
      
      /* Look for the main definition paragraph after the word and pronunciation */
      const defMatch = definition.match(/<p>([^<]*(?:is to|means to|refers to)[^<]*)<\/p>/)
      if (defMatch) {
        definition = defMatch[1]
      } else {
        /* Fallback: get first meaningful paragraph */
        const paragraphMatch = definition.match(/<p>([^<]{20,})<\/p>/)
        if (paragraphMatch) {
          definition = paragraphMatch[1]
        } else {
          /* Last resort: clean all HTML and take first sentence */
          definition = definition
            .replace(/<[^>]*>/g, '') /* Remove HTML tags */
            .replace(/&[^;]+;/g, '') /* Remove HTML entities */
            .split('.')[0] + '.'
        }
      }
      
      definition = definition
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&#149;/g, '•')
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
    
    /* Fallback word if API fails */
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
