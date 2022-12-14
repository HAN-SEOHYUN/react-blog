import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router';
import LoadingSpinner from "../components/LoadingSpinner";

const ListPage = () => {
  //List 가 실행이 되면
  const history = useHistory(); //history push 가능
  const [posts, setPosts] = useState([]); // post 값이 바뀔때마다 리랜더링이 됨. (무한반복의 가능성이 있음)
  const [loading, setLoading] = useState(true);

  const getPosts = () => {
    axios.get("http://localhost:3001/posts").then((res) => {
      console.log(res.data); //데이터 받아오기
      setPosts(res.data); //받아온 데이터를 state 안에 넣어주기
      setLoading(false); //로딩이 완료되면 false 로 변경
    });
  };

  const deleteBlog = (e, id)=>{
    e.stopPropagation(); //퍼지는 것을 막아주셈
    console.log('delete blog'); // 콘솔 로그만 잘 찍힘
    axios.delete(`http://localhost:3001/posts/${id}`).then(()=>{
      setPosts(prevPosts => { //삭제된 post 는 리스트에서 업데이트 시켜서 없애주는 작업
        //기존에 있던 POST 들의 정보를 filter 함수를 통해 걸러준다. 
        //post 가 삭제하려는 id 와 같지 않을 경우에만 남겨둔다. 
        return prevPosts.filter(post => {
          return post.id !== id;
        })
      })
    });
  }

  useEffect(() => {
    getPosts(); //useEffect 는 getPost 가 한번만 실행되도록 도와줌
  }, []);

const renderBlogList = () =>{
  if(loading) { //만약 로딩이 있으면 spinner 를 보여줘라
    return (
      <LoadingSpinner/>
    );
  }

  if(posts.length === 0) { //post 가 없다면 문구를 보여줘라
    return (<div>No blog posts found</div>)
  }

  return posts.map((post) => { //post 의 길이가 0보다 클 경우에만 map 함수 실행
    //post 데이터는 ListPage 에서는 확인가능 하지만,
    //자식 컴포넌트 Card 는 확인할 수 없다. 따라서 props 를 사용 !
    //map loop
    return (
      <Card 
      key={post.id} 
      title={post.title} 
      onClick={()=>history.push('/blogs/edit')} 
      >
      <div>
        <button 
          className = "btn btn-danger btn-sm"
          //onClick= {()=>console.log('delete')} //이벤트 버블링 발생 : 로그 찍히고 edit page 로 이동됨
          onClick= { (e) => deleteBlog (e, post.id) } //post id 를 함수로 넘겨주기
          >
          Delete
        </button>
      </div>
      </Card>
      //props : 자식 컴포넌트에 넘기고싶은 이름은 속성으로 적고, 넘길 데이터를 {} 안에 넣어준다.
      //Card 태그에 직접 onClick 을 사용할 수 없다. 직접 CArd 컴포넌트에 들어가서 이벤트를 걸어줘야 함 (그래서 props 로 전달)
      );
  })
};

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
      {renderBlogList()}
    </div>
  );
};

export default ListPage;
