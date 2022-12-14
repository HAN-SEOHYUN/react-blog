const Card = ({title}) =>{ //자식 컴포넌트에서 props 받기
    //(props) => 객체로 props 가 전달됨 : {title : 'title'} 형태 / props.title 로 꺼내 쓰면 됨
    //구조분해 : ({title}) => 바로 title 에 접근할 수 있음

    return (
        <div className="card mb-3">
        <div className="card-body">
            {title}
        </div>
      </div>
    );
};

export default Card;