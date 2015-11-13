'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Imager = require('imager.js');

/**
 * Imager.jsx Component Factory
 *
 * @param {ImagerConfig|Object=} config Imager.js configuration object
 * @returns {ReactComponent}
 */
module.exports = function (config) {
  var imagerConfig = config || {};
  var imagesCache = [];
  var onResize = config.onResize || false;

  imagerConfig.onResize = false;
  imagerConfig.lazyload = false;
  imagerConfig.onImagesReplaced = function noop(){};

  // Where the magic happens.
  // A 'blind' Imager instance shared by all the rendered components.
  var imgr = new Imager([], imagerConfig);

  if (onResize) {
    Imager.addEvent(window, 'resize', Imager.debounce(function(){
      Imager.applyEach(imagesCache, function(component){
        component.refreshImageWidth();
      });
    }, 250));
  }

  return React.createClass({
    propTypes: {
      // mandatory props
      src: React.PropTypes.string,
      'background-src': React.PropTypes.string,
      // optional props
      alt: React.PropTypes.string,
      className: React.PropTypes.string
    },

    componentDidMount: function () {
      this.refreshImageWidth();

      if (onResize) {
        imagesCache.push(this);
      }
    },

    /**
     * Removes the unmounted component from the cache.
     */
    componentWillUnmount: function () {
      var self = this;

      if (onResize) {
        imagesCache = Imager.applyEach(imagesCache, function(component){
          return component === self ? null : component;
        }).filter(function(c){ return c; });
      }
    },

    componentDidUpdate: function () {
      this.refreshImageWidth();
    },

    getDefaultProps: function () {
      return {
        className: imgr.className,
        src: imgr.gif.src,
        alt: imgr.gif.src
      };
    },

    getInitialState: function () {
      return {
        width: undefined
      }
    },

    getImageSrc: function () {
      if (!this.state.width) {
        return imgr.gif.src;
      }

      return imgr.changeImageSrcToUseNewImageDimensions(this.props.src, this.state.width).replace('{height}', this.state.height);
    },

    refreshImageWidth: function () {
      var node = ReactDOM.findDOMNode(this);
      var height = node.offsetHeight;
      var width = imgr.determineAppropriateResolution(node);

      if (width !== this.state.width) {
        this.setState({ width: width, height: height });
      }
    },

    render: function () {
      var imageSrc = this.getImageSrc();

      // Background image element
      if (this.props.children) {
        var containerStyles = {
          backgroundImage: 'url("' + imageSrc + '")'
        };

        return (<div style={containerStyles} className={this.props.className} data-src={this.props.src}>{this.props.children}</div>);
      }
      // Image element
      else {
        return (<img src={imageSrc} className={this.props.className} data-src={this.props.src} alt={this.props.alt} />);

      }
    }
  });
};
