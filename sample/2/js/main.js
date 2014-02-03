(function() {
  var root,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.imagesLoader = (function() {
    function imagesLoader(list, num) {
      this.dispose = __bind(this.dispose, this);
      this._list = list;
      this._num = num == null ? 1 : num;
      this.imgList = {};
      this.loadedNum = 0;
      this.loaded = false;
      this.onComplete;
      this.onProgress;
    }

    imagesLoader.prototype.start = function() {
      return this._load();
    };

    imagesLoader.prototype.dispose = function() {
      this._list = null;
      this.imgList = null;
      this.onComplete = null;
      return this.onProgress = null;
    };

    imagesLoader.prototype.getImg = function(id) {
      return this.imgList[id];
    };

    imagesLoader.prototype.imgNum = function() {
      return this.imgList.length;
    };

    imagesLoader.prototype._load = function() {
      var end, i, img, o, start, _results;
      start = this.loadedNum;
      end = Math.min(start + this._num, this._list.length);
      i = start;
      _results = [];
      while (i < end) {
        img = new Image();
        o = this._list[i];
        img.src = o.url;
        img.imgLoader = this;
        img.imgLoaderId = o.id;
        img.onload = function() {
          this.orgWidth = this.width;
          this.orgHeight = this.height;
          return this.imgLoader._loadedImg(this.imgLoaderId);
        };
        this.imgList[o.id] = img;
        _results.push(i++);
      }
      return _results;
    };

    imagesLoader.prototype._loadedImg = function() {
      this.loadedNum++;
      if (this.onProgress != null) {
        this.onProgress((this.loadedNum / this._list.length) * 100);
      }
      if (this.loadedNum >= this._list.length) {
        this.loaded = true;
        if (this.onComplete != null) {
          this.onComplete();
        }
        return;
      }
      if (this.loadedNum % this._num === 0) {
        return this._load();
      }
    };

    return imagesLoader;

  })();

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.float = (function() {
    function float(target, para) {
      this.dispose = __bind(this.dispose, this);
      this.update = __bind(this.update, this);
      this._target = target;
      this._para = para;
      this._sinList1 = [];
      this._sinList2 = {};
      this._init();
    }

    float.prototype._init = function() {
      var i, len, s, start, val, _i, _len, _ref, _results;
      len = this._para.length;
      _ref = this._para;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        val = _ref[i];
        start = val.start == null ? 0 : val.start;
        s = new root._LIBS.sin(this._target[val.target], -val.range * 0.5, val.range * 0.5, val.speed, start);
        val.delayCnt = 0;
        if (val.delay == null) {
          val.delay = 0;
        }
        this._sinList1.push(s);
        _results.push(this._sinList2[val.target] = s);
      }
      return _results;
    };

    float.prototype.update = function() {
      var i, o, val, _i, _len, _ref, _results;
      _ref = this._sinList1;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        val = _ref[i];
        o = this._para[i];
        if (o.delayCnt >= o.delay) {
          _results.push(this._target[o.target] = this._sinList1[i].update());
        } else {
          _results.push(o.delayCnt++);
        }
      }
      return _results;
    };

    float.prototype.dispose = function() {
      this._target = null;
      this._para = null;
      this._sinList1 = null;
      return this._sinList2 = null;
    };

    return float;

  })();

  root._LIBS.sin = (function() {
    function sin(base, min, max, speed, angle) {
      this.base = base;
      this.min = min;
      this.max = max;
      this.speed = speed;
      this.angle = angle;
      this.val = 0;
    }

    sin.prototype.update = function() {
      var u;
      u = root._LIBS.util.getIns();
      this.angle += this.speed;
      if (this.angle > 360) {
        this.angle = this.angle - 360;
      }
      this.val = this.base + u.map(Math.sin(u.radian(this.angle)), this.min, this.max, -1, 1);
      return this.val;
    };

    return sin;

  })();

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.image = (function() {
    function image(src, width, height, alt) {
      this._eMakedData = __bind(this._eMakedData, this);
      this.makeData = __bind(this.makeData, this);
      this.data = __bind(this.data, this);
      this.dispose = __bind(this.dispose, this);
      this.src = src;
      this.orgSrc = src;
      this.width = width;
      this.height = height;
      this.alt = alt;
      this.width05 = ~~(width * 0.5);
      this.height05 = ~~(height * 0.5);
      this._image;
      this.onMakeData;
    }

    image.prototype.dispose = function() {
      this._image = null;
      return this.onMakeData = null;
    };

    image.prototype.data = function() {
      return this._image;
    };

    image.prototype.makeData = function() {
      this._image = new Image();
      this._image.onload = this._eMakedData;
      return this._image.src = this.src;
    };

    image.prototype._eMakedData = function() {
      if (this._image != null) {
        if (this.onMakeData != null) {
          return this.onMakeData();
        }
      }
    };

    return image;

  })();

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.display = (function() {
    function display(elm, option) {
      this.delayClear = __bind(this.delayClear, this);
      this.delay = __bind(this.delay, this);
      this.mouse = __bind(this.mouse, this);
      this._eMouseMove = __bind(this._eMouseMove, this);
      this.setMousePos = __bind(this.setMousePos, this);
      this.setBtn = __bind(this.setBtn, this);
      this.alpha = __bind(this.alpha, this);
      this.xy = __bind(this.xy, this);
      this.y = __bind(this.y, this);
      this.x = __bind(this.x, this);
      this.size = __bind(this.size, this);
      this.bottom = __bind(this.bottom, this);
      this.right = __bind(this.right, this);
      this.height = __bind(this.height, this);
      this.width = __bind(this.width, this);
      this.elm = __bind(this.elm, this);
      this.id = __bind(this.id, this);
      this.setupElm = __bind(this.setupElm, this);
      this.setBg = __bind(this.setBg, this);
      this.setImg = __bind(this.setImg, this);
      this.bgColor = __bind(this.bgColor, this);
      this.delMask = __bind(this.delMask, this);
      this.mask = __bind(this.mask, this);
      this.canvasId = __bind(this.canvasId, this);
      this.ctx = __bind(this.ctx, this);
      this.canvas = __bind(this.canvas, this);
      this.textHeight = __bind(this.textHeight, this);
      this.textWidth = __bind(this.textWidth, this);
      this.textColor = __bind(this.textColor, this);
      this.text = __bind(this.text, this);
      this.unshiftChild = __bind(this.unshiftChild, this);
      this.addChild = __bind(this.addChild, this);
      this.dispose2 = __bind(this.dispose2, this);
      this.dispose = __bind(this.dispose, this);
      this.resize = __bind(this.resize, this);
      this.update = __bind(this.update, this);
      this.addStage = __bind(this.addStage, this);
      this.init = __bind(this.init, this);
      this._id = elm.attr != null ? elm.attr("id") : elm;
      this._elm = elm.attr != null ? elm : null;
      this._isUpdate = (option != null) && (option.update != null) ? option.update : true;
      this._isResize = (option != null) && (option.resize != null) ? option.resize : true;
      this._image;
      this._position = {
        x: 0,
        y: 0
      };
      this._size = {
        width: 0,
        height: 0
      };
      this._alpha = 1;
      this._mouse = {
        x: 0,
        y: 0,
        oldX: 0,
        oldY: 0
      };
      this._canvasId;
      this._ctx;
      this._text = "";
      this._tm = [];
      this._imgData = [];
    }

    display.prototype.init = function() {
      if (this._elm != null) {
        this._elm.css({
          position: "absolute",
          top: 0,
          left: 0
        });
      }
      this.addStage();
      if (this._isUpdate) {
        root.MY.main.addUpdate(this.update);
      }
      if (this._isResize) {
        return root.MY.main.addResize(this.resize, true);
      }
    };

    display.prototype.addStage = function() {};

    display.prototype.update = function() {};

    display.prototype.resize = function() {};

    display.prototype.dispose = function() {
      var i, val, _i, _j, _len, _len1, _ref, _ref1;
      this.dispose2();
      if (this._tm != null) {
        _ref = this._tm;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          val = _ref[i];
          if (val != null) {
            clearTimeout(val);
            this._tm[i] = null;
          }
        }
        this._tm = null;
      }
      if (this._imgData != null) {
        _ref1 = this._imgData;
        for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
          val = _ref1[i];
          if (val != null) {
            val.dispose();
            this._imgData[i] = null;
          }
        }
        this._imgData = null;
      }
      if (this._isUpdate) {
        root.MY.main.delUpdate(this.update);
      }
      if (this._isResize) {
        root.MY.main.delResize(this.resize);
      }
      if (this._elm != null) {
        if ($("#" + this.id() + " img").length > 0) {
          root.MY.util.stop($("#" + this.id() + " img"));
        }
        root.MY.util.stop(this._elm);
        this._elm.unbind();
        this._elm.remove();
        this._elm = null;
      }
      if (this._image != null) {
        this._image.dispose();
        this._image = null;
      }
      this._position = null;
      this._size = null;
      return this._mouse = null;
    };

    display.prototype.dispose2 = function() {};

    display.prototype.addChild = function(view) {
      if (this._elm != null) {
        this._elm.append("<div id='" + view.id() + "'></div>");
        view.setupElm();
        return view.init();
      }
    };

    display.prototype.unshiftChild = function(view) {
      if (this._elm != null) {
        this._elm.prepend("<div id='" + view.id() + "'></div>");
        view.setupElm();
        return view.init();
      }
    };

    display.prototype.text = function(val, f) {
      if ((val == null) && (f == null)) {
        return this._text;
      } else {
        if (this._elm != null) {
          this._elm.html(val);
          if ((f != null) && f !== "") {
            this._elm.addClass(f);
          }
          return this._text = val;
        }
      }
    };

    display.prototype.textColor = function(color) {
      if (this._elm != null) {
        return this._elm.css({
          color: color
        });
      }
    };

    display.prototype.textWidth = function() {
      if (this._elm != null) {
        return this._elm.width();
      }
    };

    display.prototype.textHeight = function() {
      if (this._elm != null) {
        return this._elm.height();
      }
    };

    display.prototype.canvas = function() {
      var canvasElm;
      if (this._elm != null) {
        this._canvasId = this.id() + "_canvas";
        if ($("#" + this._canvasId).length > 0) {
          $("#" + this._canvasId).remove();
        }
        this._elm.append("<canvas id='" + this._canvasId + "' width='" + this.width() + "' height='" + this.height() + "'></canvas>");
        canvasElm = $("#" + this._canvasId);
        canvasElm.css({
          position: "absolute",
          top: 0,
          left: 0
        });
        return this._ctx = canvasElm[0].getContext("2d");
      }
    };

    display.prototype.ctx = function() {
      return this._ctx;
    };

    display.prototype.canvasId = function() {
      return this._canvasId;
    };

    display.prototype.mask = function() {
      if (this._elm != null) {
        return this._elm.css("overflow", "hidden");
      }
    };

    display.prototype.delMask = function() {
      if (this._elm != null) {
        return this._elm.css("overflow", "visible");
      }
    };

    display.prototype.bgColor = function(color) {
      if (this._elm != null) {
        return this._elm.css("backgroundColor", color);
      }
    };

    display.prototype.setImg = function(image) {
      if (this._elm != null) {
        this._image = image;
        this._elm.append("<img src='" + this._image.src + "' width='" + this._image.width + "' height='" + this._image.height + "' alt='" + this._image.alt + "'>");
        $("#" + this._id + " img").css({
          position: "absolute",
          top: 0,
          left: 0
        });
        return this.size(this._image.width, this._image.height);
      }
    };

    display.prototype.setBg = function(image) {
      if (this._image != null) {
        return;
      }
      if (this._elm != null) {
        this._image = image;
        this._elm.css({
          backgroundImage: "url('" + this._image.src + "')"
        });
        return this.size(this._image.width, this._image.height);
      }
    };

    display.prototype.setupElm = function() {
      return this._elm = $("#" + this._id);
    };

    display.prototype.id = function() {
      return this._id;
    };

    display.prototype.elm = function() {
      return this._elm;
    };

    display.prototype.width = function(val) {
      if (val == null) {
        return this._size.width;
      }
      this._size.width = val;
      return this._elm.css("width", this._size.width);
    };

    display.prototype.height = function(val) {
      if (val == null) {
        return this._size.height;
      }
      this._size.height = val;
      return this._elm.css("height", this._size.height);
    };

    display.prototype.right = function() {
      return this._position.x + this._size.width;
    };

    display.prototype.bottom = function() {
      return this._position.y + this._size.height;
    };

    display.prototype.size = function(w, h) {
      this._size.width = w;
      this._size.height = h;
      return this._elm.css({
        width: this._size.width,
        height: this._size.height
      });
    };

    display.prototype.x = function(val) {
      if (val == null) {
        return this._position.x;
      }
      if (this._elm != null) {
        this._elm.css("left", val);
        return this._position.x = val;
      }
    };

    display.prototype.y = function(val) {
      if (val == null) {
        return this._position.y;
      }
      if (this._elm != null) {
        this._elm.css("top", val);
        return this._position.y = val;
      }
    };

    display.prototype.xy = function(val1, val2) {
      if (this._elm != null) {
        this._elm.css({
          top: val2,
          left: val1
        });
        this._position.x = val1;
        return this._position.y = val2;
      }
    };

    display.prototype.alpha = function(val) {
      if (val == null) {
        return this._alpha;
      } else {
        if (this._elm != null) {
          this._elm.css("opacity", val);
          return this._alpha = val;
        }
      }
    };

    display.prototype.setBtn = function(f1, f2, f3) {
      if (this._elm != null) {
        if (f1[1] == null) {
          f1[1] = {};
        }
        if (f2[1] == null) {
          f2[1] = {};
        }
        if (f3[1] == null) {
          f3[1] = {};
        }
        return this._elm.bind("mouseover", f1[1], f1[0]).bind("mouseout", f2[1], f2[0]).bind("click", f3[1], f3[0]);
      }
    };

    display.prototype.setMousePos = function(option) {
      if (option != null) {
        this._mouse.x = this._mouse.oldX = option.x;
        this._mouse.y = this._mouse.oldY = option.y;
      }
      if (this._elm != null) {
        return this._elm.bind("mousemove", this._eMouseMove);
      }
    };

    display.prototype._eMouseMove = function(e) {
      var x, y;
      x = e.pageX;
      y = e.pageY;
      this._mouse.oldX = this._mouse.x;
      this._mouse.oldY = this._mouse.y;
      this._mouse.x = x;
      return this._mouse.y = y;
    };

    display.prototype.mouse = function(p) {
      if (p == null) {
        return this._mouse;
      } else {
        this._mouse.oldX = this._mouse.x;
        this._mouse.oldY = this._mouse.y;
        this._mouse.x = p.x;
        return this._mouse.y = p.y;
      }
    };

    display.prototype.delay = function(f, time, key) {
      this.delayClear(key);
      return this._tm[key] = setTimeout(f, time);
    };

    display.prototype.delayClear = function(key) {
      if (this._tm[key] != null) {
        clearTimeout(this._tm[key]);
        return this._tm[key] = null;
      }
    };

    return display;

  })();

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.utils = (function() {
    function utils() {
      this._A = Math.PI / 180;
    }

    utils.prototype.random = function(min, max) {
      if (min < 0) {
        min--;
      }
      return ~~(Math.random() * ((max + 1) - min) + min);
    };

    utils.prototype.hit = function(range) {
      return this.random(0, range - 1) === 0;
    };

    utils.prototype.range = function(val) {
      return this.random(-val, val);
    };

    utils.prototype.map = function(num, resMin, resMax, baseMin, baseMax) {
      var p;
      if (num < baseMin) {
        return resMin;
      }
      if (num > baseMax) {
        return resMax;
      }
      p = (resMax - resMin) / (baseMax - baseMin);
      return ((num - baseMin) * p) + resMin;
    };

    utils.prototype.radian = function(degree) {
      return degree * this._A;
    };

    utils.prototype.degree = function(radian) {
      return radian / this._A;
    };

    utils.prototype.decimal = function(num, n) {
      var i, pos;
      num = String(num);
      pos = num.indexOf(".");
      if (n === 0) {
        return num.split(".")[0];
      }
      if (pos === -1) {
        num += ".";
        i = 0;
        while (i < n) {
          num += "0";
          i++;
        }
        return num;
      }
      num = num.substr(0, pos) + num.substr(pos, n + 1);
      return num;
    };

    utils.prototype.floor = function(num, min, max) {
      return Math.min(max, Math.max(num, min));
    };

    utils.prototype.strReverse = function(str) {
      var i, len, res;
      res = "";
      len = str.length;
      i = 1;
      while (i <= len) {
        res += str.substr(-i, 1);
        i++;
      }
      return res;
    };

    utils.prototype.shuffle = function(arr) {
      var i, j, k, _results;
      i = arr.length;
      _results = [];
      while (--i) {
        j = Math.floor(Math.random() * (i + 1));
        if (i === j) {
          continue;
        }
        k = arr[i];
        arr[i] = arr[j];
        _results.push(arr[j] = k);
      }
      return _results;
    };

    utils.prototype.sliceNull = function(arr) {
      var i, newArr, val, _i, _len;
      newArr = [];
      for (i = _i = 0, _len = arr.length; _i < _len; i = ++_i) {
        val = arr[i];
        if (val !== null) {
          newArr.push(val);
        }
      }
      return newArr;
    };

    utils.prototype.sort = function(arr, para, desc) {
      if (desc === void 0) {
        desc = false;
      }
      if (desc) {
        return arr.sort(function(a, b) {
          return b[para] - a[para];
        });
      } else {
        return arr.sort(function(a, b) {
          return a[para] - b[para];
        });
      }
    };

    utils.prototype.addUnique = function(file) {
      return file + "?date=" + new Date().getTime();
    };

    utils.prototype.getRandomColor = function() {
      var color, count;
      color = Math.floor(Math.random() * 0xFFFFFF).toString(16);
      count = color.length;
      while (count < 6) {
        color = "0" + color;
        count++;
      }
      color = "#" + color;
      return color;
    };

    utils.prototype.stop = function(con) {
      var i, len, _results;
      if (con.length === 0) {
        return;
      }
      i = 0;
      len = con.queue().length;
      _results = [];
      while (i < len) {
        con.stop();
        _results.push(i++);
      }
      return _results;
    };

    utils.prototype.buttonMode = function(flg) {
      if (flg) {
        return $("body").css("cursor", "pointer");
      } else {
        return $("body").css("cursor", "default");
      }
    };

    utils.prototype.getQuery = function(key) {
      var qs, regex;
      key = key.replace(/[€[]/, "€€€[").replace(/[€]]/, "€€€]");
      regex = new RegExp("[€€?&]" + key + "=([^&#]*)");
      qs = regex.exec(window.location.href);
      if (qs === null) {
        return "";
      } else {
        return qs[1];
      }
    };

    utils.prototype.hash = function() {
      return location.hash.replace("#", "");
    };

    utils.prototype.isSmt = function() {
      return navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0;
    };

    utils.prototype.isAndroid = function() {
      return navigator.userAgent.indexOf('Android') > 0;
    };

    utils.prototype.isIos = function() {
      return navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPod') > 0;
    };

    utils.prototype.isIe8Under = function() {
      var msie;
      msie = navigator.appVersion.toLowerCase();
      msie = msie.indexOf('msie') > -1 ? parseInt(msie.replace(/.*msie[ ]/, '').match(/^[0-9]+/)) : 0;
      return msie <= 8 && msie !== 0;
    };

    utils.prototype.isIe9Under = function() {
      var msie;
      msie = navigator.appVersion.toLowerCase();
      msie = msie.indexOf('msie') > -1 ? parseInt(msie.replace(/.*msie[ ]/, '').match(/^[0-9]+/)) : 0;
      return msie <= 9 && msie !== 0;
    };

    utils.prototype.isIe = function() {
      var msie;
      msie = navigator.appVersion.toLowerCase();
      msie = msie.indexOf('msie') > -1 ? parseInt(msie.replace(/.*msie[ ]/, '').match(/^[0-9]+/)) : 0;
      return msie !== 0;
    };

    utils.prototype.isIpad = function() {
      return navigator.userAgent.indexOf('iPad') > 0;
    };

    utils.prototype.isWin = function() {
      return navigator.platform.indexOf("Win") !== -1;
    };

    utils.prototype.isChrome = function() {
      return navigator.userAgent.indexOf('Chrome') > 0;
    };

    utils.prototype.getCookie = function(key) {
      var a, arr, i, val, _i, _len;
      if (document.cookie === void 0 || document.cookie === null) {
        return null;
      }
      arr = document.cookie.split("; ");
      for (i = _i = 0, _len = arr.length; _i < _len; i = ++_i) {
        val = arr[i];
        a = val.split("=");
        if (a[0] === key) {
          return a[1];
        }
      }
      return null;
    };

    utils.prototype.setCookie = function(key, val) {
      return document.cookie = key + "=" + val;
    };

    utils.prototype.useFixed = function() {
      var container, el, elementTop, isSupported, originalHeight, originalScrollTop;
      container = document.body;
      if (document.createElement && container && container.appendChild && container.removeChild) {
        el = document.createElement('div');
        if (!el.getBoundingClientRect) {
          return null;
        }
        el.innerHTML = 'x';
        el.style.cssText = 'position:fixed;top:100px;';
        container.appendChild(el);
        originalHeight = container.style.height;
        originalScrollTop = container.scrollTop;
        container.style.height = '3000px';
        container.scrollTop = 500;
        elementTop = el.getBoundingClientRect().top;
        container.style.height = originalHeight;
        isSupported = elementTop === 100;
        container.removeChild(el);
        container.scrollTop = originalScrollTop;
        return isSupported;
      }
      return false;
    };

    utils.prototype.tag = function(tag, para, close) {
      var i, res, val, _i, _len;
      if (para === void 0) {
        para = [];
      }
      if (close === void 0) {
        close = true;
      }
      res = "<" + tag;
      for (i = _i = 0, _len = para.length; _i < _len; i = ++_i) {
        val = para[i];
        res += " " + val.name + "=" + val.val;
      }
      res += ">";
      if (close) {
        res += "</" + tag + ">";
      }
      return res;
    };

    utils.prototype.translate = function(x, y) {
      if (x === void 0) {
        x = 0;
      }
      if (y === void 0) {
        y = 0;
      }
      return 'translate(' + x + 'px,' + y + 'px)';
    };

    utils.prototype.translateX = function(x) {
      if (x === void 0) {
        x = 0;
      }
      return 'translateX(' + x + 'px)';
    };

    utils.prototype.translateY = function(y) {
      if (y === void 0) {
        y = 0;
      }
      return 'translateY(' + y + 'px)';
    };

    utils.prototype.translate3d = function(x, y, z, use3d) {
      if (x === void 0) {
        x = 0;
      }
      if (y === void 0) {
        y = 0;
      }
      if (z === void 0) {
        z = 0;
      }
      if (use3d === void 0) {
        use3d = true;
      }
      if (use3d) {
        return 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)';
      } else {
        return 'translate(' + x + 'px,' + y + 'px)';
      }
    };

    utils.prototype.rotate = function(val) {
      if (val === void 0) {
        val = 0;
      }
      return 'rotate(' + val + 'deg)';
    };

    utils.prototype.rotateX = function(val) {
      if (val === void 0) {
        val = 0;
      }
      return 'rotateX(' + val + 'deg)';
    };

    utils.prototype.rotateY = function(val) {
      if (val === void 0) {
        val = 0;
      }
      return 'rotateY(' + val + 'deg)';
    };

    utils.prototype.rotateZ = function(val) {
      if (val === void 0) {
        val = 0;
      }
      return 'rotateZ(' + val + 'deg)';
    };

    utils.prototype.scale3d = function(x, y, z) {
      if (x === void 0) {
        x = 1;
      }
      if (y === void 0) {
        y = 1;
      }
      if (z === void 0) {
        z = 1;
      }
      return 'scale3d(' + x + ',' + y + ',' + z + ')';
    };

    utils.prototype.scaleX = function(x) {
      if (x === void 0) {
        x = 1;
      }
      return 'scaleX(' + x + ')';
    };

    utils.prototype.scaleY = function(y) {
      if (y === void 0) {
        y = 1;
      }
      return 'scaleY(' + y + ')';
    };

    utils.prototype.skew = function(val) {
      if (val === void 0) {
        val = 0;
      }
      return 'skew(' + val + 'deg)';
    };

    utils.prototype.getVendorCss = function(prop, val) {
      var res;
      res = {};
      res["-moz-" + prop] = val;
      res["-webkit-" + prop] = val;
      res["-o-" + prop] = val;
      res["-ms-" + prop] = val;
      res[prop] = val;
      return res;
    };

    utils.prototype.addDiv = function(parent, id, x, y) {
      parent.append(this.tag("div", [
        {
          name: "id",
          val: id
        }
      ]));
      if (x !== void 0 && y !== void 0) {
        return $("#" + id).css({
          position: "absolute",
          top: y,
          left: x
        });
      } else {
        return $("#" + id);
      }
    };

    utils.prototype.addCanvas = function(parent, id, width, height, x, y) {
      parent.append(this.tag("canvas", [
        {
          name: "id",
          val: id
        }, {
          name: "width",
          val: width
        }, {
          name: "height",
          val: height
        }
      ]));
      if (x !== void 0 && y !== void 0) {
        return $("#" + id).css({
          position: "absolute",
          top: y,
          left: x
        });
      } else {
        return $("#" + id);
      }
    };

    utils.prototype.addImg = function(parent, id, src, width, height) {
      parent.append(this.tag("img", [
        {
          name: "id",
          val: id
        }, {
          name: "src",
          val: src
        }, {
          name: "width",
          val: width
        }, {
          name: "height",
          val: height
        }
      ]), false);
      return $("#" + id);
    };

    return utils;

  })();

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.rectangle = (function() {
    function rectangle(x, y, width, height) {
      this.contains = __bind(this.contains, this);
      this.bottom = __bind(this.bottom, this);
      this.right = __bind(this.right, this);
      this.dispose = __bind(this.dispose, this);
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }

    rectangle.prototype.dispose = function() {};

    rectangle.prototype.right = function() {
      return this.x + this.width;
    };

    rectangle.prototype.bottom = function() {
      return this.y + this.height;
    };

    rectangle.prototype.contains = function(chkX, chkY) {
      return chkX >= this.x && chkX <= this.right() && chkY >= this.y && chkY <= this.bottom();
    };

    return rectangle;

  })();

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.borderView = (function(_super) {
    __extends(borderView, _super);

    function borderView(elm, width, height, color, weight) {
      this.changeBorder = __bind(this.changeBorder, this);
      this.dispose2 = __bind(this.dispose2, this);
      borderView.__super__.constructor.call(this, elm, {
        update: false,
        resize: false
      });
      this._color = color;
      this._weight = weight;
      this._width2 = width;
      this._height2 = height;
      this._top;
      this._left;
      this._bottom;
      this._right;
    }

    borderView.prototype.addStage = function() {
      this.size(this._width2, this._height2);
      this._top = new root._LIBS.display(this.id() + "_top", {
        update: false,
        resize: false
      });
      this.addChild(this._top);
      this._left = new root._LIBS.display(this.id() + "_left", {
        update: false,
        resize: false
      });
      this.addChild(this._left);
      this._bottom = new root._LIBS.display(this.id() + "_bottom", {
        update: false,
        resize: false
      });
      this.addChild(this._bottom);
      this._right = new root._LIBS.display(this.id() + "_right", {
        update: false,
        resize: false
      });
      this.addChild(this._right);
      return this.changeBorder(this.width(), this.height());
    };

    borderView.prototype.dispose2 = function() {};

    borderView.prototype.changeBorder = function(width, height, color, weight) {
      this.size(width, height);
      if (color != null) {
        this._color = color;
      }
      if (weight != null) {
        this._weight = weight;
      }
      this._top.elm().css("backgroundColor", this._color);
      this._left.elm().css("backgroundColor", this._color);
      this._bottom.elm().css("backgroundColor", this._color);
      this._right.elm().css("backgroundColor", this._color);
      this._top.xy(0, 0);
      this._top.size(this.width(), this._weight);
      this._left.xy(0, 0);
      this._left.size(this._weight, this.height());
      this._bottom.xy(0, this.height() - this._weight);
      this._bottom.size(this.width(), this._weight);
      this._right.xy(this.width() - this._weight, 0);
      return this._right.size(this._weight, this.height());
    };

    return borderView;

  })(root._LIBS.display);

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.blendmode = (function() {
    function blendmode() {
      this.DIFFERENCE = 0;
      this.LINEARDODGE = 1;
      this.MULTIPLY = 2;
      this.SCREEN = 3;
    }

    blendmode.prototype.apply = function(canvasAID, canvasBID, type) {
      var canvasA, canvasB, contextA, contextB, imageDataA, imageDataB, outputImageData;
      canvasA = document.getElementById(canvasAID);
      canvasB = document.getElementById(canvasBID);
      contextA = canvasA.getContext("2d");
      contextB = canvasB.getContext("2d");
      imageDataA = contextA.getImageData(0, 0, canvasA.width, canvasA.height);
      imageDataB = contextB.getImageData(0, 0, canvasA.width, canvasA.height);
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
      }
      return contextA.putImageData(outputImageData, 0, 0);
    };

    blendmode.prototype._linearburn = function(imageDataA, imageDataB) {
      var bA, bB, dataA, dataB, gA, gB, i, rA, rB;
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
        dataA[i] = rC;
        dataA[i + 1] = gC;
        dataA[i + 2] = bC;
        i += 4;
      }
      return imageDataA;
    };

    blendmode.prototype._colorburn = function(imageDataA, imageDataB) {
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

    blendmode.prototype._darken = function(imageDataA, imageDataB) {
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

    blendmode.prototype._screen = function(imageDataA, imageDataB) {
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

    blendmode.prototype._lineardodge = function(imageDataA, imageDataB) {
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

    blendmode.prototype._multiply = function(imageDataA, imageDataB) {
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

    blendmode.prototype._difference = function(imageDataA, imageDataB) {
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

    return blendmode;

  })();

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.filters = (function() {
    function filters() {}

    filters.prototype.color = function(id, r, g, b) {
      var canvas, ctx, data, i, imgData;
      canvas = document.getElementById(id);
      ctx = canvas.getContext("2d");
      imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      data = imgData.data;
      i = 0;
      while (i < data.length) {
        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
        i += 4;
      }
      return ctx.putImageData(imgData, 0, 0);
    };

    return filters;

  })();

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.btnAreaView = (function(_super) {
    __extends(btnAreaView, _super);

    function btnAreaView(elm, width, height) {
      this._eClick = __bind(this._eClick, this);
      this._eRollOut = __bind(this._eRollOut, this);
      this._eRollOver = __bind(this._eRollOver, this);
      this.visible = __bind(this.visible, this);
      this.dispose2 = __bind(this.dispose2, this);
      btnAreaView.__super__.constructor.call(this, elm, {
        update: false,
        resize: false
      });
      this._width = width;
      this._height = height;
      this.onClick;
      this.onRollOver;
      this.onRollOut;
    }

    btnAreaView.prototype.addStage = function() {
      this.size(this._width, this._height);
      this.elm().css({
        backgroundColor: "#FF0000",
        opacity: 0
      });
      return this.setBtn([this._eRollOver], [this._eRollOut], [this._eClick]);
    };

    btnAreaView.prototype.dispose2 = function() {
      this.onClick = null;
      this.onRollOver = null;
      return this.onRollOut = null;
    };

    btnAreaView.prototype.visible = function(flg) {
      if (flg) {
        return this.elm().css({
          opacity: 0.5
        });
      } else {
        return this.elm().css({
          opacity: 0
        });
      }
    };

    btnAreaView.prototype._eRollOver = function() {
      root.MY.util.buttonMode(true);
      if (this.onRollOver != null) {
        return this.onRollOver();
      }
    };

    btnAreaView.prototype._eRollOut = function() {
      root.MY.util.buttonMode(false);
      if (this.onRollOut != null) {
        return this.onRollOut();
      }
    };

    btnAreaView.prototype._eClick = function() {
      if (this.onClick != null) {
        return this.onClick();
      }
    };

    return btnAreaView;

  })(root._LIBS.display);

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.point3d = (function() {
    function point3d(x, y, z, option) {
      this.rotateZ = __bind(this.rotateZ, this);
      this.rotateY = __bind(this.rotateY, this);
      this.rotateX = __bind(this.rotateX, this);
      this.screenY = __bind(this.screenY, this);
      this.screenX = __bind(this.screenX, this);
      this.setCenter = __bind(this.setCenter, this);
      this.setVanishingPoint = __bind(this.setVanishingPoint, this);
      this.dispose = __bind(this.dispose, this);
      this.fl = (option != null) && (option.fl != null) ? option.fl : 800;
      this.vpX = 0;
      this.vpY = 0;
      this.cX = 0;
      this.cY = 0;
      this.cZ = 0;
      this.x = x;
      this.y = y;
      this.z = z;
    }

    point3d.prototype.dispose = function() {};

    point3d.prototype.setVanishingPoint = function(vpX, vpY) {
      this.vpX = vpX;
      return this.vpY = vpY;
    };

    point3d.prototype.setCenter = function(cX, cY, cZ) {
      this.cX = cX;
      this.cY = cY;
      return this.cZ = cZ;
    };

    point3d.prototype.screenX = function() {
      var scale;
      scale = this.fl / (this.fl + this.z + this.cZ);
      return this.vpX + this.cX + this.x * scale;
    };

    point3d.prototype.screenY = function() {
      var scale;
      scale = this.fl / (this.fl + this.z + this.cZ);
      return this.vpY + this.cY + this.y * scale;
    };

    point3d.prototype.rotateX = function(angleX) {
      var cosX, sinX, y1, z1;
      cosX = Math.cos(angleX);
      sinX = Math.sin(angleX);
      y1 = this.y * cosX - this.z * sinX;
      z1 = this.z * cosX + this.y * sinX;
      this.y = y1;
      return this.z = z1;
    };

    point3d.prototype.rotateY = function(angleY) {
      var cosY, sinY, x1, z1;
      cosY = Math.cos(angleY);
      sinY = Math.sin(angleY);
      x1 = this.x * cosY - this.z * sinY;
      z1 = this.z * cosY + this.x * sinY;
      this.x = x1;
      return this.z = z1;
    };

    point3d.prototype.rotateZ = function(angleZ) {
      var cosZ, sinZ, x1, y1;
      cosZ = Math.cos(angleZ);
      sinZ = Math.sin(angleZ);
      x1 = this.x * cosZ - this.y * sinZ;
      y1 = this.y * cosZ + this.x * sinZ;
      this.x = x1;
      return this.y = y1;
    };

    return point3d;

  })();

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.triangle = (function() {
    function triangle(a, b, c, color, light) {
      this._toRgb = __bind(this._toRgb, this);
      this._getLightFactor = __bind(this._getLightFactor, this);
      this._adjustedColor = __bind(this._adjustedColor, this);
      this._depth = __bind(this._depth, this);
      this._isBackFace = __bind(this._isBackFace, this);
      this.draw = __bind(this.draw, this);
      this.setDrawInfo = __bind(this.setDrawInfo, this);
      this.setColor = __bind(this.setColor, this);
      this.dispose = __bind(this.dispose, this);
      this.pointA = a;
      this.pointB = b;
      this.pointC = c;
      this.depth = 0;
      this.color = color;
      this.light = light;
      this._isFill = true;
      this._isLine = true;
      this._isDraw = true;
    }

    triangle.prototype.dispose = function() {
      this.pointA = null;
      this.pointB = null;
      this.pointC = null;
      return this.light = null;
    };

    triangle.prototype.setColor = function(color) {
      return this.color = color;
    };

    triangle.prototype.setDrawInfo = function(isFill, isLine, isDraw) {
      this._isFill = isFill;
      this._isLine = isLine;
      return this._isDraw = isDraw;
    };

    triangle.prototype.draw = function(ctx) {
      var color;
      this._depth();
      if (!this._isDraw || this._isBackFace()) {
        return;
      }
      color = "#" + this._adjustedColor().toString(16);
      ctx.beginPath();
      if (this._isFill) {
        ctx.fillStyle = color;
      }
      if (this._isLine) {
        ctx.strokeStyle = color;
      }
      ctx.moveTo(this.pointA.screenX(), this.pointA.screenY());
      ctx.lineTo(this.pointB.screenX(), this.pointB.screenY());
      ctx.lineTo(this.pointC.screenX(), this.pointC.screenY());
      ctx.lineTo(this.pointA.screenX(), this.pointA.screenY());
      ctx.closePath();
      if (this._isLine) {
        ctx.stroke();
      }
      if (this._isFill) {
        return ctx.fill();
      }
    };

    triangle.prototype._isBackFace = function() {
      var bcx, bcy, cax, cay;
      cax = this.pointC.screenX() - this.pointA.screenX();
      cay = this.pointC.screenY() - this.pointA.screenY();
      bcx = this.pointB.screenX() - this.pointC.screenX();
      bcy = this.pointB.screenY() - this.pointC.screenY();
      return cax * bcy > cay * bcx;
    };

    triangle.prototype._depth = function() {
      var zpos;
      zpos = Math.min(this.pointA.z, this.pointB.z);
      zpos = Math.min(zpos, this.pointC.z);
      return this.depth = zpos;
    };

    triangle.prototype._adjustedColor = function() {
      var b, g, lightFactor, r;
      lightFactor = this._getLightFactor();
      r = this.color >> 16;
      g = this.color >> 8 & 0xff;
      b = this.color & 0xff;
      r *= lightFactor;
      g *= lightFactor;
      b *= lightFactor;
      return r << 16 | g << 8 | b;
    };

    triangle.prototype._getLightFactor = function() {
      var ab, bc, dotProd, lightMag, norm, normMag;
      if (this.light == null) {
        return 1;
      }
      ab = {};
      ab.x = this.pointA.x - this.pointB.x;
      ab.y = this.pointA.y - this.pointB.y;
      ab.z = this.pointA.z - this.pointB.z;
      bc = {};
      bc.x = this.pointB.x - this.pointC.x;
      bc.y = this.pointB.y - this.pointC.y;
      bc.z = this.pointB.z - this.pointC.z;
      norm = {};
      norm.x = (ab.y * bc.z) - (ab.z * bc.y);
      norm.y = -((ab.x * bc.z) - (ab.z * bc.x));
      norm.z = (ab.x * bc.y) - (ab.y * bc.x);
      dotProd = norm.x * this.light.x + norm.y * this.light.y + norm.z * this.light.z;
      normMag = Math.sqrt(norm.x * norm.x + norm.y * norm.y + norm.z * norm.z);
      lightMag = Math.sqrt(this.light.x * this.light.x + this.light.y * this.light.y + this.light.z * this.light.z);
      return (Math.acos(dotProd / (normMag * lightMag)) / Math.PI) * this.light.brightness();
    };

    triangle.prototype._toRgb = function(color) {
      var b, g, r;
      r = color >> 16;
      g = color >> 8 & 0xff;
      b = color & 0xff;
      return "rgb(" + r + ", " + g + ", " + b + ")";
    };

    return triangle;

  })();

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.light = (function() {
    function light(x, y, z, brightness) {
      this.brightness = __bind(this.brightness, this);
      this.dispose = __bind(this.dispose, this);
      this.x = x;
      this.y = y;
      this.z = z;
      this._brightness = brightness;
    }

    light.prototype.dispose = function() {};

    light.prototype.brightness = function(val) {
      if (val == null) {
        return this._brightness;
      } else {
        this._brightness = Math.max(val, 0);
        return this._brightness = Math.min(this._brightness, 1);
      }
    };

    return light;

  })();

  root = this;

  root.MY = {};

  root.MY_CLASS = {};

  root.MY_CLASS.base = (function() {
    function base() {
      this._resize = __bind(this._resize, this);
      this._update = __bind(this._update, this);
      this._updateList = [];
      this._resizeList = [];
      this._stats;
      this._rTimer;
      this.ws = {
        w: 0,
        h: 0,
        oldW: -1,
        oldH: -1
      };
    }

    base.prototype._init = function() {
      setInterval(this._update, 1000 / root.MY.conf.FPS);
      $(window).bind("resize", this._resize);
      this._resize();
      if (root.MY.conf.TEST_STATS) {
        return this.setStats();
      }
    };

    base.prototype._update = function() {
      var i, val, _i, _len, _ref;
      _ref = this._updateList;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        val = _ref[i];
        val();
      }
      if (this._stats != null) {
        this._stats.update();
      }
      if (typeof TWEEN !== "undefined" && TWEEN !== null) {
        return TWEEN.update();
      }
    };

    base.prototype.addUpdate = function(func) {
      return this._updateList.push(func);
    };

    base.prototype.delUpdate = function(func) {
      var arr, i, val, _i, _len, _ref;
      arr = [];
      _ref = this._updateList;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        val = _ref[i];
        if (val !== func) {
          arr.push(val);
        }
      }
      return this._updateList = arr;
    };

    base.prototype._resize = function(e) {
      var h, i, val, w, _i, _len, _ref;
      w = $(window).width();
      h = $(window).height();
      this.ws.w = w;
      this.ws.h = h;
      _ref = this._resizeList;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        val = _ref[i];
        val(w, h);
      }
      this.ws.oldW = w;
      return this.ws.oldH = h;
    };

    base.prototype.addResize = function(func, isCall) {
      this._resizeList.push(func);
      if ((isCall != null) && isCall) {
        return func(this.ws.w, this.ws.h);
      }
    };

    base.prototype.delResize = function(func) {
      var arr, i, val, _i, _len, _ref;
      arr = [];
      _ref = this._resizeList;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        val = _ref[i];
        if (val !== func) {
          arr.push(val);
        }
      }
      return this._resizeList = arr;
    };

    base.prototype.setStats = function() {
      this._stats = new Stats();
      this._stats.domElement.style.position = "fixed";
      this._stats.domElement.style.left = "0px";
      this._stats.domElement.style.top = "0px";
      return document.body.appendChild(this._stats.domElement);
    };

    base.prototype.setup = function() {};

    return base;

  })();

  $(window).load(function() {
    root.MY.util = new root._LIBS.utils();
    root.MY.conf = new root.MY_CLASS.conf();
    root.MY.funcs = new root.MY_CLASS.funcs();
    root.MY.main = new root.MY_CLASS.main();
    return root.MY.main.setup();
  });

  root.MY_CLASS.conf = (function() {
    function conf() {
      this.RELEASE = false;
      this.TEST_STATS = this.RELEASE ? false : true;
      this.FPS = 40;
      this.IS_IOS = root.MY.util.isIos();
      this.IS_ADR = root.MY.util.isAndroid();
      this.IS_SMT = this.IS_IOS || this.IS_ADR;
      this.IS_WIN = root.MY.util.isWin();
      this.IS_IPAD = root.MY.util.isIpad();
      this.IS_IE8 = root.MY.util.isIe8Under();
      this.IS_IE9 = root.MY.util.isIe9Under();
      this.IS_IE = root.MY.util.isIe();
      this.IS_RATINA = (window.devicePixelRatio != null) && window.devicePixelRatio > 1;
      this.PATH_IMG = "images/";
    }

    return conf;

  })();

  root.MY_CLASS.funcs = (function() {
    function funcs() {
      this.selectedColor = __bind(this.selectedColor, this);
      this.wheel = __bind(this.wheel, this);
      this.toRgbList = __bind(this.toRgbList, this);
      this.getPearColor = __bind(this.getPearColor, this);
      this.getDetailColorList = __bind(this.getDetailColorList, this);
      this.to16Color = __bind(this.to16Color, this);
    }

    funcs.prototype.to16Color = function(color) {
      return parseInt(String(color).replace("#", ""), 16);
    };

    funcs.prototype.getDetailColorList = function(color) {
      var arr, i, val, _i, _len, _ref;
      arr = [];
      _ref = root.MY.conf.COLOR_LIST;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        val = _ref[i];
        if (val.toString(16) !== color.toString(16)) {
          arr.push([val, this.to16Color(this.getPearColor(val))]);
        }
      }
      root.MY.util.shuffle(arr);
      arr.unshift([color, this.to16Color(this.getPearColor(color))]);
      return arr;
    };

    funcs.prototype.getPearColor = function(color) {
      var rgb1, rgb2;
      if (color.toString(16) === "ffffff") {
        return "#000000";
      } else if (color.toString(16) === "0") {
        return "#ffffff";
      }
      rgb1 = new RGBColor(color.toString(16));
      rgb2 = new RGBColor("rgb(" + Math.abs(rgb1.r - 255) + "," + Math.abs(rgb1.g - 255) + "," + Math.abs(rgb1.b - 255) + ")");
      return rgb2.toHex();
    };

    funcs.prototype.toRgbList = function(color) {
      var rgb;
      rgb = new RGBColor(color);
      return [rgb.r, rgb.g, rgb.b];
    };

    funcs.prototype.wheel = function(val) {
      return root.MY.util.floor(val * root.MY.conf.WHEEL_PARA.C, -root.MY.conf.WHEEL_PARA.MAX, root.MY.conf.WHEEL_PARA.MAX);
    };

    funcs.prototype.selectedColor = function(color) {
      var css, style;
      css = "::selection{background:" + color + "} ::-moz-selection{background:" + color + "}";
      style = document.createElement('style');
      style.appendChild(document.createTextNode(css));
      return document.getElementsByTagName('head')[0].appendChild(style);
    };

    return funcs;

  })();

  root.MY_CLASS.main = (function(_super) {
    __extends(main, _super);

    function main() {
      main.__super__.constructor.call(this);
      this.contents;
      this._init();
    }

    main.prototype.setup = function() {
      var _this = this;
      if (root.MY.conf.IS_SMT) {
        $(window).on("touchmove.scrollOFF", function(e) {
          return e.preventDefault();
        });
      }
      $("#contents").empty();
      this.contents = new root.MY_CLASS.contentsView($("#contents"), {
        update: false,
        resize: false
      });
      return this.contents.init();
    };

    return main;

  })(root.MY_CLASS.base);

  root.MY_CLASS.contentsView = (function(_super) {
    __extends(contentsView, _super);

    function contentsView(elm, option) {
      contentsView.__super__.constructor.call(this, elm, option);
      this._topLayer;
      this._bottomLayer;
      this._gra;
    }

    contentsView.prototype.addStage = function() {
      this._bottomLayer = new root._LIBS.display($("#bottomLayer"), {
        update: false,
        resize: false
      });
      this._bottomLayer.init();
      this._topLayer = new root._LIBS.display($("#topLayer"), {
        update: false,
        resize: false
      });
      this._topLayer.init();
      this._gra = new root.MY_CLASS.graphicView();
      return this.addChild(this._gra);
    };

    return contentsView;

  })(root._LIBS.display);

  root.MY_CLASS.graphicView = (function(_super) {
    __extends(graphicView, _super);

    function graphicView() {
      this._draw = __bind(this._draw, this);
      this._clear = __bind(this._clear, this);
      this._eLoadedImg = __bind(this._eLoadedImg, this);
      this._setBaseCanvas = __bind(this._setBaseCanvas, this);
      this.update = __bind(this.update, this);
      this.resize = __bind(this.resize, this);
      this.dispose2 = __bind(this.dispose2, this);
      graphicView.__super__.constructor.call(this, "graphicView");
      this._baseCanvas;
      this._bmName;
      this._imgData[0] = new root._LIBS.image(root.MY.conf.PATH_IMG + "photo.jpg", 800, 450);
      this._isAddGraphic = false;
      this._parts = [];
      this._cnt = 0;
      this._bType = 0;
    }

    graphicView.prototype.addStage = function() {
      this._bmName = new root._LIBS.display(this.id() + "_bmName", {
        resize: false,
        update: false
      });
      this.addChild(this._bmName);
      this._bmName.width(this._imgData[0].width);
      this._bmName.text("", "myText");
      this._bmName.xy(0, -50);
      this._imgData[0].onMakeData = this._eLoadedImg;
      return this._imgData[0].makeData();
    };

    graphicView.prototype.dispose2 = function() {};

    graphicView.prototype.resize = function() {
      var h, w;
      w = root.MY.main.ws.w;
      h = root.MY.main.ws.h;
      return this.xy(~~(w * 0.5 - this._imgData[0].width * 0.5), ~~(h * 0.5 - this._imgData[0].height * 0.5));
    };

    graphicView.prototype.update = function() {
      if (this._isAddGraphic) {
        if (++this._cnt % 2 === 0) {
          return this._draw();
        }
      }
    };

    graphicView.prototype._setBaseCanvas = function() {
      var ctx;
      this._baseCanvas = new root._LIBS.display(this.id() + "_baseCanvas", {
        resize: false,
        update: false
      });
      this.addChild(this._baseCanvas);
      this._baseCanvas.size(this._imgData[0].width, this._imgData[0].height);
      this._baseCanvas.canvas();
      ctx = this._baseCanvas.ctx();
      ctx.drawImage(this._imgData[0].data(), 0, 0);
      return this._baseCanvas.elm().hide();
    };

    graphicView.prototype._eLoadedImg = function() {
      this._isAddGraphic = true;
      this._setBaseCanvas();
      return this._clear();
    };

    graphicView.prototype._clear = function() {
      var arr, bmobj, i, nameList, val, _i, _len, _ref;
      bmobj = new bm();
      arr = [bmobj.MULTIPLY, bmobj.DIFFERENCE, bmobj.LINEARDODGE, bmobj.SCREEN, bmobj.OVERLAY, bmobj.HARDLIGHT, bmobj.VIVIDLIGHT, bmobj.DARKEN, bmobj.COLORBURN, bmobj.LINEARBURN, bmobj.LIGHTEN];
      this._bType = arr[root.MY.util.random(0, arr.length - 1)];
      _ref = this._parts;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        val = _ref[i];
        val.dispose();
        this._parts[i] = null;
      }
      this._parts = [];
      nameList = [];
      nameList[bmobj.MULTIPLY] = "MULTIPLY";
      nameList[bmobj.DIFFERENCE] = "DIFFERENCE";
      nameList[bmobj.LINEARDODGE] = "LINEARDODGE";
      nameList[bmobj.SCREEN] = "SCREEN";
      nameList[bmobj.OVERLAY] = "OVERLAY";
      nameList[bmobj.HARDLIGHT] = "HARDLIGHT";
      nameList[bmobj.VIVIDLIGHT] = "VIVIDLIGHT";
      nameList[bmobj.DARKEN] = "DARKEN";
      nameList[bmobj.COLORBURN] = "COLORBURN";
      nameList[bmobj.LINEARBURN] = "LINEARBURN";
      nameList[bmobj.LIGHTEN] = "LIGHTEN";
      return this._bmName.text(nameList[this._bType]);
    };

    graphicView.prototype._draw = function() {
      var parts;
      if (this._parts.length > 200) {
        this._clear();
        return;
      }
      parts = new root.MY_CLASS.graphicParts(this.id() + "_parts" + this._parts.length, this._imgData[0], this._baseCanvas.canvasId(), this._bType);
      this.addChild(parts);
      return this._parts.push(parts);
    };

    return graphicView;

  })(root._LIBS.display);

  root.MY_CLASS.graphicParts = (function(_super) {
    __extends(graphicParts, _super);

    function graphicParts(elm, imgData, applyCanvasId, bType) {
      this._setBlend = __bind(this._setBlend, this);
      this._setBaseCanvas = __bind(this._setBaseCanvas, this);
      this._updateTransform = __bind(this._updateTransform, this);
      this.reset = __bind(this.reset, this);
      this.dispose2 = __bind(this.dispose2, this);
      graphicParts.__super__.constructor.call(this, elm, {
        update: false,
        resize: false
      });
      this._img = imgData;
      this._applyCanvasId = applyCanvasId;
      this._baseCanvas;
      this._output;
      this._bType = bType;
      this._p = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        rot: 0
      };
    }

    graphicParts.prototype.addStage = function() {
      var color, u;
      u = root.MY.util;
      this._output = new root._LIBS.display(this.id() + "_output", {
        resize: false,
        update: false
      });
      this.addChild(this._output);
      this._output.size(this._img.width, this._img.height);
      this._output.canvas();
      this.mask();
      color = root.MY.util.getRandomColor();
      this._setBaseCanvas(color);
      this._setBlend();
      this.reset();
      return this._updateTransform();
    };

    graphicParts.prototype.dispose2 = function() {
      if (this._baseCanvas != null) {
        this._baseCanvas.dispose();
        this._baseCanvas = null;
      }
      if (this._output != null) {
        this._output.dispose();
        this._output = null;
      }
      this._img = null;
      return this._p = null;
    };

    graphicParts.prototype.reset = function() {
      var u;
      u = root.MY.util;
      this._p.width = u.random(50, 150);
      this._p.height = u.random(50, 150);
      this.size(this._p.width, this._p.height);
      this._p.x = u.random(0, this._img.width);
      this._p.x -= this._p.width * 0.5;
      this._p.y = u.random(0, this._img.height);
      this._p.y -= this._p.height * 0.5;
      return this._p.rot = u.range(180);
    };

    graphicParts.prototype._updateTransform = function() {
      var u;
      u = root.MY.util;
      this.elm().css(u.getVendorCss("transform-origin", (this._p.width * 0.5) + "px " + (this._p.height * 0.5) + "px")).css(u.getVendorCss("transform", u.translate3d(this._p.x, this._p.y, 0) + " " + u.rotateZ(this._p.rot)));
      return this._output.elm().css(u.getVendorCss("transform-origin", (this._p.x + this._p.width * 0.5) + "px " + (this._p.y + this._p.height * 0.5) + "px")).css(u.getVendorCss("transform", u.translate3d(-this._p.x, -this._p.y, 0) + " " + u.rotateZ(-this._p.rot)));
    };

    graphicParts.prototype._setBaseCanvas = function(color) {
      var ctx;
      if (this._baseCanvas == null) {
        this._baseCanvas = new root._LIBS.display(this.id() + "_baseCanvas", {
          resize: false,
          update: false
        });
        this.addChild(this._baseCanvas);
        this._baseCanvas.size(this._img.width, this._img.height);
        this._baseCanvas.canvas();
      }
      ctx = this._baseCanvas.ctx();
      ctx.clearRect(0, 0, this._baseCanvas.width(), this._baseCanvas.height());
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, this._baseCanvas.width(), this._baseCanvas.height());
      ctx.fill();
      return this._baseCanvas.elm().hide();
    };

    graphicParts.prototype._setBlend = function() {
      var bmobj;
      bmobj = new bm();
      return bmobj.apply(this._baseCanvas.canvasId(), this._applyCanvasId, this._output.canvasId(), this._bType);
    };

    return graphicParts;

  })(root._LIBS.display);

}).call(this);
