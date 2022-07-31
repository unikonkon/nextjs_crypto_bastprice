import { useContext, useEffect, useState } from "react";  //ใช้ useEffect, useState, useContext
import { GlobalContext } from "./GlobalContext";          //ใช้ GlobalContext 

export default function BestPrice({ symbol }) {           //รับค่าตัวแปร symbol มา

  const [bestExchange, setBestExchange] = useState();     //ประกาศตัวแปร ใช้ useState ใช้ state และ เปลี่ยนแปลงค่า state 
  const { price } = useContext(GlobalContext);            //นำ Price มาจาก GlobalContext โดยใช้ useContext
  const bestPriceCalculate = () => {                      //สร้างตัวแปร เขียน function
    if (price[symbol]) {                                  //เงื่อนไข ถ้ามี price[symbol] ตำแหน่งตาม symbol ที่รับเข้ามา ให้ทำงานใน { }
      let best = 999999999,                               //กำหนดค่า best เป็นค่าที่มากที่สุดกว่าค่าของเหรียญ
        exchange = null;                                  //กำหนด exchange เป็น null
      for (const [key, value] of Object.entries(price[symbol])) {   //เขียน for of เพื่อวนซ้ำค่าของค่าที่กำหนด และ Object.entries ใช้สำหรับแสดงรายการคู่ [ key , value ] ทั้งหมดของอ็อบเจกต์ 
                                                                    //ใน for of ประกาศตัวแปร key, value วนซำ้ตามค่า price[symbol] ที่ตำแหน่ง symbol ที่รับค่ามา  แล้วให้ทำงานใน { }
        if (best > value) {                               //เงื่อนไข ถ้าค่าbest มากกว่า value ให้ทำงานใน { } 
                                                          // value ที่เทียบกับค่า 9999999 value ที่เข้ามาแต่ละตัว ตาม price[symbol] ตัวไหนน้อยสุด ก็จะเอาค่า value ตัวนั้น
          best = value;                                   //ค่า best เท่ากับ ค่า value
          exchange = key;                                 //ค่า exchange เท่ากับ ค่า key
        }
      }
      setBestExchange(exchange);                          //เช็ตค่า setBestExchange exchange ที่เซ็ตไปคือ exchangeต่างๆ ที่เทียบมาแล้วค่าน้อยสุด
    }
  };
  useEffect(() => {                                       //ใช้useEffect เพื่อเวลาหน้าเว็บมีการเรนเดอร์เสร็จ ให้มันทำการดึงข้อมูลแสดงผลตาม price
    bestPriceCalculate();                                 //นำ bestPriceCalculate มาทำงาน
  }, [price]);

  return <div>{bestExchange}</div>;                       //แสดงผลออกเป็นตามค่า bestExchange
}
