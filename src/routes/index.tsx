import Img from "~/lib/Img";
import Picture from "~/lib/Picture";
import Source from "~/lib/Source";
import Video from "~/lib/Video";

import videoPosterSrc from "~/assets/flower.png";

const landscapeSrc =
  "https://images.unsplash.com/photo-1581345837522-cc359ece37a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&format=png&fit=crop&q=80";

const landscapeLqipSrc =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAQCAIAAACDRijCAAADh0lEQVQ4jQXBR44dRQAA0MpV3V0dfpgcBDbYC8MIFgiJBUhsuAM7bsEVWRskZFn2jBh/z/zcqUJX4j34+x9/CtzbWDQ5ed4Nt+fV54OpMh+8ZrzWEwSIFBlpu74QExSXCNNxdKUU+9bkPEBgXCycm8j5LCyrptMAQgxRCZk8nfnb85oReNAkerdXlAt+uUS1FNrhmOCWQZ/I9TKeLUoM6DCJyQL05eXcB1BSdXNW3n0lIQRvXswzUYDkK+7vvj45rUGTg9vrG2MtDMdcZC/PAmPki6s5gthPI0nj968bdFJ671M/6GG0q6eNniLwx7IQg3JKp83maXO0+8Ox5jrBvFcsOPPhk1nvRqt2ZTXvbQ1w8/DfE375+m5R543kXJD7tZvVxfqoZzIxxooM7wbEqUeE9/12XnEpUkR8fTgsmmLb9nXhypxTHFYtJNatDmrBokqTFPDvoIrk/fP+FWFL55wxa+jvQxIKnMRhTqPfasjiX8O+iPhktZ8RmIbReP+RnF79rEfvElCHldHHKTU3tz8SIgaVYAqT3gFIRH1X1g2IwE48mOdBE1x+c3H9bfSg7ayL2ukn/Muvv3WDKwQyUSYouFhCiH1ICFFMs4BqTAuMOETEOc8pNqnxoCG00BaYKTJKsky62CAau5wT50EECJCLfthCe58LwRlRJlSyto479b5khhJipsAoZPxUqT21/ywrjBE0duJijn/64QXCYlRelpJgmhcLAAHwz7I869QUIp7XdYCzqP71oPKRQMxDREV1QXjV795CdhlimnxA3YD1uI0AcUYhJk1VcUz77njoNGfCh8QZIyh2PZjGdYyAYgxByklkvg12yLAtOAo+IkrleY2kiACA5MaonzBEnC8XuR2VSwl0h88oKMwuS8GjU0pZDjU0K4KYLF8yMEzONZIiVty2diHx8dAOxowAMgtOafEq2P5qSdxkjVYRzpi8trG+ndvJh27oIBIezgi/yIi9nMNtawjFFgUTyQw6uJhJlEaOQiYqY2nXOoJRLiRMXUwZxWbT0W40J3XtQh/CWuai1WjozKJi+M2b71LQDsl3H95ZFyYfiiJ/XH0aQ7HZrdw07o9dLfNPO+0mPdh4OD77yVAMmcieNnsdi93+IQRLOpu1hoftW4HqHE7By4+PXV3OtvtnCAyCknC5HzEloDW8796fLF5wkkxqVB/rxfXD4/uUaEHM/6dFIvmHWO0BAAAAAElFTkSuQmCC";

const portraitSrc =
  "https://images.unsplash.com/photo-1577084381380-3b9ea4153664?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&q=80";

const portraitLqipSrc =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAYCAIAAACTAIFlAAAELklEQVQ4jQXBOXMTVwAA4Pfevt3VHrq8upAtCyNsi8NjCJkJTK4qKZM0KVJmJk2K/KY06TJp0iQDpIAMYwjmMAbGtoSMZSTZOlbH3u/M98HXj//Eqq4oKkSQMeYFzLI0wVlK1ySAEsDBMCg6hqogBAUAUgqKkWr0J0kcBSRhM490Thc3r1cZo07ePBt5QUhaXf/2jSrGSq1i5zIaZRwxruzsnT9+1oUQ7TzreQvfyRv/PGi9eD0YjcOXr/pAChWjR0+743miKBhjFZ30ZiShQir3/m3XqylG41//eLO2Vl547Pmrs++/uTkZ+fd3es2NyskgwqpumBaqVbMQonIlu7VuY9Krl2izSkeThW3ir75sYBX++MOtZt3ufZgWC2kFY6QoSFVViLDr+lGQFKqrpUoll7F6fjKmML2U5hJaVsop5lyZmnmJlBAhBSEEcpZcrmTv3jvyp2Tiod3992l15I6P7u8e6SktiMjzQbSUwRv1DJASAKj88vNP41nc7c802xxMwt6cJjCwDTuKlDMvODnu9/2UCXgKipjK9dUcgBKlLX2rWa3XCkiBqoYxwlimcrZxoeJUUmzmnduQRkHsZFMZA0ZxIoFEXIKIgku1pelClEtLJPA5oRCrK0U7RjmIwPP2MUmIgtFmPQ+AhAAiiJTzSfjXw9a3XzfbH2a6aX3x2Y0goq1O30lF2G5Uy7VP7zQCIvaP57qGAQAoTvgsoMVSrtt3L646agq3R8HEiykkoZ8AMQyjxdGHacyAgAhCBCDAYZwMXc9SkVTkRi27Vs3s99xJjDRDvbpR2t5qSqm87Xonx+NrjaKCMYQAGxqqV9K+FyzXqiQKuJDf3bn8WxxozNu+etnUNNPQtgBcMnCYUCClEBwDALpnXhDxo5Pe9TVLCLC7d2RQU+D00/3JjSb0vOjRi0EYJJfXHLK5pGKEhZClrD5Hydsh741IQkQmb2cFS6h41xkCThkVTlp3bCA545xrqoJsU9us5xkhoR/0Rr6Txe3u9LQ/G46COIofPul+vFV+c9DrnC6EEAkVQnLMObdMZftKyXUXlqU/2TtfLhvXGjmSkNMBLhT473dbF5z07Vurhbyhq0gKgCjjB53J69Z4pZpvdyaWClaK1uG7ieuRhInJNMqY8Op64bA9ms0jhIAQHI3d+f5hf3w2Gg3dxoqlo0gKRuJoOPR8L/r8k+XA81x3EYX+3qsOY4yzBPlBGM4X5YJZq6Yv1fO3tmvH74eC81wal4smBnx7s3xw0EWAm6bWetfjnOGyY17ZLPtetFy21xtVRUEbjfKD/zqMkjsfrTYuFoGUzY3S++5UU6Xvx5QSePjyb8IQZdK2UpqGhZBSSs+PuQC2qemaJgFnTEAAgzBUMQIixIREQkANq1IklDAJIADSNhUIFYiQkAwAgDHinEIZ0oSRJPgfk+J0bzVLRKAAAAAASUVORK5CYII=";

