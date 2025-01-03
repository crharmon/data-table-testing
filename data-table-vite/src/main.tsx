import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider} from 'react-router-dom'; 
import './index.css';
import App from './App.tsx';
import TestTimeline from './components/react-vis-timeline/testTimeline';

const router = createBrowserRouter([
  {
    path:'/table',
    element: <App/>,
    //errorElement: <div>404 Not Found: Unknown Transctions Page </div>
  },
  {
    path:'/time',
    element: <TestTimeline/>,
    //errorElement: <div>404 Not Found: Unknown Transctions Page </div>
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <RouterProvider router={router} /> */}
    <TestTimeline/>
  </StrictMode>,
)
