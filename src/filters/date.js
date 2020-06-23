export const date = function (value) {
  if (!value) return ''
  return new Date(value).toLocaleString()
}
