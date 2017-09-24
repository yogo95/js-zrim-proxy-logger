
exports.lib = module.exports.lib = require('./lib/index');
exports.services = module.exports.services = require('./lib/services/index');
exports.defaultLogger = module.exports.defaultLogger = exports.lib.defaultLogger;
exports.WinstonProxyLogger = module.exports.WinstonProxyLogger = exports.lib.WinstonProxyLogger;
