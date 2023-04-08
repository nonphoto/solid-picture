import { Img, Source, Picture } from '../src'

import data from './data.json'

const baseUrl = `https://pub-a7ccd757582f4bd99e5c2364327c0f84.r2.dev`

export default function App() {
  return (
    <div>
      <Picture>
        <Source
          type="video/mp4"
          placeholderSrc={data.flowerPortrait}
          srcset={`${baseUrl}/flower-portrait.mp4`}
          media="(orientation: portrait)"
          naturalWidth={480}
          naturalHeight={852}
        />
        <Img
          placeholderSrc={data.flowerLandscape}
          srcset={`${baseUrl}/flower-landscape.jpeg`}
          naturalWidth={854}
          naturalHeight={480}
          width="100%"
        />
      </Picture>
      <Img
        placeholderSrc={data.flowerLandscape}
        srcset={`${baseUrl}/flower-landscape.jpeg`}
        naturalWidth={854}
        naturalHeight={480}
        width="100%"
      />
    </div>
  )
}
