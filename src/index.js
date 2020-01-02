import React from 'react';
import ReactDOM from 'react-dom';
import { PopupWindow } from './window.js'

// Array to track which window is in front
export const windowZIndex = [0,0];

// Create the styles for the main window
var mainStyle = {
  width: window.innerWidth - 30,
  height: window.innerHeight - 20,
  userSelect: "none"
};

// Create the props for the Settings popup window
const settingsWindow = {
  index: 0,
  widthRatio: 0.5,
  heightRatio: 0.7,
  taskBarWidthRatio: 0.135,
  taskBarHeightRatio: 0.94,
  sidebarItemHeight: 30,
  sidebarItemWidth: 220,
  sidebarItemLeft: 2,
  sidebarItemTop: 135,
  backgroundPngs: ["/images/network_status.png", "/images/network_wifi.png", "/images/network_ethernet.png"]
};

// Create the props for the Explorer popup window
const explorerWindow = {
  index: 1,
  widthRatio: 0.5,
  heightRatio: 0.5,
  taskBarWidthRatio: 0.07,
  taskBarHeightRatio: 0.94,
  sidebarItemHeight: 16,
  sidebarItemWidth: 90,
  sidebarItemLeft: 2,
  sidebarItemTop: 123,
  backgroundPngs: ["/images/explorer_desktop.png", "/images/explorer_documents.png", "/images/explorer_downloads.png", "/images/explorer_music.png"]
};

// Render our windows
const mainWindow = 
<div>
  {/* The desktop image */}
  <img src="/images/desktop.png" alt="main window" style={mainStyle} />
  {/* The Settings window */}
  <PopupWindow win={settingsWindow} />
  {/* The Explorer window */}
  <PopupWindow win={explorerWindow} />
</div>

ReactDOM.render(mainWindow, document.getElementById('root'));

