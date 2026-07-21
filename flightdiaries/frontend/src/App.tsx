import type { DiaryEntry } from "./types";
import { useState, useEffect } from "react";
import diaryService from "./services/diaryService";
import "./App.css";

type NotificationProps = {
  message: string | null;
};

type Weather = "sunny" | "rainy" | "cloudy" | "stormy" | "windy";

type WeatherProps = {
  weather: Weather;
  selectedWeather: Weather | null;
  handleChange: (weather: Weather) => void;
};

type Visibility = "great" | "good" | "ok" | "poor";

type VisibilityProps = {
  visibility: Visibility;
  selectedVisibility: Visibility | null;
  handleChange: (visibility: Visibility) => void;
};

const Notification = ({ message }: NotificationProps) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const WeatherRadio = ({ weather, selectedWeather, handleChange }: WeatherProps) => {
  return (
    <div>
      <input
        type="radio"
        id={weather}
        name="weather"
        value={weather}
        checked={selectedWeather === weather}
        onChange={() => handleChange(weather)}
      />
      <label htmlFor={weather}>
        {weather}
      </label>
    </div>
  );
};

const VisibilityRadio = ({ visibility, selectedVisibility,handleChange }: VisibilityProps) => {
  return (
    <div>
      <input
        type="radio"
        id={visibility}
        name="visibility"
        value={visibility}
        checked={selectedVisibility === visibility}
        onChange={() => handleChange(visibility)}
      />
      <label htmlFor={visibility}>
        {visibility}
      </label>
    </div>
  );
};

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [newDiaryDate, setNewDiaryDate] = useState("");
  const [newDiaryWeather, setNewDiaryWeather] = useState<Weather | null>(null);
  const [newDiaryVisibility, setNewDiaryVisibility] = useState<Visibility | null>(null);
  const [newDiaryComment, setNewDiaryComment] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    diaryService.getAll().then((initialEntries) => {
      setEntries(initialEntries);
    });
  }, []);

  const errorSetting = (props: string) => {
    setErrorMessage(props);
    setTimeout(function () {
      setErrorMessage(null);
    }, 3000);
  };

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (newDiaryVisibility === null || newDiaryWeather === null) {
      errorSetting("populate weather data")
      return;
    }

    diaryService
      .create({
        date: newDiaryDate,
        weather: newDiaryWeather,
        visibility: newDiaryVisibility,
        comment: newDiaryComment,
      })
      .then((returnedEntry) => {
        setEntries(entries.concat(returnedEntry));
        setNewDiaryDate("");
        setNewDiaryWeather(null);
        setNewDiaryVisibility(null);
        setNewDiaryComment("");
      })
      .catch((error) => {
        const submittedValues: Record<string, string> = {
          date: newDiaryDate,
          weather: newDiaryWeather, // "sunnya"
          visibility: newDiaryVisibility,
          comment: newDiaryComment,
        };
        const constructedMessage =
          "Error: Incorrect " +
          error.response.data.error[0].path +
          " " +
          submittedValues[error.response.data.error[0].path[0]] +
          " " +
          error.response.data.error[0].message;
        errorSetting(constructedMessage);
      });
  };

  const handleWeatherClick = (props: Weather) => {
    return setNewDiaryWeather(props);
  };

  const handleVisibilityClick = (props: Visibility) => {
    return setNewDiaryVisibility(props);
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <Notification message={errorMessage} />
      <form onSubmit={entryCreation}>
        <label>
          Date:{" "}
          <input
            type="date"
            name="diaryDate"
            onChange={(event) => {
              setNewDiaryDate(event.target.value);
            }}
          />
        </label>
        <br></br>
        Weather: <br></br>
        <WeatherRadio weather="sunny" selectedWeather={newDiaryWeather} handleChange={handleWeatherClick}/>
        <WeatherRadio weather="rainy" selectedWeather={newDiaryWeather} handleChange={handleWeatherClick}/>
        <WeatherRadio weather="cloudy" selectedWeather={newDiaryWeather} handleChange={handleWeatherClick}/>
        <WeatherRadio weather="stormy" selectedWeather={newDiaryWeather} handleChange={handleWeatherClick}/>
        <WeatherRadio weather="windy" selectedWeather={newDiaryWeather} handleChange={handleWeatherClick}/>
        <br></br>
        Visibility:{" "}
        <VisibilityRadio visibility="great" selectedVisibility={newDiaryVisibility} handleChange={handleVisibilityClick}/>
        <VisibilityRadio visibility="good" selectedVisibility={newDiaryVisibility} handleChange={handleVisibilityClick}/>
        <VisibilityRadio visibility="ok" selectedVisibility={newDiaryVisibility} handleChange={handleVisibilityClick}/>
        <VisibilityRadio visibility="poor" selectedVisibility={newDiaryVisibility} handleChange={handleVisibilityClick}/>
        <br></br>
        Comment:{" "}
        <input
          value={newDiaryComment}
          onChange={(event) => setNewDiaryComment(event.target.value)}
        />
        <button type="submit">add</button>
      </form>
      <h2>Diary entries</h2>
      {entries.map((entry) => (
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          visibility: {entry.visibility}
          <br></br>
          weather: {entry.weather}
        </div>
      ))}
    </div>
  );
};

export default App;
