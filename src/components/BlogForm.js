import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router";
import { bool } from "prop-types";

const BlogForm = ({editing}) => { //EditPage 에서 editing props 를 받아옴
  const history = useHistory();
  const {id} = useParams();

  const [title, setTitle] = useState("");
  const [body, setBody ] = useState(""); 

  const [originalTitle, setOriginalTitle ] = useState(""); 
  const [originalBody, setOriginalBody ] = useState(""); 

  useEffect(()=>{ //수정할 텍스트 화면에 뿌리기
    if(editing){ //editing 의 경우만 요청을 보내기 (create 할 때는 요청 못보냄 {보낼 요청이 없삼})
      axios.get(`http://localhost:3001/memos/${id}`).then(res => { 
        //수정페이지를 열었을 때 처음에는 title = originalTitle
        //그치만 from 에서 수정을 하고나면 state 가 변경되어 title, body 는 달라지게 된다. 
        setTitle(res.data.title);
        setOriginalTitle(res.data.title);
        setBody(res.data.body);
        setOriginalBody(res.data.body);
      })
    }
  }, [id,editing]);

  const isEdited = () =>{
    return title !== originalTitle || body !== originalBody //둘 중 하나라도 변경되면 return true
  }

  const goBack = () => {
    if(editing){
      history.push(`/memos/${id}`);
    }else{
      history.push(`/memos`);
    }
  };

  const onSubmit = () => {
    if(editing) {
      axios.patch(`http://localhost:3001/memos/${id}`, {
        title: title,
        body: body,
      }).then((res)=>{
        history.push(`/memos/${id}`)
      })
    }else{
    axios
      .post("http://localhost:3001/memos", {
        title: title,
        body: body,
        createdAt: Date.now(), // Date.now() : js 에서 시간을 가져오기
      })
      .then(() => {
        history.push("/memos");
      });
    }
  };

  return (
    <div>
      <h1>{editing ? 'Edit' : 'Create'} memo</h1>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value); //수정사항이 생기면 title != originalTitle 이 됨
          }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Body</label>
        <textarea
          className="form-control"
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
          }}
          rows={15}
        />
      </div>
      <button  //수정버튼
      className="btn btn-primary" 
      onClick={onSubmit}
      disabled = {editing && !isEdited() } //post 가 아니라 edit 페이지이고 && edit 이 되지 않은 경우에만 비활성화
      >
        {editing ? 'Edit' : 'Post'} 
      </button>

      <button //뒤로가기 버튼 (detail Page)
      className="btn btn-danger ms-2"
      onClick={goBack}>
        Cancle
      </button>
    </div>
  );
};

BlogForm.propTypes = {
  editing : bool
} 

BlogForm.defaultProps = {
  editing: false
}

export default BlogForm;
