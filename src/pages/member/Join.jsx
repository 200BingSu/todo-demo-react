import styled from "@emotion/styled";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
const ErrorDiv = styled.p`
  width: 100%;
  color: red;
  font-size: 10px;
`;

// Yup 관련 설정
//   1. schema를 먼저 설정한다.
const schema = yup.object({
  name: yup
    .string()
    .required("이름은 필수입니다.")
    .min(2, "최소 2자 이상입니다."),
  email: yup
    .string()
    .required("이메일은 필수입니다.")
    .email("올바른 이메일 형식이 아닙니다."),
  pw: yup
    .string()
    .required("비밀번호는 필수입니다.")
    .min(8, "비밀번호는 8자 이상입니다.")
    .max(16, "비밀번호는 16자 이하입니다.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
      "비밀번호는 영문, 숫자, 특수기호가 포함되어야 합니다.",
    ),
  pwconfirm: yup
    .string()
    .required("비밀번호 확인을 입력해주세요.")
    .oneOf([yup.ref("pw")], "비밀번호가 일치하지 않습니다."),
  policy: yup.boolean().oneOf([true], "이용약관에 동의해 주세요,"),
});
// 2. schema가 만들어지면 hookform과 연결한다.(resolver)
const formatPhoneNumber = value => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 8) {
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
  }
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
};

const initData = {
  defaultValues: {
    name: "",
    email: "",
    pw: "",
    pwconfirm: "",
    birthday: "",
    gender: "",
    phone: "",
    address: {
      postcode: "",
      basic: "",
      detail: "",
    },
    policy: false,
  },
  mode: "onSubmit",
  resolver: yupResolver(schema),
};

