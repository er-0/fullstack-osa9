import React, { useEffect, useState, useRef } from 'react';
import { Entry, NewEntry, Visibility, Weather } from './types';
import { getAllEntries, createEntry } from './entryService';
import  axios from 'axios';

const App = () => {
  const [newEntry, setNewEntry] = useState<NewEntry>({date: '', visibility: Visibility.Great, weather: Weather.Sunny, comment: ''});
  const [entries, setEntries] = useState<Entry[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    getAllEntries().then(data => {
      setEntries(data);
    });
    
  }, []);

  const visibilityRef = useRef<HTMLDivElement>(null);
  const weatherRef = useRef<HTMLDivElement>(null);

  const entryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const visibility = visibilityRef.current?.querySelector<HTMLInputElement>('input:checked')?.value || '';
    const weather = weatherRef.current?.querySelector<HTMLInputElement>('input:checked')?.value || '';
    const entryToAdd : Entry = {
      ...newEntry,
      visibility: visibility as Visibility,
      weather: weather as Weather,
      id: entries.length + 1
    };
    console.log(entryToAdd, 'uusi entry');
    try {
      await createEntry(entryToAdd)
      .then(data => {
        setEntries(entries.concat(data));
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setMessage(error.response.data);
        setTimeout(() => {
          setMessage('');
        }, 5000);
      } else {
        console.error(error);
      }
    }
    setNewEntry({date: '', visibility: Visibility.Great, weather: Weather.Sunny, comment: ''});
  };

  const currentDate = new Date().toJSON().slice(0, 10);

  return (
    <div>
      <h2>Add new entry</h2>
      <p>{message}</p>
      <form onSubmit={entryCreation}>
        date: 
        <input type="date" 
          id="start" 
          name="trip-start" 
          value={newEntry.date} 
          min="2015-01-01" 
          max={currentDate} 
          onChange={(event) => setNewEntry({...newEntry, date: event.target.value})} 
        /><br/>
        {/* Radio buttons setNewEntry only on submit*/}
        visibility: 
        <div ref={visibilityRef}>
          <input type="radio" name="visibility" value='great'/>great &ensp;
          <input type="radio" name="visibility" value='good'/>good &ensp;
          <input type="radio" name="visibility" value='ok' />ok &ensp;
          <input type="radio" name="visibility" value='poor' />poor
        </div>
        weather: 
        <div ref={weatherRef}>
          <input type="radio" name="weather" value='sunny'/>sunny &ensp;
          <input type="radio" name="weather" value='rainy' />rainy &ensp;
          <input type="radio" name="weather" value='cloudy' />cloudy &ensp;
          <input type="radio" name="weather" value='stormy'/>stormy &ensp;
          <input type="radio" name="weather" value='windy' />windy
        </div>
        comment: 
        <input
          value={newEntry.comment}
          onChange={(event) => setNewEntry({...newEntry, comment: event.target.value})} 
        />
        <button type='submit'>add</button>
      </form>
      <h2>Diary entries</h2>
      {entries.map(entry =>
        <div key={entry.id}>
          <h4>{entry.date}</h4>
          <p>
          visibility: {entry.visibility} <br/>
          weather: {entry.weather} <br/>
          comment: {entry.comment} 
          </p>
        </div>
      )}
    </div>
  );
};


export default App;