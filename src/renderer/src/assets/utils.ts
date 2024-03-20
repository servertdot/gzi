export function getFromStorage(key: string) {
  return JSON.parse(localStorage.getItem(key) || '{}')
}

export function setToStorage(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data))

  return data;
}
