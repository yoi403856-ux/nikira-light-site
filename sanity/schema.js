import { cat } from './schemaTypes/cat'
import { kitten } from './schemaTypes/kitten'
import { review } from './schemaTypes/review'
import { siteSettings } from './schemaTypes/siteSettings'
import { homeContent } from './schemaTypes/homeContent'
import { aboutContent } from './schemaTypes/aboutContent'
import { kittensContent } from './schemaTypes/kittensContent'
import { catsContent } from './schemaTypes/catsContent'
import { reviewsContent } from './schemaTypes/reviewsContent'
import { contactsContent } from './schemaTypes/contactsContent'

export const schema = {
  types: [
    cat, kitten, review, siteSettings,
    homeContent, aboutContent, kittensContent, catsContent, reviewsContent, contactsContent,
  ],
}
