import {type OpenGraphImage} from './responsiveImage.d'

export type Props = {
  params: {
    [key: string]: string
  }
}

export type Metadata = {
  title: string
  description: string
  images: OpenGraphImage[]
}

export type MetadataOverrides = {
  title?: string
  description?: string
  images?: OpenGraphImage[]
}

export type MetadataFetcher = ({
  defaults,
  props
}: {
  defaults: Metadata
  props: Props
}) => Promise<MetadataOverrides>
