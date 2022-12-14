import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import {Link} from 'react-router-dom'

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
      <div className="d-flex justify-content-between"> 
        <h1>Blogs</h1>
        <Link 
        to="/blogs/create" 
        className="btn btn-success mb-2"
        > 
        Create New 
        </Link>
      </div>
      {posts.map((post) => {
        //post 데이터는 ListPage 에서는 확인가능 하지만,
        //자식 컴포넌트 Card 는 확인할 수 없다. 따라서 props 를 사용 !
        //map loop
        return (
          <Card 
          key={post.id} 
          titile={post.titile} 
          onClick={()=>{console.log('클릭')}}
          />
          //props : 자식 컴포넌트에 넘기고싶은 이름은 속성으로 적고, 넘길 데이터를 {} 안에 넣어준다.
          //Card 태그에 직접 onClick 을 사용할 수 없다. 직접 CArd 컴포넌트에 들어가서 이벤트를 걸어줘야 함 (그래서 props 로 전달)
          );
      })}
    </div>
  );
};

export default ListPage;
