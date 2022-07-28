// 질문 조작과 관련된 CRUD API 함수 파일
import { instance } from "./index";

// 질문 목록을 조회하는 API
function fetchQuestions() {
  return instance.get("question/list");
}

// 특정 질문을 조회하는 API
function fetchQuestion(questionId) {
  return instance.get(`question/${questionId}`);
}

// 특정 검색어를 포함하는 질문을 조회하는 API
function fetchQuestionWithSearchWord(searchWord) {
  return instance.get(`question/list/search/${searchWord}`);
}

// 질문 데이터를 생성하는 API
function createQuestion(questionData) {
  return instance.post("question", questionData);
}

// 질문 데이터를 삭제하는 API
function deleteQuestion(questionId) {
  return instance.delete(`question/${questionId}`);
}

// 질문 데이터를 수정하는 API
function editQuestion(questionId, questionData) {
  return instance.put(`question/${questionId}`, questionData);
}

export {
  fetchQuestions,
  fetchQuestionWithSearchWord,
  fetchQuestion,
  createQuestion,
  deleteQuestion,
  editQuestion,
};
