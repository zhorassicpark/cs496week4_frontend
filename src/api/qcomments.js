// 질문댓글 조작과 관련된 CRUD API 함수 파일
import { instance } from "./index";

// 질문댓글 목록을 조회하는 API
function fetchQComments() {
  return instance.get("qcomment/list");
}

// 특정 질문댓글을 조회하는 API
function fetchQComment(aCommentId) {
  return instance.get(`qcomment/${aCommentId}`);
}

// 유저의 질문댓글 목록을 조회하는 API
function fetchUsersQComments(userId) {
  return instance.get(`qcomment/list/user/${userId}`);
}

// 질문에 대한 질문댓글 목록을 조회하는 API
function fetchQuestionsQComments(questionId) {
  return instance.get(`qcomment/list/question/${questionId}`);
}

// 질문댓글 데이터를 생성하는 API
function createQComment(qCommentData) {
  return instance.post("qcomment", qCommentData);
}

// 질문댓글 데이터를 삭제하는 API
function deleteQComment(qCommentId) {
  return instance.delete(`qcomment/${qCommentId}`);
}

// 질문댓글 데이터를 수정하는 API
function editQComment(qCommentId, qCommentData) {
  return instance.put(`qcomment/${qCommentId}`, qCommentData);
}

export {
  fetchQComments,
  fetchQComment,
  fetchQuestionsQComments,
  fetchUsersQComments,
  createQComment,
  deleteQComment,
  editQComment,
};
