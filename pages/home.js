import React, { useRef } from 'react';
import SongList from '../components/songList';
import ConnectButton from '../components/connectionbutton';


const Home = () => {
  const songs = [
    { title: 'Song 1' },
    { title: 'Song 2' },
    { title: 'Song 3' },
    // Add more songs as needed
  ];

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  };

  const headerStyle = {
    backgroundColor: '#1db954',
    color: '#fff',
    padding: '20px',
    textAlign: 'right',
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#333',
    padding: '10px',
  };

  const navItemStyle = {
    color: '#fff',
    cursor: 'pointer',
  };

  const buttonStyle = {
    backgroundColor: '#1db954',
    color: '#fff',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
  };

  const songListContainerStyle = {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
  };

  const streamingSectionRef = useRef(null);
  const postStreamingSectionRef = useRef(null);
  const uploadAudioSectionRef = useRef(null);
  const accountSectionRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <ConnectButton onClick={() => console.log('Connect button clicked')} style={buttonStyle} />
      </header>
      <nav style={navStyle}>
        <div style={navItemStyle} onClick={() => scrollToSection(streamingSectionRef)}>
          Streaming
        </div>
        <div style={navItemStyle} onClick={() => scrollToSection(postStreamingSectionRef)}>
          Post Streaming
        </div>
        <div style={navItemStyle} onClick={() => scrollToSection(uploadAudioSectionRef)}>
          Upload Audio
        </div>
        <div style={navItemStyle} onClick={() => scrollToSection(accountSectionRef)}>
          Account
        </div>
      </nav>
      <div ref={streamingSectionRef} style={songListContainerStyle}>
        <h1 style={{ color: '#1db954' }}>Streaming Section</h1>
        {/* Content for Streaming Section */}
      </div>
      <div ref={postStreamingSectionRef} style={songListContainerStyle}>
        <h1 style={{ color: '#1db954' }}>Post Streaming Section</h1>
        {/* Content for Post Streaming Section */}
      </div>
      <div ref={uploadAudioSectionRef} style={songListContainerStyle}>
        <h1 style={{ color: '#1db954' }}>Upload Audio Section</h1>
        {/* Content for Upload Audio Section */}
      </div>
      <div ref={accountSectionRef} style={songListContainerStyle}>
        <h1 style={{ color: '#1db954' }}>Account Section</h1>
        {/* Content for Account Section */}
      </div>
    </div>
  );
};

export default Home;
