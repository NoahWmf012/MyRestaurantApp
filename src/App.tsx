import { RouterProvider } from 'react-router-dom';
import { router } from './Router';

//styles
import './App.css';
import './style/theme.scss';
import 'react-multi-carousel/lib/styles.css'
import './style/base/baseComponent.scss'

// Bootstrap JavaScript
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
