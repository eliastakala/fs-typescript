import type { DiaryEntry } from "./types";
import { useState, useEffect } from "react";
import diaryService from "./services/diaryService";
import "./App.css";

type NotificationProps = {
  message: string | null;
};

const Notification = ({ message }: NotificationProps) => {
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
  const [newDiaryComment, setNewDiaryComment] = useState("faaah");
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
    diaryService
      .create({
        date: newDiaryDate,
        weather: newDiaryWeather,
        visibility: newDiaryVisibility,
        comment: newDiaryComment,
      })
      .then((returnedEntry) => {
        console.log("täällä", returnedEntry);
        setEntries(entries.concat(returnedEntry));
        setNewDiaryDate("");
        setNewDiaryWeather("");
        setNewDiaryVisibility("");
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

  return (
    <div>
      <h2>Add new entry</h2>
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
