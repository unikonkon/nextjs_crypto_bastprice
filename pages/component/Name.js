import React, { useEffect, useState } from "react";
import { w3cwebsocket as WebSocket } from "websocket";            //ใช้แท็ก Image
export default function name({ symbol }) {   // รับข้อมูลมาจากตัวแปร name 
  const [priceChange, setPriceChange] = useState();
  useEffect(() => {
   
    const priceChangsocket = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol}usdt@ticker`
    );
    
    priceChangsocket.onmessage = (event) => {
      try {
        const json = JSON.parse(event.data);
        // console.log(json)
        setPriceChange(json.P);
      } catch (err) {}
    };
    // console.log(priceChange)
  }, []);
  const coin = ["Bitcoin", "Ethereum", "Solona","Binance Coin"];
  return (
    <div className="text-lg py-2 text-center w-64">
                         
     {priceChange}
    </div>
  );
}
