import axios from "axios";
import { useState, useEffect } from "react";
import Card from '../components/Card';

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
      {posts.map((post) => { //post 데이터는 ListPage 에서는 확인가능하지만, 
      //자식 컴포넌트 Card 는 확인할 수 없다. 따라서 props 를 사용 !
        //map loop
        return (
            <Card key={post.id} title={post.title}/> 
            //props : 자식 컴포넌트에 넘기고싶은 이름은 속성으로 적고, 넘길 데이터를 {} 안에 넣어준다.
            
        );
      })}
    </div>
  );
};

export default ListPage;
