import { DB, readDB } from "@/app/libs/DB";
import { NextResponse } from "next/server";

// ส่งข้อมูลทั้งหมด
export const GET = async (request) => {
  readDB();
  const all = DB;

  return NextResponse.json({ all });
};