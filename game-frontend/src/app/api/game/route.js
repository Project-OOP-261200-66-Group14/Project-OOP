import { DB, readDB, writeDB } from "@/app/libs/DB";
import { zGameDeleteBody, zGamePostBody } from "@/app/libs/schema";
import { NextResponse } from "next/server";

// ส่งข้อมูลทั้งหมด
export const GET = async (request) => {
  readDB();
  const players = DB.players;

  return NextResponse.json({ players });
};

// สร้าง username 
export const POST = async (request) => {
  const body = await request.json();
  readDB();
  const parseResult = zGamePostBody.safeParse(body);
  if (parseResult.success === false) {
    return NextResponse.json(
      {
        message: parseResult.error.issues[0].message,
      },
      {
        status: 400,
      }
    );
  }

  const foundIndex = DB.players.findIndex(
    (std) => std.username === body.username
  );
  if (foundIndex >= 0) {
    return NextResponse.json(
      { message: "username already exists" },
      { status: 400 }
    );
  }

  DB.players.push({
    username: body.username,
  });
  writeDB();
  return NextResponse.json({
    message: `username ${body.username} has been added`,
  });
};

// ลบ username
export const DELETE = async (request) => {
  const body = await request.json();
  readDB();
  const parseResult = zGameDeleteBody.safeParse(body);
  if (parseResult.success === false) {
    return NextResponse.json(
      {
        ok: false,
        messeage: parseResult.error.issues[0].message,
      },
      {
        status: 400,
      }
    );
  }

  const foundIndex = DB.players.findIndex(
    (std) => std.username === body.username
  );
  if (foundIndex < 0) {
    return NextResponse.json(
      {
        message: "username does not exist",
      },
      {
        status: 404,
      }
    );
  }


  DB.players = DB.players.filter((std) => std.username !== body.username);
  DB.table = DB.table.filter((std) => std.username !== body.username);
  DB.current = DB.current.filter((std) => std.username !== body.username);
  writeDB();
  return NextResponse.json({
    message: `username: ${body.username} has been deleted`,
  });
};