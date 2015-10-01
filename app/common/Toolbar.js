import React from 'react';
import { Link } from 'react-router';

const Toolbar = () => (
	<div>
	<Link to={'/'}>Home</Link>
		<button>Hamburger</button>
		<button>Something</button>
		<button>Other thing</button>
	</div>
);

export default Toolbar;
