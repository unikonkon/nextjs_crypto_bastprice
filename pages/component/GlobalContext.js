import { createContext, useState } from "react";  //ใช้ createContext, useState

export const GlobalContext = createContext(); //สร้าง GlobalContext ไว้เก็บค่า
// ข้อมูลของเอลิเมนต์ย่อยที่อยู่ภายในแท็ก React จะถูกส่งผ่านมายัง props
export default function ContextProvider({ children }) {   //ประกาศตัวแปร children มารับค่า props
 
  const [price, setPrice] = useState({});
  const [sellPrice, setSellPrice] = useState({})
  // console.log(sellPrice)
  //ประกาศตัวแปร ใช้ useState ใช้ state และ เปลี่ยนแปลงค่า state 
  return (
    <GlobalContext.Provider        //สร้างแท็ก GlobalContext.Provider เพื่อกำหนดขอบเขตของข้อมูล
      value={{                     //ค่า Velue มี ตัวแปร price setPrice
        price,
        setPrice,sellPrice, setSellPrice
      }}
    >
      {children}                   
    </GlobalContext.Provider>
  );
}
