// Import necessary modules and types
import { Injectable, Logger } from '@nestjs/common'
import { Order, Clock } from './alpaca.types'
const Alpaca = require('@alpacahq/alpaca-trade-api')

// Set a constant variable for a minute in milliseconds
const MINUTE = 60000

// Define the AlpacaService class and mark it as injectable
@Injectable()
export class AlpacaService {
  // Declare class variables
  instance: typeof Alpaca
  timeToClose: number
  sideType = { BUY: 'buy', SELL: 'sell' }
  positionType = { LONG: 'long', SHORT: 'short' }
  private readonly logger = new Logger(AlpacaService.name)

  // Constructor takes in an object with the API key ID, secret key, and paper trading flag
  constructor({ keyId, secretKey, paper = true }) {
    // Initialize the Alpaca API client instance with the given keys and paper trading flag
    this.instance = new Alpaca({
      keyId: keyId,
      secretKey: secretKey,
      // access_token: 'e8b7bd28-aa70-493d-9d9c-5cde2ff212fd',
      paper: paper,
    })

    // Set the timeToClose variable to null initially
    this.timeToClose = null
  }

  // Wait for the market to open before executing any further code
  async awaitMarketOpen(): Promise<void> {
    return new Promise(resolve => {
      // Define an async function to check the market's status
      const check = async () => {
        try {
          // Get the current clock status of the market
          const clock = await this.instance.getClock()

          // If the market is open, resolve the promise
          if (clock.is_open) {
            resolve()
          } else {
            // If the market is closed, calculate the time until it opens again
            const openTime = await this.getOpenTime()
            const currTime = await this.getCurrentTime()
            this.timeToClose = Math.floor((openTime - currTime) / 1000 / 60)

            // Log the time until the market opens again
            this.logger.log(
              `${this.numberToHourMinutes(
                this.timeToClose,
              )} til next market open.`,
            )

            // Wait for one minute and then check the market status again
            setTimeout(check, MINUTE)
          }
        } catch (err) {
          this.logger.error(err.error)
        }
      }
      check()
    })
  }

  // Get the time at which the market opens
  async getOpenTime(): Promise<number> {
    const clock: Clock = await this.instance.getClock()
    return new Date(
      clock.next_open.substring(0, clock.next_close.length - 6),
    ).getTime()
  }

  // Get the time at which the market closes
  async getClosingTime(): Promise<number> {
    const clock: Clock = await this.instance.getClock()
    return new Date(
      clock.next_close.substring(0, clock.next_close.length - 6),
    ).getTime()
  }

  // Get the current time according to the market's clock
  async getCurrentTime(): Promise<number> {
    const clock: Clock = await this.instance.getClock()
    return new Date(
      clock.timestamp.substring(0, clock.timestamp.length - 6),
    ).getTime()
  }

  // Calculate the time remaining until the market closes
  async getTimeToClose(): Promise<number> {
    const closingTime = await this.getClosingTime()
    const currentTime = await this.getCurrentTime()
    return Math.abs(closingTime - currentTime)
  }

  // Convert a number representing minutes to hours
  numberToHourMinutes(number: number): string {
    const hours = number / 60
    const realHours = Math.floor(hours)
    const minutes = (hours - realHours) * 60
    const realMinutes = Math.round(minutes)
    return realHours + ' hour(s) and ' + realMinutes + ' minute(s)'
  }

  async cancelExistingOrders(): Promise<Order[]> {
    let orders: Order[]
    try {
      orders = await this.instance.getOrders({
        status: 'open',
        direction: 'desc',
      })
    } catch (err) {
      this.logger.error(err.error)
    }

    this.logger.log('Canceling existing orders...')
    return Promise.all<Order>(
      orders.map(order => {
        return new Promise(async resolve => {
          try {
            await this.instance.cancelOrder(order.id)
          } catch (err) {
            this.logger.error(err.error)
          }
        resolve(null);
        })
      }),
    )
  }

  // Submit an order if quantity is above 0.
  async submitOrder({ quantity, stock, side }): Promise<boolean> {
    return new Promise(async resolve => {
      if (quantity <= 0) {
        this.logger.log(
          `Quantity is <=0, order of | ${quantity} ${stock} ${side} | not sent.`,
        )
        resolve(true)
        return
      }

      try {
        await this.instance.createOrder({
          symbol: stock,
          qty: quantity,
          side,
          type: 'market',
          time_in_force: 'day',
        })
        this.logger.log(
          `Market order of | ${quantity} ${stock} ${side} | completed.`,
        )
        resolve(true)
      } catch (err) {
        this.logger.log(
          `Order of | ${quantity} ${stock} ${side} | did not go through.`,
        )
        resolve(false)
      }
    })
  }

  // Submit a limit order if quantity is above 0.
  async submitLimitOrder({
    quantity,
    stock,
    price,
    side,
  }): Promise<any | undefined> {
    return new Promise(async resolve => {
      if (quantity <= 0) {
        this.logger.log(
          `Quantity is <=0, order of | ${quantity} ${stock} ${side} | not sent.`,
        )
        resolve(true)
        return
      }

      try {
        const lastOrder = await this.instance.createOrder({
          symbol: stock,
          qty: quantity,
          side: side,
          type: 'limit',
          time_in_force: 'day',
          limit_price: price,
        })
        this.logger.log(
          'Limit order of |' + quantity + ' ' + stock + ' ' + side + '| sent.',
        )

        resolve(lastOrder)
      } catch (err) {
        this.logger.error(
          'Order of |' +
            quantity +
            ' ' +
            stock +
            ' ' +
            side +
            '| did not go through.',
        )
        resolve(undefined)
      }
    })
  }
}