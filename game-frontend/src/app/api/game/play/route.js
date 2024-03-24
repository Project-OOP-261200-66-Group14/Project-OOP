import { DB, readDB, saveDB, writeDB } from "@/app/libs/DB";
import { zPlayDeleteBody, zPlayGetBody, zPlayPostBody } from "@/app/libs/schema";
import { NextResponse } from "next/server";

// แสดงข้อมูลตำแหน่งของ username นั้นๆ
export const GET = async (request) => {
  readDB();
  const username = request.nextUrl.searchParams.get("username");

  const parseResult = zPlayGetBody.safeParse({ username });
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

  const foundUsername = DB.players.find((std) => std.username === username);
  if (!foundUsername) {
    return NextResponse.json(
      { message: "username not found" },
      { status: 400 }
    );
  }

  const cityList = [];
  for (const city of DB.table) {
    if (city.username === username) {
      cityList.push(city);
    }
  }

  return NextResponse.json({ cityList });
};

// ส่งข้อมูลตำแหน่งใหม่เข้า DB
export const POST = async (request) => {
  const body = await request.json();
  readDB();
  const parseResult = zPlayPostBody.safeParse(body);
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

  const { username, positionName, position } = body;
  // ถ้าไม่มีชื่อให้บอกว่าหาไม่เจอ
  const foundUsername = DB.players.find((std) => std.username === username);
  if (!foundUsername) {
    return NextResponse.json(
      { message: "username not found" },
      { status: 400 }
    );
  }

  // ถ้า username มี positionName: "city" จะสร้างไม่ได้อีกแล้ว ถ้ามี positionName: "cityCrew" ยังสร้างไดอีก
  if (
    positionName === "city" &&
    DB.table.some(
      (city) => city.username === username && city.positionName === "city"
    )
  ) {
    return NextResponse.json(
      { message: "city position already exists" },
      { status: 400 }
    );
  }

  // ถ้า Position ซ้ำกับที่มีอยู่แล้ว ไม่เอา
  const foundTable = DB.table.findIndex(
    (std) =>
      std.position.row === position.row && std.position.col === position.col
  );
  if (foundTable >= 0) {
    return NextResponse.json(
      { message: "position already exists" },
      { status: 400 }
    );
  }

  DB.table.push({
    username: username,
    positionName: positionName,
    position: position,
  });
  writeDB();
  return NextResponse.json({
    message: `new table got update`,
  });
};

// ลบข้อมูลตำแหน่งออกจาก DB
export const DELETE = async (request) => {
  const body = await request.json();
  readDB();
  const parseResult = zPlayDeleteBody.safeParse(body);
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

  // ถ้าไม่มีชื่อให้บอกว่าหาไม่เจอ
  const foundUsername = DB.players.findIndex(
    (std) => std.username === body.username
  );
  if (foundUsername < 0) {
    return NextResponse.json(
      {
        message: "username does not exist",
      },
      {
        status: 404,
      }
    );
  }

  const { username, positionName, position } = body;

  // if(username และ position ที่รับมา ไม่มีใน table error)
  const foundPosition = DB.table.find(
    (std) =>
      std.username === username &&
      std.position.row === position.row &&
      std.position.col === position.col
  );
  if (!foundPosition) {
    return NextResponse.json(
      { message: "position not found" },
      { status: 400 }
    );
  }

  // ถ้า positionName: city จะลบไม่ได้
  // if (positionName === "city") {
  //   return NextResponse.json(
  //     { message: "city position cannot be deleted" },
  //     { status: 400 }
  //   );
  // }

  // update DB
  DB.table = DB.table.filter(
    (std) =>
      std.username !== username ||
      (std.position.row !== position.row || std.position.col !== position.col)
  );
  writeDB();
  return NextResponse.json({
    message: "has been deleted",
  });
};