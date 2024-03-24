import { DB, readDB, writeDB } from "@/app/libs/DB";
import { NextResponse } from "next/server";
import sleep from "sleep-promise";

export const GET = async (request) => {
  await sleep(1000);
  readDB();
  const setting = DB.setting;
  return NextResponse.json({ setting });
};

export const PUT = async (request) => {
  readDB();
  const body = await request.json();
  DB.setting = body;
  writeDB();
  return NextResponse.json({ ok: true });
};