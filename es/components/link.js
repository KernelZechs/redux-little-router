var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { push as pushAction, replace as replaceAction } from '../actions';
import mergeQueries from '../util/merge-queries';
import normalizeHref from '../util/normalize-href';
import stringifyHref from '../util/stringify-href';

var LEFT_MOUSE_BUTTON = 0;

var isNotLeftClick = function isNotLeftClick(e) {
  return e.button && e.button !== LEFT_MOUSE_BUTTON;
};

var hasModifier = function hasModifier(e) {
  return Boolean(e.shiftKey || e.altKey || e.metaKey || e.ctrlKey);
};

var shouldIgnoreClick = function shouldIgnoreClick(_ref) {
  var e = _ref.e,
      target = _ref.target;
  return hasModifier(e) || isNotLeftClick(e) || e.defaultPrevented || target;
};

var handleClick = function handleClick(_ref2) {
  var e = _ref2.e,
      target = _ref2.target,
      href = _ref2.href,
      onClick = _ref2.onClick,
      replaceState = _ref2.replaceState,
      persistQuery = _ref2.persistQuery,
      push = _ref2.push,
      replace = _ref2.replace;

  if (onClick) {
    onClick(e);
  }

  if (shouldIgnoreClick({ e: e, target: target })) {
    return;
  }

  e.preventDefault();

  var navigate = replaceState ? replace : push;
  navigate(href, { persistQuery: persistQuery });
};

// When persisting queries, we need to merge the persisted
// query with the link's new query.
var contextifyHref = function contextifyHref(href, location, persistQuery) {
  if (!persistQuery) {
    return href;
  }

  var mergedQuery = mergeQueries(location.query, href.query);

  return _extends({}, href, mergedQuery);
};

var LinkComponent = function (_Component) {
  _inherits(LinkComponent, _Component);

  function LinkComponent(props) {
    _classCallCheck(this, LinkComponent);

    return _possibleConstructorReturn(this, (LinkComponent.__proto__ || Object.getPrototypeOf(LinkComponent)).call(this, props));
  }

  _createClass(LinkComponent, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          rawHref = _props.href,
          location = _props.location,
          children = _props.children,
          onClick = _props.onClick,
          target = _props.target,
          activeProps = _props.activeProps,
          replaceState = _props.replaceState,
          persistQuery = _props.persistQuery,
          push = _props.push,
          replace = _props.replace,
          rest = _objectWithoutProperties(_props, ['href', 'location', 'children', 'onClick', 'target', 'activeProps', 'replaceState', 'persistQuery', 'push', 'replace']);

      // Ensure the href has both a search and a query when needed


      var normalizedHref = normalizeHref(rawHref);
      var href = contextifyHref(normalizedHref, location, persistQuery);
      var isActive = href.pathname === location.pathname;
      var activeRest = isActive && activeProps || {};

      var clickHandler = function clickHandler(e) {
        return handleClick({
          e: e,
          target: target,
          href: href,
          onClick: onClick,
          replaceState: replaceState,
          persistQuery: persistQuery,
          push: push,
          replace: replace
        });
      };

      return React.createElement(
        'a',
        _extends({
          href: stringifyHref(href, location.basename),
          onClick: clickHandler,
          target: target
        }, rest, activeRest),
        children
      );
    }
  }]);

  return LinkComponent;
}(Component);

var PersistentQueryLinkComponent = function (_Component2) {
  _inherits(PersistentQueryLinkComponent, _Component2);

  function PersistentQueryLinkComponent() {
    _classCallCheck(this, PersistentQueryLinkComponent);

    return _possibleConstructorReturn(this, (PersistentQueryLinkComponent.__proto__ || Object.getPrototypeOf(PersistentQueryLinkComponent)).apply(this, arguments));
  }

  _createClass(PersistentQueryLinkComponent, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          children = _props2.children,
          rest = _objectWithoutProperties(_props2, ['children']);

      return React.createElement(
        LinkComponent,
        _extends({}, rest, { persistQuery: true }),
        children
      );
    }
  }]);

  return PersistentQueryLinkComponent;
}(Component);

PersistentQueryLinkComponent.propTypes = {
  children: PropTypes.node
};

var mapStateToProps = function mapStateToProps(state) {
  return { location: state.router };
};
var mapDispatchToProps = {
  push: pushAction,
  replace: replaceAction
};
var withLocation = connect(mapStateToProps, mapDispatchToProps);

var LinkWithLocation = withLocation(LinkComponent);
var PersistentQueryLinkWithLocation = withLocation(PersistentQueryLinkComponent);

export { LinkWithLocation as Link, PersistentQueryLinkWithLocation as PersistentQueryLink, LinkComponent, PersistentQueryLinkComponent, mapDispatchToProps };