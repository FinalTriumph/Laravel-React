## Laravel practice project

**Main steps and terminal commands used to create project (on Linux Ubuntu).**

***This is not meant to be documentation or precise and detailed instructions, it's only to show some of the thought process and make notes for myself.***

This project is built by starting with replicating https://github.com/FinalTriumph/Laravel-Simple-Auth (while also testing it once more).

Install React and ReactDOM:
```
npm install react react-dom
```
And Vite plugin for React:
```
npm install @vitejs/plugin-react
```

Then in `/resources/js` create new folder `pages` and `Welcome.jsx` file in it, with content like this:
```
import React from 'react';

const Welcome = () => {
    return (
        <div className="bg-slate-700 m-8 p-4 rounded-md">
            <h1 className="text-white font-bold">Welcome, Guest!</h1>
        </div>
    );
};

export default Welcome;
```

Then rename `/resources/js/app.js` to `/resources/js/app.jsx` and change file content to this:
```
import './bootstrap';
import '../css/app.css';

import ReactDOM from 'react-dom/client';
import Welcome from './pages/Welcome.jsx';

ReactDOM.createRoot(document.getElementById('welcome')).render(<Welcome />);
```

Now need to make adjustments in `vite.config.js` to use React, can make it look like this:
```
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.jsx'],
        }),
        react(),
    ],
});
```

Then can go to `/resources/views/welcome.blade.php` and add:
```
<div id="welcome"></div>
```
While also making couple other adjustments, to make it look like this:
```
<x-layout>
    <div class="h-screen flex flex-col items-center justify-center">
        <div id="welcome"></div>
        <div>
            <a href="{{ route('register') }}" class="btn-action">Register</a>
            <a href="{{ route('login') }}" class="btn-action">Login</a>
        </div>
    </div>
</x-layout>
```

Also need to make couple changes in `/resources/views/components/layout.blade.php`, replacing `@vite(['resources/css/app.css', 'resources/js/app.js'])` with:
```
@viteReactRefresh
@vite('resources/js/app.jsx')
```

Now can start dev server and test if everything works.
And I notice something weird related to using Tailwind in `/resources/js/pages/Welcome.jsx`, so I'm adding also this in `tailwind.config.js`:
```
'./resources/**/*.jsx'
```
And now looks like everything works properly.

Next create `Home.jsx` in `resources/js/pages`:
```
import React from 'react';

const Home = () => {
    return (
        <div className="bg-slate-700 m-8 p-4 rounded-md">
            <h1 className="text-white font-bold">Welcome, User!</h1>
        </div>
    );
};

export default Home;
```

Then adjust `/resources/js/app.jsx` to look like this:
```
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
    ReactDOM.createRoot(home).render(<Home />)
}
```

Then in `/resources/views/home.blade.php` add `<div id="home"></div>` like in `/resources/views/welcome.blade.php`.

Now can try to login and test if everything will work properly.

Next, to pass props from Blade view to React, can start by adjusting `<div id="home"></div>` in `/resources/js/pages/Home.jsx` to look like this:
```
<div id="home" data-name="{{ auth()->user()->name }}"></div>
```
And, in `/resources/js/app.jsx`, part which renders home page, to look like this:
```
const home = document.getElementById('home');
if (home) {
    const props = Object.assign({}, home.dataset);

    ReactDOM.createRoot(home).render(<Home {...props} />)
}
```
Then adjust `/resources/js/pages/Home.jsx` to look like this:
```
import React from 'react';

const Home = (props) => {
    const { name } = props;

    return (
        <div className="bg-slate-700 m-8 p-4 rounded-md">
            <h1 className="text-white font-bold">Welcome, {name}!</h1>
        </div>
    );
};

export default Home;
```

And in the same way can pass `email` and show it with React instead of Blade.

Now can test again if everything works properly. And for this project that's all, as it's meant to just make some notes about basic things when setting up React with Laravel.
