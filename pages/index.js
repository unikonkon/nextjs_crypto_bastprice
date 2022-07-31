import React from "react"  
import Table from "./component/Table"   //นำไฟล์เข้ามาจาก Table 
import GolbalContext from "./component/GlobalContext";  //นำไฟล์เข้ามาจาก GolbalContext 
export default function Home() {    //สร้างแท็ก GolbalContext เพื่อกำหนดขอบเขตที่จะใช้ GolbalContext
  return (
    <div className="">
    <GolbalContext>        
      <Table />
    </GolbalContext>
    </div>
  )
}
