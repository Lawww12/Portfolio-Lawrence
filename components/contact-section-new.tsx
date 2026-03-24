'use client'

import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { contactData } from '@/lib/portfolio-data'

interface ContactSectionProps {
  data?: typeof contactData
}

function splitEmailForReveal(email: string) {
  const at = email.indexOf('@')
  if (at === -1) {
    return { head: email, mid: '', domain: '' as string }
  }
  const local = email.slice(0, at)
  const domain = email.slice(at)
  if (local.length <= 5) {
    return { head: local, mid: '', domain }
  }
  const headLen = Math.max(4, Math.floor(local.length * 0.38))
  return {
    head: local.slice(0, headLen),
    mid: local.slice(headLen),
    domain,
  }
}

function openMailto(to: string, name: string, fromEmail: string, message: string) {
  const params = new URLSearchParams({
    subject: `Portfolio contact from ${name}`,
    body: `From: ${name} <${fromEmail}>\n\n${message}`,
  })
  window.location.href = `mailto:${encodeURIComponent(to)}?${params.toString()}`
}

export function ContactSection({ data = contactData }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const { head, mid, domain } = splitEmailForReveal(data.email)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.status === 503) {
        openMailto(data.email, formData.name, formData.email, formData.message)
        toast.info('Opening your email app…', {
          description: 'Your message is pre-filled. Press send to deliver it.',
        })
        setFormData({ name: '', email: '', message: '' })
        return
      }

      const contentType = res.headers.get('content-type') ?? ''
      const payload = contentType.includes('application/json')
        ? ((await res.json()) as { ok?: boolean; error?: string })
        : { error: await res.text() }

      if (!res.ok) {
        toast.error((payload as { error?: string }).error ?? 'Something went wrong')
        return
      }

      toast.success('Message sent', {
        description: 'Thanks — you should hear back soon.',
      })
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      const msg = err instanceof Error ? err.message : null
      toast.error('Could not send message', {
        description: msg ?? 'Please try again in a moment.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Contact</h2>
        <div className="w-10 h-1 bg-accent rounded-full mb-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        <div className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-secondary rounded-xl md:rounded-2xl border border-border hover:border-accent transition-colors group">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
            <Mail className="w-5 h-5 md:w-6 md:h-6 text-accent" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-1">Email</h3>
            <a
              href={`mailto:${data.email}`}
              title={data.email}
              aria-label={`Email ${data.email}`}
              className="group/email inline-flex max-w-full items-baseline text-sm md:text-base text-foreground hover:text-accent transition-colors font-medium cursor-pointer"
            >
              <span className="shrink-0">{head}</span>
              {mid ? (
                <span
                  className="inline-block overflow-hidden align-baseline transition-[max-width] duration-700 ease-out motion-reduce:transition-none max-w-0 opacity-90 group-hover/email:max-w-[min(100%,14rem)] group-hover/email:opacity-100 group-focus-visible/email:max-w-[min(100%,14rem)] group-focus-visible/email:opacity-100"
                  aria-hidden
                >
                  <span className="inline-block whitespace-nowrap">{mid}</span>
                </span>
              ) : null}
              <span className="shrink-0">{domain}</span>
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-secondary rounded-xl md:rounded-2xl border border-border hover:border-accent transition-colors group">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
            <Phone className="w-5 h-5 md:w-6 md:h-6 text-accent" />
          </div>
          <div>
            <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-1">Phone</h3>
            <a
              href={`tel:${data.phone.replace(/\s/g, '')}`}
              className="text-sm md:text-base text-foreground hover:text-accent transition-colors font-medium"
            >
              {data.phone}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-secondary rounded-xl md:rounded-2xl border border-border hover:border-accent transition-colors group">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
            <MapPin className="w-5 h-5 md:w-6 md:h-6 text-accent" />
          </div>
          <div>
            <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-1">Location</h3>
            <p className="text-sm md:text-base text-foreground font-medium">{data.location}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 md:px-5 py-3 md:py-3.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all text-sm md:text-base"
              placeholder="Your name"
              required
              disabled={submitting}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 md:px-5 py-3 md:py-3.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all text-sm md:text-base"
              placeholder="john@example.com"
              required
              disabled={submitting}
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
            Your Message
          </label>
          <textarea
            id="message"
            rows={6}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 md:px-5 py-3 md:py-3.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all resize-none text-sm md:text-base"
            placeholder="Write your message here..."
            required
            disabled={submitting}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="flex items-center justify-center gap-2 w-full md:w-auto px-6 md:px-8 py-3 md:py-3.5 bg-accent text-accent-foreground rounded-xl font-medium hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5 transition-all text-sm md:text-base disabled:opacity-60 disabled:pointer-events-none disabled:hover:translate-y-0"
        >
          {submitting ? (
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
          ) : (
            <Send className="w-4 h-4" aria-hidden />
          )}
          {submitting ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}
