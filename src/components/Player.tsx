import React from 'react'
import { Play } from '../assets/icons/Play'
import { Pause } from '../assets/icons/Pause'
import { Chevron } from '../assets/icons/Chevron'
import { X } from '../assets/icons/X'
import * as PlayerSongsJSON from './PlayerSongs.json'
import "./Player.scss"

export interface Song {
  name: string,
  artist: string
  img: string
  path: string
  url: string
  // eslint-disable-next-line camelcase
  artist_url: string
}

const PlayerSongs: Song[] = PlayerSongsJSON

const Player: React.FC = () => {
  const [curSong, setCurSong] = React.useState<number>(Math.floor(Math.random() * PlayerSongs.length))
  const [paused, setPaused] = React.useState<boolean>(true)
  const [open, setOpen] = React.useState<boolean>(window.innerWidth > 900)
  const [curTime, setCurTime] = React.useState<number>(0)
  const song = PlayerSongs[curSong]

  const audioRef = React.useRef<HTMLAudioElement>()

  React.useEffect(() => {
    audioRef.current.addEventListener('ended', next)
    audioRef.current.addEventListener('timeupdate', updateCurTime)

    return () => {
      audioRef.current.removeEventListener('ended', next)
      audioRef.current.removeEventListener('timeupdate', updateCurTime)
    }
  }, [song])

  function updateCurTime() {
    setCurTime((audioRef.current.currentTime / audioRef.current.duration) * 100)
  }

  function play() {
    setPaused(false)
    audioRef.current.volume = 0.5
    audioRef.current.play()
  }
  function pause() {
    setPaused(true)
    audioRef.current.pause()
  }

  function prev() {
    if (audioRef.current.currentTime > 3) return audioRef.current.currentTime = 0
    if (curSong === 0) setCurSong(PlayerSongs.length - 1)
    else setCurSong(curSong - 1)

    setCurTime(0)
    setTimeout(play, 100)
  }

  function next() {
    if (curSong === PlayerSongs.length - 1) setCurSong(0)
    else setCurSong(curSong + 1)

    setCurTime(0)
    setTimeout(play, 100)
  }

  function closePlayer() {
    setOpen(false)
  }

  function openPlayer() {
    setOpen(true)
  }

  return (
    <div className={`Player${open ? ' open' : ''}`}>
      <audio src={song.path} ref={audioRef} controls={false} autoPlay={false}></audio>
      <div className="info">
        <img src={song.img} alt="" />
        <div className={`extras${open ? ' open' : ''}`}>
          <div className="close" onClick={closePlayer}><X /></div>
          {
            !open
              ? <div className="open" onClick={openPlayer}><Chevron /></div>
              : ''
          }
          <div className="time-bar" style={{ width: `${curTime ?? 0}%` }}></div>
          <div className="meta">
            <h1><a href={song.url}>{song.name.toUpperCase()}</a></h1>
            <p><a href={song.artist_url}>{song.artist}</a></p>
          </div>
          <div className="controls">
            <div className="prev" onClick={prev}><Chevron /></div>
            {
              paused
                ? <div className="play" onClick={play}><Play /></div>
                : <div className="pause" onClick={pause}><Pause /></div>
            }
            <div className="frwd" onClick={next}><Chevron /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Player
