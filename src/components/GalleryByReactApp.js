'use strict';

var React = require('react/addons');


// CSS
require('normalize.css');
require('../styles/main.scss');

/*var imageURL = require('../images/yeoman.png');*/
//获取图片相关的数据
var imageDatas = require('../data/imageDatas.json');
//利用自执行函数，将图片信息转换成图片url信息
imageDatas = (function genImagesData(imagesDataArr) {
	for(var i = 0; i < imagesDataArr.length; i++) {
		var singelImages = imagesDataArr[i];
		singelImages.getUrlImages = require('../images/' + singelImages.filename);
	}
	return imagesDataArr;
})(imageDatas);

function getRangeRandom(low, high) {
	return Math.ceil(Math.random() * (high - low) + low);
 }


var ImgFigure = React.createClass({
	render: function() {

		var styleObj = {};
		//如果props属性指定了这张图片的位置，则使用

		if(this.props.arrange.pos) {
			styleObj = this.props.arrange.pos;
		}

		return (
			<figure className="img-figure" style = {styleObj}>
				<img src={this.props.data.getUrlImages} alt={this.props.data.title} />
				<figcaption>
					<h2 className="title-figure">{this.props.data.title}</h2>
				</figcaption>
			</figure>
		);
	}
});

var GalleryByReactApp = React.createClass({
  Constant: {
  centerPos: {
	left: 0,
	right: 0
  },
  hPosRange: { //水平方向的取值
	leftSecX: [0, 0],
	rightSecX: [0, 0],
	y: [0, 0]
  },
  vPosRange: {
	x: [0, 0],
	topY: [0, 0]
  }
  },
  //指定居中排布的图片
  rearrange: function(centerIndex) {
  var imgsArr = this.state.imgsArr;
	var Constant = this.Constant;
	var centerPos = Constant.centerPos;
	var hPosRange = Constant.hPosRange;
	var vPosRange = Constant.vPosRange;
	var hPosRangeLeftSesX = hPosRange.leftSecX;
	var hPosRangeRightSesX = hPosRange.rightSecX;

	var hPosRangeY = hPosRange.y;
	var vPosRangeTopY = vPosRange.topY;
	var vPosRangeX = vPosRange.x;
	var imgArrangeTopArr = [];
	//取一个或者不取
	var topImgNum = Math.ceil(Math.random() * 2);

	var topImgSpliceIndex = 0;

	var imgsArrageCenterArr = imgsArr.splice(centerIndex, 1);

//首先居中centerIndex的图片
imgsArrageCenterArr[0].pos = centerPos;

//获取布局上侧的状态信息
topImgSpliceIndex = Math.ceil(Math.random() * (imgsArr.length - topImgNum));


imgArrangeTopArr = imgsArr.splice( topImgSpliceIndex, topImgNum);

//布局上测的图片
imgArrangeTopArr.forEach(function(value, index) {
	imgArrangeTopArr[index].pos = {
		top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
		left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
	};
 });

//布局两侧的图片
for(var i = 0, j = imgsArr.length, k = j / 2; i < j; i++) {
	var hPosRangeLORX = null;
	//前半部分布局左边，有半部分布局右边
	if(i < k) {
		hPosRangeLORX = hPosRangeLeftSesX;
	}else{
		hPosRangeLORX = hPosRangeRightSesX;
	}

	imgsArr[i].pos = {
		top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
		left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
	};
}
if(imgArrangeTopArr && imgArrangeTopArr[0]) {
	imgsArr.splice(topImgSpliceIndex, 0, imgArrangeTopArr[0]);
}

imgsArr.splice(centerIndex, 0, imgsArrageCenterArr[0]);

this.setState({
	imgsArr: imgsArr
});



},
getInitialState: function() {
 return {
  imgsArr: [
	/*{
		pos:{
			left:"0",
			top:"0"
		}
	}*/

  ]
 };

},
//组件加载以后，为每张图片计算其位置的范围
componentDidMount: function() {
//获取舞台的大小
var stageDom = React.findDOMNode(this.refs.stage),
	stageW = stageDom.scrollWidth,
	stageH = stageDom.scrollHeight,
	halfStageW = Math.ceil(stageW / 2),
	halfStageH = Math.ceil(stageH / 2);

//获取imgFigure的大小
var imgFigureDOM = React.findDOMNode(this.refs.imgFigures0),
	imgW = imgFigureDOM.scrollWidth,
	imgH = imgFigureDOM.scrollHeight,
	halfImgW = Math.ceil(imgW / 2),
	halfImgH = Math.ceil(imgH / 2);

//计算中心图片的位置
this.Constant.centerPos = {
	left: halfStageW - halfImgW,
	top: halfStageH - halfImgH
};
this.Constant.hPosRange.leftSecX[0] = -halfImgW;
this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;

this.Constant.hPosRange.y[0] = -halfImgH;
this.Constant.hPosRange.y[1] = stageH - halfImgH;

this.Constant.vPosRange.topY[0] = -halfImgH;
this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
this.Constant.vPosRange.x[0] = halfStageW - imgW;
this.Constant.vPosRange.x[1] = halfStageW;
this.rearrange(0);
},

render: function() {

var controllerUnits = [],
imgFigures = [];
imageDatas.forEach(function(value, index) {
	if(!this.state.imgsArr[index]) {
		this.state.imgsArr[index] = {
			pos: {
				left: '0',
				top: '0'
			}
		};
	}
imgFigures.push(<ImgFigure data={value} arrange={this.state.imgsArr[index]} ref={'imgFigures' + index}/>);
}.bind(this));
return (
 <section className="stage" ref="stage">
	<section className="img-sec">
	{imgFigures}
	</section>
	<nav className="controller-nav">
	{controllerUnits}
	</nav>
 </section>
);
}
});
React.render(<GalleryByReactApp />, document.getElementById('content')); // jshint ignore:line

module.exports = GalleryByReactApp;
