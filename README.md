# bm.js

ブレンドモード いくつか   
canvasのgetImageData,putImageData等を使用したピクセル操作でFlashのブレンドモードを再現

## Demo
[http://ikeryou.jp/bmjs](http://ikeryou.jp/bmjs) 

## Basic Usage
````html
<script src="bm.js"></script>
````
````html
<!-- 上のレイヤー -->
<canvas id="top" width="300" height="300"></canvas>

<!-- 下のレイヤー -->
<canvas id="bottom" width="300" height="300"></canvas>

<!-- 変換先のcanvas -->
<canvas id="output" width="300" height="300"></canvas>
````
````javascript
  
  var bmjs = new bm();
  bmjs.apply("bottom", "top", "output", bmjs.MULTIPLY); // 乗算
  // bmjs.apply("bottom", "top", "output", bmjs.DIFFERENCE); // 差の絶対値
  // bmjs.apply("bottom", "top", "output", bmjs.LINEARDODGE); // 覆い焼き（リニア）- 加算
  // bmjs.apply("bottom", "top", "output", bmjs.SCREEN); // スクリーン
  // bmjs.apply("bottom", "top", "output", bmjs.OVERLAY); // オーバーレイ
  // bmjs.apply("bottom", "top", "output", bmjs.HARDLIGHT); // ハードライト
  // bmjs.apply("bottom", "top", "output", bmjs.VIVIDLIGHT); // ビビットライト
  // bmjs.apply("bottom", "top", "output", bmjs.DARKEN); // 比較 (暗)
  // bmjs.apply("bottom", "top", "output", bmjs.COLORBURN); // 焼き込みカラー
  // bmjs.apply("bottom", "top", "output", bmjs.LINEARBURN); // 焼き込み (リニア)
  // bmjs.apply("bottom", "top", "output", bmjs.LIGHTEN); // 比較 (明)
````
