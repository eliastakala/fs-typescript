import type { Entry } from './types'
import { useState, useEffect } from "react";
import diaryService from './services/diaryService';

const App = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [newDiaryDate, setNewDiaryDate] = useState('');
  const [newDiaryWeather, setNewDiaryWeather] = useState('');
  const [newDiaryVisibility, setNewDiaryVisibility] = useState('');

  useEffect(() => {
    diaryService.getAll().then(initialEntries => {
      setEntries(initialEntries)
    })
  }, [])

  const entryCreation = (event: React.SyntheticEvent) => {    
    event.preventDefault()
    diaryService.create({
      date: newDiaryDate,
      weather: newDiaryWeather,
      visibility: newDiaryVisibility
    })
      .then(returnedEntry => {
        setEntries(entries.concat(returnedEntry))
      })
    setNewDiaryDate('')
    setNewDiaryWeather('')
    setNewDiaryVisibility('')
  };

  return (
    <div>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>Flight date: {entry.date} weather was {entry.weather} and visibility {entry.visibility}</li>
        ))}
      </ul>
      <form onSubmit={entryCreation}>
        Date: <input
          value={newDiaryDate}
          onChange={(event) => setNewDiaryDate(event.target.value)}
         />
        <br></br>
        Weather: <input
          value={newDiaryWeather}
          onChange={(event) => setNewDiaryWeather(event.target.value)}
         />
        <br></br>
        Visibility: <input
          value={newDiaryVisibility}
          onChange={(event) => setNewDiaryVisibility(event.target.value)}
         />
        <button type='submit'>add</button>
      </form>
    </div>
  );
};

export default App;