function Join() {
  // register : 입력창을 훅폼에 등록한다.
  // handleSubmt : 입력창에 내용을 입력 후 전송 실행시 처리
  // getValues : 입력된 값 추출하기
  // formState: { errors } : 폼의 에러상태를 이용해서 유효성 검사 적용하기
  // form 태그의 요소에 초기값 셋팅하기
  // form 태그의 요소에 값 리셋하기

  // mode: 원하는 시점
  // -change: 즉시, 즉시, 유효성 검사 실행하기
  // - onSubmit 실행시에만 폼 유효성 검사 실행하기
  // - all: onChange와 onBlulr 모두 포함

  // trigger: 초기 화면 출력시 폼 유효성 검사 실행하기
  // setValue: 강제로 폼의 값을 대입하기
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm(initData);

  // 전송용 데이터
  const onSubmit = data => {
    console.log(data);
    const sendData = { ...data, phone: data.phone.replaceAll("-", "") };
    console.log("전송시 데이터 sendData ", sendData);
  };
  // 유효성 검사 즉시 실행
  useEffect(() => {
    trigger();
  }, [trigger]);

  // Daum Post
  // 1단계 : 외부 자바스크립트를 불러들여서 사용하는 방법.
  useEffect(() => {
    // Daum 우편번호 스크립트 로드
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    // 컴포넌트 언마운트 시 스크립트 제거
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  // 2단계 : 선택시 주소 팝업창 출력하기 함수
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: data => {
        // 우편번호와 기본주소 입력
        setValue("address.postcode", data.zonecode);
        setValue("address.basic", data.address);

        // 상세주소 입력 필드로 포커스 이동
        document.querySelector('input[name="address.detail"]').focus();
      },
    }).open();
  };

  return (
    <div style={{ padding: 50 }}>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>이름</label>
          <input {...register("name")} />
          {/* name 이 없을 때 에러 내용 출력자리 */}
          {errors.name && <ErrorDiv>{errors.name.message}</ErrorDiv>}
        </div>
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
          <label>비밀번호 확인</label>
          <input type="text" {...register("pwconfirm")} />
          {errors.pwconfirm && <ErrorDiv>{errors.pwconfirm.message}</ErrorDiv>}
        </div>
        <div>
          <label>생년월일</label>
          <input type="date" {...register("birthday")} />
          {errors.birthday && <p>{errors.birthday.message}</p>}
        </div>
        <div>
          <label>성별</label>
          <select {...register("gender")}>
            <option value={""}>선택해주세요.</option>
            <option value={"male"}>남성</option>
            <option value={"female"}>여성</option>
            <option value={"other"}>기타</option>
          </select>
        </div>
        <div>
          <label>전화번호</label>
          <input
            type="phone"
            {...register("phone")}
            onChange={e => {
              const temphone = formatPhoneNumber(e.target.value);
              setValue("phone", temphone);
            }}
          />
          {errors.phone && <ErrorDiv>{errors.phone.message}</ErrorDiv>}
        </div>

        <div>
          <label>우편번호</label>
          <input {...register("address.postcode")} placeholder="12345" />
          <button type="button" onClick={() => handleAddressSearch()}>
            {" "}
            우편번호 찾기{" "}
          </button>
        </div>

        <div>
          <label>주소</label>
          <input {...register("address.basic")} placeholder="기본주소" />
        </div>

        <div>
          <label>상세주소</label>
          <input {...register("address.detail")} placeholder="상세주소" />
        </div>
        <div>
          <input type="checkbox" {...register("policy")} />
          <label htmlFor="">이용 약관에 동의합니다.</label>
          {errors.policy && <ErrorDiv>{errors.policy.message}</ErrorDiv>}
          <div
            style={{
              height: 150,
              backgroundColor: "#fff",
              border: "1px solid black",
              overflowX: "hidden",
              overflowY: "auto",
            }}
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic
            ducimus, voluptate, corrupti nesciunt saepe quis dolorum soluta,
            obcaecati repellat magni quos? Veniam nemo, voluptate officiis odio
            dolorem ex quod illo. Autem consectetur fugit, vel quam earum
            dolores voluptatibus nobis quo, est explicabo similique. Quasi
            nesciunt, cum ducimus consectetur necessitatibus, a sequi voluptates
            fugit, perspiciatis asperiores exercitationem quaerat aperiam
            impedit amet. Eum maiores obcaecati similique velit odio reiciendis
            repellendus nobis, assumenda dolorem reprehenderit unde voluptates
            amet ut quam voluptatem perspiciatis inventore ipsum facilis tenetur
            quidem ducimus aut. Saepe accusamus molestias nobis? Fugit et
            deserunt facilis ipsum dolorem. Asperiores iste nisi eius, eaque
            harum, exercitationem eligendi pariatur cumque quia, perspiciatis
            repudiandae nam beatae. In aperiam dolores quia illum reiciendis
            quaerat, similique perspiciatis. Tenetur ab soluta illo eum quas
            quis sed autem natus labore, iusto, explicabo velit adipisci quasi
            assumenda dolorem, quam qui molestias quaerat quo atque inventore
            ducimus illum iste provident. Ad? Totam, recusandae natus, soluta
            deleniti, quis modi reprehenderit accusamus nulla corrupti labore
            assumenda quia sequi numquam inventore ratione rem nesciunt neque
            iusto optio? Corporis repellendus dolores reprehenderit
            exercitationem praesentium nobis? Iste recusandae deserunt enim.
            Fuga officia, dolores commodi voluptate accusantium enim saepe sequi
            aperiam quas soluta natus nesciunt. Facere ipsum sapiente cupiditate
            debitis, saepe possimus voluptatum quae dicta odit suscipit.
            Corrupti doloribus omnis est nobis aspernatur mollitia! Distinctio
            repellendus hic saepe ad error aut possimus eos molestias velit!
            Consectetur odio rem impedit veniam voluptates itaque, corporis
            optio quibusdam quidem dignissimos! Suscipit earum, eligendi
            accusantium eos nemo placeat accusamus fugit, iure dignissimos
            debitis optio est officiis ullam praesentium. Iure cumque velit
            aspernatur voluptate quis corporis repudiandae illo! Neque
            recusandae ipsum consequatur. Provident dolores sit ut eum placeat
            beatae maiores, ipsam molestias aspernatur itaque ea exercitationem
            maxime doloremque aut doloribus laboriosam sequi officia obcaecati
            sunt deserunt ratione, repudiandae atque illum! Quibusdam,
            similique?
          </div>
        </div>
        <div>
          <input type="button" onClick={() => reset()} value="다시 작성" />
          <button type="submit">제출하기</button>
        </div>
      </form>
    </div>
  );
}

export default Join;
