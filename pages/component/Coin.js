import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";

var W3CWebSocket = require("websocket").w3cwebsocket;

export default function Exchange({
  symbol,
  rate = 1,
  urlSocket,
  formatSocket = () => <></>,
  formatSocketsell = () => <></>,
  exchange,
}) {
  //   console.log(symbol)
  const { price, setPrice } = useContext(GlobalContext);
  const { sellPrice, setSellPrice } = useContext(GlobalContext);

  const set_price = (price) => {
    setPrice((e) => {
      const exchanges = {
        ...e[symbol],
        [exchange]: price,
      };
      return {
        ...e,
        [symbol]: exchanges,
      };
    });
  };

  const set_Sell_Price = (price) => {
    setSellPrice((e) => {
      const exchanges = {
        ...e[symbol],
        [exchange]: price,
      };
      return {
        ...e,
        [symbol]: exchanges,
      };
    });
  };

  const get_price_from_socket = (data_socket) => {
    try {
      const { data: data_string } = data_socket;
      const data = JSON.parse(data_string);
      set_price(formatSocket(data));
      set_Sell_Price(formatSocketsell(data));
      // console.log(data)
    } catch (err) {
      console.log(err);
    }
  };

  const init_socket = () => {
    try {
      var client = new W3CWebSocket(urlSocket);

      client.onopen = function () {
        // console.log("WebSocket Client Connected");
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
  // console.log(price)
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
