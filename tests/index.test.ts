import Telegram from '../src/index'
import { Message, Update } from '@queelag/telegram-types'
import { HandlerType } from '../src/definitions/enums'
import { get } from 'lodash'
import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { Server } from 'http'
import Axios, { AxiosInstance } from 'axios'

describe('Telegram', () => {
  let e: Express, s: Server
  let telegram: Telegram, fake: AxiosInstance, check: boolean

  beforeAll(async () => {
    dotenv.config()

    e = express()
    e.use(cors())
    e.use(bodyParser.json())
    await new Promise((r) => (s = e.listen(5000, () => r())))

    telegram = new Telegram(process.env.TOKEN, 'localhost')
    e.post('/bot' + telegram.token, (req: Request<any, any, Update>, res: Response) => {
      telegram.handle(req.body)
      res.status(200).send()
    })

    fake = Axios.create({ baseURL: 'http://localhost:5000/bot' + process.env.TOKEN + '/' })
  })

  it('registers handler', () => {
    telegram.on('start', (context: Message) => (check = true), HandlerType.TEXT)
    expect(get(telegram, 'handlers').length).toBe(1)
  })

  it('listens to telegram', async () => {
    await fake.post('', { message: { text: '/start' } })
    expect(check).toBeTruthy()
  })

  afterAll(async () => {
    await new Promise((r) => s.close(() => r()))
  })
})
