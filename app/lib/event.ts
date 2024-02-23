import {type EventUrlData} from './event.d'

const datedSlug = (event: EventUrlData): string => `${event.date}-${event.slug}`

const datedSlugToSlug = (dated: string): string => {
  const extractSlug = /\d{4}-\d{2}-\d{2}-(.*)/
  const match = dated.match(extractSlug)
  if (match?.length !== 2) {
    throw `'${dated}' is a malformed dated slug`
  }
  return match[1]
}

const path = (event: EventUrlData): string => `/eventi/evento/${datedSlug(event)}`

export {datedSlug, datedSlugToSlug, path}
