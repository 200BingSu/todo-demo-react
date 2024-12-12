// form을 state로 작동시키면 너무 많은 리랜더링이 일어난다.

import { useState } from "react";

// (글자 1개에도 리랜더링이 일어나기 때문에 내용이 많아질수록 성능 이슈가 발생)
function Join() {
  return (
    <div style={{ padding: 50 }}>
      <h1>회원가입</h1>
      <form action="">
        <div>
          <label>
            이름
            <input type="text" />
          </label>
        </div>
        <div>
          <label>
            이메일
            <input type="email" />
          </label>
        </div>
        <div>
          <button type="submit">제출하기</button>
        </div>
      </form>
    </div>
  );
}
export default Join;
