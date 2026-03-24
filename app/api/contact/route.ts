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

  let res: Response
  try {
    res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Portfolio: message from ${name}`,
        name,
        email,
        message,
      }),
    })
  } catch {
    return NextResponse.json(
      { error: 'Could not reach the email service. Please try again.' },
      { status: 502 },
    )
  }

  const contentType = res.headers.get('content-type') ?? ''
  let data: { success?: boolean; message?: string } | null = null
  let text: string | null = null

  if (contentType.includes('application/json')) {
    try {
      data = (await res.json()) as { success?: boolean; message?: string }
    } catch {
      data = null
    }
  } else {
    try {
      text = await res.text()
    } catch {
      text = null
    }
  }

  if (!res.ok || !data?.success) {
    const providerMsg =
      data?.message ??
      (text ? text.slice(0, 200) : null) ??
      'Could not send message. Please try again.'
    return NextResponse.json({ error: providerMsg }, { status: 502 })
  }

  return NextResponse.json({ ok: true as const })
}
