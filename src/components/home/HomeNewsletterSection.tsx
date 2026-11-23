import { siteImages } from '../../assets/siteImages'
import { site } from '../../data/site'
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
        <a
          href={site.memberApplicationForm}
          target="_blank"
          rel="noreferrer"
          className={outreachCtaButtonClass}
        >
          Become a Volunteer
        </a>
      }
    />
  )
}
