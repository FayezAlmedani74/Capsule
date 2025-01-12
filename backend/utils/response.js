class ApiResponse {
  constructor(message, data = null, statusCode = 200) {
    this.status = "success";
    this.message = message;
    if (data) this.data = data;
    this.statusCode = statusCode;
  }

  send(res) {
    return res.status(this.statusCode).json(this);
  }
}

class ErrorResponse {
  constructor(message, statusCode = 400) {
    this.status = "error";
    this.message = message;
    this.statusCode = statusCode;
  }

  send(res) {
    return res.status(this.statusCode).json(this);
  }
}

module.exports = {
  ApiResponse,
  ErrorResponse,
};
