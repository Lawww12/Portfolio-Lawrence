import { NextResponse } from 'next/server'

type Body = {
  name?: string
  email?: string
  message?: string
}

export async function POST(request: Request) {
  let body: Body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY
  if (!accessKey) {
    return NextResponse.json({ configured: false as const }, { status: 503 })
  }

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `Portfolio: message from ${name}`,
      name,
      email,
      message,
    }),
  })

  const data = (await res.json()) as { success?: boolean; message?: string }

  if (!res.ok || !data.success) {
    return NextResponse.json(
      { error: data.message ?? 'Could not send message. Try again or use email.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true as const })
}
