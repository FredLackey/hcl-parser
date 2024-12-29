const TAB_SIZE = 2;

const NODE_TYPES = {
  RESOURCE: 'resource',
  MODULE  : 'module',
  PROVIDER: 'provider',
  VARIABLE: 'variable',
  OUTPUT  : 'output',
  LOCALS  : 'locals',
  DATA    : 'data',
}

const LINE_TYPES = {
  ARRAY          : 'ARRAY',
  ARRAY_START    : 'ARRAY_START',
  ARRAY_END      : 'ARRAY_END',
  DATA_START     : 'DATA_START',
  DATA_END       : 'DATA_END',
  TAGS_START     : 'TAGS_START',
  TAGSALL_START  : 'TAGSALL_START',
  EMPTY_PROPERTY : 'EMPTY_PROPERTY',
  PROPERTY       : 'PROPERTY',
  QUOTED_PROPERTY: 'QUOTED_PROPERTY',
  EMPTY          : 'EMPTY',
  NODE_START     : 'NODE_START',
  NODE_END       : 'NODE_END',
  COMMENT        : 'COMMENT',
  UNKNOWN        : 'UNKNOWN',
  INVALID        : 'INVALID',
}

module.exports = {
  TAB_SIZE,
  NODE_TYPES,
  LINE_TYPES
};