import {type OpenGraphImage, type ResponsiveImage} from '@lib/responsiveImage.d'

type InfoQuery = {
  info: {
    email: string
    name: string
    siteTitle: string
    siteDescription: string
    taxCode: string
    telephone: string
    defaultImage: {
      responsiveImage: ResponsiveImage
    }
  }
}

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
