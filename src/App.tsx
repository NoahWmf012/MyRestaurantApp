import { RouterProvider } from 'react-router-dom';
import { router } from './Router';

//styles
import './App.css'
import './style/theme.scss'
import './style/utils.scss'
import './style/base/baseComponent.scss'
import 'react-multi-carousel/lib/styles.css'

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
