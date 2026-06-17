export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="mb-12 text-center">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="text-4xl font-bold tracking-tight text-ink dark:text-paper">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-xl text-ink/60 dark:text-paper/60">
          {subtitle}
        </p>
      )}
      <span className="divider-gold" aria-hidden="true" />
    </div>
  )
}
