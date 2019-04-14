import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
         return album.slug === this.props.match.params.slug
       });

       this.state = {
         album: album,
         currentSong: album.songs[0],
         isPlaying: false,
         currentTime: 0,
         volume: 0.5,
         duration: album.songs[0].duration,
       };

       this.audioElement = document.createElement('audio');
       this.audioElement.src = album.songs[0].audioSrc;
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      }

    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
   }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    }


  play() {
     this.audioElement.play();
     this.setState({ isPlaying: true });
   }

   pause() {
     this.audioElement.pause();
     this.setState({ isPlaying: false });
   }

   setSong(song) {
        this.audioElement.src = song.audioSrc;
        this.setState({ currentSong: song });
      }

   handleSongClick(song) {
       const isSameSong = this.state.currentSong === song;
       if (this.state.isPlaying && isSameSong) {
       this.pause();
     } else {
       if (!isSameSong) { this.setSong(song); }
       this.play();
     }
    }

   handlePrevClick() {
      const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const newIndex = Math.max(0, currentIndex - 1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play();
     }

   handleNextClick(){
       const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
       const totalSongs = this.state.album.songs.length;
       const newIndex = Math.min(totalSongs - 1, currentIndex + 1);
       const newSong = this.state.album.songs[newIndex];
       this.setSong(newSong);
       this.play();
     }

   handleTimeChange(e) {
        const newTime = this.audioElement.duration * e.target.value;
        this.audioElement.currentTime = newTime;
        this.setState({ currentTime: newTime });
    }


   handleVolumeChange(e) {
        const newVolume = e.target.value;
        this.audioElement.volume = newVolume;
        this.setState({volume: newVolume});
  }


   formatTime(time) {

     if (isNaN(time) === false && time > -1) {
       const minutes = Math.floor(time / 60);
       const seconds = Math.floor(time % 60);

       if (seconds < 10) {
         return minutes + ":" + "0" + seconds;
      }

       else {
         return minutes + ":" + seconds;
       }
     }

     else {
       return "-:--";
     }
    }

   onMouseEnter(song) {
       this.setState({mouse: song})
     }

   onMouseLeave() {
       this.setState({mouse: false})
     }

   playOrPauseIcon(song, index){

      if (this.state.isPlaying && song == this.state.currentSong){
        return <span className="icon ion-md-pause"></span>
      }

      else if (song == this.state.mouse && this.state.isPlaying && song == this.state.currentSong) {
        return <span className="icon ion-md-pause"></span>
      }

      else if (song == this.state.mouse){
        return <span className="icon ion-md-play"></span>
      }

      else {
        return <span>{index + 1}</span>
      }
   }


  render() {
    return (
       <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list" align="center" border="thick">
           <colgroup>
             <col id="song-number-column" />
             <col id="song-title-column" />
             <col id="song-duration-column" />
           </colgroup>
           <tbody>

              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Duration (M:SS)</th>
              </tr>

                {this.state.album.songs.map( (album, index) =>

                  <tr key={index + 1} onClick={() => this.handleSongClick(album)} onMouseEnter={() => this.onMouseEnter(album)} onMouseLeave={() => this.onMouseLeave(album)}>
                  <td>{this.playOrPauseIcon(album, index)}</td>
                  <td>{album.title}</td>
                  <td>{this.formatTime(album.duration)}</td>
                  </tr>
                )
              }

           </tbody>
         </table>
         <PlayerBar
          isPlaying={this.state.isPlaying}
          volume={this.state.volume}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
          formatTime={(e) => this.formatTime(e)}
         />

       </section>
    );
  }
}

export default Album;
