import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider} from 'react-router-dom'; 
import './index.css';

import App from './App';
import TestTimeline from './components/react-vis-timeline/testTimeline';
import React from 'react';

const router = createBrowserRouter([
  {
    path:'/time',
    element: <TestTimeline/>,
    //errorElement: <div>404 Not Found: Unknown Transctions Page </div>
  },
  {
    path:'/app',
    element: <App/>,
    //errorElement: <div>404 Not Found: Unknown Transctions Page </div>
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
