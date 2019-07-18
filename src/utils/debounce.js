function debounce (fn, wait = 300) {
  let timeout = null
  const timer = Number(wait)

  const debounced = (...args) => {
    const later = () => {
      timeout = null

      fn(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, timer)

    if (!timeout) {
      fn(...args)
    }
  }

  debounced.cancel = () => {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}

export default debounce
