import { resetDB } from "@/app/libs/DB";
import { NextResponse } from "next/server";

//this route is for grading only
//in case of DB is messed up.

export const POST = () => {
  resetDB();
  return NextResponse.json({ ok: true, message: "DB has been reset" });
};