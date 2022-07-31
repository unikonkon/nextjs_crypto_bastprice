import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";


var W3CWebSocket = require("websocket").w3cwebsocket;

export default function Exchange({
  symbol,
  rate =1 ,
  urlSocket,
  exchange,
 
}) {
//   console.log( typeof rate)
  const { price, setPrice } = useContext(GlobalContext);
  const {sellPrice, setSellPrice} = useContext(GlobalContext);
//  console.log(price)
  const set_price = (price) => {
     
    setPrice((e) => {
    //    console.log(price[0])
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

  const set_sell_price = (price) => {
     
    setSellPrice((e) => {
      //  console.log(price[0])
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

  const get_price_from_socket = (data_string) => {
    try {
        // const { data: data_string } = data_socket;
        const data = JSON.parse(data_string.data);
      set_price(data.data.asks[0][0]);
      set_sell_price(data.data.bids[0][0]);
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
            event: "bts:subscribe", 
            data: { channel: `order_book_${symbol}usdt` },
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
    return "ไม่พบข้อมูล";
  }
//  console.log(sellPrice) 
//    price *= rate
//   console.log(result)
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
