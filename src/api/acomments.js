// 질문댓글 조작과 관련된 CRUD API 함수 파일
import { instance } from "./index";

// 질문댓글 목록을 조회하는 API
function fetchAComments() {
  return instance.get("acomment/list");
}

// 특정 질문댓글을 조회하는 API
function fetchAComment(aCommentId) {
  return instance.get(`acomment/${aCommentId}`);
}

// 유저의 질문댓글 목록을 조회하는 API
function fetchUsersAComments(userId) {
  return instance.get(`acomment/list/user/${userId}`);
}

// 질문에 대한 질문댓글 목록을 조회하는 API
function fetchAnswersAComments(answerId) {
  return instance.get(`acomment/list/answer/${answerId}`);
}

// 질문댓글 데이터를 생성하는 API
function createAComment(aCommentData) {
  return instance.post("acomment", aCommentData);
}

// 질문댓글 데이터를 삭제하는 API
function deleteAComment(aCommentId) {
  return instance.delete(`acomment/${aCommentId}`);
}

// 질문댓글 데이터를 수정하는 API
function editAComment(aCommentId, aCommentData) {
  return instance.put(`acomment/${aCommentId}`, aCommentData);
}

export {
  fetchAComments,
  fetchAComment,
  fetchAnswersAComments,
  fetchUsersAComments,
  createAComment,
  deleteAComment,
  editAComment,
};
