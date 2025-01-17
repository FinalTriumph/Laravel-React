import './bootstrap';
import '../css/app.css';

import ReactDOM from 'react-dom/client';
import Welcome from './pages/Welcome';
import Home from './pages/Home';

const welcome = document.getElementById('welcome');
if (welcome) {
    ReactDOM.createRoot(welcome).render(<Welcome />);
}

const home = document.getElementById('home');
if (home) {
    const props = Object.assign({}, home.dataset);

    ReactDOM.createRoot(home).render(<Home {...props} />)
}