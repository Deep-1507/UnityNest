
import './App.css'
import { Home } from './pages/Home'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { Assigntask} from "./pages/Assigntask";
import { Taskform} from "./pages/Taskform";
import { TaskDetails} from "./pages/TaskDetails";



function App() {
 

  return (<div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/assigntask" element={<Assigntask />} />
          <Route path="/taskform" element={<Taskform />} />
          <Route path="/tasksassigned" element={<TaskDetails />} />
        </Routes>
      </BrowserRouter>
  </div>
  )
}

export default App
