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
    } catch (error) {}
  };
  return (
    <>
      <h1>div</h1>
    </>
  );
};

export default Login;
