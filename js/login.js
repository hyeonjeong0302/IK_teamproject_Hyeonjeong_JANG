const loginId = document.getElementById("login_email");
const loginPw = document.getElementById("login_pw");
const loginBtn = document.getElementById("login_btn");

loginId.addEventListener("keyup", color);
loginPw.addEventListener("keyup", color);
loginBtn.addEventListener("click", validationChk);

// 유효성 검사
// 1. ID에 Email 유효성 검사 넣기
// 2. PW가 5글자 이상
function validationChk() {
  let id = document.getElementById("login_email");
  let pw = document.getElementById("login_pw");

  // 이메일 유효성 검사
  let idChk = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

  if (id.value == "") {
    alert("아이디를 입력하세요.");
    id.focus();
    return false;
  }

  if (pw.value == "") {
    alert("비밀번호를 입력하세요.");
    pw.focus();
    return false;
  }

  // alert(idChk.test(id.value));

  if (idChk.test(id.value) == false) {
    alert("이메일형식이 올바르지 않습니다.");
    id.focus();
    return false;
  } else { // idChk.test(id.value) == true
    let setId = ["green@gmail.com", "green@naver.com", "green@hanmail.net"];
    // let setId = "green@gmail.com"
    let setPw = "green1234"


    /**
     * id = green@gmail.com
     * setId = ["green@gmail.com", "green@naver.com", "green@hanmail.net"]
     * 
     * for (let i = 0; i<setId.length; i++) {
      if(id.value == setId[i]) {
        moveToMain();
        alert(" 찾았다!! ");
      } 
     * 
     */

    for (let i = 0; i < setId.length; i++) {
      // alert(setId[i]);
      if (id.value == setId[i]) {
        if (pw.value == setPw) {
          moveToMain();
        } else {
          pw.value = "";
          alert("아이디와 비밀번호를 확인하세요.");
        }
      }
    }

    // for (let i = 0; i<setId.length; i++) {
    //   console.log(i + " : " + setId[i]);
    //   if(id.value == setId[i] && pw.value == setPw) {  // id와 pw가 맞을 때
    //     moveToMain();
    //   } else {  // id와 pw가 맞지 않을 때
    //     pw.value = "";  
    //     // alert("아이디와 비밀번호를 확인하세요.");
    //   }
    // }
  }

  // console.log(id);
  // console.log(pw);


}

function color() {
  if (
    loginId.value.length > 0 &&
    loginId.value.indexOf("@") !== -1 &&
    loginPw.value.length >= 5
  ) {
    loginBtn.style.backgroundColor = "#FD8234";
    loginBtn.disabled = false;
  } else {
    loginBtn.style.backgroundColor = "#9a9a9a";
    loginBtn.disabled = true;
  }
}

// 로그인 후 메인 화면으로 가는 기능
function moveToMain() {
  location.replace("./index.html");
}