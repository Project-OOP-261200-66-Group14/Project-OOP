import { DB, readDB, writeDB } from "@/app/libs/DB";
import { zGameDeleteBody, zInfoPostBody } from "@/app/libs/schema";
import { NextResponse } from "next/server";

// ส่งข้อมูลทั้งหมด
export const GET = async (request) => {
  readDB(); // อ่านข้อมูลจากฐานข้อมูล
  const current = DB.current;

  return NextResponse.json({ current });
};

export const POST = async (request) => {
  const body = await request.json();
  readDB(); // อ่านข้อมูลจากฐานข้อมูล

  const parseResult = zInfoPostBody.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json(
      {
        message: parseResult.error.issues[0].message,
      },
      {
        status: 400,
      }
    );
  }

  const { username, positionName, position } = body;
  // ถ้าไม่มีชื่อให้บอกว่าหาไม่เจอ
  const foundUsername = DB.players.find((std) => std.username === username);
  if (!foundUsername) {
    return NextResponse.json(
      { message: "username not found" },
      { status: 400 }
    );
  }

  // ตรวจสอบว่ามี username อยู่ในระบบอยู่แล้วหรือไม่
  const foundIndex = DB.current.findIndex(
    (std) => std.username === body.username
  );
  if (foundIndex >= 0) {
    return NextResponse.json(
      { message: "Username already exists" },
      { status: 400 }
    );
  }

  // เพิ่มข้อมูลผู้ใช้ใหม่ลงในฐานข้อมูล
  DB.current.push({
    username: body.username,
    budget: DB.setting.budget,
    position: body.position, // ต้องแก้ตรงนี้เพื่อให้รับข้อมูลตำแหน่งที่ส่งมาจากลูกค้า
  });
  writeDB(); // เขียนข้อมูลกลับไปยังฐานข้อมูล

  return NextResponse.json({
    message: `Username ${body.username} has been added`,
  });
};

export const PUT = async (request) => {
  readDB();
  const body = await request.json();
  const parseResult = zInfoPostBody.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json(
      {
        message: parseResult.error.issues[0].message,
      },
      {
        status: 400,
      }
    );
  }
  const { username, positionName, position } = body;

  // ถ้าไม่มีชื่อให้บอกว่าหาไม่เจอ
  const foundUsername = DB.players.find((std) => std.username === username);
  if (!foundUsername) {
    return NextResponse.json(
      { message: "username not found" },
      { status: 400 }
    );
  }

  // ถ้า username ที่ body ได้รับ อยู่ใน current ให้ current ตำแหน่งนั้นแทนที่ด้วย body อันใหม่
  const indexToUpdate = DB.current.findIndex((std) => std.username === username);
  if (indexToUpdate >= 0) {
    DB.current[indexToUpdate].position = position;
    DB.current[indexToUpdate].budget -= 500;
  }

  writeDB();
  return NextResponse.json({ ok: true });
};

export const DELETE = async (request) => {
  const body = await request.json();
  readDB(); // อ่านข้อมูลจากฐานข้อมูล

  const parseResult = zGameDeleteBody.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json(
      {
        message: parseResult.error.issues[0].message,
      },
      {
        status: 400,
      }
    );
  }

  const { username } = body;
  // ถ้าไม่มีชื่อให้บอกว่าหาไม่เจอ
  const foundUsername = DB.players.find((std) => std.username === username);
  if (!foundUsername) {
    return NextResponse.json(
      { message: "username not found" },
      { status: 400 }
    );
  }

  // เพิ่มข้อมูลผู้ใช้ใหม่ลงในฐานข้อมูล
  if(DB.current.length > 0) {
    DB.current = DB.current.filter((std) => std.username !== body.username);
  }
  writeDB(); // เขียนข้อมูลกลับไปยังฐานข้อมูล

  return NextResponse.json({
    message: `Username ${body.username} has been added`,
  });
};