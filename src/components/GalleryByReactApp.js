'use strict';

var React = require('react/addons');


// CSS
require('normalize.css');
require('../styles/main.scss');

/*var imageURL = require('../images/yeoman.png');*/
//获取图片相关的数据
var imageDatas = require("../data/imageDatas.json");
//利用自执行函数，将图片信息转换成图片url信息
imageDatas = (function genImagesData(imagesDataArr) {
	for(var i = 0; i<imagesDataArr.length; i++) {
		var singelImages = imagesDataArr[i];
		singelImages.getUrlImages = require("../images/"+singelImages.filename);
	}
	return imagesDataArr;
})(imageDatas);


var GalleryByReactApp = React.createClass({
  render: function() {
    return (
     	<section className="stage">
     		<section className="img-sec">

     		</section>
     		<nav className="controller-nav"></nav>
     	</section>
    );
  }
});
React.render(<GalleryByReactApp />, document.getElementById('content')); // jshint ignore:line

module.exports = GalleryByReactApp;
