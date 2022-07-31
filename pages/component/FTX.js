import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import axios from "axios";

var W3CWebSocket = require("websocket").w3cwebsocket;

export default function Exchange({
  symbol,
  rate =1 ,
  urlSocket,
  exchange,
}) {
  
  const { price, setPrice } = useContext(GlobalContext);
  const { sellPrice, setSellPrice } = useContext(GlobalContext)
  // console.log(sellPrice)
  const set_price = (price) => {
    setPrice((e) => {
      const exchanges = {
        ...e[symbol],
        [exchange]: price
      };
      return {
        ...e,
        [symbol]: exchanges
      };
    });
  };

  const set_price_sell = (price) => {
    setSellPrice((e) => {
      const exchanges = {
        ...e[symbol],
        [exchange]: price
      };
      return {
        ...e,
        [symbol]: exchanges
      };
    });
  }

  const get_price_from_socket = (event) => {
    try {
      const data = JSON.parse(event.data);
      set_price(data.data.asks[0][0]);
      set_price_sell(data.data.bids[0][0]);
      // console.log(data)
    } catch (err) {
      console.log(err);
    }
  };

  const init_socket = () => {
    try {
      var client = new W3CWebSocket(urlSocket);

      client.onopen = function () {
        client.send(JSON.stringify({
            op: "subscribe",
            channel: "orderbook",
            market: `${symbol.toUpperCase()}-PERP`,
          }))
      };

      client.onmessage = function (e) {
        get_price_from_socket(e);
      };
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    init_socket();
  }, []);


  if (price[symbol] && !price[symbol][exchange]) {
    return "โหลดข้อมูล...";
  }

  return (
    <div>
       <a className="">
        {price &&
          price[symbol] &&
          price[symbol][exchange] &&
          (price[symbol][exchange] * rate)
            .toFixed(2)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
      </a>
      <a className="pl-10">
        {sellPrice &&
          sellPrice[symbol] &&
          sellPrice[symbol][exchange] &&
          (sellPrice[symbol][exchange] * rate)
            .toFixed(2)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
      </a>
    </div>
  );
}
