import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router";
import { bool } from "prop-types";

const BlogForm = ({editing}) => {
  const history = useHistory();
  const {id} = useParams();

  const [title, setTitle] = useState("");
  const [body, setBody ] = useState("");


  useEffect(()=>{ //수정할 텍스트 화면에 뿌리기
    axios.get(`http://localhost:3001/posts/${id}`).then(res => {
      setTitle(res.data.title);
      setBody(res.data.body);
    })
  }, [id]);

  const onSubmit = () => {
    axios
      .post("http://localhost:3001/posts", {
        title: title,
        body: body,
        createdAt: Date.now(), // Date.now() : js 에서 시간을 가져오기
      })
      .then(() => {
        history.push("/blogs");
      });
  };

  return (
    <div>
      <h1>{editing ? 'Edit' : 'Create'} a Blog Post</h1>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
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
      <button className="btn btn-primary" onClick={onSubmit}>
        {editing ? 'Edit' : 'Post'} 
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
