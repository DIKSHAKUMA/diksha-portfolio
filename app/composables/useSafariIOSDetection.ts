export const useSafariIOSDetection = () => {
  const isSafariIOS = ref<boolean>(false)

  const detectSafariIOS = () => {
    return (
      navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
      navigator.userAgent.match(/AppleWebKit/) &&
      !navigator.userAgent.match(/Chrome/) &&
      !navigator.userAgent.match(/CriOS/) && // Chrome on iOS
      !navigator.userAgent.match(/FxiOS/) && // Firefox on iOS
      !navigator.userAgent.match(/EdgiOS/) // Edge on iOS
    )
  }

  onMounted(() => {
    if (import.meta.client) {
      isSafariIOS.value = detectSafariIOS() as boolean
    }
  })

  return {
    isSafariIOS: readonly(isSafariIOS), 
  }
}
