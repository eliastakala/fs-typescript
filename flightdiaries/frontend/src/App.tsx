interface Note {
  id: string;
  content: string;
}

import axios from 'axios';
import { useState, useEffect } from "react";

const App = () => {
  const [notes, setNotes] = useState<Note[]>([{ id: "1", content: "testing" }]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    axios.get('http://localhost:3000/api/diaries').then(response => {
      console.log(response.data);
    })
  }, [])

  return (
    <div>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
