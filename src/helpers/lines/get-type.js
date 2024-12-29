const _                = require('cleaner-node');
const isArray          = require('./is-array');
const isArrayEnd       = require('./is-array-end');
const isArrayStart     = require('./is-array-start');
const isComment        = require('./is-comment');
const isDataEnd        = require('./is-data-end');
const isDataStart      = require('./is-data-start');
const isEmptyProperty  = require('./is-empty-property');
const isEmpty          = require('./is-empty');
const isNodeEnd        = require('./is-node-end');
const isNodeStart      = require('./is-node-start');
const isProperty       = require('./is-property');
const isQuotedProperty = require('./is-quoted-property');
const isTagsStart      = require('./is-tags-start');
const isTagsAllStart   = require('./is-tags-all-start');

const { LINE_TYPES } = require('../../constants');

const getType = line => {

  //#region VALIDATION
  if (!_.isValidString(line, true)) {
    return LINE_TYPES.INVALID;
  }
  if (isEmpty(line)) {
    return LINE_TYPES.EMPTY;
  }
  //#endregion
  //#region TAGS
  if (isTagsStart(line)) {
    return LINE_TYPES.TAGS_START;
  }
  if (isTagsAllStart(line)) {
    return LINE_TYPES.TAGSALL_START;
  }
  //#endregion
  //#region COMMENTS
  if (isComment(line)) {
    return LINE_TYPES.COMMENT;
  }
  //endregion
  //#region NODES
  if (isNodeStart(line)) {
    return LINE_TYPES.NODE_START;
  }
  if (isNodeEnd(line)) {
    return LINE_TYPES.NODE_END;
  }
  //#endregion
  //#region PROPERTIES
  if (isQuotedProperty(line)) {
    return LINE_TYPES.QUOTED_PROPERTY;
  }
  if (isEmptyProperty(line)) {
    return LINE_TYPES.EMPTY_PROPERTY;
  }
  if (isProperty(line)) {
    return LINE_TYPES.PROPERTY;
  }
  //#endregion
  //#region ARRAYS
  if (isArrayStart(line)) {
    return LINE_TYPES.ARRAY;
  }
  if (isArrayStart(line)) {
    return LINE_TYPES.ARRAY_START;
  }
  if (isArrayEnd(line)) {
    return LINE_TYPES.ARRAY_END;
  }
  //#endregion
  //#region DATA
  if (isDataStart(line)) {
    return LINE_TYPES.DATA_START;
  }
  if (isDataEnd(line)) {
    return LINE_TYPES.DATA_END;
  }
  //#endregion

  return LINE_TYPES.UNKNOWN;
};

module.exports = getType;
