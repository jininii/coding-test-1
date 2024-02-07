import React, { useCallback, useState } from 'react';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { createRefreshToken, createToken } from '../../utils/auth';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/users';

const Login = () => {
  const navigate = useNavigate();
  const users = useRecoilValue(userState);
  const [errorId, setErrorId] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onChangeId = useCallback(e => {
    setId(e.target.value);

    if (e.target.value !== '') {
      setErrorId(false);
    }
  }, []);

  const onChangePassword = useCallback(e => {
    setPassword(e.target.value);
    setErrorPassword(false);
  }, []);

  const onClickId = useCallback(() => {
    if (id === '') {
      setErrorId(true);
    }
  }, [id]);

  const onClickPassword = useCallback(() => {
    if (password === '') {
      setErrorPassword(true);
    }
  }, [password]);

  const onSubmit = async e => {
    e.preventDefault();

    const chkeckUser = users.find(
      user => user.userId === id && user.password === password,
    );

    if (chkeckUser) {
      const accessToken = await createToken();
      const refreshToken = await createRefreshToken();
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      navigate('/main');
    } else {
      alert('아이디 및 비밀번호를 다시 확인해주세요.');
    }
  };

  return (
    <div className="wrap">
      <h1>통합로그인</h1>
      <form onSubmit={onSubmit}>
        <div className="inputSection">
          <input
            type="text"
            value={id}
            onClick={onClickId}
            onChange={onChangeId}
            placeholder="아이디"
          />
          {errorId && <p className="errorMsg">아이디를 입력해주세요.</p>}
          <input
            type="password"
            value={password}
            onClick={onClickPassword}
            onChange={onChangePassword}
            placeholder="비밀번호"
          />
          {errorPassword && (
            <p className="errorMsg">비밀번호를 입력해주세요.</p>
          )}
        </div>
        <div className="formBottom">
          <p>
            <input type="checkbox" />
            아이디 저장
          </p>
          <Link to="/signup">회원가입</Link>
        </div>
        <button className="loginBtn" type="submit">
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;
