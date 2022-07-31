import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";

import { w3cwebsocket as WebSocket } from "websocket";

export default function Home({ symbols, usdt, exchanges }) {
  const { price, setPrice } = useContext(GlobalContext);
  const { sellPrice, setSellPrice } = useContext(GlobalContext)

  useEffect(() => {
    const binance = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbols.toLowerCase()}usdt@bookTicker`
    );
    binance.onmessage = (event) => {
      try {
        const json = JSON.parse(event.data);
        set_price(json.b);
        set_price_sell(json.a)
        const set_price = (price) => {
          setPrice((e) => {
            const exchange = {
              ...e[symbols],[exchanges]: price,
            };
            return {
              ...e,
              [symbols]: exchange,
            };
          });
        };

        set_price_sell= (price) => {
          setSellPrice((e) => {
            const exchange = {
              ...e[symbols],[exchanges]: price,
            };
            return {
              ...e,
              [symbols]: exchange,
            };
          });
        };

        
        console.log(json)
      } catch (err) {}
    };
   
  }, []);
  if (price[symbols] && !price[symbols][exchanges]) {
    return "โหลดข้อมูล...";
  }
  
  return (
    <div>
     { price &&
        price[symbols] &&
        price[symbols][exchanges] &&
        (price[symbols][exchanges] * usdt).toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      }
      {" "}
      { sellPrice &&
        sellPrice[symbols] &&
        sellPrice[symbols][exchanges] &&
        (sellPrice[symbols][exchanges] * usdt).toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      }
    </div>
  );
}
