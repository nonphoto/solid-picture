import { Picture } from '../../../src'
import data from '../data.json'

const baseUrl = `https://pub-a7ccd757582f4bd99e5c2364327c0f84.r2.dev`

export default function App() {
  //TODO: Remove <Source/> its not worth it:

  // <Picture>
  //   <Img {...}/>
  //   <Video {...} render={...}/>
  // </Picture>

  return (
    <Picture aspectRatio={1280 / 800} placeholderSrc={data.landscape}>
      <img srcset={`${baseUrl}/landscape-1280.png 1280w, ${baseUrl}/landscape-1920.png 1920w`} />
    </Picture>
  )
  // return (
  //   <>
  //     <Picture>
  //       <Source
  //         placeholderSrc={data.portrait}
  //         srcset={`${baseUrl}/portrait-1280.png 1280w, ${baseUrl}/portrait-1920.png 1920w`}
  //         media="(orientation: portrait)"
  //         naturalSize={{ width: 1080, height: 1920 }}
  //       />
  //       <Source
  //         placeholderSrc={data.landscape}
  //         srcset={`${baseUrl}/landscape-1280.png 1280w, ${baseUrl}/landscape-1920.png 1920w`}
  //         naturalSize={{ width: 1280, height: 720 }}
  //       />
  //       <Img width="100%" />
  //     </Picture>
  //     <picture>

  //     <Img
  //       placeholderSrc={data.landscape}
  //       srcset={`${baseUrl}/landscape-1280.png 1280w, ${baseUrl}/landscape-1920.png 1920w`}
  //       naturalSize={{ width: 854, height: 480 }}
  //       width="50%"
  //     />
  //   </>)
}
