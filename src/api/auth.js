// 로그인, 회원 가입, (ex) 회원 탈퇴
import { instance } from "./index";

// 회원가입 API
function registerUser(userData) {
  return instance.post("user", userData);
}

// 로그인 API
function loginUser(userData) {
  return instance.put("user", userData);
}

// 로그아웃 API
function logoutUserAPI(userId) {
  console.log("userId");
  console.log(userId);
  return instance.put(`user/${userId}/logout`);
}

export { registerUser, loginUser, logoutUserAPI };
