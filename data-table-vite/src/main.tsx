import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider} from 'react-router-dom'; 
import './index.css';
import App from './App.tsx';

const router = createBrowserRouter([
  {
    path:'/:uiname',
    element: <App/>,
    errorElement: <div>404 Not Found: Unknown Transctions Page </div>
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
