import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';


class App extends Component {
  render() {
    return (
      <div className="App" class="mdl-layout mdl-js-layout mdl-layout--fixed-header
            mdl-layout--fixed-tabs">
        <header class="mdl-layout__header">
          <div class="mdl-layout__header-row">
            <span class="mdl-layout-title"><img src="/assets/images/bloc_jams_logo.png" alt="Bloc Jams logo"></img></span>
          </div>
          <div class="mdl-layout__tab-bar mdl-js-ripple-effect">

            <Link to='/' class="mdl-layout__tab" href="#fixed-tab-1" >Landing</Link>
            <Link to='/library' class="mdl-layout__tab" href="#fixed-tab-2">Library</Link>

          </div>
        </header>

        <main class="mdl-layout__content">
         <Route exact path="/" component={Landing} class="mdl-layout__tab-panel is-active" id="fixed-tab-1" />
         <Route path="/library" component={Library} class="mdl-layout__tab-panel" id="fixed-tab-2" />
         <Route path="/album/:slug" component={Album} class="mdl-layout__tab-panel" />
        </main>

        <footer class="mdl-mini-footer">
          <div class="mdl-mini-footer__left-section">
          <div class="mdl-logo">Bloc Jams by Kamil B</div>
            <ul class="mdl-mini-footer__link-list">
              <li><a href="https://www.bloc.io">A Bloc.io Project</a></li>
            </ul>
          </div>
        </footer>

      </div>
    );

  }
}

export default App;
