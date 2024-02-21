import DiaryPage from "@components/DiaryPage"
import {generateTitle} from '@lib/diary'
import {createMetadata} from '@lib/info'

const Page = async () => (
  <DiaryPage page="1"/>
)

const generateMetadata = createMetadata(() => ({title: generateTitle({props: {params: {page: 1}}})}))

export {generateMetadata}
export default Page
