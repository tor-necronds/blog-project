export const truncateText = (
  text: string,
  maxLength: number = 35,
  ellipsis: string = '...'
) => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + ellipsis
}

export const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
