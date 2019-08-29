import { pcaa } from '@waye/area-data'
export default {
  provinceList: null,
  city: {},
  area: {},
  all: {},
  getProvinceList () {
    return new Promise((resolve, reject) => {
      const data = pcaa['86']
      this.push(data)
      resolve(data)
    })
  },

  getCityList (provinceId) {
    return new Promise((resolve, reject) => {
      const data = pcaa[provinceId]
      this.push(data)
      resolve(data)
    })
  },

  getAreaList (cityId) {
    return new Promise((resolve, reject) => {
      const data = pcaa[cityId]
      this.push(data)
      resolve(data)
    })
  },

  // 解析地区码
  parseId (val) {
    val = val + ''
    const v1 = val.slice(0, 2)
    const v2 = val.slice(2, 4)
    const v3 = val.slice(-2)
    return {
      provinceId: parseInt(`${v1}0000`),
      cityId: v2 === '00' ? null : parseInt(`${v1}${v2}00`),
      areaIds: v3 === '00' ? null : parseInt(val)
    }
  },

  push: function (data) {
    Object.keys(data).forEach(code => {
      this.all[code] = {
        code,
        name: data[code]
      }
    })
  },

  // 异步获取
  asyncGetRegionMap: async function (codeStr) {
    return new Promise((resolve, reject) => {
      if (!codeStr) resolve({})
      let codes = codeStr.split(',')
      let loadCode = codes[0]
      this[codes.length === 1 ? 'loadCodeSub' : 'loadCodeParent'](loadCode).then(data => {
        let maps = {}
        Object.keys(data).forEach(code => {
          maps[data[code]] = code
        })
        resolve(maps)
      })
    })
  },

  /**
   * codeStr 的值为 '520201,520203' 或单个值 '520104'
   * 只有一个的话，取子级，多个则直接取值返回
   * {
   *  '贵阳'：520100,
   *  '六盘水': 520400
   * }
   * @param {String} codeStr
   */
  getRegionMap: function (codeStr) {
    let maps = {}
    if (!codeStr) return maps
    let codes = codeStr.split(',')
    if (codes.length === 1) {
      let name = this.all[codeStr]
      maps[name] = codeStr
    } else {
      codes.forEach(code => {
        if (this.all[code]) {
          maps[this.all[code].name] = parseInt(code)
        }
      })
    }
    return maps
  },

  loadCodeSub: async function (code) {
    let codeInfo = this.parseId(code)
    if (codeInfo.cityId) {
      return this.getAreaList(codeInfo.cityId)
    } else {
      return this.getCityList(codeInfo.provinceId)
    }
  },

  loadCodeParent: async function (code) {
    let codeInfo = this.parseId(code)
    if (codeInfo.areaIds) {
      return this.getAreaList(codeInfo.cityId)
    } else if (codeInfo.cityId) {
      return this.getCityList(codeInfo.provinceId)
    } else {
      return this.getProvinceList()
    }
  }
}
