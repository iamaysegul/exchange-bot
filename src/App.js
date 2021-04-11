

import ccxt from 'ccxt'
import { useEffect, useState } from 'react'


let huobipro
let binance
let bitz

try {
  huobipro = new ccxt.huobipro()
  binance = new ccxt.binance()
  bitz = new ccxt.bitz()
} catch (error) {
  huobipro = new ccxt.huobipro()
  binance = new ccxt.binance()
  bitz = new ccxt.bitz()
}


let get_tickers = async () => {
  let huobipro_btc_usdt_ticker = await huobipro.fetchTicker("BTC/USDT")
  let huobipro_eth_usdt_ticker = await huobipro.fetchTicker("ETH/USDT")
  let huobipro_xrp_usdt_ticker = await huobipro.fetchTicker("XRP/USDT")
  let binance_btc_usdt_ticker = await binance.fetchTicker("BTC/USDT")
  let binance_eth_usdt_ticker = await binance.fetchTicker("ETH/USDT")
  let binance_xrp_usdt_ticker = await binance.fetchTicker("XRP/USDT")
  let bitz_btc_usdt_ticker = await bitz.fetchTicker("BTC/USDT")
  let bitz_eth_usdt_ticker = await bitz.fetchTicker("ETH/USDT")
  let bitz_xrp_usdt_ticker = await bitz.fetchTicker("XRP/USDT")

  return [
    {
      name: "Huobi",
      data: [
        huobipro_btc_usdt_ticker,
        huobipro_eth_usdt_ticker,
        huobipro_xrp_usdt_ticker,
      ]
    },
    {
      name: "Binance",
      data: [
        binance_btc_usdt_ticker,
        binance_eth_usdt_ticker,
        binance_xrp_usdt_ticker,
      ]
    },
    {
      name: "Bitz",
      data: [
        bitz_btc_usdt_ticker,
        bitz_eth_usdt_ticker,
        bitz_xrp_usdt_ticker,
      ]
    },
  ]
}


let get_order_book = async () => {
  let huobipro_btc_usdt_order_book = await huobipro.fetch_order_book("BTC/USDT", 5)
  let huobipro_eth_usdt_order_book = await huobipro.fetch_order_book("ETH/USDT", 5)
  let huobipro_xrp_usdt_order_book = await huobipro.fetch_order_book("XRP/USDT", 5)
  let binance_btc_usdt_order_book = await binance.fetch_order_book("BTC/USDT", 5)
  let binance_eth_usdt_order_book = await binance.fetch_order_book("ETH/USDT", 5)
  let binance_xrp_usdt_order_book = await binance.fetch_order_book("XRP/USDT", 5)
  let bitz_btc_usdt_order_book = await bitz.fetch_order_book("BTC/USDT", 5)
  let bitz_eth_usdt_order_book = await bitz.fetch_order_book("ETH/USDT", 5)
  let bitz_xrp_usdt_order_book = await bitz.fetch_order_book("XRP/USDT", 5)



  let huobipro_btc_usdt_ticker = await huobipro.fetchTicker("BTC/USDT")
  let huobipro_eth_usdt_ticker = await huobipro.fetchTicker("ETH/USDT")
  let huobipro_xrp_usdt_ticker = await huobipro.fetchTicker("XRP/USDT")
  let binance_btc_usdt_ticker = await binance.fetchTicker("BTC/USDT")
  let binance_eth_usdt_ticker = await binance.fetchTicker("ETH/USDT")
  let binance_xrp_usdt_ticker = await binance.fetchTicker("XRP/USDT")
  let bitz_btc_usdt_ticker = await bitz.fetchTicker("BTC/USDT")
  let bitz_eth_usdt_ticker = await bitz.fetchTicker("ETH/USDT")
  let bitz_xrp_usdt_ticker = await bitz.fetchTicker("XRP/USDT")



  return [
    {
      name: "BTC/USDT",
      data: [
        {
          data: huobipro_btc_usdt_order_book,
          price: huobipro_btc_usdt_ticker.last,
          name: "Huobi"
        },
        {
          data: binance_btc_usdt_order_book,
          price: binance_btc_usdt_ticker.last,
          name: "Binance"
        },
        {
          data: bitz_btc_usdt_order_book,
          price: bitz_btc_usdt_ticker.last,
          name: "Bitz"
        },
      ]
    },
    {
      name: "ETH/USDT",
      data: [
        {
          data: huobipro_eth_usdt_order_book,
          price: huobipro_eth_usdt_ticker.last,
          name: "Huobi"
        },
        {
          data: binance_eth_usdt_order_book,
          price: binance_eth_usdt_ticker.last,
          name: "Binance"
        },
        {
          data: bitz_eth_usdt_order_book,
          price: bitz_eth_usdt_ticker.last,
          name: "Bitz"
        },
      ]
    },
    {
      name: "XRP/USDT",
      data: [
        {
          data: huobipro_xrp_usdt_order_book,
          price: huobipro_xrp_usdt_ticker.last,
          name: "Huobi"
        },
        {
          data: binance_xrp_usdt_order_book,
          price: binance_xrp_usdt_ticker.last,
          name: "Binance"
        },
        {
          data: bitz_xrp_usdt_order_book,
          price: bitz_xrp_usdt_ticker.last,
          name: "Bitz"
        },
      ]
    },
  ]
}

