import axios from "axios";
import { useState, useEffect } from "react";

const ListPage = () => {
  //List 가 실행이 되면
  const [posts, setPosts] = useState([]); // post 값이 바뀔때마다 리랜더링이 됨. (무한반복의 가능성이 있음)

  const getPosts = () => {
    axios.get("http://localhost:3001/posts").then((res) => {
      console.log(res.data); //데이터 받아오기
      setPosts(res.data); //받아온 데이터를 state 안에 넣어주기
    });
  };
  useEffect(() => {
    getPosts(); //useEffect 는 getPost 가 한번만 실행되도록 도와줌
  }, []);

  return (
    <div>
      <h1>Blogs</h1>
      {posts.map((post) => {
        //map loop
        return (
          <div class="card mb-3" key={post.id}>
            <div class="card-body">{post.title}</div>
          </div>
          //unique key 를 넣어줘야 함
        );
      })}
    </div>
  );
};

export default ListPage;
