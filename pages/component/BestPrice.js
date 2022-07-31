import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";

export default function BestPrice({ symbol }) {
  const [bestExchange, setBestExchange] = useState();
  const [lowExchange, setLowExchange] = useState();
  const { price } = useContext(GlobalContext);
  const { sellPrice } = useContext(GlobalContext);
  // console.log(price[symbol])
  // const bestPriceCalculate = () => {
  //   if (price[symbol]) {
  //     let best = 999999999
  //     let exchange = null
  //       // console.log(price[symbol])
  //     for (const [key, value] of Object.entries(price[symbol])) {
  //       // console.log(`${key}: ${value}`);
  //       if (best > value) {
  //          best = value;
  //         exchange = key;
  //       }
  //     }
  //     setBestExchange(exchange);
  //   }
  // };
  useEffect(() => {
    if (price[symbol]) {
      let best = 999999999;
      let exchange = null;
      // console.log(price[symbol])
      for (const [key, value] of Object.entries(price[symbol])) {
        // console.log(`${key}: ${value}`);
        if (best > value) {
          best = value;
          exchange = key;
        }
      }
      setBestExchange(exchange);
    }
  }, [price]);

  // const lowPriceCalculate = () => {
  //   if (sellPrice[symbol]) {
  //     let best = 999999999
  //     let exchange = null
  //       // console.log(sellPrice[symbol])
  //     for (const [key, value] of Object.entries(sellPrice[symbol])) {
  //       // console.log(`${key}: ${value}`);
  //       if (best > value) {
  //          best = value;
  //         exchange = key;
  //       }
  //     }
  //     setLowExchange(exchange);
  //   }
  // };
  useEffect(() => {
    if (sellPrice[symbol]) {
      let best = 1;
      let exchange = null;
      // console.log(sellPrice[symbol])
      for (const [key, value] of Object.entries(sellPrice[symbol])) {
        // console.log(`${key}: ${value}`);
        if (best < value) {
          best = value;
          exchange = key;
        }
      }
      setLowExchange(exchange);
    }
  }, [sellPrice]);

  return (
    <div>
      <div className="w-64 mx-12 ">
        <div className="my-2 w-full py-5 bg-gray-100 row flex">
          <p className="pl-12"> {bestExchange} </p>
          <p className="pl-12">  {lowExchange} </p>
          
        </div>
      </div>
    </div>
  );
}
