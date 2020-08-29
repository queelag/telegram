import { Handler } from '../definitions/types'
import { HandlerType } from '../definitions/enum'

class Dummy {
  static get handler(): Handler {
    return { id: '', command: '', middleware: () => null, type: HandlerType.TEXT }
  }
}

export default Dummy
