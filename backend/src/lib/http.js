function ok(res, data) {
  return res.json({ data, error: null })
}

function fail(res, status, message, details) {
  return res.status(status).json({
    data: null,
    error: {
      message,
      ...(details ? { details } : {}),
    },
  })
}

module.exports = { ok, fail }

