(function() {
  this.bm = (function() {
    function bm() {
      this.DIFFERENCE = 0;
      this.LINEARDODGE = 1;
      this.MULTIPLY = 2;
      this.SCREEN = 3;
      this.OVERLAY = 4;
      this.HARDLIGHT = 5;
      this.VIVIDLIGHT = 6;
      this.DARKEN = 7;
      this.COLORBURN = 8;
      this.LINEARBURN = 9;
      this.LIGHTEN = 10;
      this.ALPHA = 11;
    }

    bm.prototype.apply = function(canvasAId, canvasBId, canvasCId, type) {
      var canvasA, canvasB, canvasC, contextA, contextB, contextC, imageDataA, imageDataB, outputImageData;
      canvasA = document.getElementById(canvasAId);
      canvasB = document.getElementById(canvasBId);
      canvasC = document.getElementById(canvasCId);
      contextA = canvasA.getContext("2d");
      contextB = canvasB.getContext("2d");
      contextC = canvasC.getContext("2d");
      imageDataA = contextA.getImageData(0, 0, canvasA.width, canvasA.height);
      imageDataB = contextB.getImageData(0, 0, canvasB.width, canvasB.height);
      outputImageData;
      switch (type) {
        case this.DIFFERENCE:
          outputImageData = this._difference(imageDataA, imageDataB);
          break;
        case this.LINEARDODGE:
          outputImageData = this._lineardodge(imageDataA, imageDataB);
          break;
        case this.MULTIPLY:
          outputImageData = this._multiply(imageDataA, imageDataB);
          break;
        case this.SCREEN:
          outputImageData = this._screen(imageDataA, imageDataB);
          break;
        case this.DARKEN:
          outputImageData = this._darken(imageDataA, imageDataB);
          break;
        case this.COLORBURN:
          outputImageData = this._colorburn(imageDataA, imageDataB);
          break;
        case this.LINEARBURN:
          outputImageData = this._linearburn(imageDataA, imageDataB);
          break;
        case this.OVERLAY:
          outputImageData = this._overray(imageDataA, imageDataB);
          break;
        case this.HARDLIGHT:
          outputImageData = this._hardlight(imageDataA, imageDataB);
          break;
        case this.VIVIDLIGHT:
          outputImageData = this._vividlight(imageDataA, imageDataB);
          break;
        case this.LIGHTEN:
          outputImageData = this._lighten(imageDataA, imageDataB);
          break;
        case this.ALPHA:
          outputImageData = this._alpha(imageDataA, imageDataB);
      }
      return contextC.putImageData(outputImageData, 0, 0);
    };

    bm.prototype._alpha = function(imageDataA, imageDataB) {
      var aB, aC, bA, bB, bC, dataA, dataB, gA, gB, gC, i, rA, rB, rC;
      dataA = imageDataA.data;
      dataB = imageDataB.data;
      i = 0;
      while (i < dataA.length) {
        rA = dataA[i];
        gA = dataA[i + 1];
        bA = dataA[i + 2];
        rB = dataB[i];
        gB = dataB[i + 1];
        bB = dataB[i + 2];
        aB = dataB[i + 3];
        rC = rA;
        gC = gA;
        bC = bA;
        aC = aB;
        dataA[i] = rC;
        dataA[i + 1] = gC;
        dataA[i + 2] = bC;
        dataA[i + 3] = aC;
        i += 4;
      }
      return imageDataA;
    };

    bm.prototype._lighten = function(imageDataA, imageDataB) {
      var bA, bB, bC, dataA, dataB, gA, gB, gC, i, rA, rB, rC;
      dataA = imageDataA.data;
      dataB = imageDataB.data;
      i = 0;
      while (i < dataA.length) {
        rA = dataA[i];
        gA = dataA[i + 1];
        bA = dataA[i + 2];
        rB = dataB[i];
        gB = dataB[i + 1];
        bB = dataB[i + 2];
        rC = rA > rB ? rA : rB;
        gC = gA > gB ? gA : gB;
        bC = bA > bB ? bA : bB;
        dataA[i] = rC;
        dataA[i + 1] = gC;
        dataA[i + 2] = bC;
        i += 4;
      }
      return imageDataA;
    };

    bm.prototype._vividlight = function(imageDataA, imageDataB) {
      var bA, bB, bC, dataA, dataB, gA, gB, gC, i, rA, rB, rC;
      dataA = imageDataA.data;
      dataB = imageDataB.data;
      i = 0;
      while (i < dataA.length) {
        rA = dataA[i];
        gA = dataA[i + 1];
        bA = dataA[i + 2];
        rB = dataB[i];
        gB = dataB[i + 1];
        bB = dataB[i + 2];
        rC = rB < 128 ? (rA <= 255 - 2 * rB ? 0 : (rA - (255 - 2 * rB)) / rB * 127.5) : (rA < 510 - 2 * rB ? rA / (2 - rB / 127.5) : 255);
        gC = gB < 128 ? (gA <= 255 - 2 * gB ? 0 : (gA - (255 - 2 * gB)) / gB * 127.5) : (gA < 510 - 2 * gB ? gA / (2 - gB / 127.5) : 255);
        bC = bB < 128 ? (bA <= 255 - 2 * bB ? 0 : (bA - (255 - 2 * bB)) / bB * 127.5) : (bA < 510 - 2 * bB ? bA / (2 - bB / 127.5) : 255);
        dataA[i] = rC;
        dataA[i + 1] = gC;
        dataA[i + 2] = bC;
        i += 4;
      }
      return imageDataA;
    };

    bm.prototype._hardlight = function(imageDataA, imageDataB) {
      var bA, bB, bC, dataA, dataB, gA, gB, gC, i, rA, rB, rC;
      dataA = imageDataA.data;
      dataB = imageDataB.data;
      i = 0;
      while (i < dataA.length) {
        rA = dataA[i];
        gA = dataA[i + 1];
        bA = dataA[i + 2];
        rB = dataB[i];
        gB = dataB[i + 1];
        bB = dataB[i + 2];
        rC = rB > 128 ? rA + (2 * rB - 255) - rA * (2 * rB - 255) / 255 : rA * 2 * rB / 255;
        gC = gB > 128 ? gA + (2 * gB - 255) - gA * (2 * gB - 255) / 255 : gA * 2 * gB / 255;
        bC = bB > 128 ? bA + (2 * bB - 255) - bA * (2 * bB - 255) / 255 : bA * 2 * bB / 255;
        dataA[i] = rC;
        dataA[i + 1] = gC;
        dataA[i + 2] = bC;
        i += 4;
      }
      return imageDataA;
    };

    bm.prototype._overray = function(imageDataA, imageDataB) {
      var bA, bB, bC, dataA, dataB, gA, gB, gC, i, rA, rB, rC;
      dataA = imageDataA.data;
      dataB = imageDataB.data;
      i = 0;
      while (i < dataA.length) {
        rA = dataA[i];
        gA = dataA[i + 1];
        bA = dataA[i + 2];
        rB = dataB[i];
        gB = dataB[i + 1];
        bB = dataB[i + 2];
        rC = rA > 128 ? rB + (2 * rA - 255) - rB * (2 * rA - 255) / 255 : rB * 2 * rA / 255;
        gC = gA > 128 ? gB + (2 * gA - 255) - gB * (2 * gA - 255) / 255 : gB * 2 * gA / 255;
        bC = bA > 128 ? bB + (2 * bA - 255) - bB * (2 * bA - 255) / 255 : bB * 2 * bA / 255;
        dataA[i] = rC;
        dataA[i + 1] = gC;
        dataA[i + 2] = bC;
        i += 4;
      }
      return imageDataA;
    };

    bm.prototype._linearburn = function(imageDataA, imageDataB) {
      var bA, bB, bC, dataA, dataB, gA, gB, gC, i, rA, rB, rC;
      dataA = imageDataA.data;
      dataB = imageDataB.data;
      i = 0;
      while (i < dataA.length) {
        rA = dataA[i];
        gA = dataA[i + 1];
        bA = dataA[i + 2];
        rB = dataB[i];
        gB = dataB[i + 1];
        bB = dataB[i + 2];
        rC = (rC = rA + rB) < 255 ? 0 : rC - 255;
        gC = (gC = gA + gB) < 255 ? 0 : gC - 255;
        bC = (bC = bA + bB) < 255 ? 0 : bC - 255;
        dataA[i] = rC;
        dataA[i + 1] = gC;
        dataA[i + 2] = bC;
        i += 4;
      }
      return imageDataA;
    };

    bm.prototype._colorburn = function(imageDataA, imageDataB) {
      var bA, bB, bC, dataA, dataB, gA, gB, gC, i, rA, rB, rC;
      dataA = imageDataA.data;
      dataB = imageDataB.data;
      i = 0;
      while (i < dataA.length) {
        rA = dataA[i];
        gA = dataA[i + 1];
        bA = dataA[i + 2];
        rB = dataB[i];
        gB = dataB[i + 1];
        bB = dataB[i + 2];
        rC = rB === 0 ? 0 : (rC = 255 - ((255 - rA) * 255) / rB) > 0 ? rC : 0;
        gC = gB === 0 ? 0 : (gC = 255 - ((255 - gA) * 255) / gB) > 0 ? gC : 0;
        bC = bB === 0 ? 0 : (bC = 255 - ((255 - bA) * 255) / bB) > 0 ? bC : 0;
        dataA[i] = rC;
        dataA[i + 1] = gC;
        dataA[i + 2] = bC;
        i += 4;
      }
      return imageDataA;
    };

    bm.prototype._darken = function(imageDataA, imageDataB) {
      var bA, bB, bC, dataA, dataB, gA, gB, gC, i, rA, rB, rC;
      dataA = imageDataA.data;
      dataB = imageDataB.data;
      i = 0;
      while (i < dataA.length) {
        rA = dataA[i];
        gA = dataA[i + 1];
        bA = dataA[i + 2];
        rB = dataB[i];
        gB = dataB[i + 1];
        bB = dataB[i + 2];
        rC = rA < rB ? rA : rB;
        gC = gA < gB ? gA : gB;
        bC = bA < bB ? bA : bB;
        dataA[i] = rC;
        dataA[i + 1] = gC;
        dataA[i + 2] = bC;
        i += 4;
      }
      return imageDataA;
    };

    bm.prototype._screen = function(imageDataA, imageDataB) {
      var bA, bB, bC, dataA, dataB, gA, gB, gC, i, rA, rB, rC;
      dataA = imageDataA.data;
      dataB = imageDataB.data;
      i = 0;
      while (i < dataA.length) {
        rA = dataA[i];
        gA = dataA[i + 1];
        bA = dataA[i + 2];
        rB = dataB[i];
        gB = dataB[i + 1];
        bB = dataB[i + 2];
        rC = rB + rA - (rB * rA) / 255;
        gC = gB + gA - (gB * gA) / 255;
        bC = bB + bA - (bB * bA) / 255;
        dataA[i] = rC;
        dataA[i + 1] = gC;
        dataA[i + 2] = bC;
        i += 4;
      }
      return imageDataA;
    };

    bm.prototype._lineardodge = function(imageDataA, imageDataB) {
      var bA, bB, bC, dataA, dataB, gA, gB, gC, i, rA, rB, rC;
      dataA = imageDataA.data;
      dataB = imageDataB.data;
      i = 0;
      while (i < dataA.length) {
        rA = dataA[i];
        gA = dataA[i + 1];
        bA = dataA[i + 2];
        rB = dataB[i];
        gB = dataB[i + 1];
        bB = dataB[i + 2];
        rC = (rC = rA + rB) > 255 ? 255 : rC;
        gC = (gC = gA + gB) > 255 ? 255 : gC;
        bC = (bC = bA + bB) > 255 ? 255 : bC;
        dataA[i] = rC;
        dataA[i + 1] = gC;
        dataA[i + 2] = bC;
        i += 4;
      }
      return imageDataA;
    };

    bm.prototype._multiply = function(imageDataA, imageDataB) {
      var bA, bB, bC, dataA, dataB, gA, gB, gC, i, rA, rB, rC;
      dataA = imageDataA.data;
      dataB = imageDataB.data;
      i = 0;
      while (i < dataA.length) {
        rA = dataA[i];
        gA = dataA[i + 1];
        bA = dataA[i + 2];
        rB = dataB[i];
        gB = dataB[i + 1];
        bB = dataB[i + 2];
        rC = rA * (rB / 255);
        gC = gA * (gB / 255);
        bC = bA * (bB / 255);
        dataA[i] = rC;
        dataA[i + 1] = gC;
        dataA[i + 2] = bC;
        i += 4;
      }
      return imageDataA;
    };

    bm.prototype._difference = function(imageDataA, imageDataB) {
      var bA, bB, bC, dataA, dataB, gA, gB, gC, i, rA, rB, rC;
      dataA = imageDataA.data;
      dataB = imageDataB.data;
      i = 0;
      while (i < dataA.length) {
        rA = dataA[i];
        gA = dataA[i + 1];
        bA = dataA[i + 2];
        rB = dataB[i];
        gB = dataB[i + 1];
        bB = dataB[i + 2];
        rC = (rC = rA - rB) < 0 ? -rC : rC;
        gC = (gC = gA - gB) < 0 ? -gC : gC;
        bC = (bC = bA - bB) < 0 ? -bC : bC;
        dataA[i] = rC;
        dataA[i + 1] = gC;
        dataA[i + 2] = bC;
        i += 4;
      }
      return imageDataA;
    };

    return bm;

  })();

}).call(this);
