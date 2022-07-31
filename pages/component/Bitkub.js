import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import { w3cwebsocket as WebSocket } from "websocket";

export default function Home({symbols,exchanges}) {
const { price, setPrice } = useContext(GlobalContext);

  useEffect(() => {
   const bitkub = new WebSocket(`wss://api.bitkub.com/websocket-api/orderbook/THB_${symbols.toUpperCase()}-1`);
   
   bitkub.onmessage = (event) => {
      try {
        const json = JSON.parse(event.data);
        const set_price = (price) => {
          setPrice((e) => {
            console.log(json)
            const exchange = {
              ...e[symbols],[exchanges]: price,
            };
            return {
              ...e,
              [symbols]: exchange,
            };
          });
          console.log(json)
        };
        set_price(json.bid);
       
      } catch (err) {}
    };
  }, []);

  return <div> { price &&
    price[symbols] &&
    price[symbols][exchanges] && 
    price[symbols][exchanges].toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
</div>;
}

