import Image, {ImageProps} from 'next/image'
import React from 'react'

const CustomImage  =(props: ImageProps ) => {
  return <Image  {...props} />
}

export default CustomImage