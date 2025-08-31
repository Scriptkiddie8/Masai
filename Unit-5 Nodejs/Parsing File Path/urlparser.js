const url = require("url");

function parseURL(inputUrl) {
  const parsedUrl = new URL(inputUrl);

  const queryParams = {};
  parsedUrl.searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  return {
    hostname: parsedUrl.hostname,
    pathname: parsedUrl.pathname,
    query: queryParams,
  };
}

module.exports = parseURL;
