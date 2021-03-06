import { UnpinChatMessage } from '@queelag/telegram-types'
import Child from '../modules/child'

class Unpin extends Child {
  async chatMessage(chat: number): Promise<boolean | Error> {
    return this.telegram.api.post<UnpinChatMessage, boolean>('unpinChatMessage', { chat_id: chat })
  }
}

export default Unpin
