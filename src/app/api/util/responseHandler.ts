import { NextResponse } from "next/server";

export async function successResponse(
  data: object | string = "success",
  statusCode = 200
) {
  const formattedData = typeof data === "string" ? data.toLowerCase() : data;

  return createResponse(
    { data: formattedData, message: "SUCCESS", status: statusCode },
    statusCode
  );
}

// Helper function to create a NextResponse
function createResponse(body: object, status: number) {
  return NextResponse.json(body, { status });
}
