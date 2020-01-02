import React from 'react';
import ReactDOM from 'react-dom';

class SettingsMainWindow extends React.Component {
  constructor(props) {
    super(props);
	this.state = {
		display: "none",
		left: 100,
		top: 150,
		windowDrag: false,
		background: "/images/network_status.png"
	};
  }
  render() {
	// Create the div that holds the Settings window
	var windowWidth = window.innerWidth * 0.5;
    var mainWindowStyle = {
      height: window.innerHeight * 0.7,
	  width: windowWidth,
	  position: "fixed",
	  left: this.state.left,
	  top: this.state.top,
	  display: this.state.display,
      userSelect: "none"
	};
	// Add a clickable div over the X in the upper right corner
	var closeWindowDivStyle = {
      height: 20,
	  width: 20,
	  position: "absolute",
	  right: 10,
	  top: 5
	};
	// Add a clickable div over the top menu bar so the window can be moved
	var menuBarDivStyle = {
      height: 20,
	  width: windowWidth - 70,
	  position: "absolute",
	  right: 35,
	  top: 5
	};
	// Add a div over the Settings icon in the Windows Task Bar that will bring up the Settings main window
    var taskBarClickStyle = {
      height: 30,
	  width: 40,
	  position: "fixed",
	  left: window.innerWidth * 0.135,
	  top: window.innerHeight * 0.945
	};

    var sidebarStyle = {
      height: 30,
	  width: 220,
	  position: "absolute",
	  left: 10
	};
	// Create the side bar clickable divs that will change the window's contents
	const sidebar = [];
	for (var i = 0; i < this.pngs.length; i++) {
		sidebarStyle.top = 135 + i * 30;
		const tmp = JSON.parse(JSON.stringify(sidebarStyle));
		const x = i;
		sidebar.push(<div onClick={() => this.switchBackground(x)} style={tmp} />);
	}
	
    return <div>
	  <div style={mainWindowStyle}>
	    <img src={this.state.background} alt="Network status window" style={{height:"100%",width:"100%"}} />
		<div onMouseDown={(ev) => this.startWindowMove(ev)} onMouseMove={(ev) => this.windowMoving(ev)} onMouseUp={this.stopWindowMove} style={menuBarDivStyle} />
		<div onClick={this.hide} style={closeWindowDivStyle} />
			{sidebar}
	  </div>
      <div onClick={this.show} style={taskBarClickStyle} />
	</div>
  }
  show = () => {
    this.setState({display: "block"});
  }
  hide = () => {
    this.setState({display: "none"});
  }
  mousex = 0;
  mousey = 0;
  startx = 0;
  starty = 0;
  startWindowMove = (ev) => {
	if (this.state.windowDrag == false) {
	  this.mousex = ev.clientX;
	  this.mousey = ev.clientY;
	  this.startx = this.state.left;
	  this.starty = this.state.top;
      this.setState({windowDrag: true});
	}
  }
  windowMoving = (ev) => {
	if (this.state.windowDrag == true) {
	  this.setState({left: this.startx + ev.clientX - this.mousex, top: this.starty + ev.clientY - this.mousey});
	}
  }
  stopWindowMove = () => {
    this.setState({windowDrag: false});
  }
  pngs = ["/images/network_status.png", "/images/network_wifi.png", "/images/network_ethernet.png"];
  switchBackground = (which) => {
	this.setState({background: this.pngs[which]});
  }
}

var mainStyle = {
  width: window.innerWidth - 30,
  height: window.innerHeight - 20,
  userSelect: "none"
};
const mainWindow = <div>
  {/* The desktop image */}
  <img src="/images/desktop.png" alt="main window" style={mainStyle} />
  <SettingsMainWindow />
</div>

ReactDOM.render(mainWindow, document.getElementById('root'));