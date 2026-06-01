import { useEffect, useState } from 'react'
import './App.css'

const App = () => {

  const [query, setQuery] = useState("top hits 2026")
  const [songs, setSongs] = useState([])
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const searchQuery = query.trim() === "" ? "top hits 2026" : query

      fetch(`https://itunes.apple.com/search?term=${searchQuery}&media=music&entity=song&limit=5`)
      .then(res => res.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          setSongs(data.results)
        } else {
          fetch(`https://itunes.apple.com/search?term=top+hits+2026&media=music&entity=song&limit=5`)
          .then(res => res.json())
          .then(fallback => setSongs(fallback.results || []))
        }
        console.log(data.results[0])
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [query])


  return (
    <>
      <div className='first-div'>
        <input 
          className='search-bar'
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          placeholder='search...'
        />
        {isFocused &&(
          <div className='search-result'>
            {songs.map((song) => (
              <div className='song-box' key={song.trackId}>
                  <img src={song.artworkUrl60}/>
                  <div className='bar-div'>
                    <p className='song-name'>{song.trackName}</p>
                    <p className='song-artist'>{song.artistName}</p>
                  </div>
              </div>
            ))}
          </div>
        )}
        <h1>TEST</h1>
      </div>
    </>
  )
}

export default App
