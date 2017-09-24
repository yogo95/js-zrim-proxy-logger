# JavaScript Zrim Proxy Logger

## Introduction

Conatains proxy logger. Help to manage the logger around classes

## Default logger

You have 2 ways to define a default logger in you system. 
You can use the **defaultLogger** logger function:
```javascript
const defaultLogger = require('js-zrim-proxy-logger').defaultLogger;
defaultLogger.setDefaultLogger(null, myLogger);
```

This function only works for the same version of the package.
Another solution is to define a global default logger manager.

You must define the default logger manager using :
```javascript
_.set(global, 'eu.zrimeverything.core.defaultLoggerManager', myDefaultLoggerManager);
```
This should be the first thing your application is doing.

## Requirement

The logger manager must define a function name getVersion which returns the
implementation version. This may help the module to know how to use the manager.

## Version 1

The version 1 requires:<br/>
- string getVersion() : returns "1.m.p" with m you minor version and p your patch version.
- string[] listLoggerNames() : This function returns the list of know logger names
- Logger getLogger(string|null|undefined) : This function returns the logger 
- string[] listLoggerNames() : List the logger names known or available
to use with the given name. In case the name is null or undefined, the function
must return the default logger.
- void setLogger(string|null|undefined, Logger) : This function define
a logger for the given name

## Proxy logger

The proxy help to define a logger in your code without having the final logger yet defined.

The proxy can also add prefix on you message without having to take care of.

