import DiaryPage from '@components/DiaryPage'
import {generateTitle} from '@schema/diary'
import {createMetadata} from '@schema/info'

const Page = async () => <DiaryPage page='1' />

const generateMetadata = createMetadata(async () => ({
  title: generateTitle({props: {params: {page: 1}}})
}))

export {generateMetadata}
export default Page
