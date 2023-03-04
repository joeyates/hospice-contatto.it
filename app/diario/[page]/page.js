import DiaryPage, {metadata as diaryMetadata, pageCount} from "@components/DiaryPage"
import {request as datoCMSRequest} from '@lib/datocms'

const Page = async ({params: {page}}) => (
  <DiaryPage page={page}/>
)

const generateMetadata = ({params: {page}, _searchParams}) => (
  diaryMetadata({page})
)

const generateStaticParams = async () => {
  const pages = await pageCount()

  // We generate pages 2..n
  return Array.from(Array(1).keys(), page => ({page: `${page + 2}`}))
}

export {generateMetadata, generateStaticParams}
export default Page
