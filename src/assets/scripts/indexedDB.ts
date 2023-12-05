import { watch, nextTick, toRaw } from 'vue'
import { data } from '@/store/data'
import { setLoadingType } from './setup'

const setLightConeWatch = () => {
  setLoadingType('lightCone')
  watch(data.lightCone, () => {
    nextTick(() => {
      updateDB('lightCone', toRaw(data.lightCone))
    })
  })
}

let hasDB = true
let db: IDBDatabase

interface updateDB {
  // 光锥
  (key: 'lightCone', data: LightCone[]): void
}

export const updateDB: updateDB = (key, data) => {
  db.transaction('data', 'readwrite')
    .objectStore('data')
    .put(JSON.parse(JSON.stringify(data)), key)
}

export const getDB = () => {
  console.log('正在加载光锥数据库...')
  const _db = window.indexedDB.open('sr-light-cone')
  _db.onsuccess = (event) => {
    db = (event.target as IDBOpenDBRequest).result
    if (hasDB) {
      db.transaction('data', 'readonly').objectStore('data').get('lightCone').onsuccess = (e) => {
        try {
          const res = (e.target as IDBRequest).result
          data.lightCone = res || []
        } finally {
          setLightConeWatch()
        }
      }
    } else {
      updateDB('lightCone', toRaw(data.lightCone))
      setLightConeWatch()
    }
  }

  _db.onupgradeneeded = (event) => {
    db = (event.target as IDBOpenDBRequest).result
    if (!db.objectStoreNames.contains('data')) {
      hasDB = false
      db.createObjectStore('data')
    }
  }
}

try {
  getDB()
} catch (err) {
  setLoadingType('lightCone', true)
  console.error(err)
}
