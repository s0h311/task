export type Flow = {
  id: string
  trigger: Trigger
  action: Action
}

export type Trigger = {
  condition: boolean
}

export type Action<PAYLOAD = object> =
  | {
      fn: (payload: PAYLOAD) => Promise<boolean>
      payload: PAYLOAD
    }
  | {
      fn: () => Promise<boolean>
    }

const flows: Flow[] = []

for (const flow of flows) {
  if (!flow.trigger.condition) {
    continue
  }

  flow.trigger.condition = false

  if ('payload' in flow.action) {
    flow.action.fn(flow.action.payload).then((result) => {
      if (!result) {
        // TODO handle error
      }
    })

    continue
  }

  flow.action.fn().then((result) => {
    if (!result) {
      // TODO handle error
    }
  })
}

const whatsAppAction: Action<WhatsAppMessage> = {
  fn: sendWhatsAppMessage,
  payload: {
    recipientNumber: '',
    message: '',
  },
}

const WHATS_APP_MESSAGE = 'whatsAppMessage'

type WhatsAppMessage = {
  recipientNumber: string
  message: string
}

async function sendWhatsAppMessage(message: WhatsAppMessage): Promise<boolean> {
  return true
}
