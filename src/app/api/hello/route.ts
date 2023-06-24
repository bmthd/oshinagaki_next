import { NextRequest, NextResponse } from "next/server"

// 取得
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
    // ...
    return new NextResponse('Hello, Next.js!')
  }
  // 更新
  export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    // ...
    return new NextResponse(null, { status: 204 })
  }
  // 削除
  export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
    // ...
    return new NextResponse(null, { status: 204 })
  }