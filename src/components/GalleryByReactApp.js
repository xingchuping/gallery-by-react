'use strict';

var React = require('react/addons');

var imagePath = 'http://218.244.129.175:8011/images/';

var title = 'Hevaen a time';
var desc = 'Here he comes Here comes Speed Racer.';
var imageDatas = [
	{
		'filename': imagePath + 'img1.jpg',
		'title': title,
		'desc': desc
	},
	{
		'filename': imagePath + 'img2.jpg',
		'title': title,
		'desc': desc
	},
	{
		'filename': imagePath + 'img3.jpg',
		'title': title,
		'desc': desc
	},
	{
		'filename': imagePath + 'img4.jpg',
		'title': title,
		'desc': desc
	},
	{
		'filename': imagePath + 'img5.jpg',
		'title': title,
		'desc': desc
	},
	{
		'filename': imagePath + 'img6.jpg',
		'title': title,
		'desc': desc
	},
	{
		'filename': imagePath + 'img7.jpg',
		'title': title,
		'desc': desc
	},
	{
		'filename': imagePath + 'img8.jpg',
		'title': title,
		'desc': desc
	},
	{
		'filename': imagePath + 'img9.jpg',
		'title': title,
		'desc': desc
	},
	{
		'filename': imagePath + 'img10.jpg',
		'title': title,
		'desc': desc
	},
	{
		'filename': imagePath + 'img11.jpg',
		'title': title,
		'desc': desc
	},
	{
		'filename': imagePath + 'img12.jpg',
		'title': title,
		'desc': desc
	},
	{
		'filename': imagePath + 'img13.jpg',
		'title': title,
		'desc': desc
	},
	{
		'filename': imagePath + 'img14.jpg',
		'title': title,
		'desc': desc
	},
	{
		'filename': imagePath + 'img15.jpg',
		'title': title,
		'desc': desc
	},
	{
		'filename': imagePath + 'img16.jpg',
		'title': title,
		'desc': desc
	}
];

// CSS
require('normalize.css');
require('../styles/main.scss');

/*var imageURL = require('../images/yeoman.png');*/
//获取图片相关的数据
//var imageDatas = require('../data/imageDatas.json');
//利用自执行函数，将图片信息转换成图片url信息
/*imageDatas = (function genImagesData(imagesDataArr) {
	for(var i = 0; i < imagesDataArr.length; i++) {
		var singelImages = imagesDataArr[i];
		singelImages.getUrlImages = require('../images/' + singelImages.filename);
	}
	return imagesDataArr;
})(imageDatas);*/

//获取两者之间的随机数
function getRangeRandom(low, high) {
	return Math.ceil(Math.random() * (high - low) + low);
 }

//获取0~30度之间的随机数
function getDeg30() {
	return (Math.random() > 0.5 ? '' : '-') + Math.ceil((Math.random() * 30));
}


var ImgFigure = React.createClass({
	//imgFigured点击处理函数
	handleClick: function(e) {
		if(this.props.arrange.isCenter) {
			this.props.inserves();
		}else{
			this.props.center();
		}
		e.stopPropagation();
		e.preventDefault();
	},

	render: function() {

		var styleObj = {};

		//如果props属性指定了这张图片的位置，则使用
		if(this.props.arrange.pos) {
			styleObj = this.props.arrange.pos;
		}

		//如果图片的旋转角度有值不为0，添加旋转角度
		if(this.props.arrange.rotate !== 0) {  //    transform: rotate;
			['MozTransform', 'WebkitTransform', ''].forEach(function(value) {
				styleObj[value + 'transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
			}.bind(this));
		}

		var imgFigure = 'img-figure';
		imgFigure += this.props.arrange.isInverse ? ' is-inverse' : '';
		return (
			<figure className={imgFigure} style = {styleObj} onClick = {this.handleClick}>
				<img src={this.props.data.filename} alt={this.props.data.title} />
				<figcaption>
					<h2 className="title-figure">{this.props.data.title}</h2>
					<div className = "img-back" onClick = {this.handleClick}>
						<p>
							{this.props.data.desc}
						</p>
					</div>
				</figcaption>
			</figure>
		);
	}
});

//控制组件
var ControllerUnit = React.createClass({
	handleClick: function() {
		//如果点击的是当前正在选中态的按钮，则翻转按钮，否则将对应的图片居中
		if(this.props.arrange.isCenter) {
			this.props.inserves();
		}else{
			this.props.center();
		}
	},
	render: function() {
		var controllerUnitClassName = "controller-unit";
		//如果对应的是居中的图片，显示居中按钮
		if(this.props.arrange.isCenter) {
			controllerUnitClassName += " is-center";
		}

		//如果对应的是翻转图片，则切换翻转态
		if(this.props.arrange.isInverse) {
			controllerUnitClassName += " is-inverse";
		}
		return (
			<span className={controllerUnitClassName} onClick = {this.handleClick}></span>
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

  //翻转图片，index 输入当前被执行inserve操作的图片对应的index值
	inserves: function(index) {
	return function() {
	var imgsArr = this.state.imgsArr;
	imgsArr[index].isInverse = !imgsArr[index].isInverse;
	this.setState({
		imgsArr: imgsArr
	});
	}.bind(this);
  },
  /*利用rearrange函数， 居中对应index的图片*/
  center: function(index) {
	return function() {
		this.rearrange(index);
	}.bind(this);

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
	var topImgNum = Math.floor(Math.random() * 2);

	var topImgSpliceIndex = 0;

	var imgsArrageCenterArr = imgsArr.splice(centerIndex, 1);

//首先居中centerIndex的图片
imgsArrageCenterArr[0].pos = centerPos;

//居中的centerIndex 图片不需要旋转
imgsArrageCenterArr[0].rotate = 0;

//居中图片isCenter为true
imgsArrageCenterArr[0].isCenter = true;

//获取布局上侧的状态信息
topImgSpliceIndex = Math.ceil(Math.random() * (imgsArr.length - topImgNum));


imgArrangeTopArr = imgsArr.splice( topImgSpliceIndex, topImgNum);




//布局上测的图片
imgArrangeTopArr.forEach(function(value, index) {
	imgArrangeTopArr[index] = {
		pos: {
			top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
			left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
		},
		rotate: getDeg30(),
		isCenter: false
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

	imgsArr[i] = {
		pos: {
			top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
			left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
		},
		rotate: getDeg30(),
		isCenter: false
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
		},
		rotate: 0, //旋转角度
		isInverse:false, //图片正反面
		isCenter: false //图片是否居中，默认不居中

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
			},
			rotate: 0,
			isInverse: false,
			isCenter: false
		};
	}
imgFigures.push(<ImgFigure key = {index} data={value} arrange={this.state.imgsArr[index]} ref={'imgFigures' + index} inserves = {this.inserves(index)} center = {this.center(index)} />);
controllerUnits.push(<ControllerUnit key = {index} arrange={this.state.imgsArr[index]} inserves = {this.inserves(index)} center = {this.center(index)} />);
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
