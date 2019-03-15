/**
 * 包装一个缓存对象
 */
const createCacheObj = (key, obj, expTime) => {
  let cacheObj = {}
  cacheObj.key = key
  cacheObj.data = obj
  cacheObj.expTime = new Date().getTime() + expTime
  return cacheObj
}

export default {
  /**
   * 设置缓存对象
   * @param key
   * @param expTime
   * @param site 存放位置 session local
   */
  setItem(key, obj, expTime, site) {
    let cacheObj = createCacheObj(key, obj, expTime)
    let cacheStr = JSON.stringify(cacheObj)
    let flag = false
    if (site === 'session' || site === undefined) {
      sessionStorage.setItem(key, cacheStr)
      flag = true
    } else if (site === 'local') {
      localStorage.setItem(key, cacheStr)
      flag = true
    }
    return flag
  },
  /**
   * 获取缓存对象
   * @param key
   */
  getItem(key, site) {
    let obj = null
    let _self = this
    if (site === 'session' || site === undefined) {
      obj = sessionStorage.getItem(key)
    } else if (site === 'local') {
      obj = localStorage.getItem(key)
    }
    let cacheObj = null
    if (obj) {
      try {
        let strObj = JSON.parse(obj)
        if (strObj.expTime > new Date().getTime()) {
          cacheObj = strObj.data
        } else {
          _self.removeItem(key, site)
        }
      } catch (e) {
        console.error(e)
      }
    }
    return cacheObj
  },
  /**
   * 移除缓存对象
   * @param key
   */
  removeItem(key, site) {
    if (site === 'session' || site === undefined) {
      sessionStorage.removeItem(key)
    } else if (site === 'local') {
      localStorage.removeItem(key)
    } else {
      sessionStorage.removeItem(key)
      localStorage.removeItem(key)
    }
  }
}
