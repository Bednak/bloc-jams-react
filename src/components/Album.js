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
         isPlaying: false
       };

       this.audioElement = document.createElement('audio');
       this.audioElement.src = album.songs[0].audioSrc;
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
                <th>Duration (in seconds)</th>
              </tr>

                {this.state.album.songs.map( (album, index) =>

                  <tr key={index + 1} onClick={() => this.handleSongClick(album)} onMouseEnter={() => this.onMouseEnter(album)} onMouseLeave={() => this.onMouseLeave(album)}>
                  <td>{this.playOrPauseIcon(album, index)}</td>
                  <td>{album.title}</td>
                  <td>{album.duration}</td>
                  </tr>
                )
              }

           </tbody>
         </table>
         <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
         />

       </section>
    );
  }
}

export default Album;
