import { formatPrecision } from '@/utils/util'

describe('Utils/util', () => {
  it('格式正整数', () => {
    let v1 = 12
    let v2 = 12345

    expect(formatPrecision(v1)).toBe('12')
    expect(formatPrecision(v2)).toBe('12345')
  })

  it('后几位有 0 的情况', () => {
    let v1 = '0.1000000'
    let v2 = '1.00'
    let v3 = '3.000'
    let v4 = '4.010'

    expect(formatPrecision(v1)).toBe('0.100')
    expect(formatPrecision(v2)).toBe('1.00')
    expect(formatPrecision(v3)).toBe('3.000')
    expect(formatPrecision(v4)).toBe('4.010')
  })

  it('小数点后有 0 的情况', () => {
    let v1 = 0.0749999999973
    let v2 = -0.00749999999973
    let v3 = 1.099555
    // let v4 = 12.0150
    let v5 = 12.0151
    let v6 = 123.01
    let v7 = 123.05
    let v8 = 47.99896166134185

    expect(formatPrecision(v1)).toBe('0.075')
    expect(formatPrecision(v2)).toBe('-0.007')
    expect(formatPrecision(v3)).toBe('1.100')
    // expect(formatPrecision(v4)).toBe('12.01')
    expect(formatPrecision(v5)).toBe('12.02')
    expect(formatPrecision(v6)).toBe('123.0')
    expect(formatPrecision(v7)).toBe('123.1')
    expect(formatPrecision(v8)).toBe('48.00')
  })

  it('格式正浮点数', () => {
    let v1 = 11.111111
    let v2 = 11.11666
    let v3 = 12345.11
    let v4 = 12345.61
    let v5 = 1.234

    expect(formatPrecision(v1)).toBe('11.11')
    expect(formatPrecision(v2)).toBe('11.12')
    expect(formatPrecision(v3)).toBe('12345')
    expect(formatPrecision(v4)).toBe('12346')
    expect(formatPrecision(v5)).toBe('1.234')
  })

  it('格式负整数', () => {
    let v1 = -12
    let v2 = -12345

    expect(formatPrecision(v1)).toBe('-12')
    expect(formatPrecision(v2)).toBe('-12345')
  })

  it('格式负浮点数', () => {
    let v1 = -11.111111
    let v2 = -11.11666
    let v3 = -12345.11
    let v4 = -12345.61

    expect(formatPrecision(v1)).toBe('-11.11')
    expect(formatPrecision(v2)).toBe('-11.12')
    expect(formatPrecision(v3)).toBe('-12345')
    expect(formatPrecision(v4)).toBe('-12346')
  })

  it('非数字', () => {
    let v1 = '11%'
    let v2 = 'abc'

    expect(formatPrecision(v1)).toBe('11%')
    expect(formatPrecision(v2)).toBe('abc')
  })

  it('空值或 null', () => {
    let v1 = ''
    let v2 = null

    expect(formatPrecision(v1)).toBe('')
    expect(formatPrecision(v2)).toBe(null)
  })
})
