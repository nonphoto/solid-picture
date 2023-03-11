import Img from "./lib/Img";
import Picture from "./lib/Picture";
import Source from "./lib/Source";

const landscapeSrc =
  "https://images.unsplash.com/photo-1581345837522-cc359ece37a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&q=80";

const landscapeLqipSrc =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAQCAIAAACDRijCAAADh0lEQVQ4jQXBR44dRQAA0MpV3V0dfpgcBDbYC8MIFgiJBUhsuAM7bsEVWRskZFn2jBh/z/zcqUJX4j34+x9/CtzbWDQ5ed4Nt+fV54OpMh+8ZrzWEwSIFBlpu74QExSXCNNxdKUU+9bkPEBgXCycm8j5LCyrptMAQgxRCZk8nfnb85oReNAkerdXlAt+uUS1FNrhmOCWQZ/I9TKeLUoM6DCJyQL05eXcB1BSdXNW3n0lIQRvXswzUYDkK+7vvj45rUGTg9vrG2MtDMdcZC/PAmPki6s5gthPI0nj968bdFJ671M/6GG0q6eNniLwx7IQg3JKp83maXO0+8Ox5jrBvFcsOPPhk1nvRqt2ZTXvbQ1w8/DfE375+m5R543kXJD7tZvVxfqoZzIxxooM7wbEqUeE9/12XnEpUkR8fTgsmmLb9nXhypxTHFYtJNatDmrBokqTFPDvoIrk/fP+FWFL55wxa+jvQxIKnMRhTqPfasjiX8O+iPhktZ8RmIbReP+RnF79rEfvElCHldHHKTU3tz8SIgaVYAqT3gFIRH1X1g2IwE48mOdBE1x+c3H9bfSg7ayL2ukn/Muvv3WDKwQyUSYouFhCiH1ICFFMs4BqTAuMOETEOc8pNqnxoCG00BaYKTJKsky62CAau5wT50EECJCLfthCe58LwRlRJlSyto479b5khhJipsAoZPxUqT21/ywrjBE0duJijn/64QXCYlRelpJgmhcLAAHwz7I869QUIp7XdYCzqP71oPKRQMxDREV1QXjV795CdhlimnxA3YD1uI0AcUYhJk1VcUz77njoNGfCh8QZIyh2PZjGdYyAYgxByklkvg12yLAtOAo+IkrleY2kiACA5MaonzBEnC8XuR2VSwl0h88oKMwuS8GjU0pZDjU0K4KYLF8yMEzONZIiVty2diHx8dAOxowAMgtOafEq2P5qSdxkjVYRzpi8trG+ndvJh27oIBIezgi/yIi9nMNtawjFFgUTyQw6uJhJlEaOQiYqY2nXOoJRLiRMXUwZxWbT0W40J3XtQh/CWuai1WjozKJi+M2b71LQDsl3H95ZFyYfiiJ/XH0aQ7HZrdw07o9dLfNPO+0mPdh4OD77yVAMmcieNnsdi93+IQRLOpu1hoftW4HqHE7By4+PXV3OtvtnCAyCknC5HzEloDW8796fLF5wkkxqVB/rxfXD4/uUaEHM/6dFIvmHWO0BAAAAAElFTkSuQmCC";

const portraitSrc =
  "https://images.unsplash.com/photo-1577084381380-3b9ea4153664?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&q=80";

const portraitLqipSrc =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAYCAIAAACTAIFlAAAELklEQVQ4jQXBOXMTVwAA4Pfevt3VHrq8upAtCyNsi8NjCJkJTK4qKZM0KVJmJk2K/KY06TJp0iQDpIAMYwjmMAbGtoSMZSTZOlbH3u/M98HXj//Eqq4oKkSQMeYFzLI0wVlK1ySAEsDBMCg6hqogBAUAUgqKkWr0J0kcBSRhM490Thc3r1cZo07ePBt5QUhaXf/2jSrGSq1i5zIaZRwxruzsnT9+1oUQ7TzreQvfyRv/PGi9eD0YjcOXr/pAChWjR0+743miKBhjFZ30ZiShQir3/m3XqylG41//eLO2Vl547Pmrs++/uTkZ+fd3es2NyskgwqpumBaqVbMQonIlu7VuY9Krl2izSkeThW3ir75sYBX++MOtZt3ufZgWC2kFY6QoSFVViLDr+lGQFKqrpUoll7F6fjKmML2U5hJaVsop5lyZmnmJlBAhBSEEcpZcrmTv3jvyp2Tiod3992l15I6P7u8e6SktiMjzQbSUwRv1DJASAKj88vNP41nc7c802xxMwt6cJjCwDTuKlDMvODnu9/2UCXgKipjK9dUcgBKlLX2rWa3XCkiBqoYxwlimcrZxoeJUUmzmnduQRkHsZFMZA0ZxIoFEXIKIgku1pelClEtLJPA5oRCrK0U7RjmIwPP2MUmIgtFmPQ+AhAAiiJTzSfjXw9a3XzfbH2a6aX3x2Y0goq1O30lF2G5Uy7VP7zQCIvaP57qGAQAoTvgsoMVSrtt3L646agq3R8HEiykkoZ8AMQyjxdGHacyAgAhCBCDAYZwMXc9SkVTkRi27Vs3s99xJjDRDvbpR2t5qSqm87Xonx+NrjaKCMYQAGxqqV9K+FyzXqiQKuJDf3bn8WxxozNu+etnUNNPQtgBcMnCYUCClEBwDALpnXhDxo5Pe9TVLCLC7d2RQU+D00/3JjSb0vOjRi0EYJJfXHLK5pGKEhZClrD5Hydsh741IQkQmb2cFS6h41xkCThkVTlp3bCA545xrqoJsU9us5xkhoR/0Rr6Txe3u9LQ/G46COIofPul+vFV+c9DrnC6EEAkVQnLMObdMZftKyXUXlqU/2TtfLhvXGjmSkNMBLhT473dbF5z07Vurhbyhq0gKgCjjB53J69Z4pZpvdyaWClaK1uG7ieuRhInJNMqY8Op64bA9ms0jhIAQHI3d+f5hf3w2Gg3dxoqlo0gKRuJoOPR8L/r8k+XA81x3EYX+3qsOY4yzBPlBGM4X5YJZq6Yv1fO3tmvH74eC81wal4smBnx7s3xw0EWAm6bWetfjnOGyY17ZLPtetFy21xtVRUEbjfKD/zqMkjsfrTYuFoGUzY3S++5UU6Xvx5QSePjyb8IQZdK2UpqGhZBSSs+PuQC2qemaJgFnTEAAgzBUMQIixIREQkANq1IklDAJIADSNhUIFYiQkAwAgDHinEIZ0oSRJPgfk+J0bzVLRKAAAAAASUVORK5CYII=";

function App() {
  return (
    <div>
      <Picture>
        <Source
          src={portraitLqipSrc}
          srcset={`${portraitSrc}&h=1000`}
          media="(orientation: portrait)"
          naturalWidth={699}
          naturalHeight={1000}
        />
        <Img
          src={landscapeLqipSrc}
          srcset={`${landscapeSrc}&w=1000`}
          naturalWidth={1000}
          naturalHeight={678}
        />
      </Picture>
    </div>
  );
}

export default App;
