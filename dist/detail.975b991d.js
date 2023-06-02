// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/detail.js":[function(require,module,exports) {
// left_top 이미지 색깔 탭메뉴
var colorTabList = document.querySelectorAll('.product_color .tab_menu .list li');
var contents = document.querySelectorAll('.left_top .cont_area .cont');
var activeCont = ''; // 현재 활성화 된 컨텐츠 (기본:#tab1 활성화)

for (var i = 0; i < colorTabList.length; i++) {
  colorTabList[i].querySelector('.btn').addEventListener('click', function (e) {
    e.preventDefault();
    for (var j = 0; j < colorTabList.length; j++) {
      // 나머지 버튼 클래스 제거
      colorTabList[j].classList.remove('is_on');

      // 나머지 컨텐츠 display:none 처리
      contents[j].style.display = 'none';
    }

    // 버튼 관련 이벤트
    this.parentNode.classList.add('is_on');

    // 버튼 클릭시 컨텐츠 전환
    activeCont = this.getAttribute('href');
    document.querySelector(activeCont).style.display = 'block';
  });
}

//left_bottom 탭메뉴
var menuTabList = document.querySelectorAll('.left_bottom .tab_menu .list li');
for (var i = 0; i < menuTabList.length; i++) {
  menuTabList[i].querySelector('.btn').addEventListener('click', function (e) {
    e.preventDefault();
    for (var j = 0; j < menuTabList.length; j++) {
      menuTabList[j].classList.remove('is_on');
    }
    this.parentNode.classList.add('is_on');
  });
}
var basket = {
  totalCount: 0,
  totalPrice: 0,
  /*
  //체크한 장바구니 상품 비우기
  delCheckedItem: function () {
    document
      .querySelectorAll("input[name=buy]:checked")
      .forEach(function (item) {
        item.parentElement.parentElement.parentElement.remove();
      });
    //AJAX 서버 업데이트 전송
      //전송 처리 결과가 성공이면
    this.reCalc();
    this.updateUI();
  },
  //장바구니 전체 비우기
  delAllItem: function () {
    document.querySelectorAll(".row.data").forEach(function (item) {
      item.remove();
    });
    //AJAX 서버 업데이트 전송
      //전송 처리 결과가 성공이면
    this.totalCount = 0;
    this.totalPrice = 0;
    this.reCalc();
    this.updateUI();
  },*/

  //재계산
  reCalc: function reCalc() {
    this.totalCount = 0;
    this.totalPrice = 0;
    document.querySelectorAll(".p_num").forEach(function (item) {
      if (item.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.firstElementChild.checked == true) {
        var count = parseInt(item.getAttribute("value"));
        this.totalCount += count;
        var price = item.parentElement.parentElement.previousElementSibling.firstElementChild.getAttribute("value");
        this.totalPrice += count * price;
      }
    }, this); // forEach 2번째 파라메터로 객체를 넘겨서 this 가 객체리터럴을 가리키도록 함. - thisArg
  },

  //화면 업데이트
  updateUI: function updateUI() {
    document.querySelector("#sum_p_num").textContent = "(" + this.totalCount.formatNumber() + "개" + ")";
    document.querySelector("#sum_p_price").textContent = this.totalPrice.formatNumber() + "원";
  },
  //개별 수량 변경
  changePNum: function changePNum(pos) {
    var item = document.querySelector("input[name=p_num" + pos + "]");
    var p_num = parseInt(item.getAttribute("value"));
    var newval = event.target.classList.contains("up") ? p_num + 1 : event.target.classList.contains("down") ? p_num - 1 : event.target.value;
    if (parseInt(newval) < 1 || parseInt(newval) > 99) {
      return false;
    }
    item.setAttribute("value", newval);
    item.value = newval;
    var price = item.parentElement.parentElement.previousElementSibling.firstElementChild.getAttribute("value");
    item.parentElement.parentElement.nextElementSibling.textContent = (newval * price).formatNumber() + "원";
    //AJAX 업데이트 전송

    //전송 처리 결과가 성공이면
    this.reCalc();
    this.updateUI();
  },
  checkItem: function checkItem() {
    this.reCalc();
    this.updateUI();
  },
  delItem: function delItem() {
    event.target.parentElement.parentElement.parentElement.remove();
    this.reCalc();
    this.updateUI();
  }
};

// 숫자 3자리 콤마찍기
Number.prototype.formatNumber = function () {
  if (this == 0) return 0;
  var regex = /(^[+-]?\d+)(\d{3})/;
  var nstr = this + "";
  while (regex.test(nstr)) nstr = nstr.replace(regex, "$1" + "," + "$2");
  return nstr;
};

//
var acc = document.getElementsByClassName("accordion");
var i;
for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

//페이지네이션
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59798" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/detail.js"], null)
//# sourceMappingURL=/detail.975b991d.js.map