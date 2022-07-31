import { useContext, useEffect } from "react";  //ใช้ useEffect, useState
import { GlobalContext } from "./GlobalContext"; //ใช้ GlobalContext 

var W3CWebSocket = require("websocket").w3cwebsocket;  //ประกาศตัวแปร var ใช้ WebSocket

export default function Exchange({                    // รับค่าเข้ามา
  symbol,        
  urlSocket,
  formatSocket = () => <></>,
  exchange
}) {

  const { price, setPrice } = useContext(GlobalContext);   //ประกาศตัวแปรที่ใช้จาก GlobalContext

  const set_price = (price) => {                 //เขียน set_price เพื่อ ในตอนที่ setPrice ให้กับ price
    setPrice((e) => {                            //เพื่อที่จะให้ในข้อมูล มีราคาตาม symbol  และ มี exchange ให้กับแต่ละตัว
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

  const get_price_from_socket = (data_socket) => {     //ประกาศตัวแปรสำหรับดึงข้อมูล 
    try {                                              //เขียน try เพื่อ กำหนดโค้ตที่จะรัน
      const { data: data_string } = data_socket;       //ประกาศตัวแปรที่มี Object data
      const data = JSON.parse(data_string);            //ใช้ data_string แล้ว JSON.parse ดึงข้อมูลมาแปลงข้อมูล จาก JSON เป็น javaScript
      set_price(formatSocket(data));                   //เซ็ตค่า set_price จาก formatSocket ที่รับข้อมูล ที่มีการเข้าถึง socket จากแต่ละ exchange 
    } catch (err) {
      console.log(err);                                //ถ้า error log err ออกมา
    }
  };

  const init_socket = () => {
    try {
      var client = new W3CWebSocket(urlSocket);       //ประกาศตัวแปร ที่เข้าถึง socket รับค่า มาจาก urlSocket

      client.onmessage = function (e) {               //ใช้ onmessage เพื่อรับข้อความจากเซิฟเวอร์ 
        get_price_from_socket(e);                     //ทำงานจากตัวแปร get_price_from_socket
      };
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {       //ใช้useEffect เพื่อเวลาหน้าเว็บมีการเรนเดอร์เสร็จ ให้มันทำการดึงข้อมูลแสดงผล ครั้งเดียว หรือ ตามข้อมูลที่อยากจะให้แสดง
    init_socket();        //ทำงานตามตัวแปร init_socket
  }, []);


  if (price[symbol] && !price[symbol][exchange]) {   //ถ้ามีข้อมูล price[symbol] และ ไม่มี price[symbol][exchange] มา
    return "โหลดข้อมูล...";                            //ให้แสดง โหลดข้อมูล...
  }

  return (
    <div>
      {price &&                                  //price ที่ถูกส่งไป ต้องมี price[symbol] และ price[symbol][exchange]
        price[symbol] &&                          
        price[symbol][exchange] &&               
        price[symbol][exchange]                  //และ price มีตำแหน่งทศนิยม 2 ตำแหน่ง และมี , ตามหลักพัน 
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
    </div>
  );
}
