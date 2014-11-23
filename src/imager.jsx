'use strict';

var React = require('react');
var Imager = require('imager.js');

module.exports = function(config){
  var imagerConfig = config || {};

  imagerConfig.onResize = false;
  imagerConfig.lazyload = false;
  imagerConfig.onImagesReplaced = function noop(){};

  var imgr = new Imager([], imagerConfig);

  return React.createClass({
    propTypes: {
      src: React.PropTypes.string.isRequired,
      alt: React.PropTypes.string
    },

    componentDidMount: function(){
      this.refreshImageWidth();
    },

    componentDidUpdate: function(){
      this.refreshImageWidth();
    },

    getDefaultProps: function(){
      return {
	src: imgr.gif.src,
	alt: imgr.gif.src
      }
    },

    getInitialState: function(){
      return {
	width: null
      }
    },

    getImageSrc: function(){
      if (!this.state.width){
	return imgr.gif.src;
      }

      return imgr.changeImageSrcToUseNewImageDimensions(this.props.src, this.state.width);
    },

    refreshImageWidth: function(){
      var width = imgr.determineAppropriateResolution(this.getDOMNode());

      if (width !== this.state.width) {
	this.setState({ width: width });
      }
    },

    render: function(){
      var imageSrc = this.getImageSrc();

      return (<img src={imageSrc} data-src={this.props.src} alt={this.props.alt} />);
    }
  });
};