import propTypes from 'prop-types'
const Card = ({ title, children, onClick }) => {
  //자식 컴포넌트에서 props 받기

  //(props) => 객체로 props 가 전달됨 : {title : 'title'} 형태 / props.title 로 꺼내 쓰면 됨
  //구조분해 : ({title}) => 바로 title 에 접근할 수 있음

  //children : 부모 컴포넌트의 Card 태그 사이에 넣은 객체들이 전달됨

  return (
    <div 
    className="card mb-3 cursor-pointer"
    onClick = {onClick}> 
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>{title}</div>
          {children && <div>{children}</div>}
        </div>
      </div>
    </div>
  );
};

Card.propTypes = { //정해진 type 외 다른 type 이 들어왔을 경우 console 을 통해 warning
    title : propTypes.string,
    children : propTypes.element,
    onClick : propTypes.func, //Card 컴포넌트에서만 onClick 이벤트 가능
};


//props 의 default 값을 설정할 수 있음
Card.defaultProps = {
    title : 'title',
    onClick: ()=> {}
};

//{children && <div>buttons</div>} : children 이 있을 경우에 보여줌
export default Card;
