import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";

const ShowPage = () => {
  //id는 routes.js 에서 url 에 지정한 key 랑 맞춰줘야 함
  const { id } = useParams(); //useParams : url 에 있는 Id 부분을 가져올 수 있음
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPost = (id) => {
    axios.get(`http://localhost:3001/memos/${id}`).then((res) => {
      setPost(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    console.log("hello");
    getPost(id);
  }, [id]);
  //useEffect 안에 들어있는거 한번만 실행되도록 빈배열을 넣어줌 (컴포넌트가 처음 실행될때만 실행됨)
  //배열에 값(id)을 넣으면 id가 변경될때마다 useEffect 안의 함수가 실행됨 : 의존성 배열안에 id 넣기

  const printDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="d-flex">
        <h1 className="flex-grow-1"> {post.title}</h1>
        <div>
          <Link className="btn btn-primary" to={`/memos/${id}/edit`}>
            Edit
          </Link>
        </div>
      </div>
      <small className="text-muted">
        작성일 : {printDate(post.createdAt)}
      </small>
      <hr />
      <p>{post.body}</p>
    </div>
  );
};

export default ShowPage;
