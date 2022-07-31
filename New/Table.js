import React from 'react'

export default function Table() {
  return (
    <div>DD</div>
  )
}

import React, { useEffect, useState } from "react";
import { w3cwebsocket as WebSocket } from "websocket";
import BestPrice from "./BestPrice";
import Coin from "./Coin";
import Name from "./Name";
import Bitstamp from "./Bitsatemp";
import Ftx from "./FTX";
export default function App() {
  const [usdt, setUsdt] = useState();
  useEffect(() => {
    const socket = new WebSocket(
      "wss://api.bitkub.com/websocket-api/market.trade.thb_usdt"
    );
    socket.onmessage = (event) => {
      try {
        const json = JSON.parse(event.data);

        setUsdt(json.rat);
      } catch (err) {}
    };
  }, []);

  const exchanges = [
    "Symbol",
    "Bitkub",
    "Binance",
    "SatangPro",
    "Bitstamp",
    "FTX",
    "BestPrice",
  ];
  const symbols = ["btc", "eth", "sol"];

  return (
    <div>
      <table >
        <thead >
          <tr >
            {exchanges.map((value, index) => (
              <th key={index}>
                {value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody key="tbody">
          {symbols.map((symbol, index) => (
            <tr key={symbol}>
              <td>
                <Name name={symbol} />      //รับค่า Symbol ที่mapข้อมูลออกมา ใส่ในตัวแปร name 
              </td>                   
              <td>
                <Coin
                  symbol={symbol}       //รับค่า Symbol ที่mapข้อมูลออกมา ใส่ในตัวแปร symbol   
                  exchange="bitkub"     //ตัวแปร exchange เก็บค่า "bitkub"
                  urlSocket={`wss://api.bitkub.com/websocket-api/market.trade.thb_${symbol.toLowerCase()}`}   //ตัวแปร urlSocket เก็บค่าเว็บ socket ที่จะเข้าถึงข้อมูล 
                                                                                                              //โดยใส่ ` ` แล้วอ้างถึงตัวแปรจาก ${ } เพื่อที่จะให้ข้อมูลที่ถูกส่งมา map ออกมาตาม Symbol 
                  formatSocket={(data) => +data.rat}    //เขียน function ให้รีเทิร์นข้อมูลที่ต้องการเข้าถึงBitkub คือ .rat         
                />
              </td>
              <td>
                {
                  <Coin
                    symbol={symbol}
                    exchange="binance"
                    urlSocket={`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}usdt@trade`}
                    formatSocket={(data) => +data.p}    //เขียน function ให้รีเทิร์นข้อมูลที่ต้องการเข้าถึงBinance คือ .p                       
                  />
                }
              </td>
              <td>
                <Coin
                  symbol={symbol}
                  exchange="satangpro"
                  urlSocket={`wss://ws.satangcorp.com/ws/${symbol.toLowerCase()}_thb@aggTrade`}
                  formatSocket={(data) => +data.p}     //เขียน function ให้รีเทิร์นข้อมูลที่ต้องการเข้าถึงSatangPro คือ .p
                />
              </td>
              <td>
                {
                  <Bitstamp
                    symbol={symbol}
                    exchange="bitstamp"
                    urlSocket={"wss://ws.bitstamp.net"}  //ตัวแปร urlSocket เก็บค่าเว็บ socket ที่จะเข้าถึงข้อมูล
                  />
                }
              </td>
              <td>
                {
                  <Ftx
                    symbol={symbol}
                    exchange="FTX"
                    urlSocket={"wss://ftx.com/ws/"}  //ตัวแปร urlSocket เก็บค่าเว็บ socket ที่จะเข้าถึงข้อมูล
                  />
                }
              </td>
              <td>
                <BestPrice symbol={symbol} />     //รับค่า Symbol ที่mapข้อมูลออกมา ใส่ในตัวแปร symbol
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
