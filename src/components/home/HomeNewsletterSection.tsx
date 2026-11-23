import { Link } from 'react-router-dom'
import { siteImages } from '../../assets/siteImages'
import { OutreachCtaSection, outreachCtaButtonClass } from './OutreachCtaSection'

export function HomeNewsletterSection() {
  return (
    <OutreachCtaSection
      eyebrow="Be part of their future"
      title="Every child needs a safe place to grow their own"
      description="Kubwabo Foundation partners with local organizations to build child protection and support networks that last. These partners don't wait for help. They lead it."
      primaryImage={siteImages.homeOurStory}
      primaryImageAlt="A caregiver and child supported by Kubwabo Foundation"
      cta={
        <Link to="/contact" className={outreachCtaButtonClass}>
          Become a Volunteer
        </Link>
      }
    />
  )
}
