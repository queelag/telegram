import { AddStickerToSet } from '@queelag/telegram-types'
import Child from '../modules/child'

class Add extends Child {
  async stickerToSet(user: number, name: string, emojis: string, parameters: Partial<AddStickerToSet>): Promise<boolean | Error> {
    return this.telegram.api.post<AddStickerToSet, boolean>('addStickerToSet', { user_id: user, name: name, emojis: emojis, ...parameters })
  }
}

export default Add
