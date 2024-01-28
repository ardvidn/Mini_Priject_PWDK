import { useRef, useState, useEffect } from 'react';

const Singin = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  // useEffect(() => {
  //   userRef.current.focus();
  // },[])
  useEffect(() => {
    setErrMsg('');
  }, [user, password]);

  return (
    <>
      <section>
        <p className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
          {errMsg}
        </p>
        <h1>Sign In</h1>
        <form>
          <label htmlFor="username">Username</label>
        </form>
      </section>
    </>
  );
};

export default Singin;
