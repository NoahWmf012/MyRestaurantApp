import { RouterProvider } from 'react-router-dom';
import { router } from './Router';

//styles
import './App.css'
import './App.style.scss';
import './style/theme.scss';
import 'react-multi-carousel/lib/styles.css'
import './style/base/baseComponent.scss'

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
