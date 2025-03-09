import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Admin from "../layout/admin";
import User from "../layout/user";
import Players from "../pages/admin/Players";
import PlayerStats from "../pages/admin/PlayerStats";
import TournementSummary from "../pages/admin/TournementSummary";
import UserPlayer from "../pages/user/UserPlayer";
import SelectYourTeam from "../pages/user/SelectYourTeam";
import Team from "../pages/user/Team";
import Budget from "../pages/user/Budget";
import Leaderboard from "../pages/user/Leaderboard";
import StartChatbot from "../pages/ChatBot";

// Import the PrivateRoute component
import PrivateRoute from "../components/PrivateRoute";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path:"/admin",
    element: (
      <PrivateRoute requiredRole="admin">
        <Admin/>
      </PrivateRoute>
    ),
    children:[
      {
        path:"",
        element:<Players/>
      },
      {
        path:"players",
        element:<Players/>
      },
      {
        path:"playerStats",
        element:<PlayerStats/>
      },
      {
        path:"summary",
        element:<TournementSummary/>
      }
    ]
  },
  {
    path:"/user",
    element: (
      <PrivateRoute requiredRole="user">
        <User/>
      </PrivateRoute>
    ),
    children:[
      {
        path:"",
        element:<UserPlayer/>
      },
      {
        path:"players",
        element:<UserPlayer/>
      },
      {
        path:"yourteam",
        element:<SelectYourTeam/>
      },
      {
        path:"team",
        element:<Team/>
      },
      {
        path:"budget",
        element:<Budget/>
      },
      {
        path:"leaderboard",
        element:<Leaderboard/>
      },
      {
        path:"sprinter",
        element:<StartChatbot/>
      }
    ]
  }
]);

export default Router;