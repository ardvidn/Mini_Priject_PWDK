'use client';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import axios from 'axios';

const apiLogin = 'http://localhost:8000/api/auth/signin';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();
  const userLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios
        .post(apiLogin, loginData, {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));

      if (res.success === true) {
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
          <h2 className="text-center text-xl font-bold mb-6">Login</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              // onClick={handleLogin}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
