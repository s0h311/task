export type Flow = {
  id: string
  trigger: Trigger[]
  action: Action[]
}

export type Trigger = {
  condition: boolean
}

export type Action = {
  type: string
  payload?: object
}
