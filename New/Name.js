import React from "react";
import Image from "next/image";            //ใช้แท็ก Image
export default function name({ name }) {   // รับข้อมูลมาจากตัวแปร name 

  return (
    <div className="text-lg py-2 text-center ">
      <a> {name} </a>                      //แสดงออกเป็นชื่อเหรียญ       
      <div>
        <Image                             //แสดงรูปภาพ 
          src={`/${name}.png`}             //ที่อยู่ไฟล์รูปภาพ ใช้ ` ` เพื่อรับข้อมูลมาจากตัวแปร name
          width={40}                       //กำหนดขนาด
          height={40} 
        />  
      </div>                              
    </div>
  );
}
