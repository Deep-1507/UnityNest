
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
import { Assigntask } from "./pages/Assigntask";
import { Taskform } from "./pages/Taskform";
import { OngoingTasksDetails } from "./pages/OngoingTasksDetails";
import { TotalTasksDetails } from "./pages/TotalTasksDetails";
import { TaskStatus } from "./pages/TaskStatus";
import { MissedTasksDetails} from "./pages/MissedTasksDetails";
import { TaskSubmission } from "./pages/TaskSubmission";
import { ReasonForm } from "./pages/ReasonForm";
import { SnackbarProvider } from 'notistack';


function App() {
 

  return (<div>

<SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/assigntask" element={<Assigntask />} />
          <Route path="/taskform" element={<Taskform />} />
          <Route path="/tasksassigned" element={<OngoingTasksDetails />} />
          <Route path="/totaltasksassigned" element={<TotalTasksDetails />} />
          <Route path="/taskstatus" element={<TaskStatus />} />
          <Route path="/missedtasks" element={<MissedTasksDetails />} />
          <Route path="/tasksubmissionform" element={<TaskSubmission />} />
          <Route path="/reasonform" element={<ReasonForm />} />
        </Routes>
      </BrowserRouter>
      </SnackbarProvider>
  </div>
  )
}

export default App
