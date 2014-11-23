/** @jsx React.DOM */

'use strict';

var React = require('react');
var Imager = require('imager.js');

module.exports = function(imagerConfig){
  var imgr = new Imager([], imagerConfig);

  return React.createClass({
    propTypes: {
      src: React.PropTypes.string.isRequired,
      alt: React.PropTypes.string
    },

    componentDidMount: function(){
      var node = this.getDOMNode();

      this.setState({ width: imgr.determineAppropriateResolution(node) });
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

    render: function(){
      var imageSrc = this.getImageSrc();

      return (<img src={imageSrc} data-src={this.props.src} alt={this.props.alt} />);
    }
  });
};