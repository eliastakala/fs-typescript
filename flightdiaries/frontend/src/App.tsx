import type { DiaryEntry } from "./types";
import { useState, useEffect } from "react";
import diaryService from "./services/diaryService";
import "./App.css";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [newDiaryDate, setNewDiaryDate] = useState("");
  const [newDiaryWeather, setNewDiaryWeather] = useState("sunny");
  const [newDiaryVisibility, setNewDiaryVisibility] = useState("good");
  const [errorMessage, setErrorMessage] = useState(null);

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
    diaryService
      .create({
        date: newDiaryDate,
        weather: newDiaryWeather,
        visibility: newDiaryVisibility,
      })
      .then((returnedEntry) => {
        console.log("täällä", returnedEntry);
        setEntries(entries.concat(returnedEntry));
        setNewDiaryDate("");
        setNewDiaryWeather("");
        setNewDiaryVisibility("");
      })
      .catch((error) => {
        const submittedValues: Record<string, string> = {
          date: newDiaryDate,
          weather: newDiaryWeather, // "sunnya"
          visibility: newDiaryVisibility,
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

  return (
    <div>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            Flight date: {entry.date} weather was {entry.weather} and visibility{" "}
            {entry.visibility}
          </li>
        ))}
      </ul>
      <Notification message={errorMessage} />
      <form onSubmit={entryCreation}>
        Date:{" "}
        <input
          value={newDiaryDate}
          onChange={(event) => setNewDiaryDate(event.target.value)}
        />
        <br></br>
        Weather:{" "}
        <input
          value={newDiaryWeather}
          onChange={(event) => setNewDiaryWeather(event.target.value)}
        />
        <br></br>
        Visibility:{" "}
        <input
          value={newDiaryVisibility}
          onChange={(event) => setNewDiaryVisibility(event.target.value)}
        />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default App;
