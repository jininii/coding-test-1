import React from 'react';
import './Main.scss';
import AllContents from '../../components/AllContents/AllContents';
import Playlist from '../../components/Playlist/Playlist';
import Header from '../../components/Header/Header';
import RecentPlaylist from '../../components/RecentPlaylist/RecentPlaylist';

const Main = () => {
  return (
    <main className="mainWrap">
      <header className="top">
        <Header />
      </header>
      <div className="container">
        <section className="contents">
          <RecentPlaylist />
          <AllContents />
        </section>
        <aside>
          <Playlist />
        </aside>
      </div>
    </main>
  );
};

export default Main;
