import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/app/api/auth/auth'
import { updateNotebook } from '@/lib/action'

export async function POST(req: NextRequest) {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const formData = await req.formData()
    const id = formData.get('id') as string
    const name = formData.get('name') as string
    const column = formData.get('column') as string

    if (!id || !name || !column) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    await updateNotebook(id, name, column)

    return NextResponse.redirect(new URL('/dashboard', req.url))
  } catch (error) {
    console.error('Error updating notebook:', error)
    return NextResponse.json(
      { error: 'Failed to update notebook' },
      { status: 500 }
    )
  }
}