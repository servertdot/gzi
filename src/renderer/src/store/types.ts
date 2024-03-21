export interface Chat {
  id: number | string
  title: string
  url: string
  status: 'done' | 'draft'
}

export interface RemoveParams {
  shouldInstantlyRemove: boolean
}
