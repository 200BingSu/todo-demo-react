import styled from "@emotion/styled";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

const ErrorDiv = styled.div`
  width: 100%;
  color: red;
  font-size: 10px;
`;
const loginSchema = yup.object({
  email: yup
    .string()
    .required("이메일을 입력해주세요.")
    .email("올바른 이메일 형식이 아닙니다."),
  pw: yup.string().required("비밀번호를 입력하세요."),
});
// useForm 초기값
const initData = {
  defaultValues: {
    email: "",
    pw: "",
  },
  resolver: yupResolver(loginSchema),
};

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(initData);
  const onSubmit = data => {
    console.log(data);
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>이메일</label>
          <input {...register("email")} />
          {errors.email && <ErrorDiv>{errors.email.message}</ErrorDiv>}
        </div>
        <div>
          <label>비밀번호</label>
          <input type="text" {...register("pw")} />
          {errors.pw && <ErrorDiv>{errors.pw.message}</ErrorDiv>}
        </div>
        <div>
          <button type="submit">로그인</button>
        </div>
        <div>
          <Link to="">|이메일 찾기|</Link>
          <Link to="">|비밀번호 찾기|</Link>
          <Link to="/member">|회원가입하기|</Link>
        </div>
      </form>
    </div>
  );
}
export default LoginPage;
