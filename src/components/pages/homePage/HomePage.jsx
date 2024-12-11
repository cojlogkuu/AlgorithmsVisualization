import React from 'react';
import './homePage.css';
import {Link} from "react-router-dom";

const HomePage = () => {
	return (
			<main className="homePage">
				<div className="container">
					<div className="link">
						<h2>Depth First Search</h2>
						<Link to='/graph'>Start</Link>
					</div>
					<div className="link">
						<h2>AVL tree</h2>
						<Link to='/dataStructure'>Start</Link>
					</div>
				</div>
				<footer>
					<h3>Internet of Things</h3>
					<p>2024</p>
				</footer>
			</main>
	);
};

export default HomePage;