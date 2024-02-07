import React, { useCallback, useEffect, useState } from 'react';
import './Signup.scss';
import { numberRegex, passwordRegex } from '../../utils/regex';
import { userState } from '../../recoil/users';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useRecoilState(userState);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [frontPhoneNumber, setFrontPhoneNumber] = useState('010');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [term, setTerm] = useState(false);
  const [errorId, setErrorId] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorPasswordRegex, setErrorPasswordRegex] = useState(false);
  const [errorNumberRegex, setErrorNumberRegex] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const isSignupValid =
    id !== '' &&
    password !== '' &&
    phoneNumber !== '' &&
    term &&
    passwordRegex.test(password) &&
    numberRegex.test(phoneNumber);

  useEffect(() => {
    if (isSignupValid) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  });

  const onClickInputId = useCallback(() => {
    if (id === '') {
      setErrorId(true);
    }
  }, [id]);

  const onClickInputPassword = useCallback(() => {
    if (password === '') {
      setErrorPassword(true);
      setErrorPasswordRegex(false);
    }
  }, [password]);

  const onChangeId = useCallback(
    e => {
      setId(e.target.value);
      setErrorId(false);
    },
    [id],
  );

  const onChangePassword = useCallback(
    e => {
      const passwordInput = e.target.value;
      setPassword(passwordInput);
      setErrorPassword(false);
    },
    [password],
  );

  const onChangeFrontNumber = useCallback(e => {
    setFrontPhoneNumber(e.target.value);
  }, []);

  const onChangePhoneNumber = useCallback(
    e => {
      setPhoneNumber(e.target.value);
      if (!numberRegex.test(e.target.value)) {
        setErrorNumberRegex(true);
      } else {
        setErrorNumberRegex(false);
      }
    },
    [phoneNumber],
  );

  const onChangeTerm = useCallback(e => {
    setTerm(e.target.checked);
  }, []);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();

      const fullPhoneNumber = frontPhoneNumber + phoneNumber;

      const updateUser = {
        id: users.length + 1,
        userId: id,
        password,
        phoneNumber: fullPhoneNumber,
        term,
      };

      setUsers(oldData => [...oldData, updateUser]);

      navigate('/');
    },
    [id, password, phoneNumber, term],
  );

  return (
    <div className="wrap">
      <h1>회원가입</h1>
      <form onSubmit={onSubmit}>
        <label>
          <p>ID</p>
          <input
            type="text"
            value={id}
            onChange={onChangeId}
            onClick={onClickInputId}
            placeholder="홍길동"
          />
          {errorId && <p className="errorMsg">아이디를 입력해주세요.</p>}
        </label>
        <label>
          <p>비밀번호</p>
          <input
            type="password"
            value={password}
            onChange={onChangePassword}
            onClick={onClickInputPassword}
            placeholder="소문자, 숫자, 특수문자를 포함하여 8자 이상"
          />
          {errorPassword && (
            <p className="errorMsg">비밀번호를 입력해주세요.</p>
          )}
          {errorPasswordRegex && (
            <p className="errorMsg">형식에 맞지 않습니다. 다시 입력해주세요.</p>
          )}
        </label>
        <label>
          <p>휴대폰 번호</p>
          <div className="selectNumber">
            <select
              type="select"
              value={frontPhoneNumber}
              onChange={onChangeFrontNumber}
            >
              <option value="010">010</option>
              <option value="011">011</option>
            </select>
            <input
              type="text"
              value={phoneNumber}
              onChange={onChangePhoneNumber}
              maxLength={8}
              placeholder="12345678"
            />
          </div>
          {errorNumberRegex && (
            <p className="errorMsg">-를 제외하고 입력해주세요.</p>
          )}
        </label>
        <label>
          <p>필수 약관 동의</p>
          <div className="termSection">
            <input type="checkbox" checked={term} onChange={onChangeTerm} />
            <span>약관에 동의합니다.</span>
          </div>
        </label>
        <button className="signupBtn" type="submit" disabled={!isValid}>
          가입완료
        </button>
      </form>
    </div>
  );
};

export default Signup;
