import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '../../../lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession()
    // return NextResponse.json({ session });
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

  
  const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) return NextResponse.json({ projects: [] })
   
    const projects = await prisma.project.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'desc' } })
    return NextResponse.json({ projects })
  } catch (err) {
    console.error('Projects GET error:', err)
    const body: { error: string; details?: string } = { error: 'Server error' }
    if (process.env.NODE_ENV !== 'production') body.details = String(err instanceof Error ? err.stack || err.message : err)
    return NextResponse.json(body, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession()
    
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { name, description, defaultModel } = body
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

 
  const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    if (!('project' in prisma)) {
      // log keys for debugging
      try {
        console.error('Prisma client keys:', Object.keys(prisma as Record<string, unknown>))
      } catch (e) {
        console.error('Prisma client keys error:', e)
      }
      const body: { error: string; details?: string } = { error: 'Prisma model `project` not available on client' }
      if (process.env.NODE_ENV !== 'production') body.details = Object.keys(prisma as Record<string, unknown>).join(', ')
      return NextResponse.json(body, { status: 500 })
    }

    const project = await prisma.project.create({
      data: {
        name,
        description: description ?? null,
        defaultModel: defaultModel ?? 'gpt-3.5-turbo',
        user: { connect: { id: user.id } },
      },
    })

    return NextResponse.json({ project }, { status: 201 })
  } catch (err) {
    console.error('Projects POST error:', err)
    const body: { error: string; details?: string } = { error: 'Server error' }
    if (process.env.NODE_ENV !== 'production') body.details = String(err instanceof Error ? err.stack || err.message : err)
    return NextResponse.json(body, { status: 500 })
  }
}
