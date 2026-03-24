import { Mail, Phone, Calendar, MapPin } from 'lucide-react'
import { Instagram } from 'lucide-react'
import { profileData } from '@/lib/portfolio-data'

interface ProfileSidebarProps {
  data?: typeof profileData
}

export function ProfileSidebar({ data = profileData }: ProfileSidebarProps) {
  return (
    <aside className="w-full lg:w-80 bg-card rounded-2xl border border-border p-4 md:p-6 lg:sticky lg:top-8 h-fit">
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4 md:mb-6">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/20 via-accent/5 to-transparent animate-pulse-slow" />
          <div className="absolute inset-[2px] rounded-3xl bg-secondary overflow-hidden">
            <img
              src={data.avatar || "/placeholder.svg"}
              alt={data.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        <img
          src="/law-secures-logo.svg"
          alt="Law Secures logo"
          className="w-32 md:w-40 h-auto mb-3 md:mb-4"
        />

        <h1 className="text-xl md:text-2xl font-bold text-foreground mb-1">{data.name}</h1>
        <p className="text-xs md:text-sm text-muted-foreground bg-secondary px-3 md:px-4 py-1 rounded-lg">
          {data.title}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-border my-4 md:my-6" />

      {/* Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground uppercase mb-1">Email</p>
            <a
              href={`mailto:${data.email}`}
              className="text-sm text-foreground hover:text-accent transition-colors break-all"
            >
              {data.email}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
            <Phone className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground uppercase mb-1">Phone</p>
            <a
              href={`tel:${data.phone.replace(/\s/g, '')}`}
              className="text-sm text-foreground hover:text-accent transition-colors"
            >
              {data.phone}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground uppercase mb-1">Birthday</p>
            <p className="text-sm text-foreground">{data.birthday}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground uppercase mb-1">Location</p>
            <p className="text-sm text-foreground">{data.location}</p>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex items-center justify-center gap-4 mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border">
        <a
          href={data.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center"
          aria-label="Instagram"
        >
          <Instagram className="w-5 h-5" />
        </a>
      </div>
    </aside>
  )
}
