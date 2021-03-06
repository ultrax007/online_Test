import React, { Component } from "react";
import "../sass/ConductTest.sass";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
/**
 * @type {Object}
 */
const useStyles = makeStyles({
	root: {
		width: "100%",
		borderRadius: "20px",
	},
	title: {
		color: "rgba(1, 122, 146, 0.75)",
		fontSize: 30,
		fontWeight: "600",
		textAlign: "center",
	},
	content: {
		padding: "5px !important",
	},
});

/**
 * 
 * @param {Object} props - minutes and seconds 
 * @returns {HTMLElement} - a html element or a section to be rendered
 */
const DisplayTimer = (props) => {
  /**
   * assigns styles class instance as classes
   * @type {Object} 
   */
	const classes = useStyles();
	return (
		<Card
			classes={{
				root: classes.root,
			}}
		>
			<CardContent
				classes={{
					root: classes.content,
				}}
			>
				<Typography classes={{ root: classes.title }}>
					{props.mns} : {props.snds}
				</Typography>
			</CardContent>
		</Card>
	);
};

/**
 * class to create a timer object
 */
class Timer extends Component {
  /**
   * @type {Object} 
   */
	state = {
		timerOn: false,
		timerStart: 0,
		timerTime: 3600000,
  };
  
  /**
   * @property {funtion} - mounts after page is loaded
   */
	componentDidMount() {
		this.startTimer();
  }
  /**
   * @property {Function} - runs inside code just before code mounts
   */
	componentWillUnmount() {
		clearInterval(this.timer);
		this.setState({ timerOn: false });
  }
  /**
   * @property {Function} - starts the timer at initialization
   */
	startTimer = () => {
		this.setState({
			timerOn: true,
			timerTime: this.state.timerTime,
			timerStart: this.state.timerTime,
		});
		this.timer = setInterval(() => {
			const newTime = this.state.timerTime - 10;
			if (newTime >= 0) {
				this.setState({
					timerTime: newTime,
				});
			} else {
				clearInterval(this.timer);
				this.setState({ timerOn: false });
				alert("Countdown ended");
			}
		}, 10);
	};
  /**
   * @property {Function} - renders the content in browser
   * @returns {HTMLElement} - display timer card 
   */
  render() {
    /**
     * @property {String|number} - destructed state variable to make ease of access
     */
    const { timerTime } = this.state;
    /**
     * calculate number of seconds
     * @type {number} 
     */
    let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
    /**
     * calculate number of minutes
     * @type {number}
     */
    let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
		return <DisplayTimer snds={seconds} mns={minutes} />;
	}
}
export default Timer;
