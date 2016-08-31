'use strict';

var React = require('react/addons');


// CSS
require('normalize.css');
require('../styles/main.scss');

/*var imageURL = require('../images/yeoman.png');*/
/*var dataJs = require('../data/imageDatas.json');*/



var GalleryByReactApp = React.createClass({
	render: function() {
		return (
			<div></div>
		);
	}
});
React.render(<GalleryByReactApp />, document.getElementById('content')); // jshint ignore:line

module.exports = GalleryByReactApp;
