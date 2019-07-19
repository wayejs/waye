export const valueEquals = (a, b) => {
  // see: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  if (a === b) return true
  if (!(a instanceof Array)) return false
  if (!(b instanceof Array)) return false
  if (a.length !== b.length) return false
  for (let i = 0; i !== a.length; ++i) {
    if (a[i] !== b[i]) return false
  }
  return true
}

/**
 * 后面补 0
 * @param {*} val 当前值
 * @param {*} count 有效位数
 */
function endZeroPad (val, count = 4) {
  val = val.toString().replace('-', '')
  let len = val.length
  let maxLen = count + 1
  if (len <= maxLen) {
    return val
  }
  return val.padEnd(maxLen, '0')
}

/**
 * 格式有效位数
 * @param {*} val 值
 * @param {*} count 有效位数，默认 4 位
 */
export function formatPrecision (val, count = 4) {
  let numVal = Number(val)
  if (isNaN(numVal) || val === '' || val === null) {
    return val
  }
  const maxLen = count + 1
  let isInt = Number.isInteger(numVal)
  let isNegative = numVal < 0
  let symbol = isNegative ? '-' : ''
  let absVal = endZeroPad(val, count)
  let len = absVal.length
  let result = absVal
  if (isInt) {
    if (len <= count) {
      result = absVal
    }
  } else {
    let valList = absVal.split('.')
    let intVal = valList[0]
    let intLen = intVal.length
    if (len <= maxLen) {
      result = absVal
    } else {
      if (intLen < count) {
        let floatCount = count - intLen
        result = Math.fround(absVal).toFixed(floatCount)
      } else {
        result = Math.round(absVal)
      }
    }
  }
  return `${symbol}${result}`
}
