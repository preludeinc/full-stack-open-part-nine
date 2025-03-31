import { ChangeEvent, useEffect, useState } from 'react'
import './App.css'
import { DiaryEntry, Visibility, Weather } from './types'
import diaryService from './services/diaries';
import axios from 'axios'
import { apiBaseUrl } from './constants';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState(Weather.Sunny);
  const [visibility, setVisibility] = useState(Visibility.Great);
  const [comment, setComment] = useState('');

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await diaryService.getAll();
      setDiaries(patients);
    };
    void fetchPatientList();
  }, []);

  const onVisibilityChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value as Visibility;
    const visibility = Object.values(Visibility).find((v) => v.toString() === value);
    if (visibility) {
      setVisibility(visibility);
    }
  }

  const onWeatherChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value as Weather;
    const weather = Object.values(Weather).find((w) => w.toString() === value);
    if (weather) {
      setWeather(weather);
    }
  }

  const createDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiary: DiaryEntry = {
      id: diaries.length + 1,
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment
    }
    const diary = await diaryService.create(newDiary);
    setDiaries(diaries.concat(diary));
  }

  return (
    <>
      <h1>Add new entry</h1>
      <div>
        <form onSubmit={createDiary}>
          <div>
            <label>date{" "}</label>
            <input
              type="date"
              name="date"
              placeholder="YYYY-MM-DD"
              value={date}
              onChange={({ target }) => setDate(target.value)}
            />
          </div>

          <div>
            <label>visibility:{"  "}</label>
            {Object.values(Visibility).map((v) => (
              <label key={v}>
                {v}
                <input
                  type="radio"
                  name="visibility"
                  value={v}
                  checked={visibility === v}
                  onChange={onVisibilityChange}
                />
              </label>
            ))}
          </div>

          <div>
            <label>weather:{"  "}</label>
            {Object.values(Weather).map((w) => (
                <label key={w}>
                  {w}
                  <input
                  type="radio"
                  name="weather"
                  value={w}
                  checked={weather === w}
                  onChange={onWeatherChange}
              />
              </label>
            ))}
          </div>

          <div>
            <label>comment{" "}</label>
            <input
              type="text"
              name="comment"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
          </div>

          <button type="submit">add</button>
        </form>
      </div>

      <h2>Diary entries</h2>

      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      ))}
    </>
  )
}

export default App
