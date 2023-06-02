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
})({"js/join.js":[function(require,module,exports) {
document.addEventListener("DOMContentLoaded", function () {
  var userEmail = document.getElementById("user_email");
  var domain = document.getElementById("domain-txt");
  var userPw1 = document.getElementById("user_pw1");
  var userPw2 = document.getElementById("user_pw2");
  var userName = document.getElementById("user_name");
  var telSecond = document.getElementById("tel_second");
  var telThird = document.getElementById("tel_third");

  // Button
  var pwBtn = document.getElementById("pw_btn");
  var joinBtn = document.getElementById("join_btn");

  // userId.addEventListener('change', checkId)
  userPw1.addEventListener("change", checkPw);
  pwBtn.addEventListener("click", comparePw);
  telSecond.addEventListener("keyup", moveTel);
  joinBtn.addEventListener("click", validationChk);

  /*        function checkId() {
                 if (userId.value.length < 5 || userId.value.length > 16) {
                 alert('사용할 수 없는 아이디입니다. 5~16자로 입력해 주세요.')
                 userId.value = ''
                 userId.focus()
               }
             } //checkId() */
  // email_start
  var domainListEl = document.querySelector("#domain-list");
  var domainInputEl = document.querySelector("#domain-txt");
  domainListEl.addEventListener("change", function (event) {
    if (event.target.value !== "type") {
      domainInputEl.value = event.target.value;
      domainInputEl.disabled = true;
    } else {
      domainInputEl.value = "";
      domainInputEl.disabled = false;
    }
  });
  // email_end

  function validationChk() {
    // 이메일 유효성 검사
    //TODO 직접입력 유효성 검사 . 이후 알파벳 추가
    var idChk = /^[A-Za-z0-9_\.\-]/;
    var domainChk = /^[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (userEmail.value == "") {
      alert("이메일을 입력하세요.");
      userEmail.focus();
      return false;
    }
    if (domain.value == "") {
      alert("이메일을 입력하세요.");
      domain.focus();
      return false;
    }
    if (userPw1.value == "") {
      alert("비밀번호를 입력하세요.");
      userPw1.focus();
      return false;
    }
    if (userPw2.value == "") {
      alert("비밀번호를 입력하세요.");
      userPw2.focus();
      return false;
    }
    if (userName.value == "") {
      alert("이름을 입력하세요.");
      userName.focus();
      return false;
    }
    if (telSecond.value == "") {
      alert("전화번호를 입력하세요.");
      telSecond.focus();
      return false;
    }
    if (telThird.value == "") {
      alert("전화번호를 입력하세요.");
      telThird.focus();
      return false;
    }
    if (idChk.test(userEmail.value) == false) {
      alert("이메일형식이 올바르지 않습니다.");
      userEmail.focus();
      return false;
    }
    if (domainChk.test(domain.value) == false) {
      alert("이메일형식이 올바르지 않습니다.");
      userEmail.focus();
      return false;
    }
    if (userPw1.value.length < 4) {
      alert("사용할 수 없는 비밀번호입니다. 4자 이상 입력해 주세요.");
      userPw1.focus();
      return false;
    }
    moveToConfirm();
  }

  // password_start
  function checkPw() {
    if (userPw1.value.length < 4) {
      alert("사용할 수 없는 비밀번호입니다. 4자 이상 입력해 주세요.");
      userPw1.select();
    }
  } //checkPw()

  function comparePw() {
    if (userPw1.value == "") {
      alert("비밀번호를 입력하세요.");
      userPw1.value = "";
      userPw1.focus();
      return false;
    }
    if (userPw2.value == "") {
      alert("비밀번호를 입력하세요.");
      userPw2.value = "";
      userPw2.focus();
      return false;
    }
    if (userPw1.value.length < 4) {
      alert("사용할 수 없는 비밀번호입니다. 4자 이상 입력해 주세요.");
      userPw1.value = "";
      userPw1.focus();
      return false;
    }
    if (userPw1.value !== userPw2.value) {
      alert("비밀번호가 일치하지 않습니다.");
      userPw1.value = "";
      userPw2.value = "";
    } else {
      alert("사용 가능한 비밀번호입니다.");
      // TODO : 수정 불가하게 disable
    }
  } //comparePw()
  // password_end

  //birth_info_start
  var birthYearEl = document.querySelector("#birth-year");
  isYearOptionExisted = false;
  birthYearEl.addEventListener("focus", function () {
    if (!isYearOptionExisted) {
      isYearOptionExisted = true;
      for (var i = 1940; i <= 2022; i++) {
        var _YearOption = document.createElement("option");
        _YearOption.setAttribute("value", i);
        _YearOption.innerText = i;
        this.appendChild(_YearOption);
      }
    }
  });
  var birthMonthEl = document.querySelector("#birth-month");
  isMonthOptionExisted = false;
  birthMonthEl.addEventListener("focus", function () {
    if (!isMonthOptionExisted) {
      isMonthOptionExisted = true;
      for (var i = 1; i <= 12; i++) {
        var MonthOption = document.createElement("option");
        MonthOption.setAttribute("value", i);
        MonthOption.innerText = i;
        this.appendChild(MonthOption);
      }
    }
  });
  var birthDayEl = document.querySelector("#birth-day");
  isDayOptionExisted = false;
  birthDayEl.addEventListener("focus", function () {
    if (!isDayOptionExisted) {
      isDayOptionExisted = true;
      for (var i = 1; i <= 31; i++) {
        var DayOption = document.createElement("option");
        DayOption.setAttribute("value", i);
        DayOption.innerText = i;
        this.appendChild(DayOption);
      }
    }
  });
  YearOption.setAttribute("value", i);
  var selectedYearEl = document.querySelector("#print-date");
  birthYearEl.addEventListener("change", function (event) {
    selectedYearEl.textContent = "Year of birth : ".concat(event.target.value);
  });
  var selectedMonthEl = document.querySelector("#print-date");
  birthMonthEl.addEventListener("change", function (event) {
    selectedMonthEl.textContent = "Month of birth : ".concat(event.target.value);
  });
  var selectedDayEl = document.querySelector("#print-date");
  birthDayEl.addEventListener("change", function (event) {
    selectedDayEl.textContent = "Day of birth : ".concat(event.target.value);
  });
  //birth_info_end
  function moveTel() {
    if (telSecond.value.length >= 4) {
      telThird.focus();
    }
  } //moveTel()
});

function sample4_execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function oncomplete(data) {
      var roadAddr = data.roadAddress;
      var extraRoadAddr = "";
      if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
        extraRoadAddr += data.bname;
      }
      if (data.buildingName !== "" && data.apartment === "Y") {
        extraRoadAddr += extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
      }
      if (extraRoadAddr !== "") {
        extraRoadAddr = " (" + extraRoadAddr + ")";
      }
      document.getElementById("sample4_postcode").value = data.zonecode;
      document.getElementById("sample4_roadAddress").value = roadAddr;
      document.getElementById("sample4_jibunAddress").value = data.jibunAddress;
      if (roadAddr !== "") {
        document.getElementById("sample4_extraAddress").value = extraRoadAddr;
      } else {
        document.getElementById("sample4_extraAddress").value = "";
      }
      var guideTextBox = document.getElementById("guide");
      if (data.autoRoadAddress) {
        var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
        guideTextBox.innerHTML = "(예상 도로명 주소 : " + expRoadAddr + ")";
        guideTextBox.style.display = "block";
      } else if (data.autoJibunAddress) {
        var expJibunAddr = data.autoJibunAddress;
        guideTextBox.innerHTML = "(예상 지번 주소 : " + expJibunAddr + ")";
        guideTextBox.style.display = "block";
      } else {
        guideTextBox.innerHTML = "";
        guideTextBox.style.display = "none";
      }
    }
  }).open();
}
function moveToConfirm() {
  location.replace("./join_check.html");
}
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/join.js"], null)
//# sourceMappingURL=/join.1d1a63ac.js.map