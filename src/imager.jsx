'use strict';

var isBrowser = (typeof window !== 'undefined');

var React = require('react');

var Imager = isBrowser ? require('imager.js') : null;

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
  var imgr = isBrowser ? new Imager([], imagerConfig) : null;

  if (isBrowser && onResize) {
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
      // optional props
      lowSrc: React.PropTypes.string,
      alt: React.PropTypes.string,
      className: React.PropTypes.string
    },

    componentDidMount: function () {
      this.refreshImageWidth();

      if (isBrowser && onResize) {
        imagesCache.push(this);
      }
    },

    /**
     * Removes the unmounted component from the cache.
     */
    componentWillUnmount: function () {
      var self = this;

      if (isBrowser && onResize) {
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
        className: imgr ? imgr.className : 'image-replace', // add imagers className to server side rendering. It's kind of dirty but fixes Reacts invalid checksum warning for now.
        src: imgr ? imgr.gif.src : '',
        alt: imgr ? imgr.gif.src : '' // <-- why are you using the src as alt attribute here?
      };
    },

    getInitialState: function () {
      return {
        width: undefined
      }
    },

    getLowSrc: function () {
      var lowSrc = this.props.src;

      if (this.props.lowSrc) {
        lowSrc = this.props.lowSrc;
      }
      else if (imgr) {
        lowSrc = imgr.gif.src;
      }

      return lowSrc;
    },

    getImageSrc: function () {
      if (!this.state.width) {
        return this.getLowSrc();
      }

      return imgr.changeImageSrcToUseNewImageDimensions(this.props.src, this.state.width).replace('{height}', this.state.height);
    },

    refreshImageWidth: function () {
      var node = this.getDOMNode();
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