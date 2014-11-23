'use strict';

var React = require('react');
var Imager = require('imager.js');

/**
 * Imager.jsx Component Factory
 *
 * @param {ImagerConfig|Object=} config Imager.js configuration object
 * @returns {ReactComponent}
 */
module.exports = function (config) {
  var imagerConfig = config || {};

  imagerConfig.onResize = false;
  imagerConfig.lazyload = false;
  imagerConfig.onImagesReplaced = function noop(){};

  // Where the magic happens.
  // A 'blind' Imager instance shared by all the rendered components.
  var imgr = new Imager([], imagerConfig);

  return React.createClass({
    propTypes: {
      // mandatory props
      src: React.PropTypes.string.isRequired,
      // optional props
      alt: React.PropTypes.string,
      className: React.PropTypes.string
    },

    componentDidMount: function () {
      this.refreshImageWidth();
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

      return imgr.changeImageSrcToUseNewImageDimensions(this.props.src, this.state.width);
    },

    refreshImageWidth: function () {
      var width = imgr.determineAppropriateResolution(this.getDOMNode());

      if (width !== this.state.width) {
        this.setState({ width: width });
      }
    },

    render: function () {
      var imageSrc = this.getImageSrc();

      return (<img src={imageSrc} className={this.props.className} data-src={this.props.src} alt={this.props.alt} />);
    }
  });
};