import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import ListPage from "./pages/ListPage";

const routes =[ //새로운 페이지는 배열로 추가
  {
    path:'/',
    component: HomePage
  },
  {
    path:'/blogs',
    component: ListPage
  },
  {
    path:'/blogs/create',
    component: CreatePage
  },
  {
    path:'/blogs/edit',
    component: EditPage
  },
];

export default routes;


//app.js
// <Route path="/" exact>
//             <HomePage />
//           </Route>,
//           <Route path="/blogs" exact>
//             <ListPage />
//           </Route>,
//           <Route path="/blogs/create" exact>
//             <CreatePage />
//           </Route>,
//           <Route path="/blogs/edit" exact>
//             <EditPage />
//           </Route>