const ok = ({ data, location, contenttype = 'application/json' }) => {
  const HTTP_STATUS_CODE_200 = 200

  return {
    statusCode: HTTP_STATUS_CODE_200,
    headers: {
      'content-type': contenttype,
      location
    },
    payload: `{
      "data": ${JSON.stringify(data)}
    }`
  }
}

const notFound = ({ location }) => {
  const HTTP_STATUS_CODE_404 = 404

  const data = {
    message: `Resource not found: ${location}`
  }

  return {
    statusCode: HTTP_STATUS_CODE_404,
    headers: {
      'content-type': 'application/json',
      location
    },
    payload: `{
      "data": ${JSON.stringify(data)}
    }`
  }
}

const error = ({ location }) => {
  const HTTP_STATUS_CODE_500 = 500

  const data = {
    message: 'Unexpected error happened. Please contact administrator'
  }

  return {
    statusCode: HTTP_STATUS_CODE_500,
    headers: {
      'content-type': 'application/json',
      location
    },
    payload: `{
      "data": ${JSON.stringify(data)}
    }`
  }
}

module.exports = {
  ok,
  notFound,
  error
}
