import React, { useEffect, useState, useContext } from "react";
import { w3cwebsocket as WebSocket } from "websocket";
import BestPrice from "./BestPrice";
import Coin from "./Coin";
import Name from "./Name";
import Bitstamp from "./Bitsatemp";
import Ftx from "./FTX";
import Garph from "../Graph/Graph";
import Bitkub from "./Bitkub";
import Binance from "./Binance";
import Image from "next/image";
import { GlobalContext } from "./GlobalContext";

export default function App() {
  const [usdt, setUsdt] = useState();
  const [priceChange, setPriceChange] = useState();
  useEffect(() => {
    const socket = new WebSocket(
      "wss://api.bitkub.com/websocket-api/market.trade.thb_usdt"
    );
    const priceChangsocket = new WebSocket(
      "wss://stream.binance.com:9443/ws/btcusdt@ticker"
    );
    socket.onmessage = (event) => {
      try {
        const json = JSON.parse(event.data);

        setUsdt(json.rat);
      } catch (err) {}
    };
    priceChangsocket.onmessage = (event) => {
      try {
        const json = JSON.parse(event.data);
        // console.log(json)
        setPriceChange(json.P);
      } catch (err) {}
    };
    // console.log(priceChange)
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

  const symbols = ["btc", "eth", "sol", "bnb"];
  const coin = ["Bitcoin", "Ethereum", "Solona","Binance Coin"];

  // const [bestExchange, setBestExchange] = useState();
  // const { price } = useContext(GlobalContext);
  // // console.log(price)
  // const bestPriceCalculate = ({symbols}) => {
  //   console.log(symbols)
  //   if (price[symbols]) {
  //     let best = 999999999
  //     let exchange = null
  //       // console.log(price[symbols])
  //     for (const [key, value] of Object.entries(price[symbols])) {
  //       // console.log(`${key}: ${value}`);
  //       if (best > value) {
  //          best = value;
  //         exchange = key;
  //       }
  //     }
  //     setBestExchange(exchange);
  //   }
  // };
  // useEffect(() => {
  //   if (price[symbols]) {
  //     let best = 999999999
  //     let exchange = null
  //       // console.log(price[symbols])
  //     for (const [key, value] of Object.entries(price[symbols])) {
  //       // console.log(`${key}: ${value}`);
  //       if (best > value) {
  //          best = value;
  //         exchange = key;
  //       }
  //     }
  //     setBestExchange(exchange);
  //   }
  // }, [price]);

  return (
    <div className="App">
      {/* <table className="min-w-full border text-center">
        <thead className="bg-gradient-to-r from-cyan-100 to-blue-100 text-xl justify-items-center">
          <tr className="text-sky-900">
            {exchanges.map((value, index) => (
              <th className="font-medium px-6 py-4 border" key={index}>
                {value}{" "}
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          className="bg-gradient-to-r from-cyan-50 to-blue-50 text-sky-800"
          key="tbody"
        >
          {symbols.map((symbol, index) => (
            <tr key={symbol}>
              <td>
                <Name name={symbol} />
              </td>
              <td>
                <Coin
                  symbol={symbol}
                  exchange="bitkub"
                  urlSocket={`wss://api.bitkub.com/websocket-api/market.trade.thb_${symbol.toLowerCase()}`}
                  formatSocket={(data) => +data.rat}
                />
              </td>

              <td>
                <Coin
                  symbol={symbol}
                  exchange="binance"
                  urlSocket={`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}usdt@trade`}
                  formatSocket={(data) => +data.p}
                  rate={usdt}
                />
              </td>

              <td>
                <Coin
                  symbol={symbol}
                  exchange="satangpro"
                  urlSocket={`wss://ws.satangcorp.com/ws/${symbol}_thb@aggTrade`}
                  formatSocket={(data) => +data.p}
                />
              </td>

              <td>
                <Bitstamp
                  symbol={symbol}
                  exchange="bitstamp"
                  urlSocket={"wss://ws.bitstamp.net"}
                  rate={usdt}
                />
              </td>

              <td>
                <Ftx
                  symbol={symbol}
                  exchange="FTX"
                  urlSocket={"wss://ftx.com/ws/"}
                  rate={usdt}
                />
              </td>
              <td>
                <BestPrice symbol={symbol} />
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

      <table className=" text-center my-10 ml-10 ">
        <thead>
          <tr className=" text-xl">
            <th></th>
            {coin.map((value, index) => (
              <th key={index}>{value}</th>
            ))}
          </tr>
          <tr className="text-sm text-slate-800">
            <th>Market</th>
            <th>
              <a>Buy for </a> <a className="pl-16"> Sell for </a>
            </th>
            <th>
              <a>Buy for </a> <a className="pl-16"> Sell for </a>
            </th>
            <th>
              <a>Buy for </a> <a className="pl-16"> Sell for </a>
            </th>
          </tr>
        </thead>
        <tbody className="">
          {/* <tr className="pt-20 ">
            <td className=" text-xl ">bitkub</td>
            {symbols.map((symbol, index) => (
              <td>
                <Coin
                  symbol={symbol}
                  exchange="bitkub"
                  urlSocket={`wss://api.bitkub.com/websocket-api/market.trade.thb_${symbol.toLowerCase()}`}
                  formatSocket={(data) => +data.bid}
                  formatSocketsell={(data) => +data.sid}
                />
              </td>
            ))}
          </tr> */}

          <tr className=" ">
            <td className=" text-xl">
              <div className="row flex ">
                <Image
                  src={"/binance.png"}
                  width={30}
                  height={30}
                  className=""
                />
                <p className="px-4">binance</p>
              </div>
            </td>
            {symbols.map((symbol, index) => (
              <td>
                <div className="w-64 mx-12 mt-4">
                  <div className="my-2 w-full py-5 bg-gray-100 ">
                    <Coin
                      symbol={symbol}
                      exchange="binance"
                      urlSocket={`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}usdt@bookTicker`}
                      formatSocket={(data) => +data.a}
                      formatSocketsell={(data) => +data.b}
                      rate={usdt}
                    />
                  </div>
                </div>
              </td>
            ))}
          </tr>

          <tr className=" ">
            <td className=" text-xl">
              <div className="row flex ">
                <Image
                  src={"/bitstamp.png"}
                  width={30}
                  height={30}
                  className=""
                />
                <p className="px-4">Bitstamp</p>
              </div>
            </td>
            {symbols.map((symbol, index) => (
              <td>
                <div className="w-64 mx-12 ">
                  <div className="my-2 w-full py-5 bg-gray-100 ">
                    <Bitstamp
                      symbol={symbol}
                      exchange="bitstamp"
                      urlSocket={"wss://ws.bitstamp.net"}
                      rate={usdt}
                    />
                  </div>
                </div>
              </td>
            ))}
          </tr>

          <tr className=" ">
            <td className=" text-xl">
              <div className="row flex ">
                <Image src={"/FTX.png"} width={30} height={30} className="" />
                <p className="px-4">FTX</p>
              </div>
            </td>
            {symbols.map((symbol, index) => (
              <td>
                <div className="w-64 mx-12 ">
                  <div className="my-2 w-full py-5 bg-gray-100 ">
                    {/* <Ftx
                  symbol={symbol}
                  exchange="FTX"
                  urlSocket={"wss://ftx.com/ws/"}
                  rate={usdt}
                /> */}
                  </div>
                </div>
              </td>
            ))}
          </tr>

          <tr className=" ">
            <td className=" text-xl">
              <div className="row flex ">
                <Image
                  src={"/bitkub.png"}
                  width={30}
                  height={30}
                  className=""
                />
                <p className="px-4">Bitkub</p>
              </div>
            </td>
            {symbols.map((symbol, index) => (
              <td>
                <div className="w-64 mx-12 ">
                  <div className="my-2 w-full py-5 bg-gray-100 ">
                    <Bitkub symbols={symbol} exchanges="Bitkub" />
                  </div>
                </div>
              </td>
            ))}
          </tr>

          {/* <tr>
            <td className=" text-xl ">FTX</td>
            {symbols.map((symbol, index) => (
              <td>
                <Ftx
                  symbol={symbol}
                  exchange="FTX"
                  urlSocket={"wss://ftx.com/ws/"}
                  rate={usdt}
                />
              </td>
            ))}
          </tr> */}

          <tr>
            <td className=" text-xl ">BestPrice</td>
            {symbols.map((symbol, index) => (
              <td>
                <BestPrice symbol={symbol} />
              </td>
            ))}
          </tr>

          {/* <tr>
            <td>bitkub</td>
            {symbols.map((symbol, index) => (
              <td>
                <Bitkub symbols={symbol} exchanges="Bitkub" />
              </td>
            ))}
          </tr> */}
        </tbody>
      </table>






      <div className="row flex">
        <div className=" ">
          <table className=" text-center my-10 ml-10 ">
            <thead>
              <tr>
               <td>
                 <div className="mt-8"></div>
               </td>
              </tr>
              <tr className="text-sm text-slate-800">
                <th>Market</th>
              </tr>
            </thead>
            <tbody>
             
                <tr >
                  <td className=" text-xl">
                    <div className="row flex my-8">
                      <Image
                        src={"/binance.png"}
                        width={30}
                        height={30}
                        className=""
                      />
                      <p className="px-4">binance</p>
                    </div>
                  </td>
                </tr>
              

            
                <tr className=" ">
                  <td className=" text-xl">
                    <div className="row flex my-4 ">
                      <Image
                        src={"/bitstamp.png"}
                        width={30}
                        height={30}
                        className=""
                      />
                      <p className="px-4">Bitstamp</p>
                    </div>
                  </td>
                </tr>
           

            
                <tr className=" ">
                  <td className=" text-xl">
                    <div className="row flex my-8">
                      <Image
                        src={"/FTX.png"}
                        width={30}
                        height={30}
                        className=""
                      />
                      <p className="px-4">FTX</p>
                    </div>
                  </td>
                </tr>
            

             
                <tr>
                  <td className=" text-xl">
                    <div className="row flex my-6 ">
                      <Image
                        src={"/bitkub.png"}
                        width={30}
                        height={30}
                        className=""
                      />
                      <p className="px-4">Bitkub</p>
                    </div>
                  </td>
                </tr>
              

              
                <tr>
                  <td className=" text-xl ">BestPrice</td>
                </tr>
              
            </tbody>
          </table>
        </div>
        <div className="overflow-auto w-5/6">
          <table className=" text-center my-10 ml-10 ">
            <thead>
           
              <tr>
              <th>
                
               <div className="flex row w-64 ">
                
               {symbols.map((symbol,index) => {
                  return <>  
                   {coin.map((coin) => {
                   return <p> {coin} </p>
                 })}           
                <Name symbol={symbol}/>
                  </>
                } )}
               </div>
               
               </th>
              
              </tr>
              <tr className="text-sm text-slate-800">
                <th>
                  <a>Buy for </a> <a className="pl-16"> Sell for </a>
                </th>
                <th>
                  <a>Buy for </a> <a className="pl-16"> Sell for </a>
                </th>
                <th>
                  <a>Buy for </a> <a className="pl-16"> Sell for </a>
                </th>
                <th>
                  <a>Buy for </a> <a className="pl-16"> Sell for </a>
                </th>
              </tr>
            </thead>
            <tbody className="">
              <tr className=" ">
                {symbols.map((symbol, index) => (
                  <td>
                    <div className="w-64 mx-12 mt-4">
                      <div className="my-2 w-full py-5 bg-gray-100 ">
                        <Coin
                          symbol={symbol}
                          exchange="binance"
                          urlSocket={`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}usdt@bookTicker`}
                          formatSocket={(data) => +data.a}
                          formatSocketsell={(data) => +data.b}
                          rate={usdt}
                        />
                      </div>
                    </div>
                  </td>
                ))}
              </tr>

              <tr className=" ">
                {symbols.map((symbol, index) => (
                  <td>
                    <div className="w-64 mx-12 ">
                      <div className="my-2 w-full py-5 bg-gray-100 ">
                        <Bitstamp
                          symbol={symbol}
                          exchange="bitstamp"
                          urlSocket={"wss://ws.bitstamp.net"}
                          rate={usdt}
                        />
                      </div>
                    </div>
                  </td>
                ))}
              </tr>

              <tr className=" ">
                {symbols.map((symbol, index) => (
                  <td>
                    <div className="w-64 mx-12 ">
                      <div className="my-2 w-full py-5 bg-gray-100 ">
                        {/* <Ftx
                  symbol={symbol}
                  exchange="FTX"
                  urlSocket={"wss://ftx.com/ws/"}
                  rate={usdt}
                /> */}
                      </div>
                    </div>
                  </td>
                ))}
              </tr>

              <tr className=" ">
                {symbols.map((symbol, index) => (
                  <td>
                    <div className="w-64 mx-12 ">
                      <div className="my-2 w-full py-5 bg-gray-100 ">
                        <Bitkub symbols={symbol} exchanges="Bitkub" />
                      </div>
                    </div>
                  </td>
                ))}
              </tr>

              <tr>
                {symbols.map((symbol, index) => (
                  <td>
                    <BestPrice symbol={symbol} />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* <Garph symbol={symbols}/> */}
    </div>
  );
}