const App = () => {
  const [exchanges, setExchanges] = useState(null)
  const [order_book, setOrder_book] = useState(null)

  useEffect(() => {
    let exchangeListener = setInterval(async () => {
      try {
        setExchanges(await get_tickers())
      } catch (error) {
      }
    }, 5000);
    let order_bookListener = setInterval(async () => {
      try {
        setOrder_book(await get_order_book())
      } catch (error) {
      }
    }, 5000);
    return () => {
      clearInterval(exchangeListener)
      clearInterval(order_bookListener)
    }
  }, [])

  return (
    <div>
      <h1>Borsa Bilgileri</h1>
      {
        exchanges && exchanges.map((exchange, exchange_index) => <div key={exchange_index}>
          <h2>{exchange.name}</h2>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Fiyat</th>
                <th>24H Yüksek</th>
                <th>24H Düşük</th>
                <th>Hacim</th>
              </tr>
            </thead>
            <tbody>
              {
                exchange.data && exchange.data.map((data, data_index) => {
                  return (
                    <tr key={data_index}>
                      <td>{data.symbol}</td>
                      <td>{Number(data.last).toFixed(2)}</td>
                      <td>{Number(data.high).toFixed(2)}</td>
                      <td>{Number(data.low).toFixed(2)}</td>
                      <td>{Number(data.baseVolume).toFixed(2)}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        )}
      <hr />
      <h1>Alım, Fiyat ve Satım Karşılaştırması</h1>
      {
        order_book && order_book.map((exchange, exchange_index) =>
          <div key={exchange_index}>
            <h2>{exchange.name}</h2>
            <div className="row">
              {
                exchange && exchange.data && exchange.data.map((coin_data, coin_data_index) => {
                  return (
                    <div key={coin_data_index}>
                      <h3>{coin_data.name}</h3>
                      <table>
                        <thead>
                          <tr><th>Alım</th></tr>
                        </thead>
                        <tbody>
                          {
                            coin_data.data.bids.slice(0, 5).map((val, i) => {
                              return <tr key={i}><td>{val}</td></tr>
                            })
                          }
                        </tbody>
                      </table>

                      <table>
                        <thead>
                          <tr><th>Fiyat</th></tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              {coin_data.price}
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table>
                        <thead>
                          <tr><th>Satış</th></tr>
                        </thead>
                        <tbody>
                          {
                            coin_data.data.asks.slice(0, 5).map((val, i) => {
                              return <tr key={i}><td>{val}</td></tr>
                            })
                          }
                        </tbody>
                      </table>
                    </div>
                  )
                })
              }
            </div>
          </div>
        )
      }
    </div>

  )

}

export default App