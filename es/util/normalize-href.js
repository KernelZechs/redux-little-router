var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function parsePath(path) {
  var pathname = path || '/';
  var search = '';
  var hash = '';
  var hashIndex = pathname.indexOf('#');

  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');

  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
}

import qs from 'query-string';

export default (function (href) {
  if (typeof href === 'string') {
    console.log(href);
    var _parsePath = parsePath(href);
    var _parsePath$search = _parsePath.search;
    var _search = _parsePath$search === undefined ? '' : _parsePath$search;
    var other = _objectWithoutProperties(_parsePath, ['search']);

    var _query = _search && qs.parse(_search);

    return _query ? _extends({}, other, { query: _query, search: _search }) : _extends({}, other);
  }

  var search = href.search,
      query = href.query;


  var resolvedSearch = search || query && Object.keys(query).length && '?' + qs.stringify(query) || '';
  var resolvedQuery = query || qs.parse(search || '');

  return _extends({}, href, {
    search: resolvedSearch,
    query: resolvedQuery
  });
});
