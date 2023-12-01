export function isValidUrl(url: string) {
  try {
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}

export function validateUrl(url: string) {
  if (!isValidUrl(url)) {
    return `https://${url}`
  }

  return url
}
