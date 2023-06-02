//리뷰 자바스크립트를 어떻게 짜냐! 방법!
/* 인풋창에 뭘 받아! 그러고나서 그걸 변수로 정의해서 어디에 넣고 어디에 넣고 막 넣어! 어때? 할 수 있겠지? */

// TODO : input 창에 값을 받아서 가지고 오기

const reviewBtn = document.getElementById("reviewBtn");

function createReview() {
  let id = document.getElementById("id").value;
  let password = document.getElementById("password").value;
  let reviewBox = document.getElementById("reviewBox").value;
  let color = document.getElementById("color").value;
  alert("id===>>>" + id);
  alert("password===>>>" + password);
  alert("reviewBox===>>>" + reviewBox);
  alert("color===>>>" + color);

  // TODO : 받아온 값을 아래에 삽입
}
reviewBtn.addEventListener("click", createReview);

// left_top 이미지 색깔 탭메뉴
const colorTabList = document.querySelectorAll(
  ".product_color .tab_menu .list li"
);
const contents = document.querySelectorAll(".left_top .cont_area .cont");
let activeCont = ""; // 현재 활성화 된 컨텐츠 (기본:#tab1 활성화)

for (let i = 0; i < colorTabList.length; i++) {
  colorTabList[i].querySelector(".btn").addEventListener("click", function (e) {
    e.preventDefault();
    for (let j = 0; j < colorTabList.length; j++) {
      // 나머지 버튼 클래스 제거
      colorTabList[j].classList.remove("is_on");

      // 나머지 컨텐츠 display:none 처리
      contents[j].style.display = "none";
    }

    // 버튼 관련 이벤트
    this.parentNode.classList.add("is_on");

    // 버튼 클릭시 컨텐츠 전환
    activeCont = this.getAttribute("href");
    document.querySelector(activeCont).style.display = "block";
  });
}

//컬러버튼 누르면 오른쪽 텍스트 변하는 것

document.getElementById("colorTab1").addEventListener("click", function () {
  document.getElementById("colorText").innerText = "BUTTER";
});
document.getElementById("colorTab2").addEventListener("click", function () {
  document.getElementById("colorText").innerText = "PEACH";
});
document.getElementById("colorTab3").addEventListener("click", function () {
  document.getElementById("colorText").innerText = "WHITE";
});

//left_bottom 탭메뉴
const menuTabList = document.querySelectorAll(
  ".left_bottom .tab_menu .list li"
);

for (let i = 0; i < menuTabList.length; i++) {
  menuTabList[i].querySelector(".btn").addEventListener("click", function (e) {
    e.preventDefault();
    for (let j = 0; j < menuTabList.length; j++) {
      menuTabList[j].classList.remove("is_on");
    }
    this.parentNode.classList.add("is_on");
  });
}

//리뷰 시작 이거는 어떻게하는깅공
//셀렉트
// let selectColor = {};
// const color = document.getElementById('color');
// console.log(selectColor)
// selectColor.color = color.options[color.selectedIndex].value;

// document.getElementById('selectText').innerHTML =
// selectColor.color
//진짜리뷰작성-이걸하기전에 리뷰작성된거올라오는칸을만들어야할듯

//리뷰 끝

//카드혜택 팝업
document
  .getElementById("benefitOpenBtn")
  .addEventListener("click", function () {
    document.getElementById("benefitPopup").classList.remove("hidden");
  });
document
  .getElementById("benefitCloseBtn")
  .addEventListener("click", function () {
    document.getElementById("benefitPopup").classList.add("hidden");
  });

//총 상품 금액
let basket = {
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
  reCalc: function () {
    this.totalCount = 0;
    this.totalPrice = 0;
    document.querySelectorAll(".p_num").forEach(function (item) {
      if (
        item.parentElement.parentElement.parentElement.previousElementSibling
          .firstElementChild.firstElementChild.checked == true
      ) {
        let count = parseInt(item.getAttribute("value"));
        this.totalCount += count;
        let price =
          item.parentElement.parentElement.previousElementSibling.firstElementChild.getAttribute(
            "value"
          );
        this.totalPrice += count * price;
      }
    }, this); // forEach 2번째 파라메터로 객체를 넘겨서 this 가 객체리터럴을 가리키도록 함. - thisArg
  },
  //화면 업데이트
  updateUI: function () {
    document.querySelector("#sum_p_num").textContent =
      "(" + this.totalCount.formatNumber() + "개" + ")";
    document.querySelector("#sum_p_price").textContent =
      this.totalPrice.formatNumber() + "원";
  },
  //개별 수량 변경
  changePNum: function (pos) {
    let item = document.querySelector("input[name=p_num" + pos + "]");
    let p_num = parseInt(item.getAttribute("value"));
    let newval = event.target.classList.contains("up")
      ? p_num + 1
      : event.target.classList.contains("down")
      ? p_num - 1
      : event.target.value;

    if (parseInt(newval) < 1 || parseInt(newval) > 99) {
      return false;
    }

    item.setAttribute("value", newval);
    item.value = newval;

    let price =
      item.parentElement.parentElement.previousElementSibling.firstElementChild.getAttribute(
        "value"
      );
    item.parentElement.parentElement.nextElementSibling.textContent =
      (newval * price).formatNumber() + "원";
    //AJAX 업데이트 전송

    //전송 처리 결과가 성공이면
    this.reCalc();
    this.updateUI();
  },
  checkItem: function () {
    this.reCalc();
    this.updateUI();
  },
  delItem: function () {
    event.target.parentElement.parentElement.parentElement.remove();
    this.reCalc();
    this.updateUI();
  },
};

// 숫자 3자리 콤마찍기
Number.prototype.formatNumber = function () {
  if (this == 0) return 0;
  let regex = /(^[+-]?\d+)(\d{3})/;
  let nstr = this + "";
  while (regex.test(nstr)) nstr = nstr.replace(regex, "$1" + "," + "$2");
  return nstr;
};

//
let acc = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

//페이지네이션
