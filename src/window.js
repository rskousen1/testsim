import React from 'react';
import { windowZIndex } from './index.js'

// Incoming props to the PopupWindow should include an object containing:
  // index - the index into the windowZIndex array
  // widthRatio - ratio (0.1 - 1.0) of browser window width to use for this popup window
  // heightRatio - ratio (0.1 - 1.0) of browser window height to use for this popup window
  // taskBarWidthRatio - ratio (0.1 - 1.0) of browser window width to use for the taskbar clickable div left position
  // taskBarHeightRatio - ratio (0.1 - 1.0) of browser window height to use for the taskbar clickable div top position
  // sidebarItemHeight - height of clickable sidebar items in this window
  // sidebarItemWidth - width of clickable sidebar items in this window
  // sidebarItemLeft - left position of the sidebar items
  // sidebarItemTop - top position of the sidebar items
  // backgroundPngs - array of pngs that sidebar clicks will display
export class PopupWindow extends React.Component {
  constructor(props) {
    super(props);
	this.state = {
		display: "none",
		left: 100 + Math.random() * 400,	// Position the popup randomly like windows does
		top: 50 + Math.random() * 100,
		windowDrag: false,
		background: this.props.win.backgroundPngs[0],
		zindex: 0
	};
  }
  render() {
	// Create the styles for the div that holds the main popup window
	var windowWidth = window.innerWidth * this.props.win.widthRatio;
    var mainWindowStyle = {
      height: window.innerHeight * this.props.win.heightRatio,
	  width: windowWidth,
	  position: "fixed",
	  left: this.state.left,
	  top: this.state.top,
	  display: this.state.display,
      userSelect: "none",
	  zIndex: this.state.zIndex
	};
	// Add the styles for a clickable div over the X in the upper right corner of the window to close it
	var closeWindowDivStyle = {
      height: 20,
	  width: 20,
	  position: "absolute",
	  // backgroundColor: "blue",		// To see the clickable area, uncomment this line
	  right: 10,
	  top: 5
	};
	// Add the styles for a clickable div over the top menu bar so the window can be moved
	var menuBarDivStyle = {
      height: 20,
	  width: windowWidth - 70,
	  position: "absolute",
	  // backgroundColor: "blue",		// To see the clickable area, uncomment this line
	  right: 35,
	  top: 5
	};
	// Add the styles for a div over the icon in the Windows Task Bar that will bring up this window
    var taskBarClickStyle = {
      height: 30,
	  width: 40,
	  position: "fixed",
	  // backgroundColor: "blue",		// To see the clickable area, uncomment this line
	  left: window.innerWidth * this.props.win.taskBarWidthRatio,
	  top: window.innerHeight * this.props.win.taskBarHeightRatio
	};

	// Create each of the styles for side bar clickable divs that will change the window's contents
    var sidebarStyle = {
      height: this.props.win.sidebarItemHeight,
	  width: this.props.win.sidebarItemWidth,
	  position: "absolute",
	  // backgroundColor: "blue",		// To see the clickable area, uncomment this line
	  left: this.props.win.sidebarItemLeft
	};
	var sidebarTop = this.props.win.sidebarItemTop * window.innerHeight / 750;
	const sidebar = [];
	for (var i = 0; i < this.props.win.backgroundPngs.length; i++) {
		sidebarStyle.top = sidebarTop + i * this.props.win.sidebarItemHeight;
		const tmp = JSON.parse(JSON.stringify(sidebarStyle));	// Clone this object so that we get unique divs
		const x = i;
		sidebar.push(<div onClick={() => this.switchBackground(x)} style={tmp} />);
	}
	
	// Return the HTML code to create this popup window
    return <div>
      <div onMouseMove={(ev) => this.windowMoving(ev)} onMouseUp={this.stopWindowMove} onClick={this.raiseZIndexValue} style={mainWindowStyle}>
	    <img src={this.state.background} alt="popup window" style={{height:"100%",width:"100%"}} />
		<div onMouseDown={(ev) => this.startWindowMove(ev)} style={menuBarDivStyle} />
		<div onClick={this.hide} style={closeWindowDivStyle} />
		{sidebar}
	  </div>
      <div onClick={this.show} style={taskBarClickStyle} />
	</div>
  }
  // Make sure this window has the highest zIndex value so it is at the front
  raiseZIndexValue = () => {
	var max = 0;
	for (var i = 0; i < windowZIndex.length; i++) {
	  if (i !== this.props.win.index && windowZIndex[i] >= max) {
	    max = windowZIndex[i] + 1;
	  }
	}
	windowZIndex[this.props.win.index] = max;
	this.setState({zIndex: max});
  }
  // Show the window and bring it to the front
  show = () => {
	this.raiseZIndexValue();
	this.setState({display: "block"});
  }
  // Hide the window so that it looks like the program was closed
  hide = () => {
	windowZIndex[this.props.win.index] = 0;
    this.setState({display: "none"});
  }
  // A mouse down on the top menu bar div has occurred. Remember where we started moving, and turn on windowDrag
  mousex = 0;
  mousey = 0;
  startx = 0;
  starty = 0;
  startWindowMove = (ev) => {
	if (this.state.windowDrag === false) {
	  this.raiseZIndexValue();
	  this.mousex = ev.clientX;
	  this.mousey = ev.clientY;
	  this.startx = this.state.left;
	  this.starty = this.state.top;
      this.setState({windowDrag: true});
	}
  }
  // If we are in windowDrag mode, move the window
  windowMoving = (ev) => {
	if (this.state.windowDrag === true) {
	  this.setState({left: this.startx + ev.clientX - this.mousex, top: this.starty + ev.clientY - this.mousey});
	}
  }
  // A mouse up was detected, stop moving the window
  stopWindowMove = () => {
    this.setState({windowDrag: false});
  }
  // A sidebar item in the window was clicked, change the background to make it seem like this item was clicked on
  switchBackground = (which) => {
	this.setState({background: this.props.win.backgroundPngs[which]});
  }
}