const videoSrc =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

const videoSrcWebm =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm";

const videoLqipSrc =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAANCAIAAAA8DjmHAAADZUlEQVQokQXBWW/bdAAAcP99xE4c27Ed52zTJM1Begm6Vit0moRgvIAETzzwCBLfAj4MXwHBwzRxTEUTXadtDE1NWrykztUmtuO/4/vi9wM//fDtL7/9BQVw8uj9KgOOq01/tHr9ePDj47PNunSvVx2NVSdAmCwZhkCUKhubZLebjSNktfSWzpBrZNJAnD1VsFabRqIkttZ8TaqW0wRYz67Uf9/IRI3+4psTqVmic6KhW2wJp8gUS9HFIh6ZZo6tg4RwsHmIuo6KjccBrkzh7uHBNpVgmaBCxojmL52lDtYogQXAubmZ84VKocOF0d3h0V4hVcFU1gcEhdB4BG+Jl3GIBgvomw6GrHxoa3NbNRZyAhemYcnKGiyD9DL440w+Oxt6ob1z1AQozLEJH2whVIFqUoK4oV2pMH1lmfFEJtrlOpaOQ02DIQj5ArM0xhPVrNf2jsXiZDx/NoIlmmRxCkkFeDbCPJSnW8hmzOUKzn9uX/lbqgg0w9akIgNIvFzK3pquq2NkxFUlLfSZLIZSAtVpV7+r1A5whNtuTXI20g1TBInRF1jUcxX+5rqPMjFFsgFhqyt9rBrYpx+feNCo8xvdWoMXSwBxEc9ZaJ5u271mo4VLJExarQ4rAXU9ChP31ZPB9HJe7PJMnnOhSXN5O0JigcKNtV+sJFlpwhW7bE0Y/j7wdNDbelhpSXEKeRcqi+EL8vmdlEEh1OS34Qy6aqy8+Xnge7bvOEen9+l2HgnmeKkspNDd7nuHqKmp86EglE8ffM90RCelGY5q2wK1c3A36MfWusjjUyyHE7dQ9aeDCYShIBLbaQcqN9kYYJ1ma3//lGPIy9Gv/curDI8TsRBpsXVr67JuzSzTd/FaVZ1NJDpPS7uOif8jD6ajgKaI+581sjz17sUMJTE8Q9KMSMtvn07hUoUBJTOJNWCZCYoTcO0Y6sr05tJhAZmCP19fH3/y0aMvPwwR8kl41m6Kzf2N4fk4T2c/2KliX3/1OYnhr56/nOkjQUDzfBPx48SLfC+0bE0eXveHUFHGZRo467vz83mvtdeodtKclohj3IjKCHtvr96OHezhg0Olr8QovrW5WeQqGVoMI7DU12QKaPpsoIxXhkeFqVa6xFBhv28xrtiodbTF3bOL8+uL21SgUwBmqMz/ip7GsTwHdh4AAAAASUVORK5CYII=";

export default function Index() {
  return (
    <div>
      <Picture>
        <Source
          placeholderSrc={portraitLqipSrc}
          srcset={`${portraitSrc}&h=1000`}
          media="(orientation: portrait)"
          naturalWidth={699}
          naturalHeight={1000}
        />
        <Img
          placeholderSrc={landscapeLqipSrc}
          srcset={`${landscapeSrc}&w=1000`}
          naturalWidth={1000}
          naturalHeight={678}
          width="100%"
        />
      </Picture>
      <Video
        width="100%"
        naturalWidth={960}
        naturalHeight={540}
        src={videoSrc}
        placeholderPoster={videoLqipSrc}
        poster={videoPosterSrc}
        controls
        playsinline
        loop
        muted
      >
        <Source
          naturalWidth={540}
          naturalHeight={540}
          media="(orientation: portrait)"
        />
      </Video>
    </div>
  );
}
