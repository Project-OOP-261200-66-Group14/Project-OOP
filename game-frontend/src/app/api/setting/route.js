import { DB } from "@/app/libs/DB";
import { NextResponse } from "next/server";
import sleep from "sleep-promise";

export const GET = async (request) => {
  await sleep(1000);
  const setting = DB.setting;

  return NextResponse.json({ setting });
};

export const PUT = async (request) => {
  const body = await request.json();

  DB.setting = body;
  return NextResponse.json({ ok: true });
};