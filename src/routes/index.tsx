import Img from "~/lib/Img";
import Picture from "~/lib/Picture";
import Source from "~/lib/Source";
import Video from "~/lib/Video";

import data from "~/assets/data.json";

const baseUrl = `https://pub-a7ccd757582f4bd99e5c2364327c0f84.r2.dev`;

export default function Index() {
  return (
    <div>
      <Picture>
        <Source
          placeholderSrc={data.patternPortrait}
          srcset={`${baseUrl}/pattern-portrait.jpeg`}
          media="(orientation: portrait)"
          naturalWidth={699}
          naturalHeight={1000}
        />
        <Img
          placeholderSrc={data.patternLandscape}
          srcset={`${baseUrl}/pattern-landscape.jpeg`}
          naturalWidth={1000}
          naturalHeight={678}
          width="100%"
        />
      </Picture>
      <Video
        src={`${baseUrl}/flower-landscape.mp4`}
        poster={`${baseUrl}/flower-landscape.jpeg`}
        placeholderPoster={data.flowerLandscape}
        naturalWidth={853}
        naturalHeight={480}
        width="100%"
        autoplay
        playsinline
        loop
        muted
      >
        <Source
          src={`${baseUrl}/flower-portrait.mp4`}
          poster={`${baseUrl}/flower-portrait.jpeg`}
          placeholderPoster={data.flowerPortrait}
          naturalWidth={480}
          naturalHeight={852}
          media="(orientation: portrait)"
        />
      </Video>
    </div>
  );
}
