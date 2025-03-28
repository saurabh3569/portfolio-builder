const { catchAsync } = require("./catchAsync");

function wrapRoutes(router) {
  router.stack.forEach((layer) => {
    if (layer.route) {
      Object.keys(layer.route.methods).forEach((method) => {
        layer.route.stack.forEach((handler) => {
          handler.handle = catchAsync(handler.handle);
        });
      });
    }
  });
}

module.exports = { wrapRoutes };
