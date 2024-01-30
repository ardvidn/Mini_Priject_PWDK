'use client';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import axios from 'axios';

const apiSignup = 'http://localhost:8000/api/auth/signup';

const Signup = () => {
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    username: '',
    referralcode: '',
    phone_num: '',
  });

  const router = useRouter();
  const userSignup = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios
        .post(apiSignup, signupData, {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));

      if (res.code === 200) {
        router.push('/login');
        router.refresh();
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
        <form onSubmit={userSignup}>
          <h2 className="text-center text-xl font-bold mb-6">Sign Up</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              User Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              name="username"
              type="text"
              placeholder="User Name"
              required
              value={signupData.username}
              onChange={(e) =>
                setSignupData({ ...signupData, username: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="Email Address"
              required
              value={signupData.email}
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
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
              required
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="referralCode"
            >
              Referral Code
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="referralCode"
              name="referralCode"
              type="text"
              placeholder="Referral Code"
              value={signupData.referralcode}
              onChange={(e) =>
                setSignupData({ ...signupData, referralcode: e.target.value })
              }
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone_num"
            >
              Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone_num"
              name="phone_num"
              type="text"
              placeholder="Phone Number"
              required
              value={signupData.phone_num}
              onChange={(e) =>
                setSignupData({ ...signupData, phone_num: e.target.value })
              }
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              // onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Signup;
