import React, { useState,useEffect ,useContext } from "react";
import { Line } from "react-chartjs-2";
import { Line as LineJS } from "chart.js/auto";
import Image from "next/image";
import { GlobalContext } from "../component/GlobalContext";
import { w3cwebsocket as WebSocket } from "websocket";

 


export default function graph({ symbol }) {


  const graph = new WebSocket(
    "wss://stream.binance.com:9443/ws/btcusdt@kline_30m"
  );

  
  const [BinanceGarph, setBinanceGarph] = useState([]);
  const [BinanceTime, setBinanceTime] = useState([]);

   
  useEffect(() => {
    graph.onmessage = (event) => {
   
      try {
        const json = JSON.parse(event.data);
        setBinanceTime(prevState => ([...prevState, json.E]))
        setBinanceGarph(prevState => ([...prevState, json.k.c]))
      } catch (err) {}
    }; 

  }, []);


  const { Exchange } = useContext(GlobalContext);
  const { price } = useContext(GlobalContext);

  // const labels = BinanceTime.map((c) => {
  //   let date = new Date(c);
  //   let time =
  //     date.getHours() > 12
  //       ? `${date.getHours() - 12}:${date.getMinutes()} PM`
  //       : `${date.getHours()}:${date.getMinutes()} AM`;
  //   return  time ;
  // });
  // console.log(price.btc.binance)
  const data = {
    labels: BinanceTime.map((c) => {
      let date = new Date(c);
      let time =
        date.getHours() > 12
          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
          : `${date.getHours()}:${date.getMinutes()} AM`;
      return  time ;
    }) 
    ,
    datasets: [
      {
        label: "Dataset 1",
        data: [BinanceGarph],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      
      },
      // { 
      //   label: "Dataset 2",
      //   data: ["2900", "2950", "3000", "2900", "3100", "2970"],
      //   borderColor: "rgb(53, 162, 235)",
      //   backgroundColor: "rgba(53, 162, 235, 0.5)",
      // },
    ],
  };

  const [show, setShow] = useState();
  
  return (
    <div>
      {/* {coin.map((coin, index) => {
        return (
          <>
            {column.map((column, index) => {
              return (
                <>
                  <div className=" px-6 ">
                    {column.render(coin[column.key])}
                  </div>
                </>
              );
            })}
          </>
        );
      })} */}
      {show}
      <button
        onClick={() => {
          setShow((c) => <Image src={"/btc.png"} width={40} height={40} />);
        }}
      >
        show
      </button>
      <Line data={data} />
    </div>
  );
}
