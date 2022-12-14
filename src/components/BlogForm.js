import { useState } from "react";
import axios from "axios";
import {useHistory} from 'react-router'

const BlogForm = () => {
    const history = useHistory();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const onSubmit = () => {
      console.log(title, body);
      axios.post("http://localhost:3001/posts", { 
        title: title,
        body: body,
        createdAt : Date.now() // Date.now() : js 에서 시간을 가져오기
      }).then(()=>{
        history.push('/blogs');
      })
    };

  return (
    <div>
      <h1>Create a Blog Post</h1>
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
          rows={20}
        />
      </div>
      <button className="btn btn-primary" onClick={onSubmit}>
        Post
      </button>
    </div>
  );
};

export default BlogForm;
