import { Img, Source, Picture } from 'solid-picture'
import data from '../data.json'

const baseUrl = `https://pub-a7ccd757582f4bd99e5c2364327c0f84.r2.dev`

export default function App() {
  return (
    <>
      <Picture>
        <Source
          placeholderSrc={data.portrait}
          videoSrc={`${baseUrl}/portrait.optimized.mp4`}
          // srcset={`${baseUrl}/portrait-1280.png 1280w, ${baseUrl}/portrait-1920.png 1920w`}
          media="(orientation: portrait)"
          naturalWidth={1080}
          naturalHeight={1920}
        />
        <Source
          placeholderSrc={data.landscape}
          srcset={`${baseUrl}/landscape-1280.png 1280w, ${baseUrl}/landscape-1920.png 1920w`}
          videoSrc={`${baseUrl}/landscape.optimized.mp4`}
          naturalWidth={1280}
          naturalHeight={720}
        />
        <Img placeholderSrc={data.landscape} naturalWidth={1280} naturalHeight={720} width="100%" />
      </Picture>
      <Img
        placeholderSrc={data.landscape}
        srcset={`${baseUrl}/landscape-1280.png 1280w, ${baseUrl}/landscape-1920.png 1920w`}
        naturalWidth={854}
        naturalHeight={480}
        width="50%"
      />
    </>
  )
}
