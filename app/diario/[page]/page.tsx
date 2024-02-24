import DiaryPage from '@components/DiaryPage'
import {pageCount, createMetadata} from '@lib/diary'

const Page = async ({params: {page}}) => <DiaryPage page={page} />

const generateStaticParams = async () => {
  const pages = await pageCount()

  // We generate pages 2..n
  return Array.from(Array(1).keys(), page => ({page: `${page + 2}`}))
}

const generateMetadata = createMetadata()

export {generateMetadata, generateStaticParams}
export default Page