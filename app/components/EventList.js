import Link from 'next/link'

import {parseDate} from '@lib/datocms'
import {path as eventPath} from '@lib/event'
import {date as formatDate} from '@lib/format'
import styles from './EventList.module.sass'

const EventList = ({events}) => (
  <ul className={styles.events}>
    {events.map(e => (
      <li className={styles.event} key={`event-${e.id}`}>
        <Link className={styles['event-inner']} href={eventPath(e)}>
          <div className={styles.text}>
            <div className={styles.date}>{formatDate(parseDate(e.date))}</div>
            <div className={styles.title}>{e.title}</div>
          </div>
          <img alt={e.image.responsiveImage.alt} {...e.image.responsiveImage} />
        </Link>
      </li>
    ))}
  </ul>
)

export default EventList
