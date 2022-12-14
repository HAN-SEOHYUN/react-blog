import BlogForm from "../components/BlogForm";

const EditPage = () => {
    return(
        <div>
            <BlogForm editing ={true}/> 
        </div>
    );
};
//BlogForm 이 edit 페이지 인것을 인지할 수 있도록 props 로 editing:Bool 을 넘겨줌
export default EditPage; 