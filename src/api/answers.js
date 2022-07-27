// 답변 조작과 관련된 CRUD API 함수 파일
import { instance } from "./index";

// 답변 목록을 조회하는 API
function fetchAnswers() {
  return instance.get("answer/list");
}

// 특정 답변을 조회하는 API
function fetchAnswer(answerId) {
  return instance.get(`answer/${answerId}`);
}

// 유저의 답변 목록을 조회하는 API
function fetchUsersAnswers(userId) {
  return instance.get(`answer/list/user/${userId}`);
}

// 질문에 대한 답변 목록을 조회하는 API
function fetchQuestionsAnswers(questionId) {
  return instance.get(`answer/list/question/${questionId}`);
}

// 답변 데이터를 생성하는 API
function createAnswer(answerData) {
  return instance.post("answer", answerData);
}

// 답변 데이터를 삭제하는 API
function deleteAnswer(answerId) {
  return instance.delete(`answer/${answerId}`);
}

// 답변 데이터를 수정하는 API
function editAnswer(answerId, answerData) {
  return instance.put(`answer/${answerId}`, answerData);
}

export {
  fetchAnswers,
  fetchAnswer,
  fetchQuestionsAnswers,
  fetchUsersAnswers,
  createAnswer,
  deleteAnswer,
  editAnswer,
};
