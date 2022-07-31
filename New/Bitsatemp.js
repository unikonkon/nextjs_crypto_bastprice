import { useContext, useEffect} from "react";         //ใช้ useEffect, useState
import { GlobalContext } from "./GlobalContext";      //ใช้ GlobalContext 

var W3CWebSocket = require("websocket").w3cwebsocket; //ประกาศตัวแปร var ใช้ WebSocket

export default function Exchange({                    // รับค่าเข้ามา
  symbol,
  urlSocket,
  exchange,
}) {
  const { price, setPrice } = useContext(GlobalContext); //ประกาศตัวแปรที่ใช้จาก GlobalContext

  const set_price = (price) => {                         //เขียน set_price เพื่อในตอนที่ setPrice ให้กับ price
    setPrice((e) => {                                    //เพื่อที่จะให้ในข้อมูล มีราคาตาม symbol และ มี exchange ให้กับแต่ละ price
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

  const get_price_from_socket = (event) => {      //ประกาศตัวแปรสำหรับดึงข้อมูล 
    try {                                         //เขียน try เพื่อ กำหนดโค้ตที่จะรัน
        const data = JSON.parse(event.data);      //ประกาศตัวแปร data แล้ว JSON.parse ดึงข้อมูลมาแปลงข้อมูลจาก JSON เป็น javaScript โดยให้ event เข้าถึง data
        set_price(data.data.bids[0]);             //เซ็ตค่า set_price จาก ตัวแปร data เข้าถึง data เข้าถึง bids ที่ตำแหน่ง 0
    } catch (err) {
      console.log(err);                           //ถ้า error log err ออกมา
    }
  };

  const init_socket = () => {
    try {
      var client = new W3CWebSocket(urlSocket);   //ประกาศตัวแปร ที่เข้าถึง socket รับค่า มาจาก urlSocket

        client.onopen = function () {             //ใช้ onopen เพื่อเตรียมข้อมูลก่อนที่จะส่งข้อมูลไป         
        client.send(JSON.stringify({              //ส่งข้อมูลไปเป็น JSON ใช้JSON.stringify() 
            event: "bts:subscribe",               
            data: { channel: `order_book_${symbol}usdt` },  //ในข้อมูลที่ส่ง มี ` ` เพื่อที่จะใส่ข้อมูลที่รับค่ามาจาก symbol
          }))
      };

      client.onmessage = function (e) {           //ใช้ onmessage เพื่อรับข้อความจากเซิฟเวอร์
        get_price_from_socket(e);                 //ทำงานจากตัวแปร get_price_from_socket
      };
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {            //ใช้useEffect เพื่อเวลาหน้าเว็บมีการเรนเดอร์เสร็จ ให้มันทำการดึงข้อมูลแสดงผล ครั้งเดียว หรือ ตามข้อมูลที่อยากจะให้แสดง            
    init_socket();             //ทำงานตามตัวแปร init_socket
  }, []);


  if (price[symbol] && !price[symbol][exchange]) {    //ถ้ามีข้อมูล price[symbol] และ ไม่มี price[symbol][exchange] มา
    return "ไม่พบข้อมูล";                                //ให้แสดง ไม่พบข้อมูล
  }
  
  return (
    <div>
      { price &&                                      //price ที่ถูกส่งไป ต้องมี price[symbol] และ price[symbol][exchange]
        price[symbol] &&
        price[symbol][exchange][0] &&
        price[symbol][exchange][0].toFixed(2)         //และ price มีตำแหน่งทศนิยม 2 ตำแหน่ง และมี , ตามหลักพัน
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    
      }
    </div>
  );
}
