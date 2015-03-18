/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var os = __webpack_require__(1);
	var httpinvoke = __webpack_require__(2);

	MAP = (function() {
	  var image = new ol.style.Circle({
	    radius: 5,
	    fill: null,
	    stroke: new ol.style.Stroke({
	      color: 'red',
	      width: 1
	    })
	  });

	  var styles = {
	    'Point': [new ol.style.Style({
	      image: image
	    })],
	    'LineString': [new ol.style.Style({
	      stroke: new ol.style.Stroke({
	        color: 'green',
	        width: 1
	      })
	    })],
	    'MultiLineString': [new ol.style.Style({
	      stroke: new ol.style.Stroke({
	        color: 'green',
	        width: 1
	      })
	    })],
	    'MultiPoint': [new ol.style.Style({
	      image: image
	    })],
	    'MultiPolygon': function(feature) {
	      return [new ol.style.Style({
	        stroke: new ol.style.Stroke({
	          color: 'green',
	          width: 1
	        }),
	        fill: new ol.style.Fill({
	          color: 'rgba(255, 255, 0, 0.1)'
	        })
	      })];
	    },
	    'Polygon': [new ol.style.Style({
	      stroke: new ol.style.Stroke({
	        color: 'blue',
	        lineDash: [4],
	        width: 3
	      }),
	      fill: new ol.style.Fill({
	        color: 'rgba(0, 0, 255, 0.1)'
	      })
	    })],
	    'GeometryCollection': [new ol.style.Style({
	      stroke: new ol.style.Stroke({
	        color: 'magenta',
	        width: 2
	      }),
	      fill: new ol.style.Fill({
	        color: 'magenta'
	      }),
	      image: new ol.style.Circle({
	        radius: 10,
	        fill: null,
	        stroke: new ol.style.Stroke({
	          color: 'magenta'
	        })
	      })
	    })],
	    'Circle': [new ol.style.Style({
	      stroke: new ol.style.Stroke({
	        color: 'red',
	        width: 2
	      }),
	      fill: new ol.style.Fill({
	        color: 'rgba(255,0,0,0.2)'
	      })
	    })]
	  };

	  var styleFunction = function(feature, resolution) {
	    var type = feature.getGeometry().getType();
	    var style = styles[type];
	    return typeof style === 'function' ? style(feature, resolution) : style;
	  };

	  var map = new ol.Map({
	    target: 'map',
	    layers: [
	      new ol.layer.Tile({
	        title: "Global Imagery",
	        source: new ol.source.TileWMS({
	          url: 'http://maps.opengeo.org/geowebcache/service/wms',
	          params: {
	            LAYERS: 'bluemarble',
	            VERSION: '1.1.1'
	          }
	        })
	      })
	    ],
	    view: new ol.View({
	      projection: 'EPSG:4326',
	      center: [-98.35, 39.5],
	      zoom: 4,
	      maxResolution: 0.703125
	    })
	  });

	  addLayer('/world/borders/', 'World borders');
	  addLayer('/world/borders/usa/states/', 'States');
	  addLayer('/world/borders/usa/buffer/0.05', 'Buffered World Borders',
	    function(feature) {
	      return [new ol.style.Style({
	        stroke: new ol.style.Stroke({
	          color: 'blue',
	          lineDash: [4],
	          width: 3
	        }),
	        fill: new ol.style.Fill({
	          color: 'rgba(0, 0, 255, 0.1)'
	        }),
	        text: new ol.style.Text({
	          text: feature.get('name'),
	          font: '12px Calibri,sans-serif',
	          fill: new ol.style.Fill({
	            color: '#000'
	          }),
	          stroke: new ol.style.Stroke({
	            color: '#fff',
	            width: 3
	          })
	        })
	      })]
	    }
	  );

	  function addLayer(url, title, style) {

	    return httpinvoke(url, 'GET', {
	        headers: {
	          'accept': 'application/json'
	        },
	      })
	      .then(function(res) {
	        var geoJSON = JSON.parse(res.body);
	        var source = new ol.source.TopoJSON({
	          object: geoJSON
	        });
	        map.addLayer(new ol.layer.Vector({
	          title: title,
	          source: source,
	          style: style ? style : styleFunction
	        }));
	      }, function(err) {
	        console.log(err);
	      });

	  }

	  return map;

	})()


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = ol;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(Buffer) {(function (root, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        module.exports = factory();
	    } else {
	        root.httpinvoke = factory();
	  }
	}(this, /* jshint -W030 */
	/* jshint -W033 */
	/* jshint -W068 */
	(function() {
	/* jshint +W030 */
	/* jshint +W033 */
	/* jshint +W068 */
	    'use strict';
	    var global;
	    /* jshint unused:true */
	    ;global = window;;var resolve = 0, reject = 1, progress = 2, chain = function(a, b) {
	    /* jshint expr:true */
	    if(a && a.then) {
	        a.then(function() {
	            b[resolve].apply(null, arguments);
	        }, function() {
	            b[reject].apply(null, arguments);
	        }, function() {
	            b[progress].apply(null, arguments);
	        });
	    } else {
	        b[resolve](a);
	    }
	    /* jshint expr:false */
	}, nextTick = (global.process && global.process.nextTick) || global.setImmediate || global.setTimeout, mixInPromise = function(o) {
	    var value, queue = [], state = progress;
	    var makeState = function(newstate) {
	        o[newstate] = function() {
	            var i, p;
	            if(queue) {
	                value = [].slice.call(arguments);
	                state = newstate;

	                for(i = 0; i < queue.length; i += 1) {
	                    if(typeof queue[i][state] === 'function') {
	                        try {
	                            p = queue[i][state].apply(null, value);
	                            if(state < progress) {
	                                chain(p, queue[i]._);
	                            }
	                        } catch(err) {
	                            queue[i]._[reject](err);
	                        }
	                    } else if(state < progress) {
	                        queue[i]._[state].apply(null, value);
	                    }
	                }
	                if(state < progress) {
	                    queue = null;
	                }
	            }
	        };
	    };
	    makeState(progress);
	    makeState(resolve);
	    makeState(reject);
	    o.then = function() {
	        var item = [].slice.call(arguments);
	        item._ = mixInPromise({});
	        if(queue) {
	            queue.push(item);
	        } else if(typeof item[state] === 'function') {
	            nextTick(function() {
	                chain(item[state].apply(null, value), item._);
	            });
	        }
	        return item._;
	    };
	    return o;
	}, isArrayBufferView = /* jshint undef:false */function(input) {
	    return typeof input === 'object' && input !== null && (
	        (global.ArrayBufferView && input instanceof ArrayBufferView) ||
	        (global.Int8Array && input instanceof Int8Array) ||
	        (global.Uint8Array && input instanceof Uint8Array) ||
	        (global.Uint8ClampedArray && input instanceof Uint8ClampedArray) ||
	        (global.Int16Array && input instanceof Int16Array) ||
	        (global.Uint16Array && input instanceof Uint16Array) ||
	        (global.Int32Array && input instanceof Int32Array) ||
	        (global.Uint32Array && input instanceof Uint32Array) ||
	        (global.Float32Array && input instanceof Float32Array) ||
	        (global.Float64Array && input instanceof Float64Array)
	    );
	}/* jshint undef:true */, isArray = function(object) {
	    return Object.prototype.toString.call(object) === '[object Array]';
	}, isFormData = function(input) {
	    return typeof input === 'object' && input !== null && global.FormData &&
	        input instanceof global.FormData;
	}, isByteArray = /* jshint undef:false */function(input) {
	    return typeof input === 'object' && input !== null && (
	        (global.Buffer && input instanceof Buffer) ||
	        (global.Blob && input instanceof Blob) ||
	        (global.File && input instanceof File) ||
	        (global.ArrayBuffer && input instanceof ArrayBuffer) ||
	        isArrayBufferView(input) ||
	        isArray(input)
	    );
	}/* jshint undef:true */, supportedMethods = ',GET,HEAD,PATCH,POST,PUT,DELETE,', pass = function(value) {
	    return value;
	}, _undefined, absoluteURLRegExp = /^[a-z][a-z0-9.+-]*:/i, addHook = function(type, hook) {
	    'use strict';
	    if(typeof hook !== 'function') {
	        throw new Error('TODO error');
	    }
	    if(!this._hooks[type]) {
	        throw new Error('TODO error');
	    }
	    var httpinvoke = build();
	    for(var i in this._hooks) {
	        if(this._hooks.hasOwnProperty(i)) {
	            httpinvoke._hooks[i].push.apply(httpinvoke._hooks[i], this._hooks[i]);
	        }
	    }
	    httpinvoke._hooks[type].push(hook);
	    return httpinvoke;
	}, initHooks = function() {
	    return {
	        finished:[],
	        downloading:[],
	        uploading:[],
	        gotStatus:[]
	    };
	};
	;
	    /* jshint unused:false */
	    // this could be a simple map, but with this "compression" we save about 100 bytes, if minified (50 bytes, if also gzipped)
	    var statusTextToCode = (function() {
	        for(var group = arguments.length, map = {};group--;) {
	            for(var texts = arguments[group].split(','), index = texts.length;index--;) {
	                map[texts[index]] = (group + 1) * 100 + index;
	            }
	        }
	        return map;
	    })(
	        'Continue,Switching Protocols',
	        'OK,Created,Accepted,Non-Authoritative Information,No Content,Reset Content,Partial Content',
	        'Multiple Choices,Moved Permanently,Found,See Other,Not Modified,Use Proxy,_,Temporary Redirect',
	        'Bad Request,Unauthorized,Payment Required,Forbidden,Not Found,Method Not Allowed,Not Acceptable,Proxy Authentication Required,Request Timeout,Conflict,Gone,Length Required,Precondition Failed,Request Entity Too Large,Request-URI Too Long,Unsupported Media Type,Requested Range Not Satisfiable,Expectation Failed',
	        'Internal Server Error,Not Implemented,Bad Gateway,Service Unavailable,Gateway Time-out,HTTP Version Not Supported'
	    );
	    var upgradeByteArray = global.Uint8Array ? function(array) {
	        return new Uint8Array(array);
	    } : pass;
	    var binaryStringToByteArray = function(str, bytearray) {
	        for(var i = bytearray.length; i < str.length;) {
	            /* jshint bitwise:false */
	            bytearray.push(str.charCodeAt(i++) & 255);
	            /* jshint bitwise:true */
	        }
	        return bytearray;
	    };
	    var countStringBytes = function(string) {
	        for(var c, n = 0, i = string.length;i--;) {
	            c = string.charCodeAt(i);
	            n += c < 128 ? 1 : (c < 2048 ? 2 : 3);
	        }
	        return n;
	    };
	    var responseBodyToBytes, responseBodyLength;
	    try {
	        /* jshint evil:true */
	        execScript('Function httpinvoke0(B,A,C)\r\nDim i\r\nFor i=C to LenB(B)\r\nA.push(AscB(MidB(B,i,1)))\r\nNext\r\nEnd Function\r\nFunction httpinvoke1(B)\r\nhttpinvoke1=LenB(B)\r\nEnd Function', 'vbscript');
	        /* jshint evil:false */
	        responseBodyToBytes = function(binary, bytearray) {
	            // that vbscript counts from 1, not from 0
	            httpinvoke0(binary, bytearray, bytearray.length + 1);
	            return bytearray;
	        };
	        // cannot just assign the function, because httpinvoke1 is not a javascript 'function'
	        responseBodyLength = function(binary) {
	            return httpinvoke1(binary);
	        };
	    } catch(err) {
	    }
	    var responseByteArray = function(xhr, bytearray) {
	        // If response body has bytes out of printable ascii character range, then
	        // accessing xhr.responseText on Internet Explorer throws "Could not complete the operation due to error c00ce514".
	        // Therefore, try getting the bytearray from xhr.responseBody.
	        // Also responseBodyToBytes on some Internet Explorers is not defined, because of removed vbscript support.
	        return 'responseBody' in xhr && responseBodyToBytes ? responseBodyToBytes(xhr.responseBody, bytearray) : binaryStringToByteArray(xhr.responseText, bytearray);
	    };
	    var responseByteArrayLength = function(xhr) {
	        return 'responseBody' in xhr && responseBodyLength ? responseBodyLength(xhr.responseBody) : xhr.responseText.length;
	    };
	    var fillOutputHeaders = function(xhr, outputHeaders) {
	        var headers = xhr.getAllResponseHeaders().split(/\r?\n/);
	        var atLeastOne = false;
	        for(var i = headers.length, colon, header; i--;) {
	            if((colon = headers[i].indexOf(':')) >= 0) {
	                outputHeaders[headers[i].substr(0, colon).toLowerCase()] = headers[i].substr(colon + 2);
	                atLeastOne = true;
	            }
	        }
	        return atLeastOne;
	    };

	    var urlPartitioningRegExp = /^(?:([a-z][a-z0-9.+-]*:)|)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/;
	    var isCrossDomain = function(location, url) {
	        if(!absoluteURLRegExp.test(url) && url.substr(0, 2) !== '//') {
	            return false;
	        }
	        url = urlPartitioningRegExp.exec(url.toLowerCase());
	        location = urlPartitioningRegExp.exec(location.toLowerCase()) || [];
	        var locationPort = location[3] || (location[1] === 'http:' ? '80' : '443');
	        return !!((url[1] && url[1] !== location[1]) || url[2] !== location[2] || (url[3] || (url[1] ? (url[1] === 'http:' ? '80' : '443') : locationPort)) !== locationPort);
	    };

	var build = function() {
	    var createXHR;
	    var httpinvoke = function(url, method, options, cb) {
	        /* jshint unused:true */
	        ;/* global httpinvoke, url, method, options, cb */
	/* global nextTick, mixInPromise, pass, progress, reject, resolve, supportedMethods, isArray, isArrayBufferView, isFormData, isByteArray, _undefined, absoluteURLRegExp */
	/* global setTimeout */
	/* global crossDomain */// this one is a hack, because when in nodejs this is not really defined, but it is never needed
	/* jshint -W020 */
	var hook, promise, failWithoutRequest, uploadProgressCb, downloadProgressCb, inputLength, inputHeaders, statusCb, outputHeaders, exposedHeaders, status, outputBinary, input, outputLength, outputConverter, protocol, anonymous, system;
	hook = function(type, args) {
	    var hooks = httpinvoke._hooks[type];
	    for(var i = 0; i < hooks.length; i += 1) {
	        args = hooks[i].apply(null, args);
	    }
	    return args;
	};
	/*************** COMMON initialize parameters **************/
	var downloadTimeout, uploadTimeout, timeout;
	if(!method) {
	    // 1 argument
	    // method, options, cb skipped
	    method = 'GET';
	    options = {};
	} else if(!options) {
	    // 2 arguments
	    if(typeof method === 'string') {
	        // options. cb skipped
	        options = {};
	    } else if(typeof method === 'object') {
	        // method, cb skipped
	        options = method;
	        method = 'GET';
	    } else {
	        // method, options skipped
	        options = {
	            finished: method
	        };
	        method = 'GET';
	    }
	} else if(!cb) {
	    // 3 arguments
	    if(typeof method === 'object') {
	        // method skipped
	        method.finished = options;
	        options = method;
	        method = 'GET';
	    } else if(typeof options === 'function') {
	        // options skipped
	        options = {
	            finished: options
	        };
	    }
	    // cb skipped
	} else {
	    // 4 arguments
	    options.finished = cb;
	}
	var safeCallback = function(name, aspectBefore, aspectAfter) {
	    return function() {
	        var args = [], _cb, failedOnHook = false, fail = function(err, args) {
	            _cb = cb;
	            cb = null;
	            nextTick(function() {
	                /* jshint expr:true */
	                _cb && _cb(err);
	                /* jshint expr:false */
	                promise();
	                if(!_cb && !failedOnHook) {
	                    throw err;
	                }
	            });
	            return name === 'finished' ? [err] : args;
	        };
	        aspectBefore.apply(null, args);
	        try {
	            args = hook(name, [].slice.call(arguments));
	        } catch(err) {
	            failedOnHook = true;
	            args = fail(err, args);
	        }
	        if(options[name]) {
	            try {
	                options[name].apply(null, args);
	            } catch(err) {
	                args = fail(err, args);
	            }
	        }
	        aspectAfter.apply(null, args);
	    };
	};
	failWithoutRequest = function(cb, err) {
	    if(!(err instanceof Error)) {
	        // create error here, instead of nextTick, to preserve stack
	        err = new Error('Error code #' + err +'. See https://github.com/jakutis/httpinvoke#error-codes');
	    }
	    nextTick(function() {
	        if(cb === null) {
	            return;
	        }
	        cb(err);
	    });
	    promise = function() {
	    };
	    return mixInPromise(promise);
	};

	uploadProgressCb = safeCallback('uploading', pass, function(current, total) {
	    promise[progress]({
	        type: 'upload',
	        current: current,
	        total: total
	    });
	});
	downloadProgressCb = safeCallback('downloading', pass, function(current, total, partial) {
	    promise[progress]({
	        type: 'download',
	        current: current,
	        total: total,
	        partial: partial
	    });
	});
	statusCb = safeCallback('gotStatus', function() {
	    statusCb = null;
	    if(downloadTimeout) {
	        setTimeout(function() {
	            if(cb) {
	                cb(new Error('download timeout'));
	                promise();
	            }
	        }, downloadTimeout);
	    }
	}, function(statusCode, headers) {
	    promise[progress]({
	        type: 'headers',
	        statusCode: statusCode,
	        headers: headers
	    });
	});
	cb = safeCallback('finished', function() {
	    cb = null;
	    promise();
	}, function(err, body, statusCode, headers) {
	    var res = {
	        body: body,
	        statusCode: statusCode,
	        headers: headers
	    };
	    if(err) {
	        return promise[reject](err, res);
	    }
	    promise[resolve](res);
	});
	var converters = options.converters || {};
	var inputConverter;
	inputHeaders = (function(input) {
	    var output = {};
	    for(var i in input) {
	        if(input.hasOwnProperty(i)) {
	            output[i] = input[i];
	        }
	    }
	    return output;
	})(options.headers || {});
	outputHeaders = {};
	exposedHeaders = options.corsExposedHeaders || [];
	exposedHeaders.push.apply(exposedHeaders, ['Cache-Control', 'Content-Language', 'Content-Type', 'Content-Length', 'Expires', 'Last-Modified', 'Pragma', 'Content-Range', 'Content-Encoding']);
	/*************** COMMON convert and validate parameters **************/
	var validateInputHeaders = function(headers) {
	    var noSec = httpinvoke.forbiddenInputHeaders.indexOf('sec-*') >= 0;
	    var noProxy = httpinvoke.forbiddenInputHeaders.indexOf('proxy-*') >= 0;
	    for(var header in headers) {
	        if(headers.hasOwnProperty(header)) {
	            var headerl = header.toLowerCase();
	            if(httpinvoke.forbiddenInputHeaders.indexOf(headerl) >= 0) {
	                throw [14, header];
	            }
	            if(noProxy && headerl.substr(0, 'proxy-'.length) === 'proxy-') {
	                throw [15, header];
	            }
	            if(noSec && headerl.substr(0, 'sec-'.length) === 'sec-') {
	                throw [16, header];
	            }
	        }
	    }
	};
	try {
	    validateInputHeaders(inputHeaders);
	} catch(err) {
	    return failWithoutRequest(cb, err);
	}
	if(!httpinvoke.relativeURLs && !absoluteURLRegExp.test(url)) {
	    return failWithoutRequest(cb, [26, url]);
	}
	protocol = url.substr(0, url.indexOf(':'));
	if(absoluteURLRegExp.test(url) && protocol !== 'http' && protocol !== 'https') {
	    return failWithoutRequest(cb, [25, protocol]);
	}
	anonymous = typeof options.anonymous === 'undefined' ? httpinvoke.anonymousByDefault : options.anonymous;
	system = typeof options.system === 'undefined' ? httpinvoke.systemByDefault : options.system;
	if(typeof options.system !== 'undefined' && system) {
	    anonymous = true;
	}
	var partialOutputMode = options.partialOutputMode || 'disabled';
	if(partialOutputMode.indexOf(',') >= 0 || ',disabled,chunked,joined,'.indexOf(',' + partialOutputMode + ',') < 0) {
	    return failWithoutRequest(cb, [3]);
	}
	if(method.indexOf(',') >= 0 || !httpinvoke.anyMethod && supportedMethods.indexOf(',' + method + ',') < 0) {
	    return failWithoutRequest(cb, [4, method]);
	}
	var optionsOutputType = options.outputType;
	outputBinary = optionsOutputType === 'bytearray';
	if(!optionsOutputType || optionsOutputType === 'text' || outputBinary) {
	    outputConverter = pass;
	} else if(converters['text ' + optionsOutputType]) {
	    outputConverter = converters['text ' + optionsOutputType];
	    outputBinary = false;
	} else if(converters['bytearray ' + optionsOutputType]) {
	    outputConverter = converters['bytearray ' + optionsOutputType];
	    outputBinary = true;
	} else {
	    return failWithoutRequest(cb, [5, optionsOutputType]);
	}
	inputConverter = pass;
	var optionsInputType = options.inputType;
	input = options.input;
	if(input !== _undefined) {
	    if(!optionsInputType || optionsInputType === 'auto') {
	        if(typeof input !== 'string' && !isByteArray(input) && !isFormData(input)) {
	            return failWithoutRequest(cb, [6]);
	        }
	    } else if(optionsInputType === 'text') {
	        if(typeof input !== 'string') {
	            return failWithoutRequest(cb, [7]);
	        }
	    } else if (optionsInputType === 'formdata') {
	        if(!isFormData(input)) {
	            return failWithoutRequest(cb, [8]);
	        }
	    } else if (optionsInputType === 'bytearray') {
	        if(!isByteArray(input)) {
	            return failWithoutRequest(cb, [9]);
	        }
	    } else if(converters[optionsInputType + ' text']) {
	        inputConverter = converters[optionsInputType + ' text'];
	    } else if(converters[optionsInputType + ' bytearray']) {
	        inputConverter = converters[optionsInputType + ' bytearray'];
	    } else if(converters[optionsInputType + ' formdata']) {
	        inputConverter = converters[optionsInputType + ' formdata'];
	    } else {
	        return failWithoutRequest(cb, [10, optionsInputType]);
	    }
	    if(typeof input === 'object' && !isFormData(input)) {
	        if(global.ArrayBuffer && input instanceof global.ArrayBuffer) {
	            input = new global.Uint8Array(input);
	        } else if(isArrayBufferView(input)) {
	            input = new global.Uint8Array(input.buffer, input.byteOffset, input.byteLength);
	        }
	    }
	    try {
	        input = inputConverter(input);
	    } catch(err) {
	        return failWithoutRequest(cb, err);
	    }
	} else {
	    if(optionsInputType && optionsInputType !== 'auto') {
	        return failWithoutRequest(cb, [11]);
	    }
	    if(inputHeaders['Content-Type']) {
	        return failWithoutRequest(cb, [12]);
	    }
	}
	var isValidTimeout = function(timeout) {
	    return timeout > 0 && timeout < 1073741824;
	};
	var optionsTimeout = options.timeout;
	if(optionsTimeout !== _undefined) {
	    if(typeof optionsTimeout === 'number' && isValidTimeout(optionsTimeout)) {
	        timeout = optionsTimeout;
	    } else if(isArray(optionsTimeout) && optionsTimeout.length === 2 && isValidTimeout(optionsTimeout[0]) && isValidTimeout(optionsTimeout[1])) {
	        if(httpinvoke.corsFineGrainedTimeouts || !crossDomain) {
	            uploadTimeout = optionsTimeout[0];
	            downloadTimeout = optionsTimeout[1];
	        } else {
	            timeout = optionsTimeout[0] + optionsTimeout[1];
	        }
	    } else {
	        return failWithoutRequest(cb, [13]);
	    }
	}
	if(uploadTimeout) {
	    setTimeout(function() {
	        if(statusCb) {
	            cb(new Error('upload timeout'));
	            promise();
	        }
	    }, uploadTimeout);
	}
	if(timeout) {
	    setTimeout(function() {
	        if(cb) {
	            cb(new Error('timeout'));
	            promise();
	        }
	    }, timeout);
	}

	;
	        /* jshint unused:false */
	        /*************** initialize helper variables **************/
	        var xhr, i, j, currentLocation, crossDomain, output,
	            uploadProgressCbCalled = false,
	            partialPosition = 0,
	            partialBuffer = partialOutputMode === 'disabled' ? _undefined : (outputBinary ? [] : ''),
	            partial = partialBuffer,
	            partialUpdate = function() {
	                if(partialOutputMode === 'disabled') {
	                    return;
	                }
	                if(outputBinary) {
	                    responseByteArray(xhr, partialBuffer);
	                } else {
	                    partialBuffer = xhr.responseText;
	                }
	                partial = partialOutputMode === 'joined' ? partialBuffer : partialBuffer.slice(partialPosition);
	                partialPosition = partialBuffer.length;
	            };
	        var uploadProgress = function(uploaded) {
	            if(!uploadProgressCb) {
	                return;
	            }
	            if(!uploadProgressCbCalled) {
	                uploadProgressCbCalled = true;
	                uploadProgressCb(0, inputLength);
	                if(!cb) {
	                    return;
	                }
	            }
	            uploadProgressCb(uploaded, inputLength);
	            if(uploaded === inputLength) {
	                uploadProgressCb = null;
	            }
	        };
	        try {
	            // IE may throw an exception when accessing
	            // a field from location if document.domain has been set
	            currentLocation = location.href;
	        } catch(_) {
	            // Use the href attribute of an A element
	            // since IE will modify it given document.location
	            currentLocation = document.createElement('a');
	            currentLocation.href = '';
	            currentLocation = currentLocation.href;
	        }
	        crossDomain = isCrossDomain(currentLocation, url);
	        /*************** start XHR **************/
	        if(typeof input === 'object' && !isFormData(input) && httpinvoke.requestTextOnly) {
	            return failWithoutRequest(cb, [17]);
	        }
	        if(crossDomain && !httpinvoke.cors) {
	            return failWithoutRequest(cb, [18]);
	        }
	        for(j = ['DELETE', 'PATCH', 'PUT', 'HEAD'], i = j.length;i-- > 0;) {
	            if(crossDomain && method === j[i] && !httpinvoke['cors' + j[i]]) {
	                return failWithoutRequest(cb, [19, method]);
	            }
	        }
	        if(method === 'PATCH' && !httpinvoke.PATCH) {
	            return failWithoutRequest(cb, [20]);
	        }
	        if(!createXHR) {
	            return failWithoutRequest(cb, [21]);
	        }
	        xhr = createXHR(crossDomain, {
	            mozAnon: anonymous,
	            mozSystem: system
	        });
	        try {
	            xhr.open(method, url, true);
	        } catch(e) {
	            return failWithoutRequest(cb, [22, url]);
	        }
	        if(httpinvoke.corsCredentials) {
	            if((typeof options.anonymous !== 'undefined' && !anonymous) || (options.corsCredentials && typeof xhr.withCredentials === 'boolean')) {
	                xhr.withCredentials = true;
	            }
	        }
	        if(crossDomain && options.corsOriginHeader) {
	            // on some Android devices CORS implementations are buggy
	            // that is why there needs to be two workarounds:
	            // 1. custom header with origin has to be passed, because they do not send Origin header on the actual request
	            // 2. caching must be avoided, because of unknown reasons
	            // read more: http://www.kinvey.com/blog/107/how-to-build-a-service-that-supports-every-android-browser

	            // workaraound for #1: sending origin in custom header, also see the server-side part of the workaround in dummyserver.js
	            inputHeaders[options.corsOriginHeader] = location.protocol + '//' + location.host;
	        }

	        /*************** bind XHR event listeners **************/
	        var abOrZero = function(object, propertyA, propertyB) {
	            if(typeof object[propertyA] !== 'undefined') {
	                return object[propertyA];
	            }
	            if(typeof object[propertyB] !== 'undefined') {
	                return object[propertyB];
	            }
	            return 0;
	        };
	        var onuploadprogress = function(progressEvent) {
	            if(cb && progressEvent.lengthComputable) {
	                if(inputLength === _undefined) {
	                    inputLength = abOrZero(progressEvent, 'total', 'totalSize');
	                    uploadProgress(0);
	                }
	                uploadProgress(abOrZero(progressEvent, 'loaded', 'position'));
	            }
	        };
	        if('upload' in xhr) {
	            xhr.upload.onerror = function() {
	                received.error = true;
	                // must check, because some callbacks are called synchronously, thus throwing exceptions and breaking code
	                /* jshint expr:true */
	                cb && cb(new Error('network error'));
	                /* jshint expr:false */
	            };
	            xhr.upload.onprogress = onuploadprogress;
	        } else if('onuploadprogress' in xhr) {
	            xhr.onuploadprogress = onuploadprogress;
	        }

	        if('onerror' in xhr) {
	            xhr.onerror = function() {
	                received.error = true;
	                //inspect('onerror', arguments[0]);
	                //dbg('onerror');
	                // For 4XX and 5XX response codes Firefox 3.6 cross-origin request ends up here, but has correct statusText, but no status and headers
	                onLoad();
	            };
	        }
	        var ondownloadprogress = function(progressEvent) {
	            onHeadersReceived(false);
	            // There is a bug in Chrome 10 on 206 response with Content-Range=0-4/12 - total must be 5
	            // 'total', 12, 'totalSize', 12, 'loaded', 5, 'position', 5, 'lengthComputable', true, 'status', 206
	            // console.log('total', progressEvent.total, 'totalSize', progressEvent.totalSize, 'loaded', progressEvent.loaded, 'position', progressEvent.position, 'lengthComputable', progressEvent.lengthComputable, 'status', status);
	            // httpinvoke does not work around this bug, because Chrome 10 is practically not used at all, as Chrome agressively auto-updates itself to latest version
	            try {
	                var current = abOrZero(progressEvent, 'loaded', 'position');
	                if(progressEvent.lengthComputable) {
	                    outputLength = abOrZero(progressEvent, 'total', 'totalSize');
	                }

	                // Opera 12 progress events has a bug - .loaded can be higher than .total
	                // see http://dev.opera.com/articles/view/xhr2/#comment-96081222
	                /* jshint expr:true */
	                cb && current <= outputLength && !statusCb && (partialUpdate(), downloadProgressCb(current, outputLength, partial));
	                /* jshint expr:false */
	            } catch(_) {
	            }
	        };
	        if('onloadstart' in xhr) {
	            xhr.onloadstart = ondownloadprogress;
	        }
	        if('onloadend' in xhr) {
	            xhr.onloadend = ondownloadprogress;
	        }
	        if('onprogress' in xhr) {
	            xhr.onprogress = ondownloadprogress;
	        }
	        /*
	        var inspect = function(name, obj) {
	            return;
	            console.log('INSPECT ----- ', name, url);
	            for(var i in obj) {
	                try {
	                    console.log(name, 'PASS', i, typeof obj[i], typeof obj[i] === 'function' ? '[code]' : obj[i]);
	                } catch(_) {
	                    console.log(name, 'FAIL', i);
	                }
	            }
	        };
	        var dbg = function(name) {
	            console.log('DBG ----- ', name, url);
	            inspect('xhr', xhr);
	            try {
	                console.log('PASS', 'headers', xhr.getAllResponseHeaders());
	            } catch(_) {
	                console.log('FAIL', 'headers');
	            }
	            try {
	                console.log('PASS', 'cache-control', xhr.getResponseHeader('Cache-Control'));
	            } catch(_) {
	                console.log('FAIL', 'cache-control');
	            }
	        };
	        */
	        var received = {};
	        var mustBeIdentity;
	        var tryHeadersAndStatus = function(lastTry) {
	            try {
	                if(xhr.status) {
	                    received.status = true;
	                }
	            } catch(_) {
	            }
	            try {
	                if(xhr.statusText) {
	                    received.status = true;
	                }
	            } catch(_) {
	            }
	            try {
	                if(xhr.responseText) {
	                    received.entity = true;
	                }
	            } catch(_) {
	            }
	            try {
	                if(xhr.response) {
	                    received.entity = true;
	                }
	            } catch(_) {
	            }
	            try {
	                if(responseBodyLength(xhr.responseBody)) {
	                    received.entity = true;
	                }
	            } catch(_) {
	            }

	            if(!statusCb) {
	                return;
	            }

	            if(received.status || received.entity || received.success || lastTry) {
	                if(typeof xhr.contentType === 'string' && xhr.contentType) {
	                    if(xhr.contentType !== 'text/html' || xhr.responseText !== '') {
	                        // When no entity body and/or no Content-Type header is sent,
	                        // XDomainRequest on IE-8 defaults to text/html xhr.contentType.
	                        // Also, empty string is not a valid 'text/html' entity.
	                        outputHeaders['content-type'] = xhr.contentType;
	                        received.headers = true;
	                    }
	                }
	                for(var i = 0; i < exposedHeaders.length; i++) {
	                    var header;
	                    try {
	                        /* jshint boss:true */
	                        if(header = xhr.getResponseHeader(exposedHeaders[i])) {
	                        /* jshint boss:false */
	                            outputHeaders[exposedHeaders[i].toLowerCase()] = header;
	                            received.headers = true;
	                        }
	                    } catch(err) {
	                    }
	                }
	                try {
	                    // note - on Opera 11.10 and 11.50 calling getAllResponseHeaders may introduce side effects on xhr and responses will timeout when server responds with some HTTP status codes
	                    if(fillOutputHeaders(xhr, outputHeaders)) {
	                        received.headers = true;
	                    }
	                } catch(err) {
	                }

	                mustBeIdentity = outputHeaders['content-encoding'] === 'identity' || (!crossDomain && !outputHeaders['content-encoding']);
	                if(mustBeIdentity && 'content-length' in outputHeaders) {
	                    outputLength = Number(outputHeaders['content-length']);
	                }

	                if(!status && (!crossDomain || httpinvoke.corsStatus)) {
	                    // Sometimes on IE 9 accessing .status throws an error, but .statusText does not.
	                    try {
	                        if(xhr.status) {
	                            status = xhr.status;
	                        }
	                    } catch(_) {
	                    }
	                    if(!status) {
	                        try {
	                            status = statusTextToCode[xhr.statusText];
	                        } catch(_) {
	                        }
	                    }
	                    // sometimes IE returns 1223 when it should be 204
	                    if(status === 1223) {
	                        status = 204;
	                    }
	                    // IE (at least version 6) returns various detailed network
	                    // connection error codes (concretely - WinInet Error Codes).
	                    // For references of their meaning, see http://support.microsoft.com/kb/193625
	                    if(status >= 12001 && status <= 12156) {
	                        status = _undefined;
	                    }
	                }
	            }
	        };
	        var onHeadersReceived = function(lastTry) {
	            if(!cb) {
	                return;
	            }

	            if(!lastTry) {
	                tryHeadersAndStatus(false);
	            }

	            if(!statusCb || (!lastTry && !(received.status && received.headers))) {
	                return;
	            }

	            if(inputLength === _undefined) {
	                inputLength = 0;
	                uploadProgress(0);
	            }
	            uploadProgress(inputLength);
	            if(!cb) {
	                return;
	            }

	            statusCb(status, outputHeaders);
	            if(!cb) {
	                return;
	            }

	            downloadProgressCb(0, outputLength, partial);
	            if(!cb) {
	                return;
	            }
	            if(method === 'HEAD') {
	                downloadProgressCb(0, 0, partial);
	                return cb && cb(null, _undefined, status, outputHeaders);
	            }
	        };
	        var onLoad = function() {
	            if(!cb) {
	                return;
	            }

	            tryHeadersAndStatus(true);

	            var length;
	            try {
	                length =
	                    partialOutputMode !== 'disabled' ?
	                    responseByteArrayLength(xhr) :
	                    (
	                        outputBinary ?
	                        (
	                            'response' in xhr ?
	                            (
	                                xhr.response ?
	                                xhr.response.byteLength :
	                                0
	                            ) :
	                            responseByteArrayLength(xhr)
	                        ) :
	                        countStringBytes(xhr.responseText)
	                    );
	            } catch(_) {
	                length = 0;
	            }
	            if(outputLength !== _undefined) {
	                if(mustBeIdentity) {
	                    if(length !== outputLength && method !== 'HEAD') {
	                        return cb(new Error('network error'));
	                    }
	                } else {
	                    if(received.error) {
	                        return cb(new Error('network error'));
	                    }
	                }
	            } else {
	                outputLength = length;
	            }

	            var noentity = !received.entity && outputLength === 0 && outputHeaders['content-type'] === _undefined;

	            if((noentity && status === 200) || (!received.success && !status && (received.error || ('onreadystatechange' in xhr && !received.readyStateLOADING)))) {
	                /*
	                 * Note: on Opera 10.50, TODO there is absolutely no difference
	                 * between a non 2XX response and an immediate socket closing on
	                 * server side - both give no headers, no status, no entity, and
	                 * end up in 'onload' event. Thus some network errors will end
	                 * up calling "finished" without Error.
	                 */
	                return cb(new Error('network error'));
	            }

	            onHeadersReceived(true);
	            if(!cb) {
	                return;
	            }

	            if(noentity) {
	                downloadProgressCb(0, 0, partial);
	                return cb(null, _undefined, status, outputHeaders);
	            }

	            partialUpdate();
	            downloadProgressCb(outputLength, outputLength, partial);
	            if(!cb) {
	                return;
	            }

	            try {
	                // If XHR2 (there is xhr.response), then there must also be Uint8Array.
	                // But Uint8Array might exist even if not XHR2 (on Firefox 4).
	                cb(null, outputConverter(
	                    partialBuffer || (
	                        outputBinary ?
	                        upgradeByteArray(
	                            'response' in xhr ?
	                            xhr.response || [] :
	                            responseByteArray(xhr, [])
	                        ) :
	                        xhr.responseText
	                    )
	                ), status, outputHeaders);
	            } catch(err) {
	                cb(err);
	            }
	        };
	        var onloadBound = 'onload' in xhr;
	        if(onloadBound) {
	            xhr.onload = function() {
	                received.success = true;
	                //dbg('onload');
	                onLoad();
	            };
	        }
	        if('onreadystatechange' in xhr) {
	            xhr.onreadystatechange = function() {
	                //dbg('onreadystatechange ' + xhr.readyState);
	                if(xhr.readyState === 2) {
	                    // HEADERS_RECEIVED
	                    onHeadersReceived(false);
	                } else if(xhr.readyState === 3) {
	                    // LOADING
	                    received.readyStateLOADING = true;
	                    onHeadersReceived(false);
	                // Instead of 'typeof xhr.onload === "undefined"', we must use
	                // onloadBound variable, because otherwise Firefox 3.5 synchronously
	                // throws a "Permission denied for <> to create wrapper for
	                // object of class UnnamedClass" error
	                } else if(xhr.readyState === 4 && !onloadBound) {
	                    // DONE
	                    onLoad();
	                }
	            };
	        }

	        /*************** set XHR request headers **************/
	        if(!crossDomain || httpinvoke.corsRequestHeaders) {
	            for(var inputHeaderName in inputHeaders) {
	                if(inputHeaders.hasOwnProperty(inputHeaderName)) {
	                    try {
	                        xhr.setRequestHeader(inputHeaderName, inputHeaders[inputHeaderName]);
	                    } catch(err) {
	                        return failWithoutRequest(cb, [23, inputHeaderName]);
	                    }
	                }
	            }
	        }
	        /*************** invoke XHR request process **************/
	        nextTick(function() {
	            if(!cb) {
	                return;
	            }
	            if(outputBinary) {
	                try {
	                    if(partialOutputMode === 'disabled' && 'response' in xhr) {
	                        xhr.responseType = 'arraybuffer';
	                    } else {
	                        // mime type override must be done before receiving headers - at least for Safari 5.0.4
	                        xhr.overrideMimeType('text/plain; charset=x-user-defined');
	                    }
	                } catch(_) {
	                }
	            }
	            if(isFormData(input)) {
	                try {
	                    xhr.send(input);
	                } catch(err) {
	                    return failWithoutRequest(cb, [24]);
	                }
	            } else if(typeof input === 'object') {
	                var triedSendArrayBufferView = false;
	                var triedSendBlob = false;
	                var triedSendBinaryString = false;

	                var BlobBuilder = global.BlobBuilder || global.WebKitBlobBuilder || global.MozBlobBuilder || global.MSBlobBuilder;
	                if(isArray(input)) {
	                    input = global.Uint8Array ? new Uint8Array(input) : String.fromCharCode.apply(String, input);
	                }
	                var toBlob = BlobBuilder ? function() {
	                    var bb = new BlobBuilder();
	                    bb.append(input);
	                    input = bb.getBlob(inputHeaders['Content-Type'] || 'application/octet-stream');
	                } : function() {
	                    try {
	                        input = new Blob([input], {
	                            type: inputHeaders['Content-Type'] || 'application/octet-stream'
	                        });
	                    } catch(_) {
	                        triedSendBlob = true;
	                    }
	                };
	                var go = function() {
	                    var reader;
	                    if(triedSendBlob && triedSendArrayBufferView && triedSendBinaryString) {
	                        return failWithoutRequest(cb, [24]);
	                    }
	                    if(isArrayBufferView(input)) {
	                        if(triedSendArrayBufferView) {
	                            if(!triedSendBinaryString) {
	                                try {
	                                    input = String.fromCharCode.apply(String, input);
	                                } catch(_) {
	                                    triedSendBinaryString = true;
	                                }
	                            } else if(!triedSendBlob) {
	                                toBlob();
	                            }
	                        } else {
	                            inputLength = input.byteLength;
	                            try {
	                                // if there is ArrayBufferView, then the browser supports sending instances of subclasses of ArayBufferView, otherwise we must send an ArrayBuffer
	                                xhr.send(
	                                    global.ArrayBufferView ?
	                                    input :
	                                    (
	                                        input.byteOffset === 0 && input.length === input.buffer.byteLength ?
	                                        input.buffer :
	                                        (
	                                            input.buffer.slice ?
	                                            input.buffer.slice(input.byteOffset, input.byteOffset + input.length) :
	                                            new Uint8Array([].slice.call(new Uint8Array(input.buffer), input.byteOffset, input.byteOffset + input.length)).buffer
	                                        )
	                                    )
	                                );
	                                return;
	                            } catch(_) {
	                            }
	                            triedSendArrayBufferView = true;
	                        }
	                    } else if(global.Blob && input instanceof Blob) {
	                        if(triedSendBlob) {
	                            if(!triedSendArrayBufferView) {
	                                try {
	                                    reader = new FileReader();
	                                    reader.onerror = function() {
	                                        triedSendArrayBufferView = true;
	                                        go();
	                                    };
	                                    reader.onload = function() {
	                                        try {
	                                            input = new Uint8Array(reader.result);
	                                        } catch(_) {
	                                            triedSendArrayBufferView = true;
	                                        }
	                                        go();
	                                    };
	                                    reader.readAsArrayBuffer(input);
	                                    return;
	                                } catch(_) {
	                                    triedSendArrayBufferView = true;
	                                }
	                            } else if(!triedSendBinaryString) {
	                                try {
	                                    reader = new FileReader();
	                                    reader.onerror = function() {
	                                        triedSendBinaryString = true;
	                                        go();
	                                    };
	                                    reader.onload = function() {
	                                        input = reader.result;
	                                        go();
	                                    };
	                                    reader.readAsBinaryString(input);
	                                    return;
	                                } catch(_) {
	                                    triedSendBinaryString = true;
	                                }
	                            }
	                        } else {
	                            try {
	                                inputLength = input.size;
	                                xhr.send(input);
	                                return;
	                            } catch(_) {
	                                triedSendBlob = true;
	                            }
	                        }
	                    } else {
	                        if(triedSendBinaryString) {
	                            if(!triedSendArrayBufferView) {
	                                try {
	                                    input = binaryStringToByteArray(input, []);
	                                } catch(_) {
	                                    triedSendArrayBufferView = true;
	                                }
	                            } else if(!triedSendBlob) {
	                                toBlob();
	                            }
	                        } else {
	                            try {
	                                inputLength = input.length;
	                                xhr.sendAsBinary(input);
	                                return;
	                            } catch(_) {
	                                triedSendBinaryString = true;
	                            }
	                        }
	                    }
	                    nextTick(go);
	                };
	                go();
	                uploadProgress(0);
	            } else {
	                try {
	                    if(typeof input === 'string') {
	                        inputLength = countStringBytes(input);
	                        xhr.send(input);
	                    } else {
	                        inputLength = 0;
	                        xhr.send(null);
	                    }
	                } catch(err) {
	                    return failWithoutRequest(cb, [24]);
	                }
	                uploadProgress(0);
	            }
	        });

	        /*************** return "abort" function **************/
	        promise = function() {
	            /* jshint expr:true */
	            cb && cb(new Error('abort'));
	            /* jshint expr:false */
	            try {
	                xhr.abort();
	            } catch(err){
	            }
	        };
	        return mixInPromise(promise);
	    };
	    httpinvoke.corsResponseContentTypeOnly = false;
	    httpinvoke.corsRequestHeaders = false;
	    httpinvoke.corsCredentials = false;
	    httpinvoke.cors = false;
	    httpinvoke.corsDELETE = false;
	    httpinvoke.corsHEAD = false;
	    httpinvoke.corsPATCH = false;
	    httpinvoke.corsPUT = false;
	    httpinvoke.corsStatus = false;
	    httpinvoke.corsResponseTextOnly = false;
	    httpinvoke.corsFineGrainedTimeouts = true;
	    httpinvoke.requestTextOnly = false;
	    httpinvoke.anyMethod = false;
	    httpinvoke.relativeURLs = true;
	    (function() {
	        try {
	            createXHR = function(cors, xhrOptions) {
	                return new XMLHttpRequest(xhrOptions);
	            };
	            var tmpxhr = createXHR();
	            httpinvoke.requestTextOnly = !global.Uint8Array && !tmpxhr.sendAsBinary;
	            httpinvoke.cors = 'withCredentials' in tmpxhr;
	            if(httpinvoke.cors) {
	                httpinvoke.corsRequestHeaders = true;
	                httpinvoke.corsCredentials = true;
	                httpinvoke.corsDELETE = true;
	                httpinvoke.corsPATCH = true;
	                httpinvoke.corsPUT = true;
	                httpinvoke.corsHEAD = true;
	                httpinvoke.corsStatus = true;
	                return;
	            }
	        } catch(err) {
	        }
	        try {
	            if(global.XDomainRequest === _undefined) {
	                createXHR = function(cors, xhrOptions) {
	                    return new XMLHttpRequest(xhrOptions);
	                };
	                createXHR();
	            } else {
	                createXHR = function(cors, xhrOptions) {
	                    return cors ? new XDomainRequest() : new XMLHttpRequest(xhrOptions);
	                };
	                createXHR(true);
	                httpinvoke.cors = true;
	                httpinvoke.corsResponseContentTypeOnly = true;
	                httpinvoke.corsResponseTextOnly = true;
	                httpinvoke.corsFineGrainedTimeouts = false;
	            }
	            return;
	        } catch(err) {
	        }
	        try {
	            createXHR();
	            return;
	        } catch(err) {
	        }
	        var candidates = ['Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.3.0', 'Msxml2.XMLHTTP'];
	        for(var i = candidates.length; i--;) {
	            try {
	                /* jshint loopfunc:true */
	                createXHR = function() {
	                    return new ActiveXObject(candidates[i]);
	                };
	                /* jshint loopfunc:true */
	                createXHR();
	                httpinvoke.requestTextOnly = true;
	                return;
	            } catch(err) {
	            }
	        }
	        createXHR = _undefined;
	    })();
	    httpinvoke.PATCH = !!(function() {
	        try {
	            createXHR().open('PATCH', location.href, true);
	            return 1;
	        } catch(_) {
	        }
	    })();
	    httpinvoke._hooks = initHooks();
	    httpinvoke.hook = addHook;
	    httpinvoke.anonymousOption = (function() {
	        try {
	            return createXHR(true, {mozAnon: true}).mozAnon === true &&
	                   createXHR(true, {mozAnon: false}).mozAnon === false &&
	                   createXHR(false, {mozAnon: true}).mozAnon === true &&
	                   createXHR(false, {mozAnon: false}).mozAnon === false;
	        } catch(_) {
	            return false;
	        }
	    })();
	    httpinvoke.anonymousByDefault = false;
	    httpinvoke.systemOption = (function() {
	        try {
	            return createXHR(true, {mozAnon: true, mozSystem: true}).mozSystem === true &&
	                   createXHR(true, {mozAnon: true, mozSystem: false}).mozSystem === false &&
	                   createXHR(false, {mozAnon: true, mozSystem: true}).mozSystem === true &&
	                   createXHR(false, {mozAnon: true, mozSystem: false}).mozSystem === false;
	        } catch(_) {
	            return false;
	        }
	    })();
	    httpinvoke.systemByDefault = false;
	    // http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader()-method
	    httpinvoke.forbiddenInputHeaders = ['proxy-*', 'sec-*', 'accept-charset', 'accept-encoding', 'access-control-request-headers', 'access-control-request-method', 'connection', 'content-length', 'content-transfer-encoding', 'cookie', 'cookie2', 'date', 'dnt', 'expect', 'host', 'keep-alive', 'origin', 'referer', 'te', 'trailer', 'transfer-encoding', 'upgrade', 'user-agent', 'via'];

	    return httpinvoke;
	};
	    return build();
	})
	));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3).Buffer))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */

	var base64 = __webpack_require__(6)
	var ieee754 = __webpack_require__(4)
	var isArray = __webpack_require__(5)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation

	var kMaxLength = 0x3fffffff
	var rootParent = {}

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Note:
	 *
	 * - Implementation must support adding new properties to `Uint8Array` instances.
	 *   Firefox 4-29 lacked support, fixed in Firefox 30+.
	 *   See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *  - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *  - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *    incorrect length in some situations.
	 *
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they will
	 * get the Object implementation, which is slower but will work correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = (function () {
	  try {
	    var buf = new ArrayBuffer(0)
	    var arr = new Uint8Array(buf)
	    arr.foo = function () { return 42 }
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        new Uint8Array(1).subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	})()

	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (subject, encoding) {
	  var self = this
	  if (!(self instanceof Buffer)) return new Buffer(subject, encoding)

	  var type = typeof subject
	  var length

	  if (type === 'number') {
	    length = +subject
	  } else if (type === 'string') {
	    length = Buffer.byteLength(subject, encoding)
	  } else if (type === 'object' && subject !== null) {
	    // assume object is array-like
	    if (subject.type === 'Buffer' && isArray(subject.data)) subject = subject.data
	    length = +subject.length
	  } else {
	    throw new TypeError('must start with number, buffer, array or string')
	  }

	  if (length > kMaxLength) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum size: 0x' +
	      kMaxLength.toString(16) + ' bytes')
	  }

	  if (length < 0) length = 0
	  else length >>>= 0 // coerce to uint32

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Preferred: Return an augmented `Uint8Array` instance for best performance
	    self = Buffer._augment(new Uint8Array(length)) // eslint-disable-line consistent-this
	  } else {
	    // Fallback: Return THIS instance of Buffer (created by `new`)
	    self.length = length
	    self._isBuffer = true
	  }

	  var i
	  if (Buffer.TYPED_ARRAY_SUPPORT && typeof subject.byteLength === 'number') {
	    // Speed optimization -- use set if we're copying from a typed array
	    self._set(subject)
	  } else if (isArrayish(subject)) {
	    // Treat array-ish objects as a byte array
	    if (Buffer.isBuffer(subject)) {
	      for (i = 0; i < length; i++) {
	        self[i] = subject.readUInt8(i)
	      }
	    } else {
	      for (i = 0; i < length; i++) {
	        self[i] = ((subject[i] % 256) + 256) % 256
	      }
	    }
	  } else if (type === 'string') {
	    self.write(subject, 0, encoding)
	  } else if (type === 'number' && !Buffer.TYPED_ARRAY_SUPPORT) {
	    for (i = 0; i < length; i++) {
	      self[i] = 0
	    }
	  }

	  if (length > 0 && length <= Buffer.poolSize) self.parent = rootParent

	  return self
	}

	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length
	  for (var i = 0, len = Math.min(x, y); i < len && a[i] === b[i]; i++) {}
	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, totalLength) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

	  if (list.length === 0) {
	    return new Buffer(0)
	  } else if (list.length === 1) {
	    return list[0]
	  }

	  var i
	  if (totalLength === undefined) {
	    totalLength = 0
	    for (i = 0; i < list.length; i++) {
	      totalLength += list[i].length
	    }
	  }

	  var buf = new Buffer(totalLength)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}

	Buffer.byteLength = function byteLength (str, encoding) {
	  var ret
	  str = str + ''
	  switch (encoding || 'utf8') {
	    case 'ascii':
	    case 'binary':
	    case 'raw':
	      ret = str.length
	      break
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      ret = str.length * 2
	      break
	    case 'hex':
	      ret = str.length >>> 1
	      break
	    case 'utf8':
	    case 'utf-8':
	      ret = utf8ToBytes(str).length
	      break
	    case 'base64':
	      ret = base64ToBytes(str).length
	      break
	    default:
	      ret = str.length
	  }
	  return ret
	}

	// pre-set for values that may exist in the future
	Buffer.prototype.length = undefined
	Buffer.prototype.parent = undefined

	// toString(encoding, start=0, end=buffer.length)
	Buffer.prototype.toString = function toString (encoding, start, end) {
	  var loweredCase = false

	  start = start >>> 0
	  end = end === undefined || end === Infinity ? this.length : end >>> 0

	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'binary':
	        return binarySlice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0

	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1

	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }

	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	// `get` will be removed in Node 0.13+
	Buffer.prototype.get = function get (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}

	// `set` will be removed in Node 0.13+
	Buffer.prototype.set = function set (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  var charsWritten = blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	  return charsWritten
	}

	function asciiWrite (buf, string, offset, length) {
	  var charsWritten = blitBuffer(asciiToBytes(string), buf, offset, length)
	  return charsWritten
	}

	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  var charsWritten = blitBuffer(base64ToBytes(string), buf, offset, length)
	  return charsWritten
	}

	function utf16leWrite (buf, string, offset, length) {
	  var charsWritten = blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	  return charsWritten
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Support both (string, offset, length, encoding)
	  // and the legacy (string, encoding, offset, length)
	  if (isFinite(offset)) {
	    if (!isFinite(length)) {
	      encoding = length
	      length = undefined
	    }
	  } else {  // legacy
	    var swap = encoding
	    encoding = offset
	    offset = length
	    length = swap
	  }

	  offset = Number(offset) || 0

	  if (length < 0 || offset < 0 || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }

	  var remaining = this.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }
	  encoding = String(encoding || 'utf8').toLowerCase()

	  var ret
	  switch (encoding) {
	    case 'hex':
	      ret = hexWrite(this, string, offset, length)
	      break
	    case 'utf8':
	    case 'utf-8':
	      ret = utf8Write(this, string, offset, length)
	      break
	    case 'ascii':
	      ret = asciiWrite(this, string, offset, length)
	      break
	    case 'binary':
	      ret = binaryWrite(this, string, offset, length)
	      break
	    case 'base64':
	      ret = base64Write(this, string, offset, length)
	      break
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      ret = utf16leWrite(this, string, offset, length)
	      break
	    default:
	      throw new TypeError('Unknown encoding: ' + encoding)
	  }
	  return ret
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  var res = ''
	  var tmp = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    if (buf[i] <= 0x7F) {
	      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
	      tmp = ''
	    } else {
	      tmp += '%' + buf[i].toString(16)
	    }
	  }

	  return res + decodeUtf8Char(tmp)
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  if (newBuf.length) newBuf.parent = this.parent || this

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset >>> 0
	  byteLength = byteLength >>> 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset >>> 0
	  byteLength = byteLength >>> 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset >>> 0
	  byteLength = byteLength >>> 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset >>> 0
	  byteLength = byteLength >>> 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  byteLength = byteLength >>> 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) >>> 0 & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  byteLength = byteLength >>> 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) >>> 0 & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = value
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = value
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) {
	    checkInt(
	      this, value, offset, byteLength,
	      Math.pow(2, 8 * byteLength - 1) - 1,
	      -Math.pow(2, 8 * byteLength - 1)
	    )
	  }

	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) {
	    checkInt(
	      this, value, offset, byteLength,
	      Math.pow(2, 8 * byteLength - 1) - 1,
	      -Math.pow(2, 8 * byteLength - 1)
	    )
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = value
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, target_start, start, end) {
	  var self = this // source

	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (target_start >= target.length) target_start = target.length
	  if (!target_start) target_start = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || self.length === 0) return 0

	  // Fatal error conditions
	  if (target_start < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= self.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - target_start < end - start) {
	    end = target.length - target_start + start
	  }

	  var len = end - start

	  if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < len; i++) {
	      target[i + target_start] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), target_start)
	  }

	  return len
	}

	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length

	  if (end < start) throw new RangeError('end < start')

	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return

	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }

	  return this
	}

	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}

	// HELPER FUNCTIONS
	// ================

	var BP = Buffer.prototype

	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true

	  // save reference to original Uint8Array get/set methods before overwriting
	  arr._get = arr.get
	  arr._set = arr.set

	  // deprecated, will be removed in node 0.13+
	  arr.get = BP.get
	  arr.set = BP.set

	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.indexOf = BP.indexOf
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUIntLE = BP.readUIntLE
	  arr.readUIntBE = BP.readUIntBE
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readIntLE = BP.readIntLE
	  arr.readIntBE = BP.readIntBE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUIntLE = BP.writeUIntLE
	  arr.writeUIntBE = BP.writeUIntBE
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeIntLE = BP.writeIntLE
	  arr.writeIntBE = BP.writeIntBE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer

	  return arr
	}

	var INVALID_BASE64_RE = /[^+\/0-9A-z\-]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function isArrayish (subject) {
	  return isArray(subject) || Buffer.isBuffer(subject) ||
	      subject && typeof subject === 'object' &&
	      typeof subject.length === 'number'
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []
	  var i = 0

	  for (; i < length; i++) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (leadSurrogate) {
	        // 2 leads in a row
	        if (codePoint < 0xDC00) {
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          leadSurrogate = codePoint
	          continue
	        } else {
	          // valid surrogate pair
	          codePoint = leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00 | 0x10000
	          leadSurrogate = null
	        }
	      } else {
	        // no lead yet

	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else {
	          // valid lead
	          leadSurrogate = codePoint
	          continue
	        }
	      }
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	      leadSurrogate = null
	    }

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x200000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	function decodeUtf8Char (str) {
	  try {
	    return decodeURIComponent(str)
	  } catch (err) {
	    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3).Buffer))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports.read = function(buffer, offset, isLE, mLen, nBytes) {
	  var e, m,
	      eLen = nBytes * 8 - mLen - 1,
	      eMax = (1 << eLen) - 1,
	      eBias = eMax >> 1,
	      nBits = -7,
	      i = isLE ? (nBytes - 1) : 0,
	      d = isLE ? -1 : 1,
	      s = buffer[offset + i];

	  i += d;

	  e = s & ((1 << (-nBits)) - 1);
	  s >>= (-nBits);
	  nBits += eLen;
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

	  m = e & ((1 << (-nBits)) - 1);
	  e >>= (-nBits);
	  nBits += mLen;
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity);
	  } else {
	    m = m + Math.pow(2, mLen);
	    e = e - eBias;
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
	};

	exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c,
	      eLen = nBytes * 8 - mLen - 1,
	      eMax = (1 << eLen) - 1,
	      eBias = eMax >> 1,
	      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
	      i = isLE ? 0 : (nBytes - 1),
	      d = isLE ? 1 : -1,
	      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

	  value = Math.abs(value);

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0;
	    e = eMax;
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2);
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }
	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * Math.pow(2, 1 - eBias);
	    }
	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }

	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
	      e = 0;
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

	  e = (e << mLen) | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

	  buffer[offset + i - d] |= s * 128;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * isArray
	 */

	var isArray = Array.isArray;

	/**
	 * toString
	 */

	var str = Object.prototype.toString;

	/**
	 * Whether or not the given `val`
	 * is an array.
	 *
	 * example:
	 *
	 *        isArray([]);
	 *        // > true
	 *        isArray(arguments);
	 *        // > false
	 *        isArray('');
	 *        // > false
	 *
	 * @param {mixed} val
	 * @return {bool}
	 */

	module.exports = isArray || function (val) {
	  return !! val && '[object Array]' == str.call(val);
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	;(function (exports) {
		'use strict';

	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array

		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
		var PLUS_URL_SAFE = '-'.charCodeAt(0)
		var SLASH_URL_SAFE = '_'.charCodeAt(0)

		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS ||
			    code === PLUS_URL_SAFE)
				return 62 // '+'
			if (code === SLASH ||
			    code === SLASH_URL_SAFE)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}

		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr

			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}

			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)

			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length

			var L = 0

			function push (v) {
				arr[L++] = v
			}

			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}

			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}

			return arr
		}

		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length

			function encode (num) {
				return lookup.charAt(num)
			}

			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}

			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}

			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}

			return output
		}

		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}(false ? (this.base64js = {}) : exports))


/***/ }
/******/ ]);