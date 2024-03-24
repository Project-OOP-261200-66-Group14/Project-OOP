import _ from "lodash";
import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import fs from "fs";

const onProduction = process.env.NODE_ENV === "production";
const adapter = new JSONFileSync("DatabaseFile.json");

// ตัวแปร originalDB มีข้อมูลเริ่มต้นที่คุณต้องการในฐานข้อมูล
const originalDB = {
  players: [],
  table: [],
  setting: {
    numPlayer: 2,
    row: 20,
    col: 20,
    budget: 10000,
    initplan: 1 * 60 + 0,
    interest: 5,
  },
  current: []
};

let lowDB = new LowSync(adapter, originalDB);

// ถ้าไฟล์ DatabaseFile.json ไม่มีอยู่ในระบบ
if (!fs.existsSync("DatabaseFile.json")) {
  lowDB.write();
}

// กำหนดค่าเริ่มต้นให้ตัวแปร DB โดยเช็คว่าอยู่ในโหมด production หรือไม่
export let DB = onProduction ? _.cloneDeep(originalDB) : lowDB.data;

// ฟังก์ชันสำหรับรีเซ็ตฐานข้อมูลกลับไปยังค่าเริ่มต้น
export function resetDB() {
  if (onProduction) {
    DB = _.cloneDeep(originalDB);
  } else {
    lowDB = new LowSync(adapter, originalDB);
    DB = lowDB.data;
    lowDB.write();
  }
}

// ฟังก์ชันสำหรับอ่านข้อมูลจากไฟล์ JSON
export function readDB() {
  if (!onProduction) {
    lowDB.read();
    DB = lowDB.data;
  }
}

// ฟังก์ชันสำหรับเขียนข้อมูลไปยังไฟล์ JSON
export function writeDB() {
  if (!onProduction) {
    lowDB.write();
  }
}
