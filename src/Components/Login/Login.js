import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';

const Login = () => {

    const {signIn,googleSignIn} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit =(event)=>{
        event.preventDefault();


        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            console.log(user);
            form.reset();
            navigate('/');
        })
        .catch(error => {
            console.error(error.message);
        })

    }

    const handleGoogleBtn = () =>{
        googleSignIn()
        .then(result => {
            const user = result.user;
            navigate('/');
        })
        .catch(error =>{
            console.error(error.message);
        })

    }


    return (
        <div>
            <div className="hero min-h-screen ">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <Link to="/login" className="label-text-alt link link-hover">Forgot password?</Link>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button type='submit' className="btn btn-primary w-2/5 mx-auto bg-green-600 border-none">Log in</button>
                            </div>
                            
                        </form>
                        <button onClick={handleGoogleBtn} className="btn btn-primary bg-green-600 border-none">Google Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;