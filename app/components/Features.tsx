import {
  FaCrown,
  FaGem,
  FaShieldAlt,
  FaUsers,
  FaSpa,
  FaRegClock,
} from 'react-icons/fa'
import SectionHeading from './SectionHeading'

const features = [
  { icon: FaUsers, title: 'Expert Stylists', text: 'A skilled team trained in the latest hair, skin and bridal techniques.' },
  { icon: FaCrown, title: 'Premium Products', text: 'Only trusted, professional-grade brands touch your hair and skin.' },
  { icon: FaGem, title: 'Bridal Specialists', text: 'Signature bridal, engagement and reception looks crafted for your big day.' },
  { icon: FaShieldAlt, title: 'Hygienic & Safe', text: 'Sanitised tools and a clean, comfortable space on every visit.' },
  { icon: FaSpa, title: 'Relaxing Body Spa', text: 'Massage, hot stone and signature spa rituals to unwind completely.' },
  { icon: FaRegClock, title: 'Open Every Day', text: 'Walk in or book ahead — we are open 11:00 AM to 9:00 PM, all week.' },
]

export default function Features() {
  return (
    <section className="bg-ash px-6 py-20 dark:bg-ink">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Why Noor"
          title="Crafted Around You"
          subtitle="Every visit is a ritual — designed to leave you radiant, relaxed and confident."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="group rounded-sm border border-ink/10 bg-paper p-7 text-center
                         transition-all duration-300 hover:-translate-y-1.5 hover:border-gold
                         hover:shadow-gold-lg dark:border-paper/10 dark:bg-ink-soft"
            >
              <div
                className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full
                           border-2 border-gold/30 text-gold transition-colors duration-300
                           group-hover:bg-gold group-hover:text-ink"
              >
                <Icon size={22} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-ink dark:text-paper">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-ink/60 dark:text-paper/60">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
