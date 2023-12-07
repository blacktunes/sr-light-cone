import mitt from 'mitt'

type Events = {
  screenshot: void
}

export const emitter = mitt<Events>()
