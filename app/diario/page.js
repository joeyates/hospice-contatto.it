import DiaryPage, {metadata as diaryMetadata} from "@components/DiaryPage"

const Page = async () => (
  <DiaryPage page="1"/>
)

const metadata = diaryMetadata({page: 1})

export {metadata}
export default Page
