import _ from "lodash";

export function useAPI(path: String) {
  if (_.eq(ENV, "mock")) return _.isNil(path) ? API_MOCK : API_MOCK + path;
  if (_.eq(ENV, "local")) return _.isNil(path) ? API_LOCAL : API_LOCAL + path;
  if (_.eq(ENV, "staging"))
    return _.isNil(path) ? API_STAGING : API_STAGING + path;
  if (_.eq(ENV, "production"))
    return _.isNil(path) ? API_PRODUCTION : API_PRODUCTION + path;
}
