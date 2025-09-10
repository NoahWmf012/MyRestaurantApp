import { RouterProvider } from 'react-router-dom';
import { router } from './Router';

//styles
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/theme.scss';

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
