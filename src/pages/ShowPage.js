import {useParams, useHistory} from 'react-router';
import axios from 'axios';
import { useEffect,useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

const ShowPage = () => {
    //id는 routes.js 에서 url 에 지정한 key 랑 맞춰줘야 함
    const {id} = useParams (); //useParams : url 에 있는 Id 부분을 가져올 수 있음
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const history = useHistory();


    const getPost = (id) => {
        axios.get(`http://localhost:3001/posts/${id}`).then((res)=>{
            setPost(res.data);
            setLoading(false);
        })
    };

    useEffect (() => {
        console.log('hello');
        getPost(id)
    },[id]) 
    //useEffect 안에 들어있는거 한번만 실행되도록 빈배열을 넣어줌 (컴포넌트가 처음 실행될때만 실행됨)
    //배열에 값(id)을 넣으면 id가 변경될때마다 useEffect 안의 함수가 실행됨 : 의존성 배열안에 id 넣기

    if(loading){
        return <LoadingSpinner/>
    }

    return(
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <button onClick={()=> history.push('/blogs/3')}>click</button>
        </div>
    );
};

export default ShowPage;