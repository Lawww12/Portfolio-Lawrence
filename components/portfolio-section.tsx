'use client'

import { useState } from 'react'
import { portfolioData } from '@/lib/portfolio-data'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type Project = (typeof portfolioData.projects)[number]
type Certification = (typeof portfolioData.certifications)[number]

interface PortfolioSectionProps {
  data?: typeof portfolioData
}

export function PortfolioSection({ data = portfolioData }: PortfolioSectionProps) {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selected, setSelected] = useState<Project | null>(null)
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)

  const projectCategories = (project: Project) => {
    const anyProject = project as unknown as { categories?: unknown; category?: unknown }
    if (Array.isArray(anyProject.categories)) {
      return anyProject.categories.filter((c): c is string => typeof c === 'string')
    }
    if (typeof anyProject.category === 'string') return [anyProject.category]
    return []
  }

  const filteredProjects =
    activeFilter === 'All'
      ? data.projects
      : data.projects.filter((p) => projectCategories(p).includes(activeFilter))

  const openProject = (project: Project) => {
    setSelected(project)
  }

  const openCert = (cert: Certification) => {
    setSelectedCert(cert)
  }

  const handleCardKeyDown = (e: React.KeyboardEvent, project: Project) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      openProject(project)
    }
  }

  const handleCertKeyDown = (e: React.KeyboardEvent, cert: Certification) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      openCert(cert)
    }
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Portfolio</h2>
        <div className="w-10 h-1 bg-accent rounded-full mb-6" />
      </div>

      <div className="flex flex-wrap gap-2 md:gap-3">
        {data.categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveFilter(category)}
            className={`px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-medium capitalize transition-all ${
              activeFilter === category
                ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/20'
                : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredProjects.map((project, index) => (
          <div
            key={`${project.title}-${index}`}
            role="button"
            tabIndex={0}
            onClick={() => openProject(project)}
            onKeyDown={(e) => handleCardKeyDown(e, project)}
            className="group relative bg-secondary rounded-xl md:rounded-2xl border border-border overflow-hidden hover:border-accent transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={`View details: ${project.title}`}
          >
            <div className="aspect-[4/3] overflow-hidden bg-background">
              <img
                src={project.image || '/placeholder.svg'}
                alt=""
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 md:p-6 pointer-events-none">
              <h3 className="text-lg md:text-xl font-bold text-foreground transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                {project.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                Click to view full details
              </p>
            </div>

            <div className="absolute top-3 right-3 md:top-4 md:right-4 px-2.5 md:px-3 py-1 md:py-1.5 bg-background/90 backdrop-blur-sm border border-border rounded-lg text-xs font-medium text-accent capitalize pointer-events-none">
              {projectCategories(project)[0] ?? 'Project'}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent
          className="max-h-[min(90vh,calc(100%-2rem))] overflow-y-auto sm:max-w-2xl gap-0 p-0 border-border"
          showCloseButton
        >
          {selected && (
            <>
              <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-muted">
                <img
                  src={selected.image || '/placeholder.svg'}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-3 right-12 md:right-14">
                  <div className="flex flex-wrap items-center justify-end gap-2">
                    {projectCategories(selected).map((cat) => (
                      <span
                        key={cat}
                        className="inline-block rounded-lg border border-border bg-background/95 px-3 py-1.5 text-xs font-medium capitalize text-accent backdrop-blur-sm"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4 p-6 pt-5">
                <DialogHeader className="gap-2 text-left space-y-2">
                  <DialogTitle className="text-xl md:text-2xl font-bold leading-tight pr-8">
                    {selected.title}
                  </DialogTitle>
                  <DialogDescription asChild>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {selected.description}
                    </p>
                  </DialogDescription>
                </DialogHeader>
                {selected.tech?.length ? (
                  <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Technologies & tools
                    </h4>
                    <ul className="flex flex-wrap gap-2">
                      {selected.tech.map((item) => (
                        <li
                          key={item}
                          className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm text-foreground"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <div className="pt-2 md:pt-4 space-y-4 md:space-y-6">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-foreground">Licenses & Certifications</h3>
          <div className="w-10 h-1 bg-accent rounded-full mt-4" />
        </div>

        {data.certifications.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {data.certifications.map((cert, index) => (
              <div
                key={`${cert.title ?? 'cert'}-${index}`}
                role="button"
                tabIndex={0}
                onClick={() => openCert(cert)}
                onKeyDown={(e) => handleCertKeyDown(e, cert)}
                className="group relative bg-secondary rounded-xl md:rounded-2xl border border-border overflow-hidden hover:border-accent transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={`View certification: ${cert.title ?? 'Certification'}`}
              >
                <div className="aspect-[4/3] overflow-hidden bg-background">
                  <img
                    src={cert.image || '/placeholder.svg'}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 md:p-6 pointer-events-none">
                  <h4 className="text-lg md:text-xl font-bold text-foreground transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {cert.title ?? 'Certification'}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                    Click to view full details
                  </p>
                </div>

                {cert.issuer ? (
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 px-2.5 md:px-3 py-1 md:py-1.5 bg-background/90 backdrop-blur-sm border border-border rounded-lg text-xs font-medium text-accent pointer-events-none">
                    {cert.issuer}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl md:rounded-2xl border border-border bg-secondary p-5 md:p-6 text-sm md:text-base text-muted-foreground">
            Add your licenses/certifications to show them here.
          </div>
        )}

        <Dialog open={selectedCert !== null} onOpenChange={(open) => !open && setSelectedCert(null)}>
          <DialogContent
            className="max-h-[min(90vh,calc(100%-2rem))] overflow-y-auto sm:max-w-2xl gap-0 p-0 border-border"
            showCloseButton
          >
            {selectedCert && (
              <>
                <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-muted">
                  <img
                    src={selectedCert.image || '/placeholder.svg'}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  {selectedCert.issuer ? (
                    <div className="absolute top-3 right-12 md:right-14">
                      <span className="inline-block rounded-lg border border-border bg-background/95 px-3 py-1.5 text-xs font-medium text-accent backdrop-blur-sm">
                        {selectedCert.issuer}
                      </span>
                    </div>
                  ) : null}
                </div>
                <div className="space-y-4 p-6 pt-5">
                  <DialogHeader className="gap-2 text-left space-y-2">
                    <DialogTitle className="text-xl md:text-2xl font-bold leading-tight pr-8">
                      {selectedCert.title}
                    </DialogTitle>
                    {selectedCert.description ? (
                      <DialogDescription asChild>
                        <p className="text-base leading-relaxed text-muted-foreground">
                          {selectedCert.description}
                        </p>
                      </DialogDescription>
                    ) : null}
                  </DialogHeader>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
