import React from 'react';

const Home = (props) => {
    const { name, email } = props;

    return (
        <div className="bg-slate-700 m-8 p-4 rounded-md">
            <h1 className="text-white font-bold">Welcome, {name}!</h1>
            <p className="text-white">Email: {email}</p>
        </div>
    );
};

export default Home;