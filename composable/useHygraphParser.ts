import { ExtensionType, Texture } from "pixi.js"

export function useHygraphParser() {
    
    const hygraphLDR = {
        extension: ExtensionType.LoadParser,
        name: 'hygraphLDR',
        test: (url: string) => url.startsWith('https://eu-west-2.graphassets.com'),
        async load(src: string) {
            return new Promise((resolve, reject) => {
                const img = new Image()
                img.crossOrigin = 'anonymous'
                img.onload = () => {
                    /* Create canvas to avoid PIXI warning */
                    const canvas = document.createElement('canvas')
                    const ctx = canvas.getContext('2d')
                    canvas.width = img.width
                    canvas.height = img.height
                    ctx?.drawImage(img, 0, 0)
                    resolve(Texture.from(canvas))
                }
                img.onerror = reject
                img.src = src
            })
        },
    }

    return { hygraphLDR }
}
