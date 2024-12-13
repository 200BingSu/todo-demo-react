// npm install react-calendar

// 1. 아래는 기본 기능 출력
import { useEffect } from "react";
import { useState } from "react";
import Calendar from "react-calendar";
// 2. 반드시 아래 구문을 참조해서 css 를 별도로 첨부함.
import "react-calendar/dist/Calendar.css";
import "./schedule.css";

function Schedule() {
  // 4. 선택된 날짜 기록
  const [date, setDate] = useState(new Date());
  // 5. 샘플 일정 자료
  // 선택된 스케줄 화면에 상세 내용 보여주기
  const [selectSchedule, setSelectSchedule] = useState(null);
  const scheduleData = {
    "2024-12-13": [
      {
        id: 1,
        title: "🎇프로젝트 회의",
        time: "16:00",
        desc: "프로젝트를 위한 일정",
      },
      {
        id: 2,
        title: "🎇프로젝트 회의",
        time: "16:00",
        desc: "프로젝트를 위한 일정",
      },
    ],
  };

  const handleClickSchedule = item => {
    setSelectSchedule(item);
  };
  // 3. 날짜 요일 출력
  const formatShortWeekday = (locale, date) => {
    const weekName = ["일", "월", "화", "수", "목", "금", "토"];
    return weekName[date.getDay()];
  };

  const tileContent = e => {
    const { date, view } = e;
    // console.log(date, view);
    // date       : "2024-11-23T15:00:00.000Z",
    // view       : "month",
    if (view === "month") {
      // 우리 데이터  "2024-12-13"
      const formatedDate = date.toLocaleDateString("en-CA");
      // ["2024-11-23", "15:00:00.000Z"]
      // console.log(formatedDate);
      const sechdules = scheduleData[formatedDate];
      if (sechdules) {
        return (
          <div className="schedule-content">
            {sechdules.map(item => (
              <div
                className="schedule-item"
                key={item.id}
                onClick={() => handleClickSchedule(item)}
              >
                {item.title}
              </div>
            ))}
          </div>
        );
      }
    }
  };

  useEffect(() => {
    // 4번에서 적용한 state 의 날짜를 파악하는 테스트
    // console.log("선택된 날짜 : ", date);
  }, [date]);
  return (
    <div>
      <h1>Schedule</h1>
      <div>
        <Calendar
          // 2. 날짜 요일 한국어 표현
          calendarType="gregory"
          formatShortWeekday={formatShortWeekday}
          // 4. 선택된 날짜 기록
          value={date}
          // 4. 변경된 날짜 보관
          onChange={e => setDate(e)}
          // 5. 각 날짜의 타일에 일정 출력하기
          tileContent={e => tileContent(e)}
        />
      </div>
      <div>
        {selectSchedule && (
          <div
            className="schedule-detail"
            onClick={e => {
              setSelectSchedule(null);
            }}
          >
            <div
              className="schedule-box"
              onClick={e => {
                e.stopPropagation();
              }}
            >
              <h3>일정: {selectSchedule.title}</h3>
              <p>시간: {selectSchedule.time}</p>
              <p>내용: {selectSchedule.desc}</p>
              <button
                className="bt-close"
                type="button"
                onClick={() => setSelectSchedule(null)}
              >
                닫기
              </button>
            </div>

            <div></div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Schedule;
