 
   //new part        
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.io=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){

module.exports = _dereq_('./lib/');

},{"./lib/":2}],2:[function(_dereq_,module,exports){

/**
 * Module dependencies.
 */

var url = _dereq_('./url');
var parser = _dereq_('socket.io-parser');
var Manager = _dereq_('./manager');
var debug = _dereq_('debug')('socket.io-client');

/**
 * Module exports.
 */

module.exports = exports = lookup;

/**
 * Managers cache.
 */

var cache = exports.managers = {};

/**
 * Looks up an existing `Manager` for multiplexing.
 * If the user summons:
 *
 *   `io('http://localhost/a');`
 *   `io('http://localhost/b');`
 *
 * We reuse the existing instance based on same scheme/port/host,
 * and we initialize sockets for each namespace.
 *
 * @api public
 */

function lookup(uri, opts) {
  if (typeof uri == 'object') {
    opts = uri;
    uri = undefined;
  }

  opts = opts || {};

  var parsed = url(uri);
  var source = parsed.source;
  var id = parsed.id;
  var io;

  if (opts.forceNew || opts['force new connection'] || false === opts.multiplex) {
    debug('ignoring socket cache for %s', source);
    io = Manager(source, opts);
  } else {
    if (!cache[id]) {
      debug('new io instance for %s', source);
      cache[id] = Manager(source, opts);
    }
    io = cache[id];
  }

  return io.socket(parsed.path);
}

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = parser.protocol;

/**
 * `connect`.
 *
 * @param {String} uri
 * @api public
 */

exports.connect = lookup;

/**
 * Expose constructors for standalone build.
 *
 * @api public
 */

exports.Manager = _dereq_('./manager');
exports.Socket = _dereq_('./socket');

},{"./manager":3,"./socket":5,"./url":6,"debug":10,"socket.io-parser":46}],3:[function(_dereq_,module,exports){

/**
 * Module dependencies.
 */

var url = _dereq_('./url');
var eio = _dereq_('engine.io-client');
var Socket = _dereq_('./socket');
var Emitter = _dereq_('component-emitter');
var parser = _dereq_('socket.io-parser');
var on = _dereq_('./on');
var bind = _dereq_('component-bind');
var object = _dereq_('object-component');
var debug = _dereq_('debug')('socket.io-client:manager');
var indexOf = _dereq_('indexof');
var Backoff = _dereq_('backo2');

/**
 * Module exports
 */

module.exports = Manager;

/**
 * `Manager` constructor.
 *
 * @param {String} engine instance or engine uri/opts
 * @param {Object} options
 * @api public
 */

function Manager(uri, opts){
  if (!(this instanceof Manager)) return new Manager(uri, opts);
  if (uri && ('object' == typeof uri)) {
    opts = uri;
    uri = undefined;
  }
  opts = opts || {};

  opts.path = opts.path || '/socket.io';
  this.nsps = {};
  this.subs = [];
  this.opts = opts;
  this.reconnection(opts.reconnection !== false);
  this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
  this.reconnectionDelay(opts.reconnectionDelay || 1000);
  this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
  this.randomizationFactor(opts.randomizationFactor || 0.5);
  this.backoff = new Backoff({
    min: this.reconnectionDelay(),
    max: this.reconnectionDelayMax(),
    jitter: this.randomizationFactor()
  });
  this.timeout(null == opts.timeout ? 20000 : opts.timeout);
  this.readyState = 'closed';
  this.uri = uri;
  this.connected = [];
  this.encoding = false;
  this.packetBuffer = [];
  this.encoder = new parser.Encoder();
  this.decoder = new parser.Decoder();
  this.autoConnect = opts.autoConnect !== false;
  if (this.autoConnect) this.open();
}

/**
 * Propagate given event to sockets and emit on `this`
 *
 * @api private
 */

Manager.prototype.emitAll = function() {
  this.emit.apply(this, arguments);
  for (var nsp in this.nsps) {
    this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
  }
};

/**
 * Update `socket.id` of all sockets
 *
 * @api private
 */

Manager.prototype.updateSocketIds = function(){
  for (var nsp in this.nsps) {
    this.nsps[nsp].id = this.engine.id;
  }
};

/**
 * Mix in `Emitter`.
 */

Emitter(Manager.prototype);

/**
 * Sets the `reconnection` config.
 *
 * @param {Boolean} true/false if it should automatically reconnect
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnection = function(v){
  if (!arguments.length) return this._reconnection;
  this._reconnection = !!v;
  return this;
};

/**
 * Sets the reconnection attempts config.
 *
 * @param {Number} max reconnection attempts before giving up
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionAttempts = function(v){
  if (!arguments.length) return this._reconnectionAttempts;
  this._reconnectionAttempts = v;
  return this;
};

/**
 * Sets the delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelay = function(v){
  if (!arguments.length) return this._reconnectionDelay;
  this._reconnectionDelay = v;
  this.backoff && this.backoff.setMin(v);
  return this;
};

Manager.prototype.randomizationFactor = function(v){
  if (!arguments.length) return this._randomizationFactor;
  this._randomizationFactor = v;
  this.backoff && this.backoff.setJitter(v);
  return this;
};

/**
 * Sets the maximum delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelayMax = function(v){
  if (!arguments.length) return this._reconnectionDelayMax;
  this._reconnectionDelayMax = v;
  this.backoff && this.backoff.setMax(v);
  return this;
};

/**
 * Sets the connection timeout. `false` to disable
 *
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.timeout = function(v){
  if (!arguments.length) return this._timeout;
  this._timeout = v;
  return this;
};

/**
 * Starts trying to reconnect if reconnection is enabled and we have not
 * started reconnecting yet
 *
 * @api private
 */

Manager.prototype.maybeReconnectOnOpen = function() {
  // Only try to reconnect if it's the first time we're connecting
  if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
    // keeps reconnection from firing twice for the same reconnection loop
    this.reconnect();
  }
};


/**
 * Sets the current transport `socket`.
 *
 * @param {Function} optional, callback
 * @return {Manager} self
 * @api public
 */

Manager.prototype.open =
Manager.prototype.connect = function(fn){
  debug('readyState %s', this.readyState);
  if (~this.readyState.indexOf('open')) return this;

  debug('opening %s', this.uri);
  this.engine = eio(this.uri, this.opts);
  var socket = this.engine;
  var self = this;
  this.readyState = 'opening';
  this.skipReconnect = false;

  // emit `open`
  var openSub = on(socket, 'open', function() {
    self.onopen();
    fn && fn();
  });

  // emit `connect_error`
  var errorSub = on(socket, 'error', function(data){
    debug('connect_error');
    self.cleanup();
    self.readyState = 'closed';
    self.emitAll('connect_error', data);
    if (fn) {
      var err = new Error('Connection error');
      err.data = data;
      fn(err);
    } else {
      // Only do this if there is no fn to handle the error
      self.maybeReconnectOnOpen();
    }
  });

  // emit `connect_timeout`
  if (false !== this._timeout) {
    var timeout = this._timeout;
    debug('connect attempt will timeout after %d', timeout);

    // set timer
    var timer = setTimeout(function(){
      debug('connect attempt timed out after %d', timeout);
      openSub.destroy();
      socket.close();
      socket.emit('error', 'timeout');
      self.emitAll('connect_timeout', timeout);
    }, timeout);

    this.subs.push({
      destroy: function(){
        clearTimeout(timer);
      }
    });
  }

  this.subs.push(openSub);
  this.subs.push(errorSub);

  return this;
};

/**
 * Called upon transport open.
 *
 * @api private
 */

Manager.prototype.onopen = function(){
  debug('open');

  // clear old subs
  this.cleanup();

  // mark as open
  this.readyState = 'open';
  this.emit('open');

  // add new subs
  var socket = this.engine;
  this.subs.push(on(socket, 'data', bind(this, 'ondata')));
  this.subs.push(on(this.decoder, 'decoded', bind(this, 'ondecoded')));
  this.subs.push(on(socket, 'error', bind(this, 'onerror')));
  this.subs.push(on(socket, 'close', bind(this, 'onclose')));
};

/**
 * Called with data.
 *
 * @api private
 */

Manager.prototype.ondata = function(data){
  this.decoder.add(data);
};

/**
 * Called when parser fully decodes a packet.
 *
 * @api private
 */

Manager.prototype.ondecoded = function(packet) {
  this.emit('packet', packet);
};

/**
 * Called upon socket error.
 *
 * @api private
 */

Manager.prototype.onerror = function(err){
  debug('error', err);
  this.emitAll('error', err);
};

/**
 * Creates a new socket for the given `nsp`.
 *
 * @return {Socket}
 * @api public
 */

Manager.prototype.socket = function(nsp){
  var socket = this.nsps[nsp];
  if (!socket) {
    socket = new Socket(this, nsp);
    this.nsps[nsp] = socket;
    var self = this;
    socket.on('connect', function(){
      socket.id = self.engine.id;
      if (!~indexOf(self.connected, socket)) {
        self.connected.push(socket);
      }
    });
  }
  return socket;
};

/**
 * Called upon a socket close.
 *
 * @param {Socket} socket
 */

Manager.prototype.destroy = function(socket){
  var index = indexOf(this.connected, socket);
  if (~index) this.connected.splice(index, 1);
  if (this.connected.length) return;

  this.close();
};

/**
 * Writes a packet.
 *
 * @param {Object} packet
 * @api private
 */

Manager.prototype.packet = function(packet){
  debug('writing packet %j', packet);
  var self = this;

  if (!self.encoding) {
    // encode, then write to engine with result
    self.encoding = true;
    this.encoder.encode(packet, function(encodedPackets) {
      for (var i = 0; i < encodedPackets.length; i++) {
        self.engine.write(encodedPackets[i]);
      }
      self.encoding = false;
      self.processPacketQueue();
    });
  } else { // add packet to the queue
    self.packetBuffer.push(packet);
  }
};

/**
 * If packet buffer is non-empty, begins encoding the
 * next packet in line.
 *
 * @api private
 */

Manager.prototype.processPacketQueue = function() {
  if (this.packetBuffer.length > 0 && !this.encoding) {
    var pack = this.packetBuffer.shift();
    this.packet(pack);
  }
};

/**
 * Clean up transport subscriptions and packet buffer.
 *
 * @api private
 */

Manager.prototype.cleanup = function(){
  var sub;
  while (sub = this.subs.shift()) sub.destroy();

  this.packetBuffer = [];
  this.encoding = false;

  this.decoder.destroy();
};

/**
 * Close the current socket.
 *
 * @api private
 */

Manager.prototype.close =
Manager.prototype.disconnect = function(){
  this.skipReconnect = true;
  this.backoff.reset();
  this.readyState = 'closed';
  this.engine && this.engine.close();
};

/**
 * Called upon engine close.
 *
 * @api private
 */

Manager.prototype.onclose = function(reason){
  debug('close');
  this.cleanup();
  this.backoff.reset();
  this.readyState = 'closed';
  this.emit('close', reason);
  if (this._reconnection && !this.skipReconnect) {
    this.reconnect();
  }
};

/**
 * Attempt a reconnection.
 *
 * @api private
 */

Manager.prototype.reconnect = function(){
  if (this.reconnecting || this.skipReconnect) return this;

  var self = this;

  if (this.backoff.attempts >= this._reconnectionAttempts) {
    debug('reconnect failed');
    this.backoff.reset();
    this.emitAll('reconnect_failed');
    this.reconnecting = false;
  } else {
    var delay = this.backoff.duration();
    debug('will wait %dms before reconnect attempt', delay);

    this.reconnecting = true;
    var timer = setTimeout(function(){
      if (self.skipReconnect) return;

      debug('attempting reconnect');
      self.emitAll('reconnect_attempt', self.backoff.attempts);
      self.emitAll('reconnecting', self.backoff.attempts);

      // check again for the case socket closed in above events
      if (self.skipReconnect) return;

      self.open(function(err){
        if (err) {
          debug('reconnect attempt error');
          self.reconnecting = false;
          self.reconnect();
          self.emitAll('reconnect_error', err.data);
        } else {
          debug('reconnect success');
          self.onreconnect();
        }
      });
    }, delay);

    this.subs.push({
      destroy: function(){
        clearTimeout(timer);
      }
    });
  }
};

/**
 * Called upon successful reconnect.
 *
 * @api private
 */

Manager.prototype.onreconnect = function(){
  var attempt = this.backoff.attempts;
  this.reconnecting = false;
  this.backoff.reset();
  this.updateSocketIds();
  this.emitAll('reconnect', attempt);
};

},{"./on":4,"./socket":5,"./url":6,"backo2":7,"component-bind":8,"component-emitter":9,"debug":10,"engine.io-client":11,"indexof":42,"object-component":43,"socket.io-parser":46}],4:[function(_dereq_,module,exports){

/**
 * Module exports.
 */

module.exports = on;

/**
 * Helper for subscriptions.
 *
 * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
 * @param {String} event name
 * @param {Function} callback
 * @api public
 */

function on(obj, ev, fn) {
  obj.on(ev, fn);
  return {
    destroy: function(){
      obj.removeListener(ev, fn);
    }
  };
}

},{}],5:[function(_dereq_,module,exports){

/**
 * Module dependencies.
 */

var parser = _dereq_('socket.io-parser');
var Emitter = _dereq_('component-emitter');
var toArray = _dereq_('to-array');
var on = _dereq_('./on');
var bind = _dereq_('component-bind');
var debug = _dereq_('debug')('socket.io-client:socket');
var hasBin = _dereq_('has-binary');

/**
 * Module exports.
 */

module.exports = exports = Socket;

/**
 * Internal events (blacklisted).
 * These events can't be emitted by the user.
 *
 * @api private
 */

var events = {
  connect: 1,
  connect_error: 1,
  connect_timeout: 1,
  disconnect: 1,
  error: 1,
  reconnect: 1,
  reconnect_attempt: 1,
  reconnect_failed: 1,
  reconnect_error: 1,
  reconnecting: 1
};

/**
 * Shortcut to `Emitter#emit`.
 */

var emit = Emitter.prototype.emit;

/**
 * `Socket` constructor.
 *
 * @api public
 */

function Socket(io, nsp){
  this.io = io;
  this.nsp = nsp;
  this.json = this; // compat
  this.ids = 0;
  this.acks = {};
  if (this.io.autoConnect) this.open();
  this.receiveBuffer = [];
  this.sendBuffer = [];
  this.connected = false;
  this.disconnected = true;
}

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Subscribe to open, close and packet events
 *
 * @api private
 */

Socket.prototype.subEvents = function() {
  if (this.subs) return;

  var io = this.io;
  this.subs = [
    on(io, 'open', bind(this, 'onopen')),
    on(io, 'packet', bind(this, 'onpacket')),
    on(io, 'close', bind(this, 'onclose'))
  ];
};

/**
 * "Opens" the socket.
 *
 * @api public
 */

Socket.prototype.open =
Socket.prototype.connect = function(){
  if (this.connected) return this;

  this.subEvents();
  this.io.open(); // ensure open
  if ('open' == this.io.readyState) this.onopen();
  return this;
};

/**
 * Sends a `message` event.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.send = function(){
  var args = toArray(arguments);
  args.unshift('message');
  this.emit.apply(this, args);
  return this;
};

/**
 * Override `emit`.
 * If the event is in `events`, it's emitted normally.
 *
 * @param {String} event name
 * @return {Socket} self
 * @api public
 */

Socket.prototype.emit = function(ev){
  if (events.hasOwnProperty(ev)) {
    emit.apply(this, arguments);
    return this;
  }

  var args = toArray(arguments);
  var parserType = parser.EVENT; // default
  if (hasBin(args)) { parserType = parser.BINARY_EVENT; } // binary
  var packet = { type: parserType, data: args };

  // event ack callback
  if ('function' == typeof args[args.length - 1]) {
    debug('emitting packet with ack id %d', this.ids);
    this.acks[this.ids] = args.pop();
    packet.id = this.ids++;
  }

  if (this.connected) {
    this.packet(packet);
  } else {
    this.sendBuffer.push(packet);
  }

  return this;
};

/**
 * Sends a packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.packet = function(packet){
  packet.nsp = this.nsp;
  this.io.packet(packet);
};

/**
 * Called upon engine `open`.
 *
 * @api private
 */

Socket.prototype.onopen = function(){
  debug('transport is open - connecting');

  // write connect packet if necessary
  if ('/' != this.nsp) {
    this.packet({ type: parser.CONNECT });
  }
};

/**
 * Called upon engine `close`.
 *
 * @param {String} reason
 * @api private
 */

Socket.prototype.onclose = function(reason){
  debug('close (%s)', reason);
  this.connected = false;
  this.disconnected = true;
  delete this.id;
  this.emit('disconnect', reason);
};

/**
 * Called with socket packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onpacket = function(packet){
  if (packet.nsp != this.nsp) return;

  switch (packet.type) {
    case parser.CONNECT:
      this.onconnect();
      break;

    case parser.EVENT:
      this.onevent(packet);
      break;

    case parser.BINARY_EVENT:
      this.onevent(packet);
      break;

    case parser.ACK:
      this.onack(packet);
      break;

    case parser.BINARY_ACK:
      this.onack(packet);
      break;

    case parser.DISCONNECT:
      this.ondisconnect();
      break;

    case parser.ERROR:
      this.emit('error', packet.data);
      break;
  }
};

/**
 * Called upon a server event.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onevent = function(packet){
  var args = packet.data || [];
  debug('emitting event %j', args);

  if (null != packet.id) {
    debug('attaching ack callback to event');
    args.push(this.ack(packet.id));
  }

  if (this.connected) {
    emit.apply(this, args);
  } else {
    this.receiveBuffer.push(args);
  }
};

/**
 * Produces an ack callback to emit with an event.
 *
 * @api private
 */

Socket.prototype.ack = function(id){
  var self = this;
  var sent = false;
  return function(){
    // prevent double callbacks
    if (sent) return;
    sent = true;
    var args = toArray(arguments);
    debug('sending ack %j', args);

    var type = hasBin(args) ? parser.BINARY_ACK : parser.ACK;
    self.packet({
      type: type,
      id: id,
      data: args
    });
  };
};

/**
 * Called upon a server acknowlegement.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onack = function(packet){
  debug('calling ack %s with %j', packet.id, packet.data);
  var fn = this.acks[packet.id];
  fn.apply(this, packet.data);
  delete this.acks[packet.id];
};

/**
 * Called upon server connect.
 *
 * @api private
 */

Socket.prototype.onconnect = function(){
  this.connected = true;
  this.disconnected = false;
  this.emit('connect');
  this.emitBuffered();
};

/**
 * Emit buffered events (received and emitted).
 *
 * @api private
 */

Socket.prototype.emitBuffered = function(){
  var i;
  for (i = 0; i < this.receiveBuffer.length; i++) {
    emit.apply(this, this.receiveBuffer[i]);
  }
  this.receiveBuffer = [];

  for (i = 0; i < this.sendBuffer.length; i++) {
    this.packet(this.sendBuffer[i]);
  }
  this.sendBuffer = [];
};

/**
 * Called upon server disconnect.
 *
 * @api private
 */

Socket.prototype.ondisconnect = function(){
  debug('server disconnect (%s)', this.nsp);
  this.destroy();
  this.onclose('io server disconnect');
};

/**
 * Called upon forced client/server side disconnections,
 * this method ensures the manager stops tracking us and
 * that reconnections don't get triggered for this.
 *
 * @api private.
 */

Socket.prototype.destroy = function(){
  if (this.subs) {
    // clean subscriptions to avoid reconnections
    for (var i = 0; i < this.subs.length; i++) {
      this.subs[i].destroy();
    }
    this.subs = null;
  }

  this.io.destroy(this);
};

/**
 * Disconnects the socket manually.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.close =
Socket.prototype.disconnect = function(){
  if (this.connected) {
    debug('performing disconnect (%s)', this.nsp);
    this.packet({ type: parser.DISCONNECT });
  }

  // remove socket from pool
  this.destroy();

  if (this.connected) {
    // fire events
    this.onclose('io client disconnect');
  }
  return this;
};

},{"./on":4,"component-bind":8,"component-emitter":9,"debug":10,"has-binary":38,"socket.io-parser":46,"to-array":50}],6:[function(_dereq_,module,exports){
(function (global){

/**
 * Module dependencies.
 */

var parseuri = _dereq_('parseuri');
var debug = _dereq_('debug')('socket.io-client:url');

/**
 * Module exports.
 */

module.exports = url;

/**
 * URL parser.
 *
 * @param {String} url
 * @param {Object} An object meant to mimic window.location.
 *                 Defaults to window.location.
 * @api public
 */

function url(uri, loc){
  var obj = uri;

  // default to window.location
  var loc = loc || global.location;
  if (null == uri) uri = loc.protocol + '//' + loc.host;

  // relative path support
  if ('string' == typeof uri) {
    if ('/' == uri.charAt(0)) {
      if ('/' == uri.charAt(1)) {
        uri = loc.protocol + uri;
      } else {
        uri = loc.hostname + uri;
      }
    }

    if (!/^(https?|wss?):\/\//.test(uri)) {
      debug('protocol-less url %s', uri);
      if ('undefined' != typeof loc) {
        uri = loc.protocol + '//' + uri;
      } else {
        uri = 'https://' + uri;
      }
    }

    // parse
    debug('parse %s', uri);
    obj = parseuri(uri);
  }

  // make sure we treat `localhost:80` and `localhost` equally
  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = '80';
    }
    else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = '443';
    }
  }

  obj.path = obj.path || '/';

  // define unique id
  obj.id = obj.protocol + '://' + obj.host + ':' + obj.port;
  // define href
  obj.href = obj.protocol + '://' + obj.host + (loc && loc.port == obj.port ? '' : (':' + obj.port));

  return obj;
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"debug":10,"parseuri":44}],7:[function(_dereq_,module,exports){

/**
 * Expose `Backoff`.
 */

module.exports = Backoff;

/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */

function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 10000;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}

/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */

Backoff.prototype.duration = function(){
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand =  Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};

/**
 * Reset the number of attempts.
 *
 * @api public
 */

Backoff.prototype.reset = function(){
  this.attempts = 0;
};

/**
 * Set the minimum duration
 *
 * @api public
 */

Backoff.prototype.setMin = function(min){
  this.ms = min;
};

/**
 * Set the maximum duration
 *
 * @api public
 */

Backoff.prototype.setMax = function(max){
  this.max = max;
};

/**
 * Set the jitter
 *
 * @api public
 */

Backoff.prototype.setJitter = function(jitter){
  this.jitter = jitter;
};


},{}],8:[function(_dereq_,module,exports){
/**
 * Slice reference.
 */

var slice = [].slice;

/**
 * Bind `obj` to `fn`.
 *
 * @param {Object} obj
 * @param {Function|String} fn or string
 * @return {Function}
 * @api public
 */

module.exports = function(obj, fn){
  if ('string' == typeof fn) fn = obj[fn];
  if ('function' != typeof fn) throw new Error('bind() requires a function');
  var args = slice.call(arguments, 2);
  return function(){
    return fn.apply(obj, args.concat(slice.call(arguments)));
  }
};

},{}],9:[function(_dereq_,module,exports){

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],10:[function(_dereq_,module,exports){

/**
 * Expose `debug()` as the module.
 */

module.exports = debug;

/**
 * Create a debugger with the given `name`.
 *
 * @param {String} name
 * @return {Type}
 * @api public
 */

function debug(name) {
  if (!debug.enabled(name)) return function(){};

  return function(fmt){
    fmt = coerce(fmt);

    var curr = new Date;
    var ms = curr - (debug[name] || curr);
    debug[name] = curr;

    fmt = name
      + ' '
      + fmt
      + ' +' + debug.humanize(ms);

    // This hackery is required for IE8
    // where `console.log` doesn't have 'apply'
    window.console
      && console.log
      && Function.prototype.apply.call(console.log, console, arguments);
  }
}

/**
 * The currently active debug mode names.
 */

debug.names = [];
debug.skips = [];

/**
 * Enables a debug mode by name. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} name
 * @api public
 */

debug.enable = function(name) {
  try {
    localStorage.debug = name;
  } catch(e){}

  var split = (name || '').split(/[\s,]+/)
    , len = split.length;

  for (var i = 0; i < len; i++) {
    name = split[i].replace('*', '.*?');
    if (name[0] === '-') {
      debug.skips.push(new RegExp('^' + name.substr(1) + '$'));
    }
    else {
      debug.names.push(new RegExp('^' + name + '$'));
    }
  }
};

/**
 * Disable debug output.
 *
 * @api public
 */

debug.disable = function(){
  debug.enable('');
};

/**
 * Humanize the given `ms`.
 *
 * @param {Number} m
 * @return {String}
 * @api private
 */

debug.humanize = function(ms) {
  var sec = 1000
    , min = 60 * 1000
    , hour = 60 * min;

  if (ms >= hour) return (ms / hour).toFixed(1) + 'h';
  if (ms >= min) return (ms / min).toFixed(1) + 'm';
  if (ms >= sec) return (ms / sec | 0) + 's';
  return ms + 'ms';
};

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

debug.enabled = function(name) {
  for (var i = 0, len = debug.skips.length; i < len; i++) {
    if (debug.skips[i].test(name)) {
      return false;
    }
  }
  for (var i = 0, len = debug.names.length; i < len; i++) {
    if (debug.names[i].test(name)) {
      return true;
    }
  }
  return false;
};

/**
 * Coerce `val`.
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

// persist

try {
  if (window.localStorage) debug.enable(localStorage.debug);
} catch(e){}

},{}],11:[function(_dereq_,module,exports){

module.exports =  _dereq_('./lib/');

},{"./lib/":12}],12:[function(_dereq_,module,exports){

module.exports = _dereq_('./socket');

/**
 * Exports parser
 *
 * @api public
 *
 */
module.exports.parser = _dereq_('engine.io-parser');

},{"./socket":13,"engine.io-parser":25}],13:[function(_dereq_,module,exports){
(function (global){
/**
 * Module dependencies.
 */

var transports = _dereq_('./transports');
var Emitter = _dereq_('component-emitter');
var debug = _dereq_('debug')('engine.io-client:socket');
var index = _dereq_('indexof');
var parser = _dereq_('engine.io-parser');
var parseuri = _dereq_('parseuri');
var parsejson = _dereq_('parsejson');
var parseqs = _dereq_('parseqs');

/**
 * Module exports.
 */

module.exports = Socket;

/**
 * Noop function.
 *
 * @api private
 */

function noop(){}

/**
 * Socket constructor.
 *
 * @param {String|Object} uri or options
 * @param {Object} options
 * @api public
 */

function Socket(uri, opts){
  if (!(this instanceof Socket)) return new Socket(uri, opts);

  opts = opts || {};

  if (uri && 'object' == typeof uri) {
    opts = uri;
    uri = null;
  }

  if (uri) {
    uri = parseuri(uri);
    opts.host = uri.host;
    opts.secure = uri.protocol == 'https' || uri.protocol == 'wss';
    opts.port = uri.port;
    if (uri.query) opts.query = uri.query;
  }

  this.secure = null != opts.secure ? opts.secure :
    (global.location && 'https:' == location.protocol);

  if (opts.host) {
    var pieces = opts.host.split(':');
    opts.hostname = pieces.shift();
    if (pieces.length) {
      opts.port = pieces.pop();
    } else if (!opts.port) {
      // if no port is specified manually, use the protocol default
      opts.port = this.secure ? '443' : '80';
    }
  }

  this.agent = opts.agent || false;
  this.hostname = opts.hostname ||
    (global.location ? location.hostname : 'localhost');
  this.port = opts.port || (global.location && location.port ?
       location.port :
       (this.secure ? 443 : 80));
  this.query = opts.query || {};
  if ('string' == typeof this.query) this.query = parseqs.decode(this.query);
  this.upgrade = false !== opts.upgrade;
  this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
  this.forceJSONP = !!opts.forceJSONP;
  this.jsonp = false !== opts.jsonp;
  this.forceBase64 = !!opts.forceBase64;
  this.enablesXDR = !!opts.enablesXDR;
  this.timestampParam = opts.timestampParam || 't';
  this.timestampRequests = opts.timestampRequests;
  this.transports = opts.transports || ['polling', 'websocket'];
  this.readyState = '';
  this.writeBuffer = [];
  this.callbackBuffer = [];
  this.policyPort = opts.policyPort || 843;
  this.rememberUpgrade = opts.rememberUpgrade || false;
  this.binaryType = null;
  this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;

  // SSL options for Node.js client
  this.pfx = opts.pfx || null;
  this.key = opts.key || null;
  this.passphrase = opts.passphrase || null;
  this.cert = opts.cert || null;
  this.ca = opts.ca || null;
  this.ciphers = opts.ciphers || null;
  this.rejectUnauthorized = opts.rejectUnauthorized || null;

  this.open();
}

Socket.priorWebsocketSuccess = false;

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Protocol version.
 *
 * @api public
 */

Socket.protocol = parser.protocol; // this is an int

/**
 * Expose deps for legacy compatibility
 * and standalone browser access.
 */

Socket.Socket = Socket;
Socket.Transport = _dereq_('./transport');
Socket.transports = _dereq_('./transports');
Socket.parser = _dereq_('engine.io-parser');

/**
 * Creates transport of the given type.
 *
 * @param {String} transport name
 * @return {Transport}
 * @api private
 */

Socket.prototype.createTransport = function (name) {
  debug('creating transport "%s"', name);
  var query = clone(this.query);

  // append engine.io protocol identifier
  query.EIO = parser.protocol;

  // transport name
  query.transport = name;

  // session id if we already have one
  if (this.id) query.sid = this.id;

  var transport = new transports[name]({
    agent: this.agent,
    hostname: this.hostname,
    port: this.port,
    secure: this.secure,
    path: this.path,
    query: query,
    forceJSONP: this.forceJSONP,
    jsonp: this.jsonp,
    forceBase64: this.forceBase64,
    enablesXDR: this.enablesXDR,
    timestampRequests: this.timestampRequests,
    timestampParam: this.timestampParam,
    policyPort: this.policyPort,
    socket: this,
    pfx: this.pfx,
    key: this.key,
    passphrase: this.passphrase,
    cert: this.cert,
    ca: this.ca,
    ciphers: this.ciphers,
    rejectUnauthorized: this.rejectUnauthorized
  });

  return transport;
};

function clone (obj) {
  var o = {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = obj[i];
    }
  }
  return o;
}

/**
 * Initializes transport to use and starts probe.
 *
 * @api private
 */
Socket.prototype.open = function () {
  var transport;
  if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') != -1) {
    transport = 'websocket';
  } else if (0 == this.transports.length) {
    // Emit error on next tick so it can be listened to
    var self = this;
    setTimeout(function() {
      self.emit('error', 'No transports available');
    }, 0);
    return;
  } else {
    transport = this.transports[0];
  }
  this.readyState = 'opening';

  // Retry with the next transport if the transport is disabled (jsonp: false)
  var transport;
  try {
    transport = this.createTransport(transport);
  } catch (e) {
    this.transports.shift();
    this.open();
    return;
  }

  transport.open();
  this.setTransport(transport);
};

/**
 * Sets the current transport. Disables the existing one (if any).
 *
 * @api private
 */

Socket.prototype.setTransport = function(transport){
  debug('setting transport %s', transport.name);
  var self = this;

  if (this.transport) {
    debug('clearing existing transport %s', this.transport.name);
    this.transport.removeAllListeners();
  }

  // set up transport
  this.transport = transport;

  // set up transport listeners
  transport
  .on('drain', function(){
    self.onDrain();
  })
  .on('packet', function(packet){
    self.onPacket(packet);
  })
  .on('error', function(e){
    self.onError(e);
  })
  .on('close', function(){
    self.onClose('transport close');
  });
};

/**
 * Probes a transport.
 *
 * @param {String} transport name
 * @api private
 */

Socket.prototype.probe = function (name) {
  debug('probing transport "%s"', name);
  var transport = this.createTransport(name, { probe: 1 })
    , failed = false
    , self = this;

  Socket.priorWebsocketSuccess = false;

  function onTransportOpen(){
    if (self.onlyBinaryUpgrades) {
      var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
      failed = failed || upgradeLosesBinary;
    }
    if (failed) return;

    debug('probe transport "%s" opened', name);
    transport.send([{ type: 'ping', data: 'probe' }]);
    transport.once('packet', function (msg) {
      if (failed) return;
      if ('pong' == msg.type && 'probe' == msg.data) {
        debug('probe transport "%s" pong', name);
        self.upgrading = true;
        self.emit('upgrading', transport);
        if (!transport) return;
        Socket.priorWebsocketSuccess = 'websocket' == transport.name;

        debug('pausing current transport "%s"', self.transport.name);
        self.transport.pause(function () {
          if (failed) return;
          if ('closed' == self.readyState) return;
          debug('changing transport and sending upgrade packet');

          cleanup();

          self.setTransport(transport);
          transport.send([{ type: 'upgrade' }]);
          self.emit('upgrade', transport);
          transport = null;
          self.upgrading = false;
          self.flush();
        });
      } else {
        debug('probe transport "%s" failed', name);
        var err = new Error('probe error');
        err.transport = transport.name;
        self.emit('upgradeError', err);
      }
    });
  }

  function freezeTransport() {
    if (failed) return;

    // Any callback called by transport should be ignored since now
    failed = true;

    cleanup();

    transport.close();
    transport = null;
  }

  //Handle any error that happens while probing
  function onerror(err) {
    var error = new Error('probe error: ' + err);
    error.transport = transport.name;

    freezeTransport();

    debug('probe transport "%s" failed because of error: %s', name, err);

    self.emit('upgradeError', error);
  }

  function onTransportClose(){
    onerror("transport closed");
  }

  //When the socket is closed while we're probing
  function onclose(){
    onerror("socket closed");
  }

  //When the socket is upgraded while we're probing
  function onupgrade(to){
    if (transport && to.name != transport.name) {
      debug('"%s" works - aborting "%s"', to.name, transport.name);
      freezeTransport();
    }
  }

  //Remove all listeners on the transport and on self
  function cleanup(){
    transport.removeListener('open', onTransportOpen);
    transport.removeListener('error', onerror);
    transport.removeListener('close', onTransportClose);
    self.removeListener('close', onclose);
    self.removeListener('upgrading', onupgrade);
  }

  transport.once('open', onTransportOpen);
  transport.once('error', onerror);
  transport.once('close', onTransportClose);

  this.once('close', onclose);
  this.once('upgrading', onupgrade);

  transport.open();

};

/**
 * Called when connection is deemed open.
 *
 * @api public
 */

Socket.prototype.onOpen = function () {
  debug('socket open');
  this.readyState = 'open';
  Socket.priorWebsocketSuccess = 'websocket' == this.transport.name;
  this.emit('open');
  this.flush();

  // we check for `readyState` in case an `open`
  // listener already closed the socket
  if ('open' == this.readyState && this.upgrade && this.transport.pause) {
    debug('starting upgrade probes');
    for (var i = 0, l = this.upgrades.length; i < l; i++) {
      this.probe(this.upgrades[i]);
    }
  }
};

/**
 * Handles a packet.
 *
 * @api private
 */

Socket.prototype.onPacket = function (packet) {
  if ('opening' == this.readyState || 'open' == this.readyState) {
    debug('socket receive: type "%s", data "%s"', packet.type, packet.data);

    this.emit('packet', packet);

    // Socket is live - any packet counts
    this.emit('heartbeat');

    switch (packet.type) {
      case 'open':
        this.onHandshake(parsejson(packet.data));
        break;

      case 'pong':
        this.setPing();
        break;

      case 'error':
        var err = new Error('server error');
        err.code = packet.data;
        this.emit('error', err);
        break;

      case 'message':
        this.emit('data', packet.data);
        this.emit('message', packet.data);
        break;
    }
  } else {
    debug('packet received with socket readyState "%s"', this.readyState);
  }
};

/**
 * Called upon handshake completion.
 *
 * @param {Object} handshake obj
 * @api private
 */

Socket.prototype.onHandshake = function (data) {
  this.emit('handshake', data);
  this.id = data.sid;
  this.transport.query.sid = data.sid;
  this.upgrades = this.filterUpgrades(data.upgrades);
  this.pingInterval = data.pingInterval;
  this.pingTimeout = data.pingTimeout;
  this.onOpen();
  // In case open handler closes socket
  if  ('closed' == this.readyState) return;
  this.setPing();

  // Prolong liveness of socket on heartbeat
  this.removeListener('heartbeat', this.onHeartbeat);
  this.on('heartbeat', this.onHeartbeat);
};

/**
 * Resets ping timeout.
 *
 * @api private
 */

Socket.prototype.onHeartbeat = function (timeout) {
  clearTimeout(this.pingTimeoutTimer);
  var self = this;
  self.pingTimeoutTimer = setTimeout(function () {
    if ('closed' == self.readyState) return;
    self.onClose('ping timeout');
  }, timeout || (self.pingInterval + self.pingTimeout));
};

/**
 * Pings server every `this.pingInterval` and expects response
 * within `this.pingTimeout` or closes connection.
 *
 * @api private
 */

Socket.prototype.setPing = function () {
  var self = this;
  clearTimeout(self.pingIntervalTimer);
  self.pingIntervalTimer = setTimeout(function () {
    debug('writing ping packet - expecting pong within %sms', self.pingTimeout);
    self.ping();
    self.onHeartbeat(self.pingTimeout);
  }, self.pingInterval);
};

/**
* Sends a ping packet.
*
* @api public
*/

Socket.prototype.ping = function () {
  this.sendPacket('ping');
};

/**
 * Called on `drain` event
 *
 * @api private
 */

Socket.prototype.onDrain = function() {
  for (var i = 0; i < this.prevBufferLen; i++) {
    if (this.callbackBuffer[i]) {
      this.callbackBuffer[i]();
    }
  }

  this.writeBuffer.splice(0, this.prevBufferLen);
  this.callbackBuffer.splice(0, this.prevBufferLen);

  // setting prevBufferLen = 0 is very important
  // for example, when upgrading, upgrade packet is sent over,
  // and a nonzero prevBufferLen could cause problems on `drain`
  this.prevBufferLen = 0;

  if (this.writeBuffer.length == 0) {
    this.emit('drain');
  } else {
    this.flush();
  }
};

/**
 * Flush write buffers.
 *
 * @api private
 */

Socket.prototype.flush = function () {
  if ('closed' != this.readyState && this.transport.writable &&
    !this.upgrading && this.writeBuffer.length) {
    debug('flushing %d packets in socket', this.writeBuffer.length);
    this.transport.send(this.writeBuffer);
    // keep track of current length of writeBuffer
    // splice writeBuffer and callbackBuffer on `drain`
    this.prevBufferLen = this.writeBuffer.length;
    this.emit('flush');
  }
};

/**
 * Sends a message.
 *
 * @param {String} message.
 * @param {Function} callback function.
 * @return {Socket} for chaining.
 * @api public
 */

Socket.prototype.write =
Socket.prototype.send = function (msg, fn) {
  this.sendPacket('message', msg, fn);
  return this;
};

/**
 * Sends a packet.
 *
 * @param {String} packet type.
 * @param {String} data.
 * @param {Function} callback function.
 * @api private
 */

Socket.prototype.sendPacket = function (type, data, fn) {
  if ('closing' == this.readyState || 'closed' == this.readyState) {
    return;
  }

  var packet = { type: type, data: data };
  this.emit('packetCreate', packet);
  this.writeBuffer.push(packet);
  this.callbackBuffer.push(fn);
  this.flush();
};

/**
 * Closes the connection.
 *
 * @api private
 */

Socket.prototype.close = function () {
  if ('opening' == this.readyState || 'open' == this.readyState) {
    this.readyState = 'closing';

    var self = this;

    function close() {
      self.onClose('forced close');
      debug('socket closing - telling transport to close');
      self.transport.close();
    }

    function cleanupAndClose() {
      self.removeListener('upgrade', cleanupAndClose);
      self.removeListener('upgradeError', cleanupAndClose);
      close();
    }

    function waitForUpgrade() {
      // wait for upgrade to finish since we can't send packets while pausing a transport
      self.once('upgrade', cleanupAndClose);
      self.once('upgradeError', cleanupAndClose);
    }

    if (this.writeBuffer.length) {
      this.once('drain', function() {
        if (this.upgrading) {
          waitForUpgrade();
        } else {
          close();
        }
      });
    } else if (this.upgrading) {
      waitForUpgrade();
    } else {
      close();
    }
  }

  return this;
};

/**
 * Called upon transport error
 *
 * @api private
 */

Socket.prototype.onError = function (err) {
  debug('socket error %j', err);
  Socket.priorWebsocketSuccess = false;
  this.emit('error', err);
  this.onClose('transport error', err);
};

/**
 * Called upon transport close.
 *
 * @api private
 */

Socket.prototype.onClose = function (reason, desc) {
  if ('opening' == this.readyState || 'open' == this.readyState || 'closing' == this.readyState) {
    debug('socket close with reason: "%s"', reason);
    var self = this;

    // clear timers
    clearTimeout(this.pingIntervalTimer);
    clearTimeout(this.pingTimeoutTimer);

    // clean buffers in next tick, so developers can still
    // grab the buffers on `close` event
    setTimeout(function() {
      self.writeBuffer = [];
      self.callbackBuffer = [];
      self.prevBufferLen = 0;
    }, 0);

    // stop event from firing again for transport
    this.transport.removeAllListeners('close');

    // ensure transport won't stay open
    this.transport.close();

    // ignore further transport communication
    this.transport.removeAllListeners();

    // set ready state
    this.readyState = 'closed';

    // clear session id
    this.id = null;

    // emit close event
    this.emit('close', reason, desc);
  }
};

/**
 * Filters upgrades, returning only those matching client transports.
 *
 * @param {Array} server upgrades
 * @api private
 *
 */

Socket.prototype.filterUpgrades = function (upgrades) {
  var filteredUpgrades = [];
  for (var i = 0, j = upgrades.length; i<j; i++) {
    if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
  }
  return filteredUpgrades;
};

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./transport":14,"./transports":15,"component-emitter":9,"debug":22,"engine.io-parser":25,"indexof":42,"parsejson":34,"parseqs":35,"parseuri":36}],14:[function(_dereq_,module,exports){
/**
 * Module dependencies.
 */

var parser = _dereq_('engine.io-parser');
var Emitter = _dereq_('component-emitter');

/**
 * Module exports.
 */

module.exports = Transport;

/**
 * Transport abstract constructor.
 *
 * @param {Object} options.
 * @api private
 */

function Transport (opts) {
  this.path = opts.path;
  this.hostname = opts.hostname;
  this.port = opts.port;
  this.secure = opts.secure;
  this.query = opts.query;
  this.timestampParam = opts.timestampParam;
  this.timestampRequests = opts.timestampRequests;
  this.readyState = '';
  this.agent = opts.agent || false;
  this.socket = opts.socket;
  this.enablesXDR = opts.enablesXDR;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;
}

/**
 * Mix in `Emitter`.
 */

Emitter(Transport.prototype);

/**
 * A counter used to prevent collisions in the timestamps used
 * for cache busting.
 */

Transport.timestamps = 0;

/**
 * Emits an error.
 *
 * @param {String} str
 * @return {Transport} for chaining
 * @api public
 */

Transport.prototype.onError = function (msg, desc) {
  var err = new Error(msg);
  err.type = 'TransportError';
  err.description = desc;
  this.emit('error', err);
  return this;
};

/**
 * Opens the transport.
 *
 * @api public
 */

Transport.prototype.open = function () {
  if ('closed' == this.readyState || '' == this.readyState) {
    this.readyState = 'opening';
    this.doOpen();
  }

  return this;
};

/**
 * Closes the transport.
 *
 * @api private
 */

Transport.prototype.close = function () {
  if ('opening' == this.readyState || 'open' == this.readyState) {
    this.doClose();
    this.onClose();
  }

  return this;
};

/**
 * Sends multiple packets.
 *
 * @param {Array} packets
 * @api private
 */

Transport.prototype.send = function(packets){
  if ('open' == this.readyState) {
    this.write(packets);
  } else {
    throw new Error('Transport not open');
  }
};

/**
 * Called upon open
 *
 * @api private
 */

Transport.prototype.onOpen = function () {
  this.readyState = 'open';
  this.writable = true;
  this.emit('open');
};

/**
 * Called with data.
 *
 * @param {String} data
 * @api private
 */

Transport.prototype.onData = function(data){
  var packet = parser.decodePacket(data, this.socket.binaryType);
  this.onPacket(packet);
};

/**
 * Called with a decoded packet.
 */

Transport.prototype.onPacket = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon close.
 *
 * @api private
 */

Transport.prototype.onClose = function () {
  this.readyState = 'closed';
  this.emit('close');
};

},{"component-emitter":9,"engine.io-parser":25}],15:[function(_dereq_,module,exports){
(function (global){
/**
 * Module dependencies
 */

var XMLHttpRequest = _dereq_('xmlhttprequest');
var XHR = _dereq_('./polling-xhr');
var JSONP = _dereq_('./polling-jsonp');
var websocket = _dereq_('./websocket');

/**
 * Export transports.
 */

exports.polling = polling;
exports.websocket = websocket;

/**
 * Polling transport polymorphic constructor.
 * Decides on xhr vs jsonp based on feature detection.
 *
 * @api private
 */

function polling(opts){
  var xhr;
  var xd = false;
  var xs = false;
  var jsonp = false !== opts.jsonp;

  if (global.location) {
    var isSSL = 'https:' == location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    xd = opts.hostname != location.hostname || port != opts.port;
    xs = opts.secure != isSSL;
  }

  opts.xdomain = xd;
  opts.xscheme = xs;
  xhr = new XMLHttpRequest(opts);

  if ('open' in xhr && !opts.forceJSONP) {
    return new XHR(opts);
  } else {
    if (!jsonp) throw new Error('JSONP disabled');
    return new JSONP(opts);
  }
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./polling-jsonp":16,"./polling-xhr":17,"./websocket":19,"xmlhttprequest":20}],16:[function(_dereq_,module,exports){
(function (global){

/**
 * Module requirements.
 */

var Polling = _dereq_('./polling');
var inherit = _dereq_('component-inherit');

/**
 * Module exports.
 */

module.exports = JSONPPolling;

/**
 * Cached regular expressions.
 */

var rNewline = /\n/g;
var rEscapedNewline = /\\n/g;

/**
 * Global JSONP callbacks.
 */

var callbacks;

/**
 * Callbacks count.
 */

var index = 0;

/**
 * Noop.
 */

function empty () { }

/**
 * JSONP Polling constructor.
 *
 * @param {Object} opts.
 * @api public
 */

function JSONPPolling (opts) {
  Polling.call(this, opts);

  this.query = this.query || {};

  // define global callbacks array if not present
  // we do this here (lazily) to avoid unneeded global pollution
  if (!callbacks) {
    // we need to consider multiple engines in the same page
    if (!global.___eio) global.___eio = [];
    callbacks = global.___eio;
  }

  // callback identifier
  this.index = callbacks.length;

  // add callback to jsonp global
  var self = this;
  callbacks.push(function (msg) {
    self.onData(msg);
  });

  // append to query string
  this.query.j = this.index;

  // prevent spurious errors from being emitted when the window is unloaded
  if (global.document && global.addEventListener) {
    global.addEventListener('beforeunload', function () {
      if (self.script) self.script.onerror = empty;
    }, false);
  }
}

/**
 * Inherits from Polling.
 */

inherit(JSONPPolling, Polling);

/*
 * JSONP only supports binary as base64 encoded strings
 */

JSONPPolling.prototype.supportsBinary = false;

/**
 * Closes the socket.
 *
 * @api private
 */

JSONPPolling.prototype.doClose = function () {
  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  if (this.form) {
    this.form.parentNode.removeChild(this.form);
    this.form = null;
    this.iframe = null;
  }

  Polling.prototype.doClose.call(this);
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

JSONPPolling.prototype.doPoll = function () {
  var self = this;
  var script = document.createElement('script');

  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  script.async = true;
  script.src = this.uri();
  script.onerror = function(e){
    self.onError('jsonp poll error',e);
  };

  var insertAt = document.getElementsByTagName('script')[0];
  insertAt.parentNode.insertBefore(script, insertAt);
  this.script = script;

  var isUAgecko = 'undefined' != typeof navigator && /gecko/i.test(navigator.userAgent);
  
  if (isUAgecko) {
    setTimeout(function () {
      var iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      document.body.removeChild(iframe);
    }, 100);
  }
};

/**
 * Writes with a hidden iframe.
 *
 * @param {String} data to send
 * @param {Function} called upon flush.
 * @api private
 */

JSONPPolling.prototype.doWrite = function (data, fn) {
  var self = this;

  if (!this.form) {
    var form = document.createElement('form');
    var area = document.createElement('textarea');
    var id = this.iframeId = 'eio_iframe_' + this.index;
    var iframe;

    form.className = 'socketio';
    form.style.position = 'absolute';
    form.style.top = '-1000px';
    form.style.left = '-1000px';
    form.target = id;
    form.method = 'POST';
    form.setAttribute('accept-charset', 'utf-8');
    area.name = 'd';
    form.appendChild(area);
    document.body.appendChild(form);

    this.form = form;
    this.area = area;
  }

  this.form.action = this.uri();

  function complete () {
    initIframe();
    fn();
  }

  function initIframe () {
    if (self.iframe) {
      try {
        self.form.removeChild(self.iframe);
      } catch (e) {
        self.onError('jsonp polling iframe removal error', e);
      }
    }

    try {
      // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
      var html = '<iframe src="javascript:0" name="'+ self.iframeId +'">';
      iframe = document.createElement(html);
    } catch (e) {
      iframe = document.createElement('iframe');
      iframe.name = self.iframeId;
      iframe.src = 'javascript:0';
    }

    iframe.id = self.iframeId;

    self.form.appendChild(iframe);
    self.iframe = iframe;
  }

  initIframe();

  // escape \n to prevent it from being converted into \r\n by some UAs
  // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
  data = data.replace(rEscapedNewline, '\\\n');
  this.area.value = data.replace(rNewline, '\\n');

  try {
    this.form.submit();
  } catch(e) {}

  if (this.iframe.attachEvent) {
    this.iframe.onreadystatechange = function(){
      if (self.iframe.readyState == 'complete') {
        complete();
      }
    };
  } else {
    this.iframe.onload = complete;
  }
};

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./polling":18,"component-inherit":21}],17:[function(_dereq_,module,exports){
(function (global){
/**
 * Module requirements.
 */

var XMLHttpRequest = _dereq_('xmlhttprequest');
var Polling = _dereq_('./polling');
var Emitter = _dereq_('component-emitter');
var inherit = _dereq_('component-inherit');
var debug = _dereq_('debug')('engine.io-client:polling-xhr');

/**
 * Module exports.
 */

module.exports = XHR;
module.exports.Request = Request;

/**
 * Empty function
 */

function empty(){}

/**
 * XHR Polling constructor.
 *
 * @param {Object} opts
 * @api public
 */

function XHR(opts){
  Polling.call(this, opts);

  if (global.location) {
    var isSSL = 'https:' == location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    this.xd = opts.hostname != global.location.hostname ||
      port != opts.port;
    this.xs = opts.secure != isSSL;
  }
}

/**
 * Inherits from Polling.
 */

inherit(XHR, Polling);

/**
 * XHR supports binary
 */

XHR.prototype.supportsBinary = true;

/**
 * Creates a request.
 *
 * @param {String} method
 * @api private
 */

XHR.prototype.request = function(opts){
  opts = opts || {};
  opts.uri = this.uri();
  opts.xd = this.xd;
  opts.xs = this.xs;
  opts.agent = this.agent || false;
  opts.supportsBinary = this.supportsBinary;
  opts.enablesXDR = this.enablesXDR;

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;

  return new Request(opts);
};

/**
 * Sends data.
 *
 * @param {String} data to send.
 * @param {Function} called upon flush.
 * @api private
 */

XHR.prototype.doWrite = function(data, fn){
  var isBinary = typeof data !== 'string' && data !== undefined;
  var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
  var self = this;
  req.on('success', fn);
  req.on('error', function(err){
    self.onError('xhr post error', err);
  });
  this.sendXhr = req;
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

XHR.prototype.doPoll = function(){
  debug('xhr poll');
  var req = this.request();
  var self = this;
  req.on('data', function(data){
    self.onData(data);
  });
  req.on('error', function(err){
    self.onError('xhr poll error', err);
  });
  this.pollXhr = req;
};

/**
 * Request constructor
 *
 * @param {Object} options
 * @api public
 */

function Request(opts){
  this.method = opts.method || 'GET';
  this.uri = opts.uri;
  this.xd = !!opts.xd;
  this.xs = !!opts.xs;
  this.async = false !== opts.async;
  this.data = undefined != opts.data ? opts.data : null;
  this.agent = opts.agent;
  this.isBinary = opts.isBinary;
  this.supportsBinary = opts.supportsBinary;
  this.enablesXDR = opts.enablesXDR;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;

  this.create();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Request.prototype);

/**
 * Creates the XHR object and sends the request.
 *
 * @api private
 */

Request.prototype.create = function(){
  var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;

  var xhr = this.xhr = new XMLHttpRequest(opts);
  var self = this;

  try {
    debug('xhr open %s: %s', this.method, this.uri);
    xhr.open(this.method, this.uri, this.async);
    if (this.supportsBinary) {
      // This has to be done after open because Firefox is stupid
      // http://stackoverflow.com/questions/13216903/get-binary-data-with-xmlhttprequest-in-a-firefox-extension
      xhr.responseType = 'arraybuffer';
    }

    if ('POST' == this.method) {
      try {
        if (this.isBinary) {
          xhr.setRequestHeader('Content-type', 'application/octet-stream');
        } else {
          xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
        }
      } catch (e) {}
    }

    // ie6 check
    if ('withCredentials' in xhr) {
      xhr.withCredentials = true;
    }

    if (this.hasXDR()) {
      xhr.onload = function(){
        self.onLoad();
      };
      xhr.onerror = function(){
        self.onError(xhr.responseText);
      };
    } else {
      xhr.onreadystatechange = function(){
        if (4 != xhr.readyState) return;
        if (200 == xhr.status || 1223 == xhr.status) {
          self.onLoad();
        } else {
          // make sure the `error` event handler that's user-set
          // does not throw in the same tick and gets caught here
          setTimeout(function(){
            self.onError(xhr.status);
          }, 0);
        }
      };
    }

    debug('xhr data %s', this.data);
    xhr.send(this.data);
  } catch (e) {
    // Need to defer since .create() is called directly fhrom the constructor
    // and thus the 'error' event can only be only bound *after* this exception
    // occurs.  Therefore, also, we cannot throw here at all.
    setTimeout(function() {
      self.onError(e);
    }, 0);
    return;
  }

  if (global.document) {
    this.index = Request.requestsCount++;
    Request.requests[this.index] = this;
  }
};

/**
 * Called upon successful response.
 *
 * @api private
 */

Request.prototype.onSuccess = function(){
  this.emit('success');
  this.cleanup();
};

/**
 * Called if we have data.
 *
 * @api private
 */

Request.prototype.onData = function(data){
  this.emit('data', data);
  this.onSuccess();
};

/**
 * Called upon error.
 *
 * @api private
 */

Request.prototype.onError = function(err){
  this.emit('error', err);
  this.cleanup(true);
};

/**
 * Cleans up house.
 *
 * @api private
 */

Request.prototype.cleanup = function(fromError){
  if ('undefined' == typeof this.xhr || null === this.xhr) {
    return;
  }
  // xmlhttprequest
  if (this.hasXDR()) {
    this.xhr.onload = this.xhr.onerror = empty;
  } else {
    this.xhr.onreadystatechange = empty;
  }

  if (fromError) {
    try {
      this.xhr.abort();
    } catch(e) {}
  }

  if (global.document) {
    delete Request.requests[this.index];
  }

  this.xhr = null;
};

/**
 * Called upon load.
 *
 * @api private
 */

Request.prototype.onLoad = function(){
  var data;
  try {
    var contentType;
    try {
      contentType = this.xhr.getResponseHeader('Content-Type').split(';')[0];
    } catch (e) {}
    if (contentType === 'application/octet-stream') {
      data = this.xhr.response;
    } else {
      if (!this.supportsBinary) {
        data = this.xhr.responseText;
      } else {
        data = 'ok';
      }
    }
  } catch (e) {
    this.onError(e);
  }
  if (null != data) {
    this.onData(data);
  }
};

/**
 * Check if it has XDomainRequest.
 *
 * @api private
 */

Request.prototype.hasXDR = function(){
  return 'undefined' !== typeof global.XDomainRequest && !this.xs && this.enablesXDR;
};

/**
 * Aborts the request.
 *
 * @api public
 */

Request.prototype.abort = function(){
  this.cleanup();
};

/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */

if (global.document) {
  Request.requestsCount = 0;
  Request.requests = {};
  if (global.attachEvent) {
    global.attachEvent('onunload', unloadHandler);
  } else if (global.addEventListener) {
    global.addEventListener('beforeunload', unloadHandler, false);
  }
}

function unloadHandler() {
  for (var i in Request.requests) {
    if (Request.requests.hasOwnProperty(i)) {
      Request.requests[i].abort();
    }
  }
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./polling":18,"component-emitter":9,"component-inherit":21,"debug":22,"xmlhttprequest":20}],18:[function(_dereq_,module,exports){
/**
 * Module dependencies.
 */

var Transport = _dereq_('../transport');
var parseqs = _dereq_('parseqs');
var parser = _dereq_('engine.io-parser');
var inherit = _dereq_('component-inherit');
var debug = _dereq_('debug')('engine.io-client:polling');

/**
 * Module exports.
 */

module.exports = Polling;

/**
 * Is XHR2 supported?
 */

var hasXHR2 = (function() {
  var XMLHttpRequest = _dereq_('xmlhttprequest');
  var xhr = new XMLHttpRequest({ xdomain: false });
  return null != xhr.responseType;
})();

/**
 * Polling interface.
 *
 * @param {Object} opts
 * @api private
 */

function Polling(opts){
  var forceBase64 = (opts && opts.forceBase64);
  if (!hasXHR2 || forceBase64) {
    this.supportsBinary = false;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(Polling, Transport);

/**
 * Transport name.
 */

Polling.prototype.name = 'polling';

/**
 * Opens the socket (triggers polling). We write a PING message to determine
 * when the transport is open.
 *
 * @api private
 */

Polling.prototype.doOpen = function(){
  this.poll();
};

/**
 * Pauses polling.
 *
 * @param {Function} callback upon buffers are flushed and transport is paused
 * @api private
 */

Polling.prototype.pause = function(onPause){
  var pending = 0;
  var self = this;

  this.readyState = 'pausing';

  function pause(){
    debug('paused');
    self.readyState = 'paused';
    onPause();
  }

  if (this.polling || !this.writable) {
    var total = 0;

    if (this.polling) {
      debug('we are currently polling - waiting to pause');
      total++;
      this.once('pollComplete', function(){
        debug('pre-pause polling complete');
        --total || pause();
      });
    }

    if (!this.writable) {
      debug('we are currently writing - waiting to pause');
      total++;
      this.once('drain', function(){
        debug('pre-pause writing complete');
        --total || pause();
      });
    }
  } else {
    pause();
  }
};

/**
 * Starts polling cycle.
 *
 * @api public
 */

Polling.prototype.poll = function(){
  debug('polling');
  this.polling = true;
  this.doPoll();
  this.emit('poll');
};

/**
 * Overloads onData to detect payloads.
 *
 * @api private
 */

Polling.prototype.onData = function(data){
  var self = this;
  debug('polling got data %s', data);
  var callback = function(packet, index, total) {
    // if its the first message we consider the transport open
    if ('opening' == self.readyState) {
      self.onOpen();
    }

    // if its a close packet, we close the ongoing requests
    if ('close' == packet.type) {
      self.onClose();
      return false;
    }

    // otherwise bypass onData and handle the message
    self.onPacket(packet);
  };

  // decode payload
  parser.decodePayload(data, this.socket.binaryType, callback);

  // if an event did not trigger closing
  if ('closed' != this.readyState) {
    // if we got data we're not polling
    this.polling = false;
    this.emit('pollComplete');

    if ('open' == this.readyState) {
      this.poll();
    } else {
      debug('ignoring poll - transport state "%s"', this.readyState);
    }
  }
};

/**
 * For polling, send a close packet.
 *
 * @api private
 */

Polling.prototype.doClose = function(){
  var self = this;

  function close(){
    debug('writing close packet');
    self.write([{ type: 'close' }]);
  }

  if ('open' == this.readyState) {
    debug('transport open - closing');
    close();
  } else {
    // in case we're trying to close while
    // handshaking is in progress (GH-164)
    debug('transport not open - deferring close');
    this.once('open', close);
  }
};

/**
 * Writes a packets payload.
 *
 * @param {Array} data packets
 * @param {Function} drain callback
 * @api private
 */

Polling.prototype.write = function(packets){
  var self = this;
  this.writable = false;
  var callbackfn = function() {
    self.writable = true;
    self.emit('drain');
  };

  var self = this;
  parser.encodePayload(packets, this.supportsBinary, function(data) {
    self.doWrite(data, callbackfn);
  });
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

Polling.prototype.uri = function(){
  var query = this.query || {};
  var schema = this.secure ? 'https' : 'http';
  var port = '';

  // cache busting is forced
  if (false !== this.timestampRequests) {
    query[this.timestampParam] = +new Date + '-' + Transport.timestamps++;
  }

  if (!this.supportsBinary && !query.sid) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // avoid port if default for schema
  if (this.port && (('https' == schema && this.port != 443) ||
     ('http' == schema && this.port != 80))) {
    port = ':' + this.port;
  }

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  return schema + '://' + this.hostname + port + this.path + query;
};

},{"../transport":14,"component-inherit":21,"debug":22,"engine.io-parser":25,"parseqs":35,"xmlhttprequest":20}],19:[function(_dereq_,module,exports){
/**
 * Module dependencies.
 */

var Transport = _dereq_('../transport');
var parser = _dereq_('engine.io-parser');
var parseqs = _dereq_('parseqs');
var inherit = _dereq_('component-inherit');
var debug = _dereq_('debug')('engine.io-client:websocket');

/**
 * `ws` exposes a WebSocket-compatible interface in
 * Node, or the `WebSocket` or `MozWebSocket` globals
 * in the browser.
 */

var WebSocket = _dereq_('ws');

/**
 * Module exports.
 */

module.exports = WS;

/**
 * WebSocket transport constructor.
 *
 * @api {Object} connection options
 * @api public
 */

function WS(opts){
  var forceBase64 = (opts && opts.forceBase64);
  if (forceBase64) {
    this.supportsBinary = false;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(WS, Transport);

/**
 * Transport name.
 *
 * @api public
 */

WS.prototype.name = 'websocket';

/*
 * WebSockets support binary
 */

WS.prototype.supportsBinary = true;

/**
 * Opens socket.
 *
 * @api private
 */

WS.prototype.doOpen = function(){
  if (!this.check()) {
    // let probe timeout
    return;
  }

  var self = this;
  var uri = this.uri();
  var protocols = void(0);
  var opts = { agent: this.agent };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;

  this.ws = new WebSocket(uri, protocols, opts);

  if (this.ws.binaryType === undefined) {
    this.supportsBinary = false;
  }

  this.ws.binaryType = 'arraybuffer';
  this.addEventListeners();
};

/**
 * Adds event listeners to the socket
 *
 * @api private
 */

WS.prototype.addEventListeners = function(){
  var self = this;

  this.ws.onopen = function(){
    self.onOpen();
  };
  this.ws.onclose = function(){
    self.onClose();
  };
  this.ws.onmessage = function(ev){
    self.onData(ev.data);
  };
  this.ws.onerror = function(e){
    self.onError('websocket error', e);
  };
};

/**
 * Override `onData` to use a timer on iOS.
 * See: https://gist.github.com/mloughran/2052006
 *
 * @api private
 */

if ('undefined' != typeof navigator
  && /iPad|iPhone|iPod/i.test(navigator.userAgent)) {
  WS.prototype.onData = function(data){
    var self = this;
    setTimeout(function(){
      Transport.prototype.onData.call(self, data);
    }, 0);
  };
}

/**
 * Writes data to socket.
 *
 * @param {Array} array of packets.
 * @api private
 */

WS.prototype.write = function(packets){
  var self = this;
  this.writable = false;
  // encodePacket efficient as it uses WS framing
  // no need for encodePayload
  for (var i = 0, l = packets.length; i < l; i++) {
    parser.encodePacket(packets[i], this.supportsBinary, function(data) {
      //Sometimes the websocket has already been closed but the browser didn't
      //have a chance of informing us about it yet, in that case send will
      //throw an error
      try {
        self.ws.send(data);
      } catch (e){
        debug('websocket closed before onclose event');
      }
    });
  }

  function ondrain() {
    self.writable = true;
    self.emit('drain');
  }
  // fake drain
  // defer to next tick to allow Socket to clear writeBuffer
  setTimeout(ondrain, 0);
};

/**
 * Called upon close
 *
 * @api private
 */

WS.prototype.onClose = function(){
  Transport.prototype.onClose.call(this);
};

/**
 * Closes socket.
 *
 * @api private
 */

WS.prototype.doClose = function(){
  if (typeof this.ws !== 'undefined') {
    this.ws.close();
  }
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

WS.prototype.uri = function(){
  var query = this.query || {};
  var schema = this.secure ? 'wss' : 'ws';
  var port = '';

  // avoid port if default for schema
  if (this.port && (('wss' == schema && this.port != 443)
    || ('ws' == schema && this.port != 80))) {
    port = ':' + this.port;
  }

  // append timestamp to URI
  if (this.timestampRequests) {
    query[this.timestampParam] = +new Date;
  }

  // communicate binary support capabilities
  if (!this.supportsBinary) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  return schema + '://' + this.hostname + port + this.path + query;
};

/**
 * Feature detection for WebSocket.
 *
 * @return {Boolean} whether this transport is available.
 * @api public
 */

WS.prototype.check = function(){
  return !!WebSocket && !('__initialize' in WebSocket && this.name === WS.prototype.name);
};

},{"../transport":14,"component-inherit":21,"debug":22,"engine.io-parser":25,"parseqs":35,"ws":37}],20:[function(_dereq_,module,exports){
// browser shim for xmlhttprequest module
var hasCORS = _dereq_('has-cors');

module.exports = function(opts) {
  var xdomain = opts.xdomain;

  // scheme must be same when usign XDomainRequest
  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
  var xscheme = opts.xscheme;

  // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
  // https://github.com/Automattic/engine.io-client/pull/217
  var enablesXDR = opts.enablesXDR;

  // XMLHttpRequest can be disabled on IE
  try {
    if ('undefined' != typeof XMLHttpRequest && (!xdomain || hasCORS)) {
      return new XMLHttpRequest();
    }
  } catch (e) { }

  // Use XDomainRequest for IE8 if enablesXDR is true
  // because loading bar keeps flashing when using jsonp-polling
  // https://github.com/yujiosaka/socke.io-ie8-loading-example
  try {
    if ('undefined' != typeof XDomainRequest && !xscheme && enablesXDR) {
      return new XDomainRequest();
    }
  } catch (e) { }

  if (!xdomain) {
    try {
      return new ActiveXObject('Microsoft.XMLHTTP');
    } catch(e) { }
  }
}

},{"has-cors":40}],21:[function(_dereq_,module,exports){

module.exports = function(a, b){
  var fn = function(){};
  fn.prototype = b.prototype;
  a.prototype = new fn;
  a.prototype.constructor = a;
};
},{}],22:[function(_dereq_,module,exports){

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = _dereq_('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // is webkit? http://stackoverflow.com/a/16459606/376773
  return ('WebkitAppearance' in document.documentElement.style) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (window.console && (console.firebug || (console.exception && console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  return JSON.stringify(v);
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs() {
  var args = arguments;
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return args;

  var c = 'color: ' + this.color;
  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-z%]/g, function(match) {
    if ('%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
  return args;
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // This hackery is required for IE8,
  // where the `console.log` function doesn't have 'apply'
  return 'object' == typeof console
    && 'function' == typeof console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      localStorage.removeItem('debug');
    } else {
      localStorage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = localStorage.debug;
  } catch(e) {}
  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

},{"./debug":23}],23:[function(_dereq_,module,exports){

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = debug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = _dereq_('ms');

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lowercased letter, i.e. "n".
 */

exports.formatters = {};

/**
 * Previously assigned color.
 */

var prevColor = 0;

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 *
 * @return {Number}
 * @api private
 */

function selectColor() {
  return exports.colors[prevColor++ % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function debug(namespace) {

  // define the `disabled` version
  function disabled() {
  }
  disabled.enabled = false;

  // define the `enabled` version
  function enabled() {

    var self = enabled;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // add the `color` if not set
    if (null == self.useColors) self.useColors = exports.useColors();
    if (null == self.color && self.useColors) self.color = selectColor();

    var args = Array.prototype.slice.call(arguments);

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %o
      args = ['%o'].concat(args);
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    if ('function' === typeof exports.formatArgs) {
      args = exports.formatArgs.apply(self, args);
    }
    var logFn = enabled.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }
  enabled.enabled = true;

  var fn = exports.enabled(namespace) ? enabled : disabled;

  fn.namespace = namespace;

  return fn;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  var split = (namespaces || '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

},{"ms":24}],24:[function(_dereq_,module,exports){
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options){
  options = options || {};
  if ('string' == typeof val) return parse(val);
  return options.long
    ? long(val)
    : short(val);
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  var match = /^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i.exec(str);
  if (!match) return;
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 's':
      return n * s;
    case 'ms':
      return n;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function short(ms) {
  if (ms >= d) return Math.round(ms / d) + 'd';
  if (ms >= h) return Math.round(ms / h) + 'h';
  if (ms >= m) return Math.round(ms / m) + 'm';
  if (ms >= s) return Math.round(ms / s) + 's';
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function long(ms) {
  return plural(ms, d, 'day')
    || plural(ms, h, 'hour')
    || plural(ms, m, 'minute')
    || plural(ms, s, 'second')
    || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) return;
  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
  return Math.ceil(ms / n) + ' ' + name + 's';
}

},{}],25:[function(_dereq_,module,exports){
(function (global){
/**
 * Module dependencies.
 */

var keys = _dereq_('./keys');
var hasBinary = _dereq_('has-binary');
var sliceBuffer = _dereq_('arraybuffer.slice');
var base64encoder = _dereq_('base64-arraybuffer');
var after = _dereq_('after');
var utf8 = _dereq_('utf8');

/**
 * Check if we are running an android browser. That requires us to use
 * ArrayBuffer with polling transports...
 *
 * http://ghinda.net/jpeg-blob-ajax-android/
 */

var isAndroid = navigator.userAgent.match(/Android/i);

/**
 * Check if we are running in PhantomJS.
 * Uploading a Blob with PhantomJS does not work correctly, as reported here:
 * https://github.com/ariya/phantomjs/issues/11395
 * @type boolean
 */
var isPhantomJS = /PhantomJS/i.test(navigator.userAgent);

/**
 * When true, avoids using Blobs to encode payloads.
 * @type boolean
 */
var dontSendBlobs = isAndroid || isPhantomJS;

/**
 * Current protocol version.
 */

exports.protocol = 3;

/**
 * Packet types.
 */

var packets = exports.packets = {
    open:     0    // non-ws
  , close:    1    // non-ws
  , ping:     2
  , pong:     3
  , message:  4
  , upgrade:  5
  , noop:     6
};

var packetslist = keys(packets);

/**
 * Premade error packet.
 */

var err = { type: 'error', data: 'parser error' };

/**
 * Create a blob api even for blob builder when vendor prefixes exist
 */

var Blob = _dereq_('blob');

/**
 * Encodes a packet.
 *
 *     <packet type id> [ <data> ]
 *
 * Example:
 *
 *     5hello world
 *     3
 *     4
 *
 * Binary is encoded in an identical principle
 *
 * @api private
 */

exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
  if ('function' == typeof supportsBinary) {
    callback = supportsBinary;
    supportsBinary = false;
  }

  if ('function' == typeof utf8encode) {
    callback = utf8encode;
    utf8encode = null;
  }

  var data = (packet.data === undefined)
    ? undefined
    : packet.data.buffer || packet.data;

  if (global.ArrayBuffer && data instanceof ArrayBuffer) {
    return encodeArrayBuffer(packet, supportsBinary, callback);
  } else if (Blob && data instanceof global.Blob) {
    return encodeBlob(packet, supportsBinary, callback);
  }

  // might be an object with { base64: true, data: dataAsBase64String }
  if (data && data.base64) {
    return encodeBase64Object(packet, callback);
  }

  // Sending data as a utf-8 string
  var encoded = packets[packet.type];

  // data fragment is optional
  if (undefined !== packet.data) {
    encoded += utf8encode ? utf8.encode(String(packet.data)) : String(packet.data);
  }

  return callback('' + encoded);

};

function encodeBase64Object(packet, callback) {
  // packet data is an object { base64: true, data: dataAsBase64String }
  var message = 'b' + exports.packets[packet.type] + packet.data.data;
  return callback(message);
}

/**
 * Encode packet helpers for binary types
 */

function encodeArrayBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var data = packet.data;
  var contentArray = new Uint8Array(data);
  var resultBuffer = new Uint8Array(1 + data.byteLength);

  resultBuffer[0] = packets[packet.type];
  for (var i = 0; i < contentArray.length; i++) {
    resultBuffer[i+1] = contentArray[i];
  }

  return callback(resultBuffer.buffer);
}

function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var fr = new FileReader();
  fr.onload = function() {
    packet.data = fr.result;
    exports.encodePacket(packet, supportsBinary, true, callback);
  };
  return fr.readAsArrayBuffer(packet.data);
}

function encodeBlob(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  if (dontSendBlobs) {
    return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
  }

  var length = new Uint8Array(1);
  length[0] = packets[packet.type];
  var blob = new Blob([length.buffer, packet.data]);

  return callback(blob);
}

/**
 * Encodes a packet with binary data in a base64 string
 *
 * @param {Object} packet, has `type` and `data`
 * @return {String} base64 encoded message
 */

exports.encodeBase64Packet = function(packet, callback) {
  var message = 'b' + exports.packets[packet.type];
  if (Blob && packet.data instanceof Blob) {
    var fr = new FileReader();
    fr.onload = function() {
      var b64 = fr.result.split(',')[1];
      callback(message + b64);
    };
    return fr.readAsDataURL(packet.data);
  }

  var b64data;
  try {
    b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
  } catch (e) {
    // iPhone Safari doesn't let you apply with typed arrays
    var typed = new Uint8Array(packet.data);
    var basic = new Array(typed.length);
    for (var i = 0; i < typed.length; i++) {
      basic[i] = typed[i];
    }
    b64data = String.fromCharCode.apply(null, basic);
  }
  message += global.btoa(b64data);
  return callback(message);
};

/**
 * Decodes a packet. Changes format to Blob if requested.
 *
 * @return {Object} with `type` and `data` (if any)
 * @api private
 */

exports.decodePacket = function (data, binaryType, utf8decode) {
  // String data
  if (typeof data == 'string' || data === undefined) {
    if (data.charAt(0) == 'b') {
      return exports.decodeBase64Packet(data.substr(1), binaryType);
    }

    if (utf8decode) {
      try {
        data = utf8.decode(data);
      } catch (e) {
        return err;
      }
    }
    var type = data.charAt(0);

    if (Number(type) != type || !packetslist[type]) {
      return err;
    }

    if (data.length > 1) {
      return { type: packetslist[type], data: data.substring(1) };
    } else {
      return { type: packetslist[type] };
    }
  }

  var asArray = new Uint8Array(data);
  var type = asArray[0];
  var rest = sliceBuffer(data, 1);
  if (Blob && binaryType === 'blob') {
    rest = new Blob([rest]);
  }
  return { type: packetslist[type], data: rest };
};

/**
 * Decodes a packet encoded in a base64 string
 *
 * @param {String} base64 encoded message
 * @return {Object} with `type` and `data` (if any)
 */

exports.decodeBase64Packet = function(msg, binaryType) {
  var type = packetslist[msg.charAt(0)];
  if (!global.ArrayBuffer) {
    return { type: type, data: { base64: true, data: msg.substr(1) } };
  }

  var data = base64encoder.decode(msg.substr(1));

  if (binaryType === 'blob' && Blob) {
    data = new Blob([data]);
  }

  return { type: type, data: data };
};

/**
 * Encodes multiple messages (payload).
 *
 *     <length>:data
 *
 * Example:
 *
 *     11:hello world2:hi
 *
 * If any contents are binary, they will be encoded as base64 strings. Base64
 * encoded strings are marked with a b before the length specifier
 *
 * @param {Array} packets
 * @api private
 */

exports.encodePayload = function (packets, supportsBinary, callback) {
  if (typeof supportsBinary == 'function') {
    callback = supportsBinary;
    supportsBinary = null;
  }

  var isBinary = hasBinary(packets);

  if (supportsBinary && isBinary) {
    if (Blob && !dontSendBlobs) {
      return exports.encodePayloadAsBlob(packets, callback);
    }

    return exports.encodePayloadAsArrayBuffer(packets, callback);
  }

  if (!packets.length) {
    return callback('0:');
  }

  function setLengthHeader(message) {
    return message.length + ':' + message;
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, !isBinary ? false : supportsBinary, true, function(message) {
      doneCallback(null, setLengthHeader(message));
    });
  }

  map(packets, encodeOne, function(err, results) {
    return callback(results.join(''));
  });
};

/**
 * Async array map using after
 */

function map(ary, each, done) {
  var result = new Array(ary.length);
  var next = after(ary.length, done);

  var eachWithIndex = function(i, el, cb) {
    each(el, function(error, msg) {
      result[i] = msg;
      cb(error, result);
    });
  };

  for (var i = 0; i < ary.length; i++) {
    eachWithIndex(i, ary[i], next);
  }
}

/*
 * Decodes data when a payload is maybe expected. Possible binary contents are
 * decoded from their base64 representation
 *
 * @param {String} data, callback method
 * @api public
 */

exports.decodePayload = function (data, binaryType, callback) {
  if (typeof data != 'string') {
    return exports.decodePayloadAsBinary(data, binaryType, callback);
  }

  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var packet;
  if (data == '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

  var length = ''
    , n, msg;

  for (var i = 0, l = data.length; i < l; i++) {
    var chr = data.charAt(i);

    if (':' != chr) {
      length += chr;
    } else {
      if ('' == length || (length != (n = Number(length)))) {
        // parser error - ignoring payload
        return callback(err, 0, 1);
      }

      msg = data.substr(i + 1, n);

      if (length != msg.length) {
        // parser error - ignoring payload
        return callback(err, 0, 1);
      }

      if (msg.length) {
        packet = exports.decodePacket(msg, binaryType, true);

        if (err.type == packet.type && err.data == packet.data) {
          // parser error in individual packet - ignoring payload
          return callback(err, 0, 1);
        }

        var ret = callback(packet, i + n, l);
        if (false === ret) return;
      }

      // advance cursor
      i += n;
      length = '';
    }
  }

  if (length != '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

};

/**
 * Encodes multiple messages (payload) as binary.
 *
 * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
 * 255><data>
 *
 * Example:
 * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
 *
 * @param {Array} packets
 * @return {ArrayBuffer} encoded payload
 * @api private
 */

exports.encodePayloadAsArrayBuffer = function(packets, callback) {
  if (!packets.length) {
    return callback(new ArrayBuffer(0));
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, true, true, function(data) {
      return doneCallback(null, data);
    });
  }

  map(packets, encodeOne, function(err, encodedPackets) {
    var totalLength = encodedPackets.reduce(function(acc, p) {
      var len;
      if (typeof p === 'string'){
        len = p.length;
      } else {
        len = p.byteLength;
      }
      return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
    }, 0);

    var resultArray = new Uint8Array(totalLength);

    var bufferIndex = 0;
    encodedPackets.forEach(function(p) {
      var isString = typeof p === 'string';
      var ab = p;
      if (isString) {
        var view = new Uint8Array(p.length);
        for (var i = 0; i < p.length; i++) {
          view[i] = p.charCodeAt(i);
        }
        ab = view.buffer;
      }

      if (isString) { // not true binary
        resultArray[bufferIndex++] = 0;
      } else { // true binary
        resultArray[bufferIndex++] = 1;
      }

      var lenStr = ab.byteLength.toString();
      for (var i = 0; i < lenStr.length; i++) {
        resultArray[bufferIndex++] = parseInt(lenStr[i]);
      }
      resultArray[bufferIndex++] = 255;

      var view = new Uint8Array(ab);
      for (var i = 0; i < view.length; i++) {
        resultArray[bufferIndex++] = view[i];
      }
    });

    return callback(resultArray.buffer);
  });
};

/**
 * Encode as Blob
 */

exports.encodePayloadAsBlob = function(packets, callback) {
  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, true, true, function(encoded) {
      var binaryIdentifier = new Uint8Array(1);
      binaryIdentifier[0] = 1;
      if (typeof encoded === 'string') {
        var view = new Uint8Array(encoded.length);
        for (var i = 0; i < encoded.length; i++) {
          view[i] = encoded.charCodeAt(i);
        }
        encoded = view.buffer;
        binaryIdentifier[0] = 0;
      }

      var len = (encoded instanceof ArrayBuffer)
        ? encoded.byteLength
        : encoded.size;

      var lenStr = len.toString();
      var lengthAry = new Uint8Array(lenStr.length + 1);
      for (var i = 0; i < lenStr.length; i++) {
        lengthAry[i] = parseInt(lenStr[i]);
      }
      lengthAry[lenStr.length] = 255;

      if (Blob) {
        var blob = new Blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
        doneCallback(null, blob);
      }
    });
  }

  map(packets, encodeOne, function(err, results) {
    return callback(new Blob(results));
  });
};

/*
 * Decodes data when a payload is maybe expected. Strings are decoded by
 * interpreting each byte as a key code for entries marked to start with 0. See
 * description of encodePayloadAsBinary
 *
 * @param {ArrayBuffer} data, callback method
 * @api public
 */

exports.decodePayloadAsBinary = function (data, binaryType, callback) {
  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var bufferTail = data;
  var buffers = [];

  var numberTooLong = false;
  while (bufferTail.byteLength > 0) {
    var tailArray = new Uint8Array(bufferTail);
    var isString = tailArray[0] === 0;
    var msgLength = '';

    for (var i = 1; ; i++) {
      if (tailArray[i] == 255) break;

      if (msgLength.length > 310) {
        numberTooLong = true;
        break;
      }

      msgLength += tailArray[i];
    }

    if(numberTooLong) return callback(err, 0, 1);

    bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length);
    msgLength = parseInt(msgLength);

    var msg = sliceBuffer(bufferTail, 0, msgLength);
    if (isString) {
      try {
        msg = String.fromCharCode.apply(null, new Uint8Array(msg));
      } catch (e) {
        // iPhone Safari doesn't let you apply to typed arrays
        var typed = new Uint8Array(msg);
        msg = '';
        for (var i = 0; i < typed.length; i++) {
          msg += String.fromCharCode(typed[i]);
        }
      }
    }

    buffers.push(msg);
    bufferTail = sliceBuffer(bufferTail, msgLength);
  }

  var total = buffers.length;
  buffers.forEach(function(buffer, i) {
    callback(exports.decodePacket(buffer, binaryType, true), i, total);
  });
};

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./keys":26,"after":27,"arraybuffer.slice":28,"base64-arraybuffer":29,"blob":30,"has-binary":31,"utf8":33}],26:[function(_dereq_,module,exports){

/**
 * Gets the keys for an object.
 *
 * @return {Array} keys
 * @api private
 */

module.exports = Object.keys || function keys (obj){
  var arr = [];
  var has = Object.prototype.hasOwnProperty;

  for (var i in obj) {
    if (has.call(obj, i)) {
      arr.push(i);
    }
  }
  return arr;
};

},{}],27:[function(_dereq_,module,exports){
module.exports = after

function after(count, callback, err_cb) {
    var bail = false
    err_cb = err_cb || noop
    proxy.count = count

    return (count === 0) ? callback() : proxy

    function proxy(err, result) {
        if (proxy.count <= 0) {
            throw new Error('after called too many times')
        }
        --proxy.count

        // after first error, rest are passed to err_cb
        if (err) {
            bail = true
            callback(err)
            // future error callbacks will go to error handler
            callback = err_cb
        } else if (proxy.count === 0 && !bail) {
            callback(null, result)
        }
    }
}

function noop() {}

},{}],28:[function(_dereq_,module,exports){
/**
 * An abstraction for slicing an arraybuffer even when
 * ArrayBuffer.prototype.slice is not supported
 *
 * @api public
 */

module.exports = function(arraybuffer, start, end) {
  var bytes = arraybuffer.byteLength;
  start = start || 0;
  end = end || bytes;

  if (arraybuffer.slice) { return arraybuffer.slice(start, end); }

  if (start < 0) { start += bytes; }
  if (end < 0) { end += bytes; }
  if (end > bytes) { end = bytes; }

  if (start >= bytes || start >= end || bytes === 0) {
    return new ArrayBuffer(0);
  }

  var abv = new Uint8Array(arraybuffer);
  var result = new Uint8Array(end - start);
  for (var i = start, ii = 0; i < end; i++, ii++) {
    result[ii] = abv[i];
  }
  return result.buffer;
};

},{}],29:[function(_dereq_,module,exports){
/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
(function(chars){
  "use strict";

  exports.encode = function(arraybuffer) {
    var bytes = new Uint8Array(arraybuffer),
    i, len = bytes.length, base64 = "";

    for (i = 0; i < len; i+=3) {
      base64 += chars[bytes[i] >> 2];
      base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
      base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
      base64 += chars[bytes[i + 2] & 63];
    }

    if ((len % 3) === 2) {
      base64 = base64.substring(0, base64.length - 1) + "=";
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + "==";
    }

    return base64;
  };

  exports.decode =  function(base64) {
    var bufferLength = base64.length * 0.75,
    len = base64.length, i, p = 0,
    encoded1, encoded2, encoded3, encoded4;

    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }

    var arraybuffer = new ArrayBuffer(bufferLength),
    bytes = new Uint8Array(arraybuffer);

    for (i = 0; i < len; i+=4) {
      encoded1 = chars.indexOf(base64[i]);
      encoded2 = chars.indexOf(base64[i+1]);
      encoded3 = chars.indexOf(base64[i+2]);
      encoded4 = chars.indexOf(base64[i+3]);

      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }

    return arraybuffer;
  };
})("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");

},{}],30:[function(_dereq_,module,exports){
(function (global){
/**
 * Create a blob builder even when vendor prefixes exist
 */

var BlobBuilder = global.BlobBuilder
  || global.WebKitBlobBuilder
  || global.MSBlobBuilder
  || global.MozBlobBuilder;

/**
 * Check if Blob constructor is supported
 */

var blobSupported = (function() {
  try {
    var b = new Blob(['hi']);
    return b.size == 2;
  } catch(e) {
    return false;
  }
})();

/**
 * Check if BlobBuilder is supported
 */

var blobBuilderSupported = BlobBuilder
  && BlobBuilder.prototype.append
  && BlobBuilder.prototype.getBlob;

function BlobBuilderConstructor(ary, options) {
  options = options || {};

  var bb = new BlobBuilder();
  for (var i = 0; i < ary.length; i++) {
    bb.append(ary[i]);
  }
  return (options.type) ? bb.getBlob(options.type) : bb.getBlob();
};

module.exports = (function() {
  if (blobSupported) {
    return global.Blob;
  } else if (blobBuilderSupported) {
    return BlobBuilderConstructor;
  } else {
    return undefined;
  }
})();

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],31:[function(_dereq_,module,exports){
(function (global){

/*
 * Module requirements.
 */

var isArray = _dereq_('isarray');

/**
 * Module exports.
 */

module.exports = hasBinary;

/**
 * Checks for binary data.
 *
 * Right now only Buffer and ArrayBuffer are supported..
 *
 * @param {Object} anything
 * @api public
 */

function hasBinary(data) {

  function _hasBinary(obj) {
    if (!obj) return false;

    if ( (global.Buffer && global.Buffer.isBuffer(obj)) ||
         (global.ArrayBuffer && obj instanceof ArrayBuffer) ||
         (global.Blob && obj instanceof Blob) ||
         (global.File && obj instanceof File)
        ) {
      return true;
    }

    if (isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
          if (_hasBinary(obj[i])) {
              return true;
          }
      }
    } else if (obj && 'object' == typeof obj) {
      if (obj.toJSON) {
        obj = obj.toJSON();
      }

      for (var key in obj) {
        if (obj.hasOwnProperty(key) && _hasBinary(obj[key])) {
          return true;
        }
      }
    }

    return false;
  }

  return _hasBinary(data);
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"isarray":32}],32:[function(_dereq_,module,exports){
module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

},{}],33:[function(_dereq_,module,exports){
(function (global){
/*! http://mths.be/utf8js v2.0.0 by @mathias */
;(function(root) {

	// Detect free variables `exports`
	var freeExports = typeof exports == 'object' && exports;

	// Detect free variable `module`
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var stringFromCharCode = String.fromCharCode;

	// Taken from http://mths.be/punycode
	function ucs2decode(string) {
		var output = [];
		var counter = 0;
		var length = string.length;
		var value;
		var extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	// Taken from http://mths.be/punycode
	function ucs2encode(array) {
		var length = array.length;
		var index = -1;
		var value;
		var output = '';
		while (++index < length) {
			value = array[index];
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
		}
		return output;
	}

	/*--------------------------------------------------------------------------*/

	function createByte(codePoint, shift) {
		return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
	}

	function encodeCodePoint(codePoint) {
		if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
			return stringFromCharCode(codePoint);
		}
		var symbol = '';
		if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
			symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
		}
		else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
			symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
			symbol += createByte(codePoint, 6);
		}
		else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
			symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
			symbol += createByte(codePoint, 12);
			symbol += createByte(codePoint, 6);
		}
		symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
		return symbol;
	}

	function utf8encode(string) {
		var codePoints = ucs2decode(string);

		// console.log(JSON.stringify(codePoints.map(function(x) {
		// 	return 'U+' + x.toString(16).toUpperCase();
		// })));

		var length = codePoints.length;
		var index = -1;
		var codePoint;
		var byteString = '';
		while (++index < length) {
			codePoint = codePoints[index];
			byteString += encodeCodePoint(codePoint);
		}
		return byteString;
	}

	/*--------------------------------------------------------------------------*/

	function readContinuationByte() {
		if (byteIndex >= byteCount) {
			throw Error('Invalid byte index');
		}

		var continuationByte = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		if ((continuationByte & 0xC0) == 0x80) {
			return continuationByte & 0x3F;
		}

		// If we end up here, it’s not a continuation byte
		throw Error('Invalid continuation byte');
	}

	function decodeSymbol() {
		var byte1;
		var byte2;
		var byte3;
		var byte4;
		var codePoint;

		if (byteIndex > byteCount) {
			throw Error('Invalid byte index');
		}

		if (byteIndex == byteCount) {
			return false;
		}

		// Read first byte
		byte1 = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		// 1-byte sequence (no continuation bytes)
		if ((byte1 & 0x80) == 0) {
			return byte1;
		}

		// 2-byte sequence
		if ((byte1 & 0xE0) == 0xC0) {
			var byte2 = readContinuationByte();
			codePoint = ((byte1 & 0x1F) << 6) | byte2;
			if (codePoint >= 0x80) {
				return codePoint;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 3-byte sequence (may include unpaired surrogates)
		if ((byte1 & 0xF0) == 0xE0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
			if (codePoint >= 0x0800) {
				return codePoint;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 4-byte sequence
		if ((byte1 & 0xF8) == 0xF0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			byte4 = readContinuationByte();
			codePoint = ((byte1 & 0x0F) << 0x12) | (byte2 << 0x0C) |
				(byte3 << 0x06) | byte4;
			if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
				return codePoint;
			}
		}

		throw Error('Invalid UTF-8 detected');
	}

	var byteArray;
	var byteCount;
	var byteIndex;
	function utf8decode(byteString) {
		byteArray = ucs2decode(byteString);
		byteCount = byteArray.length;
		byteIndex = 0;
		var codePoints = [];
		var tmp;
		while ((tmp = decodeSymbol()) !== false) {
			codePoints.push(tmp);
		}
		return ucs2encode(codePoints);
	}

	/*--------------------------------------------------------------------------*/

	var utf8 = {
		'version': '2.0.0',
		'encode': utf8encode,
		'decode': utf8decode
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define(function() {
			return utf8;
		});
	}	else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = utf8;
		} else { // in Narwhal or RingoJS v0.7.0-
			var object = {};
			var hasOwnProperty = object.hasOwnProperty;
			for (var key in utf8) {
				hasOwnProperty.call(utf8, key) && (freeExports[key] = utf8[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.utf8 = utf8;
	}

}(this));

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],34:[function(_dereq_,module,exports){
(function (global){
/**
 * JSON parse.
 *
 * @see Based on jQuery#parseJSON (MIT) and JSON2
 * @api private
 */

var rvalidchars = /^[\],:{}\s]*$/;
var rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
var rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
var rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
var rtrimLeft = /^\s+/;
var rtrimRight = /\s+$/;

module.exports = function parsejson(data) {
  if ('string' != typeof data || !data) {
    return null;
  }

  data = data.replace(rtrimLeft, '').replace(rtrimRight, '');

  // Attempt to parse using the native JSON parser first
  if (global.JSON && JSON.parse) {
    return JSON.parse(data);
  }

  if (rvalidchars.test(data.replace(rvalidescape, '@')
      .replace(rvalidtokens, ']')
      .replace(rvalidbraces, ''))) {
    return (new Function('return ' + data))();
  }
};
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],35:[function(_dereq_,module,exports){
/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */

exports.encode = function (obj) {
  var str = '';

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (str.length) str += '&';
      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
    }
  }

  return str;
};

/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */

exports.decode = function(qs){
  var qry = {};
  var pairs = qs.split('&');
  for (var i = 0, l = pairs.length; i < l; i++) {
    var pair = pairs[i].split('=');
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
};

},{}],36:[function(_dereq_,module,exports){
/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */

var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

var parts = [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
];

module.exports = function parseuri(str) {
    var src = str,
        b = str.indexOf('['),
        e = str.indexOf(']');

    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }

    var m = re.exec(str || ''),
        uri = {},
        i = 14;

    while (i--) {
        uri[parts[i]] = m[i] || '';
    }

    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }

    return uri;
};

},{}],37:[function(_dereq_,module,exports){

/**
 * Module dependencies.
 */

var global = (function() { return this; })();

/**
 * WebSocket constructor.
 */

var WebSocket = global.WebSocket || global.MozWebSocket;

/**
 * Module exports.
 */

module.exports = WebSocket ? ws : null;

/**
 * WebSocket constructor.
 *
 * The third `opts` options object gets ignored in web browsers, since it's
 * non-standard, and throws a TypeError if passed to the constructor.
 * See: https://github.com/einaros/ws/issues/227
 *
 * @param {String} uri
 * @param {Array} protocols (optional)
 * @param {Object) opts (optional)
 * @api public
 */

function ws(uri, protocols, opts) {
  var instance;
  if (protocols) {
    instance = new WebSocket(uri, protocols);
  } else {
    instance = new WebSocket(uri);
  }
  return instance;
}

if (WebSocket) ws.prototype = WebSocket.prototype;

},{}],38:[function(_dereq_,module,exports){
(function (global){

/*
 * Module requirements.
 */

var isArray = _dereq_('isarray');

/**
 * Module exports.
 */

module.exports = hasBinary;

/**
 * Checks for binary data.
 *
 * Right now only Buffer and ArrayBuffer are supported..
 *
 * @param {Object} anything
 * @api public
 */

function hasBinary(data) {

  function _hasBinary(obj) {
    if (!obj) return false;

    if ( (global.Buffer && global.Buffer.isBuffer(obj)) ||
         (global.ArrayBuffer && obj instanceof ArrayBuffer) ||
         (global.Blob && obj instanceof Blob) ||
         (global.File && obj instanceof File)
        ) {
      return true;
    }

    if (isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
          if (_hasBinary(obj[i])) {
              return true;
          }
      }
    } else if (obj && 'object' == typeof obj) {
      if (obj.toJSON) {
        obj = obj.toJSON();
      }

      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && _hasBinary(obj[key])) {
          return true;
        }
      }
    }

    return false;
  }

  return _hasBinary(data);
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"isarray":39}],39:[function(_dereq_,module,exports){
module.exports=_dereq_(32)
},{}],40:[function(_dereq_,module,exports){

/**
 * Module dependencies.
 */

var global = _dereq_('global');

/**
 * Module exports.
 *
 * Logic borrowed from Modernizr:
 *
 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
 */

try {
  module.exports = 'XMLHttpRequest' in global &&
    'withCredentials' in new global.XMLHttpRequest();
} catch (err) {
  // if XMLHttp support is disabled in IE then it will throw
  // when trying to create
  module.exports = false;
}

},{"global":41}],41:[function(_dereq_,module,exports){

/**
 * Returns `this`. Execute this without a "context" (i.e. without it being
 * attached to an object of the left-hand side), and `this` points to the
 * "global" scope of the current JS execution.
 */

module.exports = (function () { return this; })();

},{}],42:[function(_dereq_,module,exports){

var indexOf = [].indexOf;

module.exports = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};
},{}],43:[function(_dereq_,module,exports){

/**
 * HOP ref.
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Return own keys in `obj`.
 *
 * @param {Object} obj
 * @return {Array}
 * @api public
 */

exports.keys = Object.keys || function(obj){
  var keys = [];
  for (var key in obj) {
    if (has.call(obj, key)) {
      keys.push(key);
    }
  }
  return keys;
};

/**
 * Return own values in `obj`.
 *
 * @param {Object} obj
 * @return {Array}
 * @api public
 */

exports.values = function(obj){
  var vals = [];
  for (var key in obj) {
    if (has.call(obj, key)) {
      vals.push(obj[key]);
    }
  }
  return vals;
};

/**
 * Merge `b` into `a`.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api public
 */

exports.merge = function(a, b){
  for (var key in b) {
    if (has.call(b, key)) {
      a[key] = b[key];
    }
  }
  return a;
};

/**
 * Return length of `obj`.
 *
 * @param {Object} obj
 * @return {Number}
 * @api public
 */

exports.length = function(obj){
  return exports.keys(obj).length;
};

/**
 * Check if `obj` is empty.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api public
 */

exports.isEmpty = function(obj){
  return 0 == exports.length(obj);
};
},{}],44:[function(_dereq_,module,exports){
/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */

var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

var parts = [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host'
  , 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
];

module.exports = function parseuri(str) {
  var m = re.exec(str || '')
    , uri = {}
    , i = 14;

  while (i--) {
    uri[parts[i]] = m[i] || '';
  }

  return uri;
};

},{}],45:[function(_dereq_,module,exports){
(function (global){
/*global Blob,File*/

/**
 * Module requirements
 */

var isArray = _dereq_('isarray');
var isBuf = _dereq_('./is-buffer');

/**
 * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
 * Anything with blobs or files should be fed through removeBlobs before coming
 * here.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @api public
 */

exports.deconstructPacket = function(packet){
  var buffers = [];
  var packetData = packet.data;

  function _deconstructPacket(data) {
    if (!data) return data;

    if (isBuf(data)) {
      var placeholder = { _placeholder: true, num: buffers.length };
      buffers.push(data);
      return placeholder;
    } else if (isArray(data)) {
      var newData = new Array(data.length);
      for (var i = 0; i < data.length; i++) {
        newData[i] = _deconstructPacket(data[i]);
      }
      return newData;
    } else if ('object' == typeof data && !(data instanceof Date)) {
      var newData = {};
      for (var key in data) {
        newData[key] = _deconstructPacket(data[key]);
      }
      return newData;
    }
    return data;
  }

  var pack = packet;
  pack.data = _deconstructPacket(packetData);
  pack.attachments = buffers.length; // number of binary 'attachments'
  return {packet: pack, buffers: buffers};
};

/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @api public
 */

exports.reconstructPacket = function(packet, buffers) {
  var curPlaceHolder = 0;

  function _reconstructPacket(data) {
    if (data && data._placeholder) {
      var buf = buffers[data.num]; // appropriate buffer (should be natural order anyway)
      return buf;
    } else if (isArray(data)) {
      for (var i = 0; i < data.length; i++) {
        data[i] = _reconstructPacket(data[i]);
      }
      return data;
    } else if (data && 'object' == typeof data) {
      for (var key in data) {
        data[key] = _reconstructPacket(data[key]);
      }
      return data;
    }
    return data;
  }

  packet.data = _reconstructPacket(packet.data);
  packet.attachments = undefined; // no longer useful
  return packet;
};

/**
 * Asynchronously removes Blobs or Files from data via
 * FileReader's readAsArrayBuffer method. Used before encoding
 * data as msgpack. Calls callback with the blobless data.
 *
 * @param {Object} data
 * @param {Function} callback
 * @api private
 */

exports.removeBlobs = function(data, callback) {
  function _removeBlobs(obj, curKey, containingObject) {
    if (!obj) return obj;

    // convert any blob
    if ((global.Blob && obj instanceof Blob) ||
        (global.File && obj instanceof File)) {
      pendingBlobs++;

      // async filereader
      var fileReader = new FileReader();
      fileReader.onload = function() { // this.result == arraybuffer
        if (containingObject) {
          containingObject[curKey] = this.result;
        }
        else {
          bloblessData = this.result;
        }

        // if nothing pending its callback time
        if(! --pendingBlobs) {
          callback(bloblessData);
        }
      };

      fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
    } else if (isArray(obj)) { // handle array
      for (var i = 0; i < obj.length; i++) {
        _removeBlobs(obj[i], i, obj);
      }
    } else if (obj && 'object' == typeof obj && !isBuf(obj)) { // and object
      for (var key in obj) {
        _removeBlobs(obj[key], key, obj);
      }
    }
  }

  var pendingBlobs = 0;
  var bloblessData = data;
  _removeBlobs(bloblessData);
  if (!pendingBlobs) {
    callback(bloblessData);
  }
};

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./is-buffer":47,"isarray":48}],46:[function(_dereq_,module,exports){

/**
 * Module dependencies.
 */

var debug = _dereq_('debug')('socket.io-parser');
var json = _dereq_('json3');
var isArray = _dereq_('isarray');
var Emitter = _dereq_('component-emitter');
var binary = _dereq_('./binary');
var isBuf = _dereq_('./is-buffer');

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = 4;

/**
 * Packet types.
 *
 * @api public
 */

exports.types = [
  'CONNECT',
  'DISCONNECT',
  'EVENT',
  'BINARY_EVENT',
  'ACK',
  'BINARY_ACK',
  'ERROR'
];

/**
 * Packet type `connect`.
 *
 * @api public
 */

exports.CONNECT = 0;

/**
 * Packet type `disconnect`.
 *
 * @api public
 */

exports.DISCONNECT = 1;

/**
 * Packet type `event`.
 *
 * @api public
 */

exports.EVENT = 2;

/**
 * Packet type `ack`.
 *
 * @api public
 */

exports.ACK = 3;

/**
 * Packet type `error`.
 *
 * @api public
 */

exports.ERROR = 4;

/**
 * Packet type 'binary event'
 *
 * @api public
 */

exports.BINARY_EVENT = 5;

/**
 * Packet type `binary ack`. For acks with binary arguments.
 *
 * @api public
 */

exports.BINARY_ACK = 6;

/**
 * Encoder constructor.
 *
 * @api public
 */

exports.Encoder = Encoder;

/**
 * Decoder constructor.
 *
 * @api public
 */

exports.Decoder = Decoder;

/**
 * A socket.io Encoder instance
 *
 * @api public
 */

function Encoder() {}

/**
 * Encode a packet as a single string if non-binary, or as a
 * buffer sequence, depending on packet type.
 *
 * @param {Object} obj - packet object
 * @param {Function} callback - function to handle encodings (likely engine.write)
 * @return Calls callback with Array of encodings
 * @api public
 */

Encoder.prototype.encode = function(obj, callback){
  debug('encoding packet %j', obj);

  if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
    encodeAsBinary(obj, callback);
  }
  else {
    var encoding = encodeAsString(obj);
    callback([encoding]);
  }
};

/**
 * Encode packet as string.
 *
 * @param {Object} packet
 * @return {String} encoded
 * @api private
 */

function encodeAsString(obj) {
  var str = '';
  var nsp = false;

  // first is type
  str += obj.type;

  // attachments if we have them
  if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
    str += obj.attachments;
    str += '-';
  }

  // if we have a namespace other than `/`
  // we append it followed by a comma `,`
  if (obj.nsp && '/' != obj.nsp) {
    nsp = true;
    str += obj.nsp;
  }

  // immediately followed by the id
  if (null != obj.id) {
    if (nsp) {
      str += ',';
      nsp = false;
    }
    str += obj.id;
  }

  // json data
  if (null != obj.data) {
    if (nsp) str += ',';
    str += json.stringify(obj.data);
  }

  debug('encoded %j as %s', obj, str);
  return str;
}

/**
 * Encode packet as 'buffer sequence' by removing blobs, and
 * deconstructing packet into object with placeholders and
 * a list of buffers.
 *
 * @param {Object} packet
 * @return {Buffer} encoded
 * @api private
 */

function encodeAsBinary(obj, callback) {

  function writeEncoding(bloblessData) {
    var deconstruction = binary.deconstructPacket(bloblessData);
    var pack = encodeAsString(deconstruction.packet);
    var buffers = deconstruction.buffers;

    buffers.unshift(pack); // add packet info to beginning of data list
    callback(buffers); // write all the buffers
  }

  binary.removeBlobs(obj, writeEncoding);
}

/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 * @api public
 */

function Decoder() {
  this.reconstructor = null;
}

/**
 * Mix in `Emitter` with Decoder.
 */

Emitter(Decoder.prototype);

/**
 * Decodes an ecoded packet string into packet JSON.
 *
 * @param {String} obj - encoded packet
 * @return {Object} packet
 * @api public
 */

Decoder.prototype.add = function(obj) {
  var packet;
  if ('string' == typeof obj) {
    packet = decodeString(obj);
    if (exports.BINARY_EVENT == packet.type || exports.BINARY_ACK == packet.type) { // binary packet's json
      this.reconstructor = new BinaryReconstructor(packet);

      // no attachments, labeled binary but no binary data to follow
      if (this.reconstructor.reconPack.attachments === 0) {
        this.emit('decoded', packet);
      }
    } else { // non-binary full packet
      this.emit('decoded', packet);
    }
  }
  else if (isBuf(obj) || obj.base64) { // raw binary data
    if (!this.reconstructor) {
      throw new Error('got binary data when not reconstructing a packet');
    } else {
      packet = this.reconstructor.takeBinaryData(obj);
      if (packet) { // received final buffer
        this.reconstructor = null;
        this.emit('decoded', packet);
      }
    }
  }
  else {
    throw new Error('Unknown type: ' + obj);
  }
};

/**
 * Decode a packet String (JSON data)
 *
 * @param {String} str
 * @return {Object} packet
 * @api private
 */

function decodeString(str) {
  var p = {};
  var i = 0;

  // look up type
  p.type = Number(str.charAt(0));
  if (null == exports.types[p.type]) return error();

  // look up attachments if type binary
  if (exports.BINARY_EVENT == p.type || exports.BINARY_ACK == p.type) {
    var buf = '';
    while (str.charAt(++i) != '-') {
      buf += str.charAt(i);
      if (i == str.length) break;
    }
    if (buf != Number(buf) || str.charAt(i) != '-') {
      throw new Error('Illegal attachments');
    }
    p.attachments = Number(buf);
  }

  // look up namespace (if any)
  if ('/' == str.charAt(i + 1)) {
    p.nsp = '';
    while (++i) {
      var c = str.charAt(i);
      if (',' == c) break;
      p.nsp += c;
      if (i == str.length) break;
    }
  } else {
    p.nsp = '/';
  }

  // look up id
  var next = str.charAt(i + 1);
  if ('' !== next && Number(next) == next) {
    p.id = '';
    while (++i) {
      var c = str.charAt(i);
      if (null == c || Number(c) != c) {
        --i;
        break;
      }
      p.id += str.charAt(i);
      if (i == str.length) break;
    }
    p.id = Number(p.id);
  }

  // look up json data
  if (str.charAt(++i)) {
    try {
      p.data = json.parse(str.substr(i));
    } catch(e){
      return error();
    }
  }

  debug('decoded %s as %j', str, p);
  return p;
}

/**
 * Deallocates a parser's resources
 *
 * @api public
 */

Decoder.prototype.destroy = function() {
  if (this.reconstructor) {
    this.reconstructor.finishedReconstruction();
  }
};

/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 * @api private
 */

function BinaryReconstructor(packet) {
  this.reconPack = packet;
  this.buffers = [];
}

/**
 * Method to be called when binary data received from connection
 * after a BINARY_EVENT packet.
 *
 * @param {Buffer | ArrayBuffer} binData - the raw binary data received
 * @return {null | Object} returns null if more binary data is expected or
 *   a reconstructed packet object if all buffers have been received.
 * @api private
 */

BinaryReconstructor.prototype.takeBinaryData = function(binData) {
  this.buffers.push(binData);
  if (this.buffers.length == this.reconPack.attachments) { // done with buffer list
    var packet = binary.reconstructPacket(this.reconPack, this.buffers);
    this.finishedReconstruction();
    return packet;
  }
  return null;
};

/**
 * Cleans up binary packet reconstruction variables.
 *
 * @api private
 */

BinaryReconstructor.prototype.finishedReconstruction = function() {
  this.reconPack = null;
  this.buffers = [];
};

function error(data){
  return {
    type: exports.ERROR,
    data: 'parser error'
  };
}

},{"./binary":45,"./is-buffer":47,"component-emitter":9,"debug":10,"isarray":48,"json3":49}],47:[function(_dereq_,module,exports){
(function (global){

module.exports = isBuf;

/**
 * Returns true if obj is a buffer or an arraybuffer.
 *
 * @api private
 */

function isBuf(obj) {
  return (global.Buffer && global.Buffer.isBuffer(obj)) ||
         (global.ArrayBuffer && obj instanceof ArrayBuffer);
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],48:[function(_dereq_,module,exports){
module.exports=_dereq_(32)
},{}],49:[function(_dereq_,module,exports){
/*! JSON v3.2.6 | http://bestiejs.github.io/json3 | Copyright 2012-2013, Kit Cambridge | http://kit.mit-license.org */
;(function (window) {
  // Convenience aliases.
  var getClass = {}.toString, isProperty, forEach, undef;

  // Detect the `define` function exposed by asynchronous module loaders. The
  // strict `define` check is necessary for compatibility with `r.js`.
  var isLoader = typeof define === "function" && define.amd;

  // Detect native implementations.
  var nativeJSON = typeof JSON == "object" && JSON;

  // Set up the JSON 3 namespace, preferring the CommonJS `exports` object if
  // available.
  var JSON3 = typeof exports == "object" && exports && !exports.nodeType && exports;

  if (JSON3 && nativeJSON) {
    // Explicitly delegate to the native `stringify` and `parse`
    // implementations in CommonJS environments.
    JSON3.stringify = nativeJSON.stringify;
    JSON3.parse = nativeJSON.parse;
  } else {
    // Export for web browsers, JavaScript engines, and asynchronous module
    // loaders, using the global `JSON` object if available.
    JSON3 = window.JSON = nativeJSON || {};
  }

  // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
  var isExtended = new Date(-3509827334573292);
  try {
    // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
    // results for certain dates in Opera >= 10.53.
    isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
      // Safari < 2.0.2 stores the internal millisecond time value correctly,
      // but clips the values returned by the date methods to the range of
      // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
      isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
  } catch (exception) {}

  // Internal: Determines whether the native `JSON.stringify` and `parse`
  // implementations are spec-compliant. Based on work by Ken Snyder.
  function has(name) {
    if (has[name] !== undef) {
      // Return cached feature test result.
      return has[name];
    }

    var isSupported;
    if (name == "bug-string-char-index") {
      // IE <= 7 doesn't support accessing string characters using square
      // bracket notation. IE 8 only supports this for primitives.
      isSupported = "a"[0] != "a";
    } else if (name == "json") {
      // Indicates whether both `JSON.stringify` and `JSON.parse` are
      // supported.
      isSupported = has("json-stringify") && has("json-parse");
    } else {
      var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
      // Test `JSON.stringify`.
      if (name == "json-stringify") {
        var stringify = JSON3.stringify, stringifySupported = typeof stringify == "function" && isExtended;
        if (stringifySupported) {
          // A test function object with a custom `toJSON` method.
          (value = function () {
            return 1;
          }).toJSON = value;
          try {
            stringifySupported =
              // Firefox 3.1b1 and b2 serialize string, number, and boolean
              // primitives as object literals.
              stringify(0) === "0" &&
              // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
              // literals.
              stringify(new Number()) === "0" &&
              stringify(new String()) == '""' &&
              // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
              // does not define a canonical JSON representation (this applies to
              // objects with `toJSON` properties as well, *unless* they are nested
              // within an object or array).
              stringify(getClass) === undef &&
              // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
              // FF 3.1b3 pass this test.
              stringify(undef) === undef &&
              // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
              // respectively, if the value is omitted entirely.
              stringify() === undef &&
              // FF 3.1b1, 2 throw an error if the given value is not a number,
              // string, array, object, Boolean, or `null` literal. This applies to
              // objects with custom `toJSON` methods as well, unless they are nested
              // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
              // methods entirely.
              stringify(value) === "1" &&
              stringify([value]) == "[1]" &&
              // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
              // `"[null]"`.
              stringify([undef]) == "[null]" &&
              // YUI 3.0.0b1 fails to serialize `null` literals.
              stringify(null) == "null" &&
              // FF 3.1b1, 2 halts serialization if an array contains a function:
              // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
              // elides non-JSON values from objects and arrays, unless they
              // define custom `toJSON` methods.
              stringify([undef, getClass, null]) == "[null,null,null]" &&
              // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
              // where character escape codes are expected (e.g., `\b` => `\u0008`).
              stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
              // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
              stringify(null, value) === "1" &&
              stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
              // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
              // serialize extended years.
              stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
              // The milliseconds are optional in ES 5, but required in 5.1.
              stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
              // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
              // four-digit years instead of six-digit years. Credits: @Yaffle.
              stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
              // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
              // values less than 1000. Credits: @Yaffle.
              stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
          } catch (exception) {
            stringifySupported = false;
          }
        }
        isSupported = stringifySupported;
      }
      // Test `JSON.parse`.
      if (name == "json-parse") {
        var parse = JSON3.parse;
        if (typeof parse == "function") {
          try {
            // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
            // Conforming implementations should also coerce the initial argument to
            // a string prior to parsing.
            if (parse("0") === 0 && !parse(false)) {
              // Simple parsing test.
              value = parse(serialized);
              var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
              if (parseSupported) {
                try {
                  // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                  parseSupported = !parse('"\t"');
                } catch (exception) {}
                if (parseSupported) {
                  try {
                    // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                    // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                    // certain octal literals.
                    parseSupported = parse("01") !== 1;
                  } catch (exception) {}
                }
                if (parseSupported) {
                  try {
                    // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                    // points. These environments, along with FF 3.1b1 and 2,
                    // also allow trailing commas in JSON objects and arrays.
                    parseSupported = parse("1.") !== 1;
                  } catch (exception) {}
                }
              }
            }
          } catch (exception) {
            parseSupported = false;
          }
        }
        isSupported = parseSupported;
      }
    }
    return has[name] = !!isSupported;
  }

  if (!has("json")) {
    // Common `[[Class]]` name aliases.
    var functionClass = "[object Function]";
    var dateClass = "[object Date]";
    var numberClass = "[object Number]";
    var stringClass = "[object String]";
    var arrayClass = "[object Array]";
    var booleanClass = "[object Boolean]";

    // Detect incomplete support for accessing string characters by index.
    var charIndexBuggy = has("bug-string-char-index");

    // Define additional utility methods if the `Date` methods are buggy.
    if (!isExtended) {
      var floor = Math.floor;
      // A mapping between the months of the year and the number of days between
      // January 1st and the first of the respective month.
      var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
      // Internal: Calculates the number of days between the Unix epoch and the
      // first day of the given month.
      var getDay = function (year, month) {
        return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
      };
    }

    // Internal: Determines if a property is a direct property of the given
    // object. Delegates to the native `Object#hasOwnProperty` method.
    if (!(isProperty = {}.hasOwnProperty)) {
      isProperty = function (property) {
        var members = {}, constructor;
        if ((members.__proto__ = null, members.__proto__ = {
          // The *proto* property cannot be set multiple times in recent
          // versions of Firefox and SeaMonkey.
          "toString": 1
        }, members).toString != getClass) {
          // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
          // supports the mutable *proto* property.
          isProperty = function (property) {
            // Capture and break the object's prototype chain (see section 8.6.2
            // of the ES 5.1 spec). The parenthesized expression prevents an
            // unsafe transformation by the Closure Compiler.
            var original = this.__proto__, result = property in (this.__proto__ = null, this);
            // Restore the original prototype chain.
            this.__proto__ = original;
            return result;
          };
        } else {
          // Capture a reference to the top-level `Object` constructor.
          constructor = members.constructor;
          // Use the `constructor` property to simulate `Object#hasOwnProperty` in
          // other environments.
          isProperty = function (property) {
            var parent = (this.constructor || constructor).prototype;
            return property in this && !(property in parent && this[property] === parent[property]);
          };
        }
        members = null;
        return isProperty.call(this, property);
      };
    }

    // Internal: A set of primitive types used by `isHostType`.
    var PrimitiveTypes = {
      'boolean': 1,
      'number': 1,
      'string': 1,
      'undefined': 1
    };

    // Internal: Determines if the given object `property` value is a
    // non-primitive.
    var isHostType = function (object, property) {
      var type = typeof object[property];
      return type == 'object' ? !!object[property] : !PrimitiveTypes[type];
    };

    // Internal: Normalizes the `for...in` iteration algorithm across
    // environments. Each enumerated key is yielded to a `callback` function.
    forEach = function (object, callback) {
      var size = 0, Properties, members, property;

      // Tests for bugs in the current environment's `for...in` algorithm. The
      // `valueOf` property inherits the non-enumerable flag from
      // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
      (Properties = function () {
        this.valueOf = 0;
      }).prototype.valueOf = 0;

      // Iterate over a new instance of the `Properties` class.
      members = new Properties();
      for (property in members) {
        // Ignore all properties inherited from `Object.prototype`.
        if (isProperty.call(members, property)) {
          size++;
        }
      }
      Properties = members = null;

      // Normalize the iteration algorithm.
      if (!size) {
        // A list of non-enumerable properties inherited from `Object.prototype`.
        members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
        // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
        // properties.
        forEach = function (object, callback) {
          var isFunction = getClass.call(object) == functionClass, property, length;
          var hasProperty = !isFunction && typeof object.constructor != 'function' && isHostType(object, 'hasOwnProperty') ? object.hasOwnProperty : isProperty;
          for (property in object) {
            // Gecko <= 1.0 enumerates the `prototype` property of functions under
            // certain conditions; IE does not.
            if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
              callback(property);
            }
          }
          // Manually invoke the callback for each non-enumerable property.
          for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
        };
      } else if (size == 2) {
        // Safari <= 2.0.4 enumerates shadowed properties twice.
        forEach = function (object, callback) {
          // Create a set of iterated properties.
          var members = {}, isFunction = getClass.call(object) == functionClass, property;
          for (property in object) {
            // Store each property name to prevent double enumeration. The
            // `prototype` property of functions is not enumerated due to cross-
            // environment inconsistencies.
            if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
              callback(property);
            }
          }
        };
      } else {
        // No bugs detected; use the standard `for...in` algorithm.
        forEach = function (object, callback) {
          var isFunction = getClass.call(object) == functionClass, property, isConstructor;
          for (property in object) {
            if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
              callback(property);
            }
          }
          // Manually invoke the callback for the `constructor` property due to
          // cross-environment inconsistencies.
          if (isConstructor || isProperty.call(object, (property = "constructor"))) {
            callback(property);
          }
        };
      }
      return forEach(object, callback);
    };

    // Public: Serializes a JavaScript `value` as a JSON string. The optional
    // `filter` argument may specify either a function that alters how object and
    // array members are serialized, or an array of strings and numbers that
    // indicates which properties should be serialized. The optional `width`
    // argument may be either a string or number that specifies the indentation
    // level of the output.
    if (!has("json-stringify")) {
      // Internal: A map of control characters and their escaped equivalents.
      var Escapes = {
        92: "\\\\",
        34: '\\"',
        8: "\\b",
        12: "\\f",
        10: "\\n",
        13: "\\r",
        9: "\\t"
      };

      // Internal: Converts `value` into a zero-padded string such that its
      // length is at least equal to `width`. The `width` must be <= 6.
      var leadingZeroes = "000000";
      var toPaddedString = function (width, value) {
        // The `|| 0` expression is necessary to work around a bug in
        // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
        return (leadingZeroes + (value || 0)).slice(-width);
      };

      // Internal: Double-quotes a string `value`, replacing all ASCII control
      // characters (characters with code unit values between 0 and 31) with
      // their escaped equivalents. This is an implementation of the
      // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
      var unicodePrefix = "\\u00";
      var quote = function (value) {
        var result = '"', index = 0, length = value.length, isLarge = length > 10 && charIndexBuggy, symbols;
        if (isLarge) {
          symbols = value.split("");
        }
        for (; index < length; index++) {
          var charCode = value.charCodeAt(index);
          // If the character is a control character, append its Unicode or
          // shorthand escape sequence; otherwise, append the character as-is.
          switch (charCode) {
            case 8: case 9: case 10: case 12: case 13: case 34: case 92:
              result += Escapes[charCode];
              break;
            default:
              if (charCode < 32) {
                result += unicodePrefix + toPaddedString(2, charCode.toString(16));
                break;
              }
              result += isLarge ? symbols[index] : charIndexBuggy ? value.charAt(index) : value[index];
          }
        }
        return result + '"';
      };

      // Internal: Recursively serializes an object. Implements the
      // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
      var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
        var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
        try {
          // Necessary for host object support.
          value = object[property];
        } catch (exception) {}
        if (typeof value == "object" && value) {
          className = getClass.call(value);
          if (className == dateClass && !isProperty.call(value, "toJSON")) {
            if (value > -1 / 0 && value < 1 / 0) {
              // Dates are serialized according to the `Date#toJSON` method
              // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
              // for the ISO 8601 date time string format.
              if (getDay) {
                // Manually compute the year, month, date, hours, minutes,
                // seconds, and milliseconds if the `getUTC*` methods are
                // buggy. Adapted from @Yaffle's `date-shim` project.
                date = floor(value / 864e5);
                for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
                for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
                date = 1 + date - getDay(year, month);
                // The `time` value specifies the time within the day (see ES
                // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                // to compute `A modulo B`, as the `%` operator does not
                // correspond to the `modulo` operation for negative numbers.
                time = (value % 864e5 + 864e5) % 864e5;
                // The hours, minutes, seconds, and milliseconds are obtained by
                // decomposing the time within the day. See section 15.9.1.10.
                hours = floor(time / 36e5) % 24;
                minutes = floor(time / 6e4) % 60;
                seconds = floor(time / 1e3) % 60;
                milliseconds = time % 1e3;
              } else {
                year = value.getUTCFullYear();
                month = value.getUTCMonth();
                date = value.getUTCDate();
                hours = value.getUTCHours();
                minutes = value.getUTCMinutes();
                seconds = value.getUTCSeconds();
                milliseconds = value.getUTCMilliseconds();
              }
              // Serialize extended years correctly.
              value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
                "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
                // Months, dates, hours, minutes, and seconds should have two
                // digits; milliseconds should have three.
                "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
                // Milliseconds are optional in ES 5.0, but required in 5.1.
                "." + toPaddedString(3, milliseconds) + "Z";
            } else {
              value = null;
            }
          } else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
            // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
            // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
            // ignores all `toJSON` methods on these objects unless they are
            // defined directly on an instance.
            value = value.toJSON(property);
          }
        }
        if (callback) {
          // If a replacement function was provided, call it to obtain the value
          // for serialization.
          value = callback.call(object, property, value);
        }
        if (value === null) {
          return "null";
        }
        className = getClass.call(value);
        if (className == booleanClass) {
          // Booleans are represented literally.
          return "" + value;
        } else if (className == numberClass) {
          // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
          // `"null"`.
          return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
        } else if (className == stringClass) {
          // Strings are double-quoted and escaped.
          return quote("" + value);
        }
        // Recursively serialize objects and arrays.
        if (typeof value == "object") {
          // Check for cyclic structures. This is a linear search; performance
          // is inversely proportional to the number of unique nested objects.
          for (length = stack.length; length--;) {
            if (stack[length] === value) {
              // Cyclic structures cannot be serialized by `JSON.stringify`.
              throw TypeError();
            }
          }
          // Add the object to the stack of traversed objects.
          stack.push(value);
          results = [];
          // Save the current indentation level and indent one additional level.
          prefix = indentation;
          indentation += whitespace;
          if (className == arrayClass) {
            // Recursively serialize array elements.
            for (index = 0, length = value.length; index < length; index++) {
              element = serialize(index, value, callback, properties, whitespace, indentation, stack);
              results.push(element === undef ? "null" : element);
            }
            result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
          } else {
            // Recursively serialize object members. Members are selected from
            // either a user-specified list of property names, or the object
            // itself.
            forEach(properties || value, function (property) {
              var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
              if (element !== undef) {
                // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                // is not the empty string, let `member` {quote(property) + ":"}
                // be the concatenation of `member` and the `space` character."
                // The "`space` character" refers to the literal space
                // character, not the `space` {width} argument provided to
                // `JSON.stringify`.
                results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
              }
            });
            result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
          }
          // Remove the object from the traversed object stack.
          stack.pop();
          return result;
        }
      };

      // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
      JSON3.stringify = function (source, filter, width) {
        var whitespace, callback, properties, className;
        if (typeof filter == "function" || typeof filter == "object" && filter) {
          if ((className = getClass.call(filter)) == functionClass) {
            callback = filter;
          } else if (className == arrayClass) {
            // Convert the property names array into a makeshift set.
            properties = {};
            for (var index = 0, length = filter.length, value; index < length; value = filter[index++], ((className = getClass.call(value)), className == stringClass || className == numberClass) && (properties[value] = 1));
          }
        }
        if (width) {
          if ((className = getClass.call(width)) == numberClass) {
            // Convert the `width` to an integer and create a string containing
            // `width` number of space characters.
            if ((width -= width % 1) > 0) {
              for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
            }
          } else if (className == stringClass) {
            whitespace = width.length <= 10 ? width : width.slice(0, 10);
          }
        }
        // Opera <= 7.54u2 discards the values associated with empty string keys
        // (`""`) only if they are used directly within an object member list
        // (e.g., `!("" in { "": 1})`).
        return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
      };
    }

    // Public: Parses a JSON source string.
    if (!has("json-parse")) {
      var fromCharCode = String.fromCharCode;

      // Internal: A map of escaped control characters and their unescaped
      // equivalents.
      var Unescapes = {
        92: "\\",
        34: '"',
        47: "/",
        98: "\b",
        116: "\t",
        110: "\n",
        102: "\f",
        114: "\r"
      };

      // Internal: Stores the parser state.
      var Index, Source;

      // Internal: Resets the parser state and throws a `SyntaxError`.
      var abort = function() {
        Index = Source = null;
        throw SyntaxError();
      };

      // Internal: Returns the next token, or `"$"` if the parser has reached
      // the end of the source string. A token may be a string, number, `null`
      // literal, or Boolean literal.
      var lex = function () {
        var source = Source, length = source.length, value, begin, position, isSigned, charCode;
        while (Index < length) {
          charCode = source.charCodeAt(Index);
          switch (charCode) {
            case 9: case 10: case 13: case 32:
              // Skip whitespace tokens, including tabs, carriage returns, line
              // feeds, and space characters.
              Index++;
              break;
            case 123: case 125: case 91: case 93: case 58: case 44:
              // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
              // the current position.
              value = charIndexBuggy ? source.charAt(Index) : source[Index];
              Index++;
              return value;
            case 34:
              // `"` delimits a JSON string; advance to the next character and
              // begin parsing the string. String tokens are prefixed with the
              // sentinel `@` character to distinguish them from punctuators and
              // end-of-string tokens.
              for (value = "@", Index++; Index < length;) {
                charCode = source.charCodeAt(Index);
                if (charCode < 32) {
                  // Unescaped ASCII control characters (those with a code unit
                  // less than the space character) are not permitted.
                  abort();
                } else if (charCode == 92) {
                  // A reverse solidus (`\`) marks the beginning of an escaped
                  // control character (including `"`, `\`, and `/`) or Unicode
                  // escape sequence.
                  charCode = source.charCodeAt(++Index);
                  switch (charCode) {
                    case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
                      // Revive escaped control characters.
                      value += Unescapes[charCode];
                      Index++;
                      break;
                    case 117:
                      // `\u` marks the beginning of a Unicode escape sequence.
                      // Advance to the first character and validate the
                      // four-digit code point.
                      begin = ++Index;
                      for (position = Index + 4; Index < position; Index++) {
                        charCode = source.charCodeAt(Index);
                        // A valid sequence comprises four hexdigits (case-
                        // insensitive) that form a single hexadecimal value.
                        if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                          // Invalid Unicode escape sequence.
                          abort();
                        }
                      }
                      // Revive the escaped character.
                      value += fromCharCode("0x" + source.slice(begin, Index));
                      break;
                    default:
                      // Invalid escape sequence.
                      abort();
                  }
                } else {
                  if (charCode == 34) {
                    // An unescaped double-quote character marks the end of the
                    // string.
                    break;
                  }
                  charCode = source.charCodeAt(Index);
                  begin = Index;
                  // Optimize for the common case where a string is valid.
                  while (charCode >= 32 && charCode != 92 && charCode != 34) {
                    charCode = source.charCodeAt(++Index);
                  }
                  // Append the string as-is.
                  value += source.slice(begin, Index);
                }
              }
              if (source.charCodeAt(Index) == 34) {
                // Advance to the next character and return the revived string.
                Index++;
                return value;
              }
              // Unterminated string.
              abort();
            default:
              // Parse numbers and literals.
              begin = Index;
              // Advance past the negative sign, if one is specified.
              if (charCode == 45) {
                isSigned = true;
                charCode = source.charCodeAt(++Index);
              }
              // Parse an integer or floating-point value.
              if (charCode >= 48 && charCode <= 57) {
                // Leading zeroes are interpreted as octal literals.
                if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
                  // Illegal octal literal.
                  abort();
                }
                isSigned = false;
                // Parse the integer component.
                for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
                // Floats cannot contain a leading decimal point; however, this
                // case is already accounted for by the parser.
                if (source.charCodeAt(Index) == 46) {
                  position = ++Index;
                  // Parse the decimal component.
                  for (; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                  if (position == Index) {
                    // Illegal trailing decimal.
                    abort();
                  }
                  Index = position;
                }
                // Parse exponents. The `e` denoting the exponent is
                // case-insensitive.
                charCode = source.charCodeAt(Index);
                if (charCode == 101 || charCode == 69) {
                  charCode = source.charCodeAt(++Index);
                  // Skip past the sign following the exponent, if one is
                  // specified.
                  if (charCode == 43 || charCode == 45) {
                    Index++;
                  }
                  // Parse the exponential component.
                  for (position = Index; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                  if (position == Index) {
                    // Illegal empty exponent.
                    abort();
                  }
                  Index = position;
                }
                // Coerce the parsed value to a JavaScript number.
                return +source.slice(begin, Index);
              }
              // A negative sign may only precede numbers.
              if (isSigned) {
                abort();
              }
              // `true`, `false`, and `null` literals.
              if (source.slice(Index, Index + 4) == "true") {
                Index += 4;
                return true;
              } else if (source.slice(Index, Index + 5) == "false") {
                Index += 5;
                return false;
              } else if (source.slice(Index, Index + 4) == "null") {
                Index += 4;
                return null;
              }
              // Unrecognized token.
              abort();
          }
        }
        // Return the sentinel `$` character if the parser has reached the end
        // of the source string.
        return "$";
      };

      // Internal: Parses a JSON `value` token.
      var get = function (value) {
        var results, hasMembers;
        if (value == "$") {
          // Unexpected end of input.
          abort();
        }
        if (typeof value == "string") {
          if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
            // Remove the sentinel `@` character.
            return value.slice(1);
          }
          // Parse object and array literals.
          if (value == "[") {
            // Parses a JSON array, returning a new JavaScript array.
            results = [];
            for (;; hasMembers || (hasMembers = true)) {
              value = lex();
              // A closing square bracket marks the end of the array literal.
              if (value == "]") {
                break;
              }
              // If the array literal contains elements, the current token
              // should be a comma separating the previous element from the
              // next.
              if (hasMembers) {
                if (value == ",") {
                  value = lex();
                  if (value == "]") {
                    // Unexpected trailing `,` in array literal.
                    abort();
                  }
                } else {
                  // A `,` must separate each array element.
                  abort();
                }
              }
              // Elisions and leading commas are not permitted.
              if (value == ",") {
                abort();
              }
              results.push(get(value));
            }
            return results;
          } else if (value == "{") {
            // Parses a JSON object, returning a new JavaScript object.
            results = {};
            for (;; hasMembers || (hasMembers = true)) {
              value = lex();
              // A closing curly brace marks the end of the object literal.
              if (value == "}") {
                break;
              }
              // If the object literal contains members, the current token
              // should be a comma separator.
              if (hasMembers) {
                if (value == ",") {
                  value = lex();
                  if (value == "}") {
                    // Unexpected trailing `,` in object literal.
                    abort();
                  }
                } else {
                  // A `,` must separate each object member.
                  abort();
                }
              }
              // Leading commas are not permitted, object property names must be
              // double-quoted strings, and a `:` must separate each property
              // name and value.
              if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                abort();
              }
              results[value.slice(1)] = get(lex());
            }
            return results;
          }
          // Unexpected token encountered.
          abort();
        }
        return value;
      };

      // Internal: Updates a traversed object member.
      var update = function(source, property, callback) {
        var element = walk(source, property, callback);
        if (element === undef) {
          delete source[property];
        } else {
          source[property] = element;
        }
      };

      // Internal: Recursively traverses a parsed JSON object, invoking the
      // `callback` function for each value. This is an implementation of the
      // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
      var walk = function (source, property, callback) {
        var value = source[property], length;
        if (typeof value == "object" && value) {
          // `forEach` can't be used to traverse an array in Opera <= 8.54
          // because its `Object#hasOwnProperty` implementation returns `false`
          // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
          if (getClass.call(value) == arrayClass) {
            for (length = value.length; length--;) {
              update(value, length, callback);
            }
          } else {
            forEach(value, function (property) {
              update(value, property, callback);
            });
          }
        }
        return callback.call(source, property, value);
      };

      // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
      JSON3.parse = function (source, callback) {
        var result, value;
        Index = 0;
        Source = "" + source;
        result = get(lex());
        // If a JSON string contains multiple tokens, it is invalid.
        if (lex() != "$") {
          abort();
        }
        // Reset the parser state.
        Index = Source = null;
        return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
      };
    }
  }

  // Export for asynchronous module loaders.
  if (isLoader) {
    define(function () {
      return JSON3;
    });
  }
}(this));

},{}],50:[function(_dereq_,module,exports){
module.exports = toArray

function toArray(list, index) {
    var array = []

    index = index || 0

    for (var i = index || 0; i < list.length; i++) {
        array[i - index] = list[i]
    }

    return array
}

},{}]},{},[1])
(1)
});
 
   //new part        




//###############################################//###############################################
//###############################################//###############################################
// Make 1200.99 $   looks like this 1.230,00
//###############################################//###############################################
//###############################################//###############################################

Number.prototype.BalanceStyle = function(decPlaces, thouSeparator, decSeparator) {
    var n = this,
    decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
    decSeparator = decSeparator == undefined ? "." : decSeparator,
    thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
    sign = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
};

//###############################################//###############################################
//###############################################//###############################################




//###############################################//###############################################
//###############################################//###############################################
// Array works , remove all array items with same values
//###############################################//###############################################
//###############################################//###############################################
function removeItem(arr){
    var what, a= arguments, L= a.length, ax;
    while(L> 1 && arr.length){
        what= a[--L];
        while((ax= arr.indexOf(what))!= -1){
            arr.splice(ax, 1);
        }
    }
    return arr;
}
// removeA(arrayNAME,'-delete-all-value-');


Array.prototype.unset = function(value) {
    if(this.indexOf(value) != -1) {
        this.splice(this.indexOf(value), 1);
    }   
}


Array.prototype.ACCESS_MODULE = function(name) {
	
	 
	  for ( var x=0; x < this.length ;x++){
		
				if (this[ x ].NAME == name ) {
				
	              return  this[ x ];
					
				}
		  
	  }
	 
	
};



Array.prototype.ACCESS = function(name) {
	
	 
	  for ( var x=0; x < this.length ;x++){
		
				if (this[ x ].NAME == name ) {
				
	              return  this[ x ];
					
				}
		  
	  }
	 
	
};




//###############################################//###############################################
//###############################################//###############################################

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}
//document.getElementById("my-element").remove();

//###############################################//###############################################
//###############################################//###############################################
 
   //new part        



/* 
try {			
}
catch(e){

SYS.DEBUG.CRITICAL("Error in procedure 'CREATE_IMG' , description : " + ); 

} */


//###############################################//###############################################
//###############################################//###############################################
// ROUND NUMBER   
function round(value, decimals) {

if ( typeof value === 'object' ||  typeof decimals === 'object' ) {
	
SYS.DEBUG.WARNING( "SYS : warning for procedure 'SYS.MATH.NUMBER_ROUND'  Desciption : Replace object with string ,  this >> "+typeof value+" << must be string or number.");
	
}
else if ( typeof value === 'undefined' || typeof decimals === 'undefined') {

SYS.DEBUG.WARNING( "SYS : warning for procedure 'SYS.MATH.NUMBER_ROUND'  Desciption : arguments (value, decimals) cant be undefined ,  this >> "+typeof value+" << must be string or number.");
	
}
else {
	
return Number(Math.round(value+'e'+decimals)+'e-'+decimals);

}

}


//###############################################//###############################################
//###############################################//###############################################
// RANDOM INT FROM-TO 
function randomIntFromTo(min,max){

if ( typeof min === 'object' ||  typeof max === 'object' ) {
	
SYS.DEBUG.WARNING( "SYS : warning for procedure 'SYS.MATH.RANDOM_INT_FROM_TO'  Desciption : Replace object with string ,  this >> "+typeof min+" and "+typeof min+" << must be string or number.");
	
}
else if ( typeof min === 'undefined' || typeof max === 'undefined') {

SYS.DEBUG.WARNING( "SYS : warning for procedure 'SYS.MATH.RANDOM_INT_FROM_TO'  Desciption : arguments (min, max) cant be undefined ,  this >> "+typeof min+" and "+typeof min+"  << must be string or number.");
	
}
else {
	
	return Math.floor(Math.random()*(max-min+1)+min);

}

}
//###############################################//###############################################
//###############################################//###############################################





//###############################################//###############################################
//###############################################//###############################################
//Convert toDegrees/toRadians
//###############################################//###############################################
//###############################################//###############################################
function toDegrees (angle) {
	if (typeof angle === "string" || typeof angle === "number" ) {	
		return angle * (180 / Math.PI);
	}else{
SYS.DEBUG.WARNING( "SYS : warning for procedure 'SYS.MATH.TO_RADIANS'  Desciption : Input arr ,  angle >> "+typeof angle+"  << must be string or number.");				
	}
}
function toRadians (angle) {
	if (typeof angle === "string" || typeof angle === "number" ) {	
  return angle * (Math.PI / 180);
	}
	else{
SYS.DEBUG.WARNING( "SYS : warning for procedure 'SYS.MATH.TO_RADIANS'  Desciption : Input arr ,  angle >> "+typeof angle+"  << must be string or number.");		
	}
}
//###############################################//###############################################
//###############################################//###############################################



function ORBIT(cx, cy, angle, p )
{
  var s = Math.sin(angle);
  var c = Math.cos(angle);

  // translate point back to origin:
  p.x -= cx;
  p.y -= cy;

  // rotate point
   xnew = p.x * c - p.y * s;
   ynew = p.x * s + p.y * c;

  // translate point back:
  p.x = xnew + cx;
  p.y = ynew + cy;
  return p;
}



//###############################################//###############################################
//###############################################//###############################################
//GET PULSE VALUES IN REAL TIME
//###############################################//###############################################
//###############################################//###############################################
function OSCILLATOR (min , max , step) {

if ((typeof min === "string" || typeof min === "number" ) &&  (typeof max === "string" || typeof max === "number" ) && (typeof step === "string" || typeof step === "number" )) {	
	
	var ROOT = this;
this.min = parseFloat(min);
this.max = parseFloat(max);
this.step = parseFloat(step);
this.value_ = parseFloat(min);
this.status = 0;
this.on_maximum_value = function(){};
this.on_minimum_value = function(){};
this.UPDATE = function(STATUS_){
if (STATUS_ === undefined) {
if (this.status == 0 && this.value_ < this.max) {
this.value_ = this.value_  + this.step;
if (this.value_ >= this.max){ this.value_ = this.max ; this.status = 1;ROOT.on_maximum_value()}
return this.value_;
}
else if (this.status == 1 && this.value_ > this.min) {
this.value_ = this.value_  - this.step;
if (this.value_ <= this.min){ this.value_ = this.min ; this.status = 0;ROOT.on_minimum_value()}
return this.value_;
}
}else {
return this.value_;
}
};

}else {
	
SYS.DEBUG.WARNING( "SYS : warning for procedure 'SYS.MATH.OSCILLATOR'  Desciption : Replace object with string or number,  min >> "+typeof min+" and max >>"+typeof max+"  and step >>"+typeof step+" << must be string or number.");

}
//AUTO UPDATE HERE

}
//###############################################//###############################################
//###############################################//###############################################


//###############################################//###############################################
//###############################################//###############################################
//GET INCREMENT VALUES IN REAL TIME
//###############################################//###############################################
//###############################################//###############################################
function INCREMENTATOR (min , max , step , stop_after) {
if ((typeof min === "string" || typeof min === "number" ) &&  (typeof max === "string" || typeof max === "number" ) && (typeof step === "string" || typeof step === "number" )) {	
if (typeof stop_after != 'undefined') {
this.stop_after = stop_after;	
}else {
this.stop_after = 1;	
}
this.loops = 0;
this.min = parseFloat(min);
this.max = parseFloat(max);
this.step = parseFloat(step);
this.value_ = parseFloat(min);
this.status = 0;

this.UPDATE = function(STATUS_){

if (STATUS_ === undefined) {
if (this.status == 0 && this.value_ < this.max) {
this.value_ = this.value_  + this.step;
if (this.value_ >= this.max){ 
this.value_ = this.min;
if (this.loops == this.stop_after){
	
this.status = 1;
	
}

}
return this.value_;
}
else {
return this.value_;
}


}
};
//AUTO UPDATE HERE

}
else {
	
SYS.DEBUG.WARNING( "SYS : warning for procedure 'SYS.MATH.OSCILLATOR'  Desciption : Replace object with string or number,  min >> "+typeof min+" and max >>"+typeof max+"  and step >>"+typeof step+" << must be string or number.");

}

}

//###############################################//###############################################
//###############################################//###############################################

//###############################################//###############################################
//###############################################//###############################################
//MAKE MOVE WITH NEW TARGET COORDINATE
//###############################################//###############################################
//###############################################//###############################################
function DIMENSION (w,h , type_ ) {

var ROOT_DIMENSION = this;

if (typeof type_ == 'undefined') {

 this.type = 'REF_CANVAS';

}
else {

 this.type = type_;

}

if (typeof w === undefined){
this.W = 10;
SYS.DEBUG.WARNING( "SYS : warning for procedure new 'DIMENSION'  Desciption : arguments (w , h ) are  undefined ,  system will setup 10% of width and height.");
}else {
this.W = w;
}
if (typeof h === undefined){
this.H = 10;
SYS.DEBUG.WARNING( "SYS : warning for procedure new 'DIMENSION'  Desciption : arguments (w , h ) are  undefined ,  system will setup 10% of width and height.");
}else {
this.H = h;
}




this.WIDTH = function(){

if (ROOT_DIMENSION.type == "NORMAL"){
return window.innerWidth/100*this.W;	 
}
else if (ROOT_DIMENSION.type == "REF_CANVAS"){
	
return SYS.DOM.E( SYS.RUNNING_PROGRAMS[0] ).width/100*this.W;
	
}

 

};

this.HEIGHT = function(){


if (ROOT_DIMENSION.type == "NORMAL"){
return window.innerHeight/100*this.H;	 
}
else if (ROOT_DIMENSION.type == "REF_CANVAS"){
	
return SYS.DOM.E( SYS.RUNNING_PROGRAMS[0] ).height/100*this.H;
	
}
  
};


}
//###############################################//###############################################
//###############################################//###############################################



//###############################################//###############################################
//###############################################//###############################################
//MAKE MOVE WITH NEW TARGET COORDINATE
//###############################################//###############################################
//###############################################//###############################################
function POSITION (curentX , curentY , targetX_ , targetY_ ,  thrust_){

var ROOT=this; 
this.FREEZ = false; 

ROOT.CANVAS_ = window[SYS.RUNNING_PROGRAMS[0]].ENGINE.PROGRAM_ID;

 
this.ON_TARGET_POSITION = function(){};
 
//parameters
this.x = curentX;
this.y = curentY;
this.targetX = targetX_;
this.targetY = targetY_;
this.velX = 0;
this.velY = 0;
 
this.thrust = thrust_;
if (APPLICATION.PROGRAM.CALCULATING_POSITION_BY == 'MONITOR') {
	
this.TYPE = "NORMAL";
	
}
else if (APPLICATION.PROGRAM.CALCULATING_POSITION_BY == 'CANVAS') {

this.TYPE = "REF_CANVAS";

}

this.IN_MOVE = true;
//metods

this.SET_SPEED = function(num_){

if (typeof num_ === "number") {
this.thrust = num_;
}
else{
SYS.DEBUG.WARNING( "SYS : warning for method 'POSITION.SET_SPEED'  Desciption : arguments (w , h ) must be type of number.");
}


};


this.TRANSLATE_BY_X = function(x_){
this.IN_MOVE = true;
this.targetX = x_;
};
this.TRANSLATE_BY_Y = function(y_){
this.IN_MOVE = true;
this.targetY = y_;
};
this.TRANSLATE = function(x_,y_){
this.IN_MOVE = true;
this.targetX = x_;
this.targetY = y_;
};

this.SET_POSITION = function(x_,y_ , type_){

if (type_ == "DIAMETRIC"){
	
this.targetX =x_;
this.targetY =y_;

this.x = x_;
this.y = y_;

this.IN_MOVE = false;
}else{

this.targetX = CONVERTOR.PIX_TO_PER( x_ );
this.targetY = CONVERTOR.PIX_TO_PER( y_ );

this.x = CONVERTOR.PIY_TO_PER( x_ );
this.y = CONVERTOR.PIY_TO_PER( y_ );

this.IN_MOVE = false;	
	
	
}

 
};



this.UPDATE = function(){

if (   window[ROOT.PROGRAM_NAME].ENGINE.GAME_TYPE == "PLATFORMER" && typeof ROOT.PLAYER === 'undefined' && typeof window["PLAYER"] !== 'undefined' && PLAYER.FREEZ == false){
	
	this.thrust = 2;
	
this.IN_MOVE = true;	
this.targetX = this.targetX + PLAYER.X;
this.targetY = this.targetY + PLAYER.Y;
	 	
 }else {
	 try{
	  
    //	 this.IN_MOVE = false;
	
	 }catch(e){}
}
 
var tx = this.targetX - this.x,ty = this.targetY - this.y,dist = Math.sqrt(tx*tx+ty*ty),rad = Math.atan2(ty,tx),angle = rad/Math.PI * 180;
this.velX = (tx/dist)*this.thrust;
this.velY = (ty/dist)*this.thrust;

// stop the box if its too close so it doesn't just rotate and bounce
if (this.IN_MOVE == true){
	
  if(dist > this.thrust){
	 
	this.x += this.velX;
	this.y += this.velY;
	
	if (ROOT.SHARE_POSITION == true) {
	 MAIN_PEER.REMOTE_DATA.NEW_POSITION( window[this.parentGameObject] );
	} 
	
  }
  else{

	this.x = this.targetX;
	this.y = this.targetY; 
	this.IN_MOVE = false;
	ROOT.ON_TARGET_POSITION();
	
	if (ROOT.SHARE_POSITION == true) {
	 MAIN_PEER.REMOTE_DATA.NEW_POSITION( window[this.parentGameObject] );
	} 
	
	try{
		if (window[ROOT.PROGRAM_NAME].ENGINE.GAME_TYPE != "PLATFORMER" && APPLICATION.EDITOR == true) {
    SET_NEW_START_UP_POS( this.parentGameObject  , this.PROGRAM_NAME , this.parentModul , this.targetX , this.targetY , this.DIMENSION.W , this.DIMENSION.H );
		}
		
	}catch(e){console.log(e+":::in:::SET_NEW_START_UP_POS")}
	
   
  }

}

};

this.X = function(){
	
 /* else if (   window[ROOT.PROGRAM_NAME].ENGINE.GAME_TYPE == "PLATFORMER" && typeof ROOT.PLAYER != 'undefined'){
 if (ROOT.PLAYER == 'NORMAL_CONTROL') {
 
 }
 } */
// else{
if (ROOT.TYPE == "NORMAL"){
return window.innerWidth/100*this.x;	 
}
else if (ROOT.TYPE == "REF_CANVAS"){
	
return SYS.DOM.E(ROOT.CANVAS_).width/100*this.x;
	
}


 //}

};


this.Y = function(){
if (   window[ROOT.PROGRAM_NAME].ENGINE.GAME_TYPE == "PLATFORMER" && typeof ROOT.PLAYER === 'undefined'){
return window.innerHeight/100*this.y;
}
else{
	if (ROOT.TYPE == "NORMAL") {
		
		return window.innerHeight/100*this.y;	 
		
	}
	else if (ROOT.TYPE == "REF_CANVAS") {
		return SYS.DOM.E(ROOT.CANVAS_).height/100*this.y;	 
		
	}

}
 
};



}

 
   //new part        
//###############################################//###############################################
//  Whole preload class/procedural function 
//  Initial staff
//###############################################//###############################################

function DETECTBROWSER(){
var HREFF,HREFTXT = "unknown";
this.NAVIGATOR = navigator.userAgent;var NAV =navigator.userAgent;var gecko,navIpad,operatablet,navIphone,navFirefox,navChrome,navOpera,navSafari,navandroid,mobile,navMozilla;  
gecko=NAV.match(/gecko/gi);
navOpera=NAV.match(/opera/gi); 
operatablet=NAV.match(/Tablet/gi); 
navIpad=NAV.match(/ipad/gi); 
navIphone=NAV.match(/iphone/gi);        
navFirefox = NAV.match(/Firefox/gi);
navMozilla = NAV.match(/mozilla/gi);
navChrome = NAV.match(/Chrome/gi);
navSafari = NAV.match(/safari/gi);
navandroid = NAV.match(/android/gi);
mobile = NAV.match(/mobile/gi);  
window["TYPEOFANDROID"] = 0;
window["NOMOBILE"] = 0;

var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
              if (mobile) {
                  var userAgent = navigator.userAgent.toLowerCase();
                  if ((userAgent.search("android") > -1) && (userAgent.search("mobile") > -1))
                         console.log("ANDROID MOBILE")
                   else if ((userAgent.search("android") > -1) && !(userAgent.search("mobile") > -1))
                         console.log(" ANDROID TABLET ")
                         TYPEOFANDROID = 1;                              
                   }
                   else {NOMOBILE=1;  }
  //  FIREFOX za android 
 if(navFirefox && navandroid && TYPEOFANDROID == 0){HREFF = "#"; HREFTXT = "mobile_firefox_android"; } 
  //  FIREFOX za android T
 if(navFirefox && navandroid && TYPEOFANDROID == 1){HREFF = "#"; HREFTXT = "mobile_firefox_android_tablet"; }
 // OPERA ZA ANDROID
 if(navOpera && navandroid){HREFF = "#"; HREFTXT = "opera_mobile_android"; }// provera 
 // OPERA ZA ANDROID TABLET
 if(navOpera && navandroid && operatablet){HREFF = "#"; HREFTXT = "opera_mobile_android_tablet"; }// provera 
//  safari mobile za IPHONE - i  safari mobile za IPAD i CHROME za IPAD 
  if(navSafari){
  var Iphonesafari = NAV.match(/iphone/gi);     
  if (Iphonesafari){HREFF = "#"; HREFTXT = "safari_mobile_iphone"; }  
 else if (navIpad){ HREFF = "#"; HREFTXT = "mobile_safari_chrome_ipad"; }
 else if (navandroid){ HREFF = "#"; HREFTXT = "android_native";  } }
  // TEST CHROME 
 if(navChrome &&  navSafari  && navMozilla && TYPEOFANDROID == 1){HREFF = "#"; HREFTXT = "mobile_chrome_android_tablet"; }
 if(navChrome &&  navSafari  && navMozilla && TYPEOFANDROID == 0){HREFF = "#"; HREFTXT = "mobile_chrome_android"; }
 if(navChrome && TYPEOFANDROID == 0 ){HREFF = "#"; HREFTXT = "chrome_browser"; }
 if(navMozilla && NOMOBILE==1 && gecko && navFirefox){HREFF = "#"; HREFTXT = "firefox_desktop"; } 
 if( navOpera && TYPEOFANDROID == 0 && !mobile){HREFF = "#"; HREFTXT = "opera_desktop"; }
 
 this.NAME  = HREFTXT;
 this.NOMOBILE = NOMOBILE;
}
//###############################################//###############################################
//###############################################//###############################################




//###############################################//###############################################
//###############################################//###############################################
// Load script in runtime
//###############################################//###############################################
//###############################################//###############################################
var SCRIPT = {
 SCRIPT_ID : 0 , 
 SINHRO_LOAD : {},
 LOAD : function addScript( src ) {
  var s = document.createElement( 'script' );
  s.onload = function() {
  
  
  SCRIPT.SCRIPT_ID++;
  console.log("Script id loaded : " + SCRIPT.SCRIPT_ID + " with src : " + this.src + ">>>>>>>>>" + this.src);
  
  var filename = this.src.substring(this.src.lastIndexOf("/") + 1, this.src.lastIndexOf("."));
  //console.log(filename)
  filename = filename.replace(".","_");
  eval('try{SCRIPT.SINHRO_LOAD._'+filename+'(s)}catch(e){}' );
  
  
  
  };
  s.setAttribute( 'src', src );
  document.body.appendChild( s );
}
};
//###############################################//###############################################
//###############################################//###############################################

//validate string for email 
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}



//###############################################//###############################################
//###############################################//###############################################
// LOGGER
//###############################################//###############################################
//###############################################//###############################################
function LOG (){
	 
	 this.ENABLE = true;
	 
	 this.LOG = function(data){
		 
		 if ( this.ENABLE == true ){
			 
			 console.log('%c' + data , 'background: #333; color: lime');
			 
		 }
		 
	 };
	 
	 this.WARNING = function(data){
		 
		 if ( this.ENABLE == true ){
			 
			 console.log('%c Warning : ' + data , 'background: #333; color: yellow');
			 
		 }
		 
	 };
	 
	 
	 this.CRITICAL = function(data){
		 
		 if ( this.ENABLE == true ){
			 
			 console.log('%c Critical : ' + data , 'background: #333; color: red');
			 
		 }
		 
	 };
	 
	 this.NETWORK_LOG = function(data){
		 
		 if ( this.ENABLE == true ){
			 
			 console.log('%c Network view : ' + data , 'background: #333; color: #a7afaf');
			 
		 }
		 
	 };
	 
	 

 }
//###############################################//###############################################
//###############################################//###############################################


//###############################################//###############################################
//###############################################//###############################################
// IMAGE OBJECT CREATOR
//###############################################//###############################################
//###############################################//###############################################
function CREATE_IMG(name , src){
	
	window["image_"+name] = new Image();
	window["image_"+name].src = src;
	window["image_"+name].onload = function(){SYS.RES.SUM_OF_LOADED_IMAGES++;}

	
}


//###############################################//###############################################
//###############################################//############################################### 
 //webcam check
 
var webcamError = function(e) {
		alert('Webcam error!', e);
};
	
 function test_webcam_device() {
 	function hasGetUserMedia() {
		return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia || navigator.msGetUserMedia);
	}
	if (hasGetUserMedia()) {
     console.log("webcam operartion support");
	 return true;
	} else {
	console.log("webcam operartion faild");
	 return false;
	}
}

function SET_STREAM (video) {

if (navigator.getUserMedia) {

navigator.getUserMedia({audio: true, video: true}, function(stream) {
video.src = stream;
//initialize();

}, webcamError);
} else if (navigator.webkitGetUserMedia) {

navigator.webkitGetUserMedia({audio: true, video: true}, function(stream) {
video.src = window.URL.createObjectURL(stream);

// initialize();

}, webcamError);
} 
else {alert("webcam broken.");}

}

function initialize() {
	if (!AudioContext) {
		alert("AudioContext not supported!");
	}
	else {
		  loadSounds();
	}
}

function CREATE_MOTION_PARAMETERS (ROOT_GAME_OBJECT) {

	 window["notesPosY"]=[];
	 window["notesPosX"]=[]; 
	 
	 
 
	 
	 for (var j=0;j<ROOT_GAME_OBJECT.WEBCAM.numFieldV;j++) {
	 for (var d=0;d<ROOT_GAME_OBJECT.WEBCAM.numFieldH;d++) {
	 ROOT_GAME_OBJECT.WEBCAM._N_.push("0"); 

	 if (d==0) {
	 //notesPosX.push(  ROOT_GAME_OBJECT.POSITION.X()  );
	 notesPosX.push( 0  );
	 }
	 else { //notesPosX
	 notesPosX.push(  d* ROOT_GAME_OBJECT.WEBCAM.BLEND_CANVAS.width/8  );
	 }
	 
	 if (j==0) {
	 notesPosY.push(0);
	 }
	 else {
	 //notesPosY.push(   ROOT_GAME_OBJECT.POSITION.X() +  j* ROOT_GAME_OBJECT.DIMENSION.WIDTH()/8 );
	 notesPosY.push(  j* ROOT_GAME_OBJECT.WEBCAM.BLEND_CANVAS.width/8 );
	 }
	  
	 }
 

	 }
 
}

function CREATE_MOTION_FIELDS (ROOT_GAME_OBJECT){
var source = "test";

var sum = ROOT_GAME_OBJECT.WEBCAM.numFieldV*ROOT_GAME_OBJECT.WEBCAM.numFieldH;

for (var i=0;  i<sum; i++) {

var note = {
note: source,
ready: true,
visual: "test2"
}; 
note.area = {x:notesPosX[i], y:notesPosY[i], width: ROOT_GAME_OBJECT.WEBCAM.BLEND_CANVAS.width/8 , height:ROOT_GAME_OBJECT.WEBCAM.BLEND_CANVAS.height/8 };
ROOT_GAME_OBJECT.WEBCAM.NOTES.push(note); 

}



}


window["ARRAY_SOUND"] = [];
for (var s=0 ; s<1; s++) {
ARRAY_SOUND.push('sounds/note1.mp3');
}
	
function loadSounds() {
soundContext = new AudioContext();
bufferLoader = new BufferLoader(soundContext,ARRAY_SOUND
,
finishedLoading
);
bufferLoader.load();
}

function finishedLoading(bufferList) {
/* var source = soundContext.createBufferSource();

source.buffer = bufferList[0];

source.connect(soundContext.destination);
 */
}

function playSound(obj) {
if (!obj.ready) return;
var source = soundContext.createBufferSource();
source.buffer = obj.note.buffer;
source.connect(soundContext.destination);
source.noteOn(0);
obj.ready = false;
// throttle the note
setTimeout(setNoteReady, 400, obj);
}

function setNoteReady(obj) {
obj.ready = true;
}

var lastImageData;

	function blend( GO ,  s  ) {
		//var width = DIMENSION.WIDTH();
		//var height = DIMENSION.HEIGHT();
		//ROOT_GAME_OBJECT.WEBCAM.BS
		
		var width = GO.WEBCAM.BLEND_CANVAS.width;
		var height = GO.WEBCAM.BLEND_CANVAS.width;
		
		
		// s.drawImage(GO.WEBCAM.VIDEO , GO.POSITION.X() , GO.POSITION.Y() , width, height);
		GO.WEBCAM.RC.drawImage(GO.WEBCAM.VIDEO , 0 , 0 , width, height);
		
		// get webcam image data
		//var sourceData = s.getImageData( GO.POSITION.X() , GO.POSITION.Y() , width, height);
		var sourceData = GO.WEBCAM.RC.getImageData( 0,0, width, height);
		// create an image if the previous image doesn’t exist
		//if (!lastImageData) lastImageData = s.getImageData(POSITION.X(), POSITION.Y(), width, height);
		//if (!lastImageData) lastImageData = s.getImageData(GO.POSITION.X() , GO.POSITION.Y(), width, height);
		if (!lastImageData) lastImageData = GO.WEBCAM.RC.getImageData(0,0, width, height);
		// create a ImageData instance to receive the blended result
		var blendedData = GO.WEBCAM.RC.createImageData(width, height);
		// blend the 2 images
		differenceAccuracy(blendedData.data, sourceData.data, lastImageData.data);
		// draw the result in a canvas
		GO.WEBCAM.BS.putImageData(blendedData, 0,0 );
		// store the current webcam image
		lastImageData = sourceData;
	}
	
	function fastAbs(value) {
		// funky bitwise, equal Math.abs
		return (value ^ (value >> 31)) - (value >> 31);
	}

	function threshold(value) {
		return (value > 0x15) ? 0xFF : 0;
	}

	function difference(target, data1, data2) {
		// blend mode difference
		if (data1.length != data2.length) return null;
		var i = 0;
		while (i < (data1.length * 0.25)) {
			target[4*i] = data1[4*i] == 0 ? 0 : fastAbs(data1[4*i] - data2[4*i]);
			target[4*i+1] = data1[4*i+1] == 0 ? 0 : fastAbs(data1[4*i+1] - data2[4*i+1]);
			target[4*i+2] = data1[4*i+2] == 0 ? 0 : fastAbs(data1[4*i+2] - data2[4*i+2]);
			target[4*i+3] = 0xFF;
			++i;
		}
	}

	function differenceAccuracy(target, data1, data2) {
		if (data1.length != data2.length) return null;
		var i = 0;
		while (i < (data1.length * 0.25)) {
			var average1 = (data1[4*i] + data1[4*i+1] + data1[4*i+2]) / 3;
			var average2 = (data2[4*i] + data2[4*i+1] + data2[4*i+2]) / 3;
			var diff = threshold(fastAbs(average1 - average2));
			target[4*i] = diff;
			target[4*i+1] = diff;
			target[4*i+2] = diff;
			target[4*i+3] = 0xFF;
			++i;
		}
	}

	function checkAreas( ROOT_GAME_OBJECT ) {
	
 
	
		// loop over the note areas
		for (var r=0; r<ROOT_GAME_OBJECT.WEBCAM.numFieldV*ROOT_GAME_OBJECT.WEBCAM.numFieldH; ++r) {
			// get the pixels in a note area from the blended image
			//var blendedData = BS.getImageData(notes[r].area.x, notes[r].area.y, notes[r].area.width, notes[r].area.height);
			var blendedData = ROOT_GAME_OBJECT.WEBCAM.BS.getImageData(ROOT_GAME_OBJECT.WEBCAM.NOTES[r].area.x, ROOT_GAME_OBJECT.WEBCAM.NOTES[r].area.y, ROOT_GAME_OBJECT.WEBCAM.NOTES[r].area.width, ROOT_GAME_OBJECT.WEBCAM.NOTES[r].area.height);
			
			var i = 0;
			var average = 0;
			while (i < (blendedData.data.length * 0.25)) {
				average += (blendedData.data[i*4] + blendedData.data[i*4+1] + blendedData.data[i*4+2]) / 3;
				++i;
			}

			average = Math.round(average / (blendedData.data.length * 0.25));
			if (average > 10) {

				ROOT_GAME_OBJECT.WEBCAM._N_[r] = "1";
				__DESTROY___(r , ROOT_GAME_OBJECT.WEBCAM._N_);
				WEB_CAM_NUI_MAP(r , ROOT_GAME_OBJECT.WEBCAM._N_ );
				
			}
		}
	}

	
	function __DESTROY___(index , _N_){
	var _N_ = _N_;
   window["T"+index] = setTimeout(function(){ _N_[index] = "0"; }, 1333);
    }


function WEBCAM_DRAW(NUI_SURF , WEBCAM )  {
	 
	if (this.HIDE_INDICATED_POINT == false){
	 
  var a=0;
  for(var i=0;i<WEBCAM.numFieldH*WEBCAM.numFieldV;i++){
  try{
  
 if (WEBCAM._N_[i] == "0") {
	 
 if (a > 12){ 
 window["NIK"].SET(notesPosX[i],notesPosY[i] );
 }
 
 a=0;
 
 NUI_SURF.fillStyle="red";
 NUI_SURF.strokeStyle ="blue";

  NUI_SURF.fillText("point " + i , notesPosX[i],notesPosY[i] , 44 , 44 );
  
 if (i == 10) {
 NUI_SURF.fillText("Rotate  ", notesPosX[i],notesPosY[i] , 44 , 44 );
 }
 if (i == 13) {
 NUI_SURF.fillText("Forward  ", notesPosX[i],notesPosY[i] , 44 , 44 );
 }
 if (i == 15) {
 NUI_SURF.fillText("Attack  ", notesPosX[i],notesPosY[i] , 44 , 44 );
 }
 if (i == 47) {
 NUI_SURF.fillText("Clear  ", notesPosX[i],notesPosY[i] , 44 , 44 );
 }
  
 }
//###############################
 else
 {//ACTIVE
 //###############################
 
 a++;
 //ACTIVE
 NUI_SURF.fillStyle="blue";
 NUI_SURF.strokeStyle ="red";
  
 NUI_SURF.strokeRect(notesPosX[i],notesPosY[i] , 44 , 44 );
 if (i == 10) {
 NUI_SURF.fillText("Rotate  ", notesPosX[i],notesPosY[i] , 44 , 44 );
 }
 if (i == 13) {
 NUI_SURF.fillText("Forward  ", notesPosX[i],notesPosY[i] , 44 , 44 );
 }
 if (i == 15) {
 NUI_SURF.fillText("Attack  ", notesPosX[i],notesPosY[i] , 44 , 44 );
 }
 if (i == 47) {
 NUI_SURF.fillText("Clear  ", notesPosX[i],notesPosY[i] , 44 , 44 );
 }
 
 }
  
 }catch(e){ }

 
 }
  
  
}
  
}

//###############################################//###############################################
//###############################################//############################################### 
 
 

 
 
 
//###############################################//###############################################
//###############################################//###############################################
// DOM and window operation
//###############################################//###############################################
//###############################################//###############################################
function DOM()
{
	
this.E = function(id) { return document.getElementById(id); };
this.ACCESS_IFRAME = function(name){return document.getElementById(name).contentWindow;};
this.GOTO = function(url_){location.assign(url_)};


this.UPLOAD_FILE = function(id_ , onchange){
	

    var x = document.createElement("INPUT");
    x.setAttribute("type", "file");
	x.setAttribute("id", id_ );
	x.setAttribute("style", "display:block;" );
	document.getElementById('UPLOAD_BOX').appendChild(x);
	
	window["FILE_" + id_] = document.getElementById(id_);
	
	window["FILE_" + id_].onchange = function(){
		
		
		SYS.DEBUG.LOG("New file comes...");
		
	};
	
	if (typeof onchange !== 'undefined') {
		
	window["FILE_" + id_].onchange = onchange;
		
	}
	
    //document.body.appendChild(x);

	
	
};


//###############################################//###############################################
this.CREATE_SURFACE =  function ( ctx , name_of_canvas , w , h , resizeType ){

this.c=document.getElementById(name_of_canvas);

if (typeof resizeType === 'undefined' || resizeType == 'DIAMETRIC') {

this.RESIZE_TYPE = 'DIAMETRIC';

this.W_PIX =  w ;
this.H_PIX =  h ;

this.c.width = CONVERTOR.PER_TO_PIX( this.W_PIX );
this.c.height = CONVERTOR.PER_TO_PIY( this.H_PIX );


}else if(resizeType == 'FIXED' ) {

this.RESIZE_TYPE = 'FIXED';

}else {

this.RESIZE_TYPE = 'DIAMETRIC';

}		



//c.width = w;c.height = h;

window[ctx]=this.c.getContext("2d");
SYS.DEBUG.LOG("SYS : Surface created , program name is " + name_of_canvas);
SYS.RUNNING_PROGRAMS.push(name_of_canvas);
//
window[name_of_canvas] = new PROGRAM(window[ctx] , this.c);
window[name_of_canvas].DRAW()

};
//###############################################//###############################################




//###############################################//###############################################
// Destroy DOM element
this.removeElement  = function (parentDiv, childDiv){

if (typeof childDiv == 'undefined') {

console.log("remove now")
document.body.removeChild(  parentDiv );

}
else if (document.getElementById(childDiv)) {     
var child = document.getElementById(childDiv);
var parent = document.getElementById(parentDiv);
parent.removeChild(child);
parent.style.zIndex = 0;
parent.style.display = "none";
}
else {  
return false;
}
}
//###############################################//###############################################




//###############################################//###############################################
this.DESTROY_PROGRAM = function(name){
	
	if ( typeof  name === 'undefined' ){
	
	SYS.DEBUG.WARNING( "SYS : warning for procedure 'SYS.DOM.DESTROY_PROGRAM'  Desciption : arrg name :>> " +typeof name+" << not valid." );
	
	}
	else if (typeof window[name] === 'undefined'){
	
	SYS.DEBUG.WARNING( "SYS : warning for procedure 'SYS.DOM.DESTROY_PROGRAM'  Desciption : program with  name: " +name+" not exist. " );
	
	}
	else {
	
	//memory memory memory
	window[name].DRAW = function(){};
	window[name].UPDATE = function(){};
	window[name].DRAW_INTERVAL = undefined;
    window[name].UPDATE_INTERVAL = undefined;
	window[name].AUTO_UPDATE = [];
	window[name].AUTO_UPDATE = undefined;
	window[name] = undefined;
	delete window[name];
	
	//remove dom element canvas
	//this.removeElement(SYS.DOM.E(name));
	
	SYS.RUNNING_PROGRAMS.unset(name);
	
	SYS.DEBUG.LOG( "SYS : log for procedure 'SYS.DOM.DESTROY_PROGRAM'  Desciption : program with  name :" + name + " is dead. Memory clear .");
	
	}
	
};
//###############################################//###############################################


//###############################################//###############################################
// Fullscreen code
this.LANCH_FULLSCREEN=function(element){
  if(element.requestFullscreen) 
  {
    element.requestFullscreen();
  }
  else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  }
  else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
  else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
};


this.EXIT_FULLSCREEN=function() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
};


this.FS_FLAG = 0;

//Execute func switch
this.FULL_SCREEN = function(){

if (this.FS_FLAG == 0 ) {
this.LANCH_FULLSCREEN(document.documentElement);
this.FS_FLAG = 1;
}else if (this.FS_FLAG == 1) {
this.EXIT_FULLSCREEN();
this.FS_FLAG = 0;
}
};
//###############################################//###############################################



}
//###############################################//###############################################
//###############################################//###############################################


var lineLength = function(x, y, x0, y0){
    return Math.sqrt((x -= x0) * x + (y -= y0) * y);
};


/*
(function() {
	
}());
*/

var PAGE = {

	SET_ICON : function(SRC){
		
    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
	//SRC
    //link.href = 'http://www.stackoverflow.com/favicon.ico';
	link.href = 'favicon.png';
    document.getElementsByTagName('head')[0].appendChild(link);
	
	},
	
	ANIMATE_ICON : null ,
	
	ANIMATE : function(){
		
		//this.ANIMATE_ICON = setInterval(function(){
			
			
		//},200);
		
		
		
	},
	
	
	
};



//###############################################//###############################################
//###############################################//###############################################
// LOCAL STORAGE OPERATION
//###############################################//###############################################
//###############################################//###############################################
function LS_SET(name,value){
localStorage.setItem(name, value);
}

function LS_GET(name){
return localStorage.getItem(name);
}


// Put the object into storage
function SAVE(name , obj){
localStorage.setItem( name, JSON.stringify(obj));
console.log(JSON.stringify(obj))
}
// Retrieve the object from storage
function LOAD(name){
if ( localStorage.getItem(name) == 'undefined' ||  localStorage.getItem(name) == null || localStorage.getItem(name) == "") {
	SYS.DEBUG.WARNING('error in loading localstorage object! name of object : name' + name + " , but value is " + localStorage.getItem(name) );
	return false;
}
else {
return JSON.parse(localStorage.getItem(name));
}

}


//###############################################//###############################################
//###############################################//###############################################		




//###############################################//###############################################
//###############################################//###############################################		
//  FILES OPERATION 
//###############################################//###############################################
//###############################################//###############################################		
function readXML(path , operation ){

var ROOT = this;
	
if (window.XMLHttpRequest) {
	ROOT.xmlhttpGA=new XMLHttpRequest();
	}
ROOT.xmlhttpGA.open("GET",path,true);  
ROOT.xmlhttpGA.send();

 ROOT.DONE = function(){
	 
	 return ROOT.RESPONSE;
 };
 ROOT.RESPONSE = '';

ROOT.xmlhttpGA.onreadystatechange= function() {
	
    if (this.readyState!==4) return;
    if (this.status!==200) return; // or whatever error handling you want
	
	
if (typeof operation === 'undefined' ) {

	ROOT.RESPONSE = this.responseText;
	ROOT.DONE()
    //return this.responseText;

}else if (operation == "CONVER_TO_OBJ" ) {
 
	return xmlToJson(this.responseXML);

}
else{

 ROOT.DONE()
 ROOT.RESPONSE = this.responseText;
//return this.responseText;	
	
}
	
	
	
//    console.log( this.responseText );
};
 


 //return xmlhttpGA.onreadystatechange();

}



function xmlToJson(xml) {
	
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	
	
	  var private_call = JSON.stringify( obj );
	  private_call.replace("#text" , "text"); // Fix literal # symbol
	  
	  return JSON.parse(private_call);
	//return obj;
	
	
};
//###############################################//###############################################
//###############################################//###############################################		








//###############################################//###############################################
//###############################################//###############################################
// MONITOR AND BROWSER_VIEW- COORDINATE SYSTEM
//###############################################//###############################################
//###############################################//###############################################
function MONITOR(){


	
}


var VIEW = {

 W :  function(per){
		
	if (typeof per === 'undefined'){
		return window.innerWidth;
	}else{
		return window.innerWidth/100 * per;
	}
	
 },
 H :  function(per){
		
	if (typeof per === 'undefined'){
		return window.innerHeight;
	}
	else{
		return window.innerHeight/100 * per;
	}
	
},
 
ASPECT : function(){

	return window.innerWidth / window.innerHeight;

},
 
};
//###############################################//###############################################
//###############################################//###############################################

function OVERRIDE_TO_REF_CANVAS(){
	
	
	
	VIEW = {

 W :  function(per){
		
	if (typeof per === 'undefined'){
		return SYS.DOM.E(SYS.RUNNING_PROGRAMS[0]).width;
	}else{
		return SYS.DOM.E(SYS.RUNNING_PROGRAMS[0]).width/100 * per;
	}
	
 },
 H :  function(per){
		
	if (typeof per === 'undefined'){
		return SYS.DOM.E(SYS.RUNNING_PROGRAMS[0]).height;
	}
	else{
		return SYS.DOM.E(SYS.RUNNING_PROGRAMS[0]).height/100 * per;
	}
	
},
 
ASPECT : function(){

	return SYS.DOM.E(SYS.RUNNING_PROGRAMS[0]).width / SYS.DOM.E(SYS.RUNNING_PROGRAMS[0]).height;

},
 
};

// override CONVERTOR
CONVERTOR = {

 PER_TO_PIX : function(v  ){
 
var ONE_PERCENT = SYS.DOM.E(SYS.RUNNING_PROGRAMS[0]).width/100;     
return v*ONE_PERCENT;
 
 },
 
 PIX_TO_PER : function(v){

 var ONE_PERCENT = SYS.DOM.E(SYS.RUNNING_PROGRAMS[0]).width/100;    
 return v/ONE_PERCENT;
  
 },
 
 
 PER_TO_PIY : function(v  ){
 
var ONE_PERCENT = SYS.DOM.E(SYS.RUNNING_PROGRAMS[0]).height/100;     
return v*ONE_PERCENT;
 
 },
 
 PIY_TO_PER : function(v){

 var ONE_PERCENT = SYS.DOM.E(SYS.RUNNING_PROGRAMS[0]).height/100;    
 return v/ONE_PERCENT;
  
 },
 
 
 

};



	
}


//###############################################//###############################################
//###############################################//###############################################
// percents to pixel convert
//###############################################//###############################################
//###############################################//###############################################
var  CONVERTOR = {

 PER_TO_PIX : function(v  ){
 
var ONE_PERCENT = window.innerWidth/100;     
return v*ONE_PERCENT;
 
 },
 
 PIX_TO_PER : function(v){

 var ONE_PERCENT = window.innerWidth/100;    
 return v/ONE_PERCENT;
  
 },
 
 
 PER_TO_PIY : function(v  ){
 
var ONE_PERCENT = window.innerHeight/100;     
return v*ONE_PERCENT;
 
 },
 
 PIY_TO_PER : function(v){

 var ONE_PERCENT = window.innerHeight/100;    
 return v/ONE_PERCENT;
  
 },
 
 
 

};
//###############################################//###############################################
//###############################################//###############################################


function remove_last(str){return str.slice(0, -1)}


var DEEP_COPY = {
    //public method
    getCloneOfObject: function(oldObject) {
        var tempClone = {};

        if (typeof(oldObject) == "object")
            for (prop in oldObject)
                // for array use private method getCloneOfArray
                if ((typeof(oldObject[prop]) == "object") &&
                                (oldObject[prop]).__isArray)
                    tempClone[prop] = this.getCloneOfArray(oldObject[prop]);
                // for object make recursive call to getCloneOfObject
                else if (typeof(oldObject[prop]) == "object")
                    tempClone[prop] = this.getCloneOfObject(oldObject[prop]);
                // normal (non-object type) members
                else
                    tempClone[prop] = oldObject[prop];

        return tempClone;
    },

    //private method (to copy array of objects) - getCloneOfObject will use this internally
    getCloneOfArray: function(oldArray) {
        var tempClone = [];

        for (var arrIndex = 0; arrIndex <= oldArray.length; arrIndex++)
            if (typeof(oldArray[arrIndex]) == "object")
                tempClone.push(this.getCloneOfObject(oldArray[arrIndex]));
            else
                tempClone.push(oldArray[arrIndex]);

        return tempClone;
    }
};



function SOUND (duration , fref){

	var audio = new window.AudioContext();
	var osc = audio.createOscillator();
	osc.frequency.value = fref;
	osc.connect(audio.destination);
	osc.start(0);

	setTimeout(function(){
	osc.stop();
	audio.close();
	audio = null;
	osc =null;
	delete osc;
    delete audio;	
	}, duration );

}

	
	
var RESOURCE = new Object();
RESOURCE.SUM = 0;


function drawRotatedImage(image, x, y, angle , w  , h , surf ) { 
 
	surf.save(); 
	surf.translate(x + w/2 , y + h/2);
	surf.rotate(angle);
	if (typeof image !== 'undefined') {
	surf.drawImage(image, -(w/2), -(h/2) , w , h );
	}
	surf.restore(); 
	
}



 
function drawRotatedText( s , text, x, y, angle , w , h ) { 
 
	SURF.save(); 
	SURF.rotate(SYS.MATH.TO_RADIANS(angle)); 
	SURF.fillText(text, x + (w/2), y +(h/2) ,w );
	SURF.restore(); 
	
}
 
 
function roundedRect(SURF,t, x,y,width,height,radius , color , type , strokeColor){
SURF.save()
if (type == 'stroke')
{
SURF.strokeStyle = strokeColor;
}
else{
SURF.fillStyle = color;
}
SURF.beginPath();
SURF.moveTo(x,y+radius);
SURF.lineTo(x,y+height-radius);
SURF.quadraticCurveTo(x,y+height,x+radius,y+height);
SURF.lineTo(x+width-radius,y+height);
SURF.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
SURF.lineTo(x+width,y+radius);
SURF.quadraticCurveTo(x+width,y,x+width-radius,y);
SURF.lineTo(x+radius,y);
SURF.quadraticCurveTo(x,y,x,y+radius);
if (type == 'stroke'){   SURF.stroke(); }else{
SURF.fill();
}
SURF.restore()  
}



window.oncontextmenu = function ()
{
    return false;// cancel default menu
}	


///////////////////////
//////////////////////
// Performance off cpu
/////////////////////
 
 
var cpu_canvas_power = 
{
    CPU_SPEED : 0,
    array_of_res : [], 
    end_count : 0,
	count_frames : 0 , 
	begin : null,
    getSec : function(){ 
		cpu_canvas_power.begin = new Date().getSeconds();
	},
	
	checkForCount : function(){
	
	   if (cpu_canvas_power.begin == null) 
	   {
			cpu_canvas_power.getSec()
	   }
	   else if (cpu_canvas_power.begin == new Date().getSeconds()  &&  cpu_canvas_power.end_count == 0 ) {
	   
	   }
	   else if (  ( cpu_canvas_power.begin + 1 ) == new Date().getSeconds()   &&  cpu_canvas_power.end_count < 2 ) {
	   
	    cpu_canvas_power.count_frames++;	
		
	   if (cpu_canvas_power.end_count == 0) {
	       cpu_canvas_power.end_count++;
	   }
	   
	   }
	   else {
	    
		 if (cpu_canvas_power.array_of_res.length < 5) {
		 if (cpu_canvas_power.count_frames != 0){
		 cpu_canvas_power.array_of_res.push(cpu_canvas_power.count_frames) }
		 cpu_canvas_power.count_frames = 0;
		 cpu_canvas_power.end_count = 0;
		 cpu_canvas_power.begin = null;
		 }
		 else {
				var sum = 0;
				for( var i = 0; i < cpu_canvas_power.array_of_res.length; i++ ){
				sum += parseInt( cpu_canvas_power.array_of_res[i]  );  
				}
				cpu_canvas_power.CPU_SPEED = sum/cpu_canvas_power.array_of_res.length;
				console.log( "cpu SPEED : " + cpu_canvas_power.CPU_SPEED );
		 }
			   
	   }
	  
	},
};
/////////////////////
////////////////////






 
   //new part        
//###############################################//###############################################
//###############################################//###############################################
// INSTANCES CLASSES FOR SYSTEM BIZNIS
//###############################################//###############################################
//###############################################//###############################################
 
function RIGHT_MENU_BUTTON (text , Y_OFFSET , id , res)
{
		var ROOT = this;
		 
		this.IAM = id;
		this.HOVER = false;
		this.Y_OFFSET = Y_OFFSET;
		this.text = text;
		
		this.icon = null;
		if (typeof res != 'undefined'){

		 var locName = "system_" + this.IAM.toString();
		 SYS.RES.CREATE_IMG(  locName , res );
		 this.icon = true;
		 
		}
		
		this.POSITION = {
		
		x : 0 , 
		y : 0 ,
		
		X : function(){
			
			return ROOT.POSITION.x;
			
			},
		Y : function(){
			
			return ROOT.POSITION.y + ROOT.Y_OFFSET;
			
			},
		
		}, 	
		this.DIMENSION = new DIMENSION(12 , 2 ) ;

		
		this.TAP = function(){};
		
}


//###############################################//###############################################
//###############################################//############################################### 
   //new part        
/**

ANIMATION CLASS

*/

function ANIMATION (  surf ,TYPE_, FrameIndex ,source , PARENT , ID , blink_ , min_ , max_ , step , speed_ , opacity_  ){

var SURFACE = surf;
this.TYPE = TYPE_;
this.DRAW_TYPE  = "PARENT";

this.ROTATE = {
	
	ENABLE : true , 
	ANGLE :  0//new SYS.MATH.OSCILLATOR(0, 360 , 0.1)
	
};


if (speed_ !== undefined) {
this.speed = speed_;
this.initial_speed = speed_;
}else {
this.speed = null;
}

if ( blink_ == "yes" ){
this.blink = new OSCILLATOR(min_ , max_ , step);
}else {
this.blink = null;
}

if(ID === undefined){
var local1=SYS.MATH.RANDOM_INT_FROM_TO(1,666);var local2=SYS.MATH.RANDOM_INT_FROM_TO(666,1234);
this.ID = "ID" + ( local1 + local2 ) + local2*66;
}else {this.ID = ID;}


// Add offset 
this.X = function() { return  PARENT.POSITION.X() };
this.Y = function() { return  PARENT.POSITION.Y();};

this.W = function() { return PARENT.DIMENSION.WIDTH() }
this.H = function() { return  PARENT.DIMENSION.HEIGHT() }

// OK
for(var x=0;x<source.source.length;x++){
window["f_"+this.ID + x] = new Image();

if (APPLICATION.IMAGE_LOADER_PREFIX == true) {
window["f_"+this.ID + x].src = "res/animations/" + source.source[x];
}else{
window["f_"+this.ID + x].src = source.source[x].toString();	
}

window["f_"+this.ID + x].onload = function(){SYS.RES.SUM_OF_LOADED_IMAGES++;}
}


this.NUMBERS_OF_FRAMES = source.source.length;
if (FrameIndex == null){this.CURRENT_FRAME = 0;}else{this.CURRENT_FRAME = FrameIndex;}


this.SET_SPEED = function(new_speed){

if (typeof new_speed !== 'undefined' && typeof new_speed != null || typeof new_speed != 'number' ) {
this.initial_speed = new_speed;
}else {
 SYS.DEBUG.WARNING(" SPEED ARRGS must be number ."  );
}

};



this.DRAW = function( image_frame , x_ , y_ , w_ , h_ , blink_status){
//##################################################
if (blink_status == "yes"  ) {SURFACE.globalAlpha = Math.sin(this.blink.get());}
//##################################################

//##################################################
if (this.TYPE == "LOOP") {
//##################################################

if ( this.DRAW_TYPE  = "PARENT" ){

if ( this.ROTATE.ENABLE == false ) {
SURFACE.drawImage( window["f_"+this.ID + this.CURRENT_FRAME] , this.X()  , this.Y() , this.W() , this.H() );
}
else{
drawRotatedImage( window["f_"+this.ID + this.CURRENT_FRAME]  , this.X() , this.Y()  , SYS.MATH.TO_RADIANS( this.ROTATE.ANGLE ) , this.W()  , this.H() , SURFACE);
}

}
else if ( this.DRAW_TYPE  = "DIRECT"  ){

SURFACE.drawImage( window["f_"+this.ID + image_frame ] , x_  , y_ , w_ , h_ );

}else 
{
console.log("error in draw loop , class animator " + this.ID + this.CURRENT_FRAME + " <<<<<<<<<<<<<<<<<");
}

if (this.CURRENT_FRAME < this.NUMBERS_OF_FRAMES -1){

if (this.speed ==null) {this.CURRENT_FRAME++;}
else {

if (this.speed > 0) {this.speed--;}
else {this.CURRENT_FRAME++;this.speed = this.initial_speed;}

}

}

else{
this.CURRENT_FRAME = 0;
}


}
//#####################################
else if (this.TYPE == "DRAW_FRAME") 
//#####################################
{
if ( this.DRAW_TYPE  = "PARENT" && this.CURRENT_FRAME<this.NUMBERS_OF_FRAMES){
if ( this.ROTATE.ENABLE == false ) {
SURFACE.drawImage( window["f_"+this.ID + this.CURRENT_FRAME] , this.X()  , this.Y() , this.W() , this.H() );
}
else{
drawRotatedImage( window["f_"+this.ID + this.CURRENT_FRAME]  , this.X() , this.Y()  , SYS.MATH.TO_RADIANS( this.ROTATE.ANGLE ) , this.W()  , this.H() , SURFACE);
}
}
else if ( this.DRAW_TYPE  = "DIRECT" && this.CURRENT_FRAME<this.NUMBERS_OF_FRAMES ){
SURFACE.drawImage( window["f_"+this.ID + image_frame] , this.X()  , this.Y() , this.W() , this.H() );
}else {
SYS.DEBUG.WARNING("error in animation draw procedure , class animator says : type is DRAW FRAME . this is id : " + this.ID + ">>>may be > this.CURRENT_FRAME<this.NUMBERS_OF_FRAMES is not true , Also DRAW_TYPE must be PARENT or DIRECT!");
}
}
SURFACE.globalAlpha = 1;
}; 



} 
   //new part        
//###############################################//###############################################
//###############################################//###############################################
// CLASSES 
//###############################################//###############################################
//###############################################//###############################################

function RECT ( TEXT ,ROOT_GAME_OBJECT ,radius , color , colorText ){

//default values by init
//this.FOCUS = false;

this.TEXT_ANGLE = 0;
this.TEXT_COLOR = colorText;
this.TEXT_ALIGN = "center";
this.TEXT = TEXT;
this.EDIT = true;
this.BACKGROUND_OPACITY = 0.5;
this.TEXT_OPACITY = 1;
this.textBaseline = 'middle';
this.POSITION = ROOT_GAME_OBJECT.POSITION;
this.DIMENSION = ROOT_GAME_OBJECT.DIMENSION;
this.x = function(){return POSITION.X()}; 
this.y = function(){return POSITION.Y()}; 
this.width = function(){return this.DIMENSION.WIDHT()}; 
this.height= function(){return this.DIMENSION.HEIGHT()}; 
this.radius= parseFloat(radius);
this.color  = color;
this.border_color = "rgba(121,121,222,0.8)";
this.border_on_focus_color = "blue";
this.border_on_focus_width_line = 5;
this.font = "40px Arial";

this.DRAW = function(s){

s.save()	

s.globalAlpha  = this.BACKGROUND_OPACITY;
roundedRect(s, "" , this.POSITION.X(),this.POSITION.Y(),this.DIMENSION.WIDTH(),this.DIMENSION.HEIGHT(), this.radius , this.color);

s.textBaseline = this.textBaseline;

if (ROOT_GAME_OBJECT.FOCUS == true){	
s.lineWidth =  this.border_on_focus_width_line;
s.fillStyle = this.border_on_focus_color;
roundedRect(s,"" , this.POSITION.X(),this.POSITION.Y(),this.DIMENSION.WIDTH(),this.DIMENSION.HEIGHT(), this.radius , this.color , "stroke" , this.border_color );
}
else {
	
s.lineWidth =  this.border_width_line;
s.fillStyle = this.border_color;
roundedRect(s,"" , this.POSITION.X(),this.POSITION.Y(),this.DIMENSION.WIDTH(),this.DIMENSION.HEIGHT(), this.radius , this.color , "stroke" , this.border_color );	
	
	
}

s.textAlign = this.TEXT_ALIGN;
s.font = this.font;
s.fillStyle = this.TEXT_COLOR;

s.globalAlpha  = this.TEXT_OPACITY;
drawRotatedText( s , this.TEXT , this.POSITION.X(),this.POSITION.Y() , this.TEXT_ANGLE , this.DIMENSION.WIDTH() , this.DIMENSION.HEIGHT() );
//s.textAlign = "start";


s.restore()

};		

}
//###############################################//###############################################
//###############################################//############################################### 
   //new part        
//###############################################//###############################################
//###############################################//###############################################
/*
Created by Nikola Lukic zlatnaspirala@gmail.com

SYSTEM JS
*/

var SYS = {
	
	ROOT : this,
	/**
	Get browser data
	*/
	BROWSER : new DETECTBROWSER(),
	/**
	Load/Add dinamic script in runtime
	*/
    SCRIPT :  SCRIPT,
	/**
	Works with html canvas element ,
	create surface and setup main program loop
	*/
	DOM : new DOM(),
	/**
	Just list of running programs
	*/
	RUNNING_PROGRAMS : new Array(),
	/**
	DEBUG 
	console.log polumorh call
	switch on/off 
	*/
	DEBUG : new LOG(),
	
	READY : false,
	
	/**
	RES - resources 
	Image object creator 
	*/
	RES : {
	
		SUM_OF_LOADED_IMAGES : 0,
		CREATE_IMG : CREATE_IMG,
	
	},
	
	// Math 
	/**
	Math - operation 
	*/
	MATH : {
	
		NUMBER_ROUND :  round, 
	    RANDOM_INT_FROM_TO : randomIntFromTo,
		TO_DEGREES : toDegrees,
		TO_RADIANS : toRadians,
		OSCILLATOR : OSCILLATOR,
		CONVERT : CONVERTOR,
		INCREMENTATOR : INCREMENTATOR,
		
	},
	
	ARRAY_OPERATION : {
		
		REMOVE_ALL_ITEMS_WITH_VALUE : removeItem,
		DEEP_COPY : DEEP_COPY,
		
	},
	
	LOCAL_STORAGE : {

		
	},
	
	// Mouse or touch READ_ONLY 
	MOUSE : {
	   x : 0 ,
	   y : 0 ,
	   PRESS : false,
	   BUTTON_PRESSED : null,
	},
	
	 
	XML : {
    
	READ : readXML ,
	
	},
	
	SOUND : {
		
		GEN : SOUND,
		RES : {},
	},
	
	VOICE : {
	  
	    SPEAK : function(){},
        LISTEN : function(){},
	
	},
	
	CAMERA : {
		
		SUPPORT : test_webcam_device(),
		
		
		
	},
	
	
}; 
   //new part        
//////////////////////////
// NETWORKING
// USER REGISTER
//////////////////////////


var ACCOUNT_SYSTEM = {

 socket : null ,
  
 CONNECT : function(){
 
 if (APPLICATION.ACCOUNT_SERVER_SECURE == false){
 
 this.socket = io.connect('http://'+APPLICATION.ACCOUNT_SERVER+':' + APPLICATION.ACCOUNT_SERVER_PORT);
 ATACH_GAME_SERVER_EVENTS()
 SYS.DEBUG.LOG("Connecting to game server account.................");
 SYS.DEBUG.WARNING("No secure connection in use. If your server use https you must switch secure parameters in client manifest file.");
 
 }
 else {
 
 this.socket = io.connect('https://'+APPLICATION.ACCOUNT_SERVER+':' + APPLICATION.ACCOUNT_SERVER_PORT);
 ATACH_GAME_SERVER_EVENTS()
 SYS.DEBUG.LOG("Connecting to game server account.................");
 SYS.DEBUG.WARNING("Secured connection in use.");
 
 }
 
 
 },
 REQUEST_NEW_PASS : function(newpass){
 
 	this.socket.emit('newpass', newpass );
  
 },
 SING_UP : function(username ,  pass ){

	this.socket.emit('register',   username ,  pass );

 },
 SING_IN : function(username , pass){
    
	this.socket.emit('login',   username ,  pass );
    
 },
 FAST_LOGIN : function(){
 
	this.socket.emit('fast_login',  LS_GET("email")  ,  LS_GET("sessionAccess") );
	setTimeout( function(){
	
	ACCOUNT_SYSTEM.socket.emit('getRoomList',  LS_GET("email")  ,  LS_GET("sessionAccess") );
	ACCOUNT_SYSTEM.socket.emit('loadNickName',  LS_GET("email")  ,  LS_GET("sessionAccess") );
	
	}, 1000 );

 
 },
  SEND_PUBLIC : function(MSG){
 
	this.socket.emit('sendchat',   "EMAIL HERE" ,  MSG );
 
  },
 

 ON_SESSION_TAKE : function(){},


 CHECK_FAST_LOGIN : function(){
 
	 if (LS_GET("email") != null && LS_GET("sessionAccess") != null ) {
        
		ACCOUNT_SYSTEM.FAST_LOGIN()
		
	 }
 
 },

};



 
   //S_( "email" , E("login").value);
   

function ATACH_GAME_SERVER_EVENTS() {
   
ACCOUNT_SYSTEM.socket.on('connect', function(){
   
	   SYS.DEBUG.LOG("CONNECTED WITH IO , GOOD LUCK");      

});


ACCOUNT_SYSTEM.socket.on('TAKE', function(data , data1) {

SYS.DEBUG.LOG("Server send signal : >TAKE< , data : " , data , " . data1 :" , data1 );

LS_SET("sessionAccess" , data);
LS_SET("rank" , data1);
ACCOUNT_SYSTEM.ON_SESSION_TAKE();
ACCOUNT_SYSTEM.socket.emit('getRoomList',  LS_GET("email")  ,  LS_GET("sessionAccess") );

});	


ACCOUNT_SYSTEM.socket.on('realtime', function (EVENT_, data) {

SYS.DEBUG.NETWORK_LOG("Server send signal : >realtime< , event name : " + EVENT_   + " . data :" + data );
 
 if (EVENT_ == "test") {
 
 
 
 }
 
 
 
});

ACCOUNT_SYSTEM.socket.on('rooms', function (EVENT_, data) {

SYS.DEBUG.NETWORK_LOG("Server send signal : >rooms< , event name : " + EVENT_   + " . data :" + data );
 
 if (EVENT_ == "test") {
 
 
 
 }
 
 
 
});

//

	
ACCOUNT_SYSTEM.socket.on('NODE_SESSION', function(data) {

	SYS.DEBUG.LOG("Server send signal : >NODE_SESSION< , data : " , data );

});
	
}


/*
IDE U onconnect : 

 var delivery = new Delivery(socket); 

      $("input[type=submit]").click(function(evt){
        var file = $("input[type=file]")[0].files[0];
        var extraParams = {foo: 'bar'};
	  
        delivery.send(file, extraParams);
        evt.preventDefault();
      });
    

    delivery.on('send.success',function(fileUID){
      console.log("file was successfully sent.");
    });
    
    //////////////////////////////////////////////
    
  delivery.on('receive.start',function(fileUID){
      console.log('receiving a file!');
    });

    delivery.on('receive.success',function(file){
      if (file.isImage()) {
	   
	   setTimeout ( function(){
	   
		E('profileImage').src = file.dataURL();
            S_( "profileImage" , file.dataURL() );	
		
		}, 5000 );
		
      };
    });

*/ 
   //new part        
                                                                                                                                                                                                                                                                                                                                                                                                             
 RESOURCE.character1={"source":['character1/alienBiege_climb1.png' , 
'character1/alienBiege_climb2.png' , 
'character1/alienBiege_duck.png' , 
'character1/alienBiege_front.png' , 
'character1/alienBiege_hit.png' , 
'character1/alienBiege_jump.png' , 
'character1/alienBiege_stand.png' , 
'character1/alienBiege_swim1.png' , 
'character1/alienBiege_swim2.png' , 
'character1/alienBiege_walk1.png' , 
'character1/alienBiege_walk2.png' , 
 ] }; 
 
 RESOURCE.character2={"source":['character2/alienBlue_climb1.png' , 
'character2/alienBlue_climb2.png' , 
'character2/alienBlue_duck.png' , 
'character2/alienBlue_front.png' , 
'character2/alienBlue_hit.png' , 
'character2/alienBlue_jump.png' , 
'character2/alienBlue_stand.png' , 
'character2/alienBlue_swim1.png' , 
'character2/alienBlue_swim2.png' , 
'character2/alienBlue_walk1.png' , 
'character2/alienBlue_walk2.png' , 
 ] }; 
 
 RESOURCE.character3={"source":['character3/alienGreen_climb1.png' , 
'character3/alienGreen_climb2.png' , 
'character3/alienGreen_duck.png' , 
'character3/alienGreen_front.png' , 
'character3/alienGreen_hit.png' , 
'character3/alienGreen_jump.png' , 
'character3/alienGreen_stand.png' , 
'character3/alienGreen_swim1.png' , 
'character3/alienGreen_swim2.png' , 
'character3/alienGreen_walk1.png' , 
'character3/alienGreen_walk2.png' , 
 ] }; 
 
 RESOURCE.characterPink={"source":['characterPink/alienPink_climb1.png' , 
'characterPink/alienPink_climb2.png' , 
'characterPink/alienPink_duck.png' , 
'characterPink/alienPink_front.png' , 
'characterPink/alienPink_hit.png' , 
'characterPink/alienPink_jump.png' , 
'characterPink/alienPink_stand.png' , 
'characterPink/alienPink_swim1.png' , 
'characterPink/alienPink_swim2.png' , 
'characterPink/alienPink_walk1.png' , 
'characterPink/alienPink_walk2.png' , 
 ] }; 
 
 RESOURCE.circleSpiral1={"source":['circleSpiral1/spiral1.png' , 
 ] }; 
 
 RESOURCE.clouds={"source":['clouds/cloud1.png' , 
'clouds/cloud2.png' , 
'clouds/cloud3.png' , 
'clouds/cloud4.png' , 
'clouds/cloud5.png' , 
'clouds/cloud6.png' , 
'clouds/cloud7.png' , 
'clouds/cloud8.png' , 
'clouds/cloud9.png' , 
 ] }; 
 
 RESOURCE.demo1={"source":['demo1/lightmap.gif' , 
 ] }; 
 
 RESOURCE.Dirt={"source":['Dirt/dirt.png' , 
'Dirt/dirtCenter.png' , 
'Dirt/dirtCenter_rounded.png' , 
'Dirt/dirtCliffAlt_left.png' , 
'Dirt/dirtCliffAlt_right.png' , 
'Dirt/dirtCliff_left.png' , 
'Dirt/dirtCliff_right.png' , 
'Dirt/dirtCorner_left.png' , 
'Dirt/dirtCorner_right.png' , 
'Dirt/dirtHalf.png' , 
'Dirt/dirtHalf_left.png' , 
'Dirt/dirtHalf_mid.png' , 
'Dirt/dirtHalf_right.png' , 
'Dirt/dirtHill_left.png' , 
'Dirt/dirtHill_right.png' , 
'Dirt/dirtLeft.png' , 
'Dirt/dirtMid.png' , 
'Dirt/dirtRight.png' , 
 ] }; 
 
 RESOURCE.Enemies1={"source":['Enemies1/0.png' , 
'Enemies1/1.png' , 
'Enemies1/dead.png' , 
 ] }; 
 
 RESOURCE.Grass={"source":['Grass/grass.png' , 
'Grass/grassCenter.png' , 
'Grass/grassCenter_round.png' , 
'Grass/grassCliffAlt_left.png' , 
'Grass/grassCliffAlt_right.png' , 
'Grass/grassCliff_left.png' , 
'Grass/grassCliff_right.png' , 
'Grass/grassCorner_left.png' , 
'Grass/grassCorner_right.png' , 
'Grass/grassHalf.png' , 
'Grass/grassHalf_left.png' , 
'Grass/grassHalf_mid.png' , 
'Grass/grassHalf_right.png' , 
'Grass/grassHill_left.png' , 
'Grass/grassHill_right.png' , 
'Grass/grassLeft.png' , 
'Grass/grassMid.png' , 
'Grass/grassRight.png' , 
 ] }; 
 
 RESOURCE.HUD={"source":['HUD/hudCoin.png' , 
'HUD/hudHeart_empty.png' , 
'HUD/hudHeart_full.png' , 
'HUD/hudHeart_half.png' , 
'HUD/hudJewel_blue.png' , 
'HUD/hudJewel_blue_empty.png' , 
'HUD/hudJewel_green.png' , 
'HUD/hudJewel_green_empty.png' , 
'HUD/hudJewel_red.png' , 
'HUD/hudJewel_red_empty.png' , 
'HUD/hudJewel_yellow.png' , 
'HUD/hudJewel_yellow_empty.png' , 
'HUD/hudPlayer_beige.png' , 
'HUD/hudPlayer_blue.png' , 
'HUD/hudPlayer_green.png' , 
'HUD/hudPlayer_pink.png' , 
'HUD/hudPlayer_yellow.png' , 
'HUD/hudX.png' , 
 ] }; 
 
 RESOURCE.imagesFont1={"source":['imagesFont1/letter_A.png' , 
'imagesFont1/letter_B.png' , 
'imagesFont1/letter_C.png' , 
'imagesFont1/letter_D.png' , 
'imagesFont1/letter_E.png' , 
'imagesFont1/letter_F.png' , 
'imagesFont1/letter_G.png' , 
'imagesFont1/letter_H.png' , 
'imagesFont1/letter_I.png' , 
'imagesFont1/letter_J.png' , 
'imagesFont1/letter_K.png' , 
'imagesFont1/letter_L.png' , 
'imagesFont1/letter_M.png' , 
'imagesFont1/letter_N.png' , 
'imagesFont1/letter_O.png' , 
'imagesFont1/letter_P.png' , 
'imagesFont1/letter_Q.png' , 
'imagesFont1/letter_R.png' , 
'imagesFont1/letter_S.png' , 
'imagesFont1/letter_T.png' , 
'imagesFont1/letter_U.png' , 
'imagesFont1/letter_V.png' , 
'imagesFont1/letter_W.png' , 
'imagesFont1/letter_X.png' , 
'imagesFont1/letter_Y.png' , 
'imagesFont1/letter_Z.png' , 
'imagesFont1/letter_Z_1.png' , 
'imagesFont1/letter_Z_2.png' , 
'imagesFont1/letter_z_3.png' , 
'imagesFont1/letter_Z_4.png' , 
'imagesFont1/letter_z_5.png' , 
'imagesFont1/letter_z_6.png' , 
'imagesFont1/number0.png' , 
'imagesFont1/number1.png' , 
'imagesFont1/number2.png' , 
'imagesFont1/number3.png' , 
'imagesFont1/number4.png' , 
'imagesFont1/number5.png' , 
'imagesFont1/number6.png' , 
'imagesFont1/number7.png' , 
'imagesFont1/number8.png' , 
'imagesFont1/number9.png' , 
 ] }; 
 
 RESOURCE.Items={"source":['Items/coinBronze.png' , 
'Items/coinGold.png' , 
'Items/coinSilver.png' , 
'Items/flagBlue1.png' , 
'Items/flagBlue2.png' , 
'Items/flagBlue_down.png' , 
'Items/flagGreen1.png' , 
'Items/flagGreen2.png' , 
'Items/flagGreen_down.png' , 
'Items/flagRed1.png' , 
'Items/flagRed2.png' , 
'Items/flagRed_down.png' , 
'Items/flagYellow1.png' , 
'Items/flagYellow2.png' , 
'Items/flagYellow_down.png' , 
'Items/gemBlue.png' , 
'Items/gemGreen.png' , 
'Items/gemRed.png' , 
'Items/gemYellow.png' , 
'Items/keyBlue.png' , 
'Items/keyGreen.png' , 
'Items/keyRed.png' , 
'Items/keyYellow.png' , 
'Items/star.png' , 
 ] }; 
 
 RESOURCE.keys={"source":['keys/hudKey_blue.png' , 
'keys/hudKey_blue_empty.png' , 
'keys/hudKey_green.png' , 
'keys/hudKey_green_empty.png' , 
'keys/hudKey_red.png' , 
'keys/hudKey_red_empty.png' , 
'keys/hudKey_yellow.png' , 
'keys/hudKey_yellow_empty.png' , 
 ] }; 
 
 RESOURCE.loadingBlock={"source":['loadingBlock/alu.jpg' , 
 ] }; 
 
 RESOURCE.majce={"source":['majce/mask.png' , 
'majce/shirt.png' , 
 ] }; 
 
 RESOURCE.money_penny={"source":['money_penny/gold_1.png' , 
'money_penny/gold_2.png' , 
'money_penny/gold_3.png' , 
'money_penny/gold_4.png' , 
 ] }; 
 
 RESOURCE.numbers1={"source":['numbers1/0.png' , 
'numbers1/1.png' , 
'numbers1/2.png' , 
'numbers1/3.png' , 
'numbers1/4.png' , 
'numbers1/5.png' , 
'numbers1/6.png' , 
'numbers1/7.png' , 
'numbers1/8.png' , 
'numbers1/9.png' , 
 ] }; 
 
 RESOURCE.numbers2={"source":['numbers2/text_0.png' , 
'numbers2/text_1.png' , 
'numbers2/text_2.png' , 
'numbers2/text_3.png' , 
'numbers2/text_4.png' , 
'numbers2/text_5.png' , 
'numbers2/text_6.png' , 
'numbers2/text_7.png' , 
'numbers2/text_8.png' , 
'numbers2/text_9.png' , 
 ] }; 
 
 RESOURCE.Particles={"source":['Particles/brickBrown.png' , 
'Particles/brickGrey.png' , 
'Particles/fireball.png' , 
 ] }; 
 
 RESOURCE.Planet={"source":['Planet/planet.png' , 
'Planet/planetCenter.png' , 
'Planet/planetCenter_rounded.png' , 
'Planet/planetCliffAlt_left.png' , 
'Planet/planetCliffAlt_right.png' , 
'Planet/planetCliff_left.png' , 
'Planet/planetCliff_right.png' , 
'Planet/planetCorner_left.png' , 
'Planet/planetCorner_right.png' , 
'Planet/planetHalf.png' , 
'Planet/planetHalf_left.png' , 
'Planet/planetHalf_mid.png' , 
'Planet/planetHalf_right.png' , 
'Planet/planetHill_left.png' , 
'Planet/planetHill_right.png' , 
'Planet/planetLeft.png' , 
'Planet/planetMid.png' , 
'Planet/planetRight.png' , 
 ] }; 
 
 RESOURCE.Sand={"source":['Sand/sand.png' , 
'Sand/sandCenter.png' , 
'Sand/sandCenter_rounded.png' , 
'Sand/sandCliffAlt_left.png' , 
'Sand/sandCliffAlt_right.png' , 
'Sand/sandCliff_left.png' , 
'Sand/sandCliff_right.png' , 
'Sand/sandCorner_leftg.png' , 
'Sand/sandCorner_right.png' , 
'Sand/sandHalf.png' , 
'Sand/sandHalf_left.png' , 
'Sand/sandHalf_mid.png' , 
'Sand/sandHalf_right.png' , 
'Sand/sandHill_left.png' , 
'Sand/sandHill_right.png' , 
'Sand/sandLeft.png' , 
'Sand/sandMid.png' , 
'Sand/sandRight.png' , 
 ] }; 
 
 RESOURCE.slotBG={"source":['slotBG/castle_grey.png' , 
'slotBG/z.png' , 
 ] }; 
 
 RESOURCE.slotimages1={"source":['slotimages1/elementGlass025.png' , 
'slotimages1/ram.png' , 
 ] }; 
 
 RESOURCE.Snow={"source":['Snow/snow.png' , 
'Snow/snowCenter.png' , 
'Snow/snowCenter_rounded.png' , 
'Snow/snowCliffAlt_left.png' , 
'Snow/snowCliffAlt_right.png' , 
'Snow/snowCliff_left.png' , 
'Snow/snowCliff_right.png' , 
'Snow/snowCorner_left.png' , 
'Snow/snowCorner_right.png' , 
'Snow/snowHalf.png' , 
'Snow/snowHalf_left.png' , 
'Snow/snowHalf_mid.png' , 
'Snow/snowHalf_right.png' , 
'Snow/snowHill_left.png' , 
'Snow/snowHill_right.png' , 
'Snow/snowLeft.png' , 
'Snow/snowMid.png' , 
'Snow/snowRight.png' , 
 ] }; 
 
 RESOURCE.Stone={"source":['Stone/stone.png' , 
'Stone/stoneCenter.png' , 
'Stone/stoneCenter_rounded.png' , 
'Stone/stoneCliffAlt_left.png' , 
'Stone/stoneCliffAlt_right.png' , 
'Stone/stoneCliff_left.png' , 
'Stone/stoneCliff_right.png' , 
'Stone/stoneCorner_left.png' , 
'Stone/stoneCorner_right.png' , 
'Stone/stoneHalf.png' , 
'Stone/stoneHalf_left.png' , 
'Stone/stoneHalf_mid.png' , 
'Stone/stoneHalf_right.png' , 
'Stone/stoneHill_left.png' , 
'Stone/stoneHill_right.png' , 
'Stone/stoneLeft.png' , 
'Stone/stoneMid.png' , 
'Stone/stoneRight.png' , 
 ] }; 
 
 RESOURCE.textures1={"source":['textures1/1.jpg' , 
'textures1/10.jpg' , 
'textures1/2.jpg' , 
'textures1/3.jpg' , 
'textures1/4.jpg' , 
'textures1/5.jpg' , 
'textures1/6.jpg' , 
'textures1/7.jpg' , 
'textures1/8.jpg' , 
'textures1/9.jpg' , 
 ] }; 
 
 RESOURCE.Tiles={"source":['Tiles/bomb.png' , 
'Tiles/bombWhite.png' , 
'Tiles/boxCoin.png' , 
'Tiles/boxCoin_boxed.png' , 
'Tiles/boxCoin_disabled.png' , 
'Tiles/boxCoin_disabled_boxed.png' , 
'Tiles/boxCrate.png' , 
'Tiles/boxCrate_double.png' , 
'Tiles/boxCrate_single.png' , 
'Tiles/boxCrate_warning.png' , 
'Tiles/boxExplosive.png' , 
'Tiles/boxExplosive_disabled.png' , 
'Tiles/boxExplosive_used.png' , 
'Tiles/boxItem.png' , 
'Tiles/boxItem_boxed.png' , 
'Tiles/boxItem_disabled.png' , 
'Tiles/boxItem_disabled_boxed.png' , 
'Tiles/brickBrown.png' , 
'Tiles/brickGrey.png' , 
'Tiles/bridgeA.png' , 
'Tiles/bridgeB.png' , 
'Tiles/bush.png' , 
'Tiles/cactus.png' , 
'Tiles/chain.png' , 
'Tiles/doorClosed_mid.png' , 
'Tiles/doorClosed_top.png' , 
'Tiles/doorOpen_mid.png' , 
'Tiles/doorOpen_top.png' , 
'Tiles/fence.png' , 
'Tiles/fenceBroken.png' , 
'Tiles/grass.png' , 
'Tiles/ladderMid.png' , 
'Tiles/ladderTop.png' , 
'Tiles/lava.png' , 
'Tiles/lavaTop_high.png' , 
'Tiles/lavaTop_low.png' , 
'Tiles/leverLeft.png' , 
'Tiles/leverMid.png' , 
'Tiles/leverRight.png' , 
'Tiles/lockBlue.png' , 
'Tiles/lockGreen.png' , 
'Tiles/lockRed.png' , 
'Tiles/lockYellow.png' , 
'Tiles/mushroomBrown.png' , 
'Tiles/mushroomRed.png' , 
'Tiles/plantPurple.png' , 
'Tiles/rock.png' , 
'Tiles/snow.png' , 
'Tiles/spikes.png' , 
'Tiles/spring.png' , 
'Tiles/sprung.png' , 
'Tiles/switchBlue.png' , 
'Tiles/switchBlue_pressed.png' , 
'Tiles/switchGreen.png' , 
'Tiles/switchGreen_pressed.png' , 
'Tiles/switchRed.png' , 
'Tiles/switchRed_pressed.png' , 
'Tiles/switchYellow.png' , 
'Tiles/switchYellow_pressed.png' , 
'Tiles/torch1.png' , 
'Tiles/torch2.png' , 
'Tiles/torchOff.png' , 
'Tiles/water.png' , 
'Tiles/waterTop_high.png' , 
'Tiles/waterTop_low.png' , 
'Tiles/weight.png' , 
'Tiles/weightAttached.png' , 
'Tiles/window.png' , 
 ] }; 
 
 RESOURCE.trees1={"source":['trees1/tree20.png' , 
'trees1/tree21.png' , 
'trees1/tree22.png' , 
'trees1/tree23.png' , 
'trees1/tree24.png' , 
'trees1/tree25.png' , 
'trees1/tree26.png' , 
'trees1/tree27.png' , 
'trees1/tree28.png' , 
'trees1/tree35.png' , 
 ] }; 
 
 RESOURCE.wbutton={"source":['wbutton/sign - Copy.png' , 
'wbutton/sign.png' , 
'wbutton/signExit.png' , 
'wbutton/signLeft.png' , 
'wbutton/signRight.png' , 
 ] }; 
 
 RESOURCE.Yellow={"source":['Yellow/alienYellow_climb1.png' , 
'Yellow/alienYellow_climb2.png' , 
'Yellow/alienYellow_duck.png' , 
'Yellow/alienYellow_front.png' , 
'Yellow/alienYellow_hit.png' , 
'Yellow/alienYellow_jump.png' , 
'Yellow/alienYellow_stand.png' , 
'Yellow/alienYellow_swim1.png' , 
'Yellow/alienYellow_swim2.png' , 
'Yellow/alienYellow_walk1.png' , 
'Yellow/alienYellow_walk2.png' , 
 ] }; SYS.DEBUG.LOG('Resources loaded. ' + 31); 
  RESOURCE.SUM = 31;  
   //new part        
//OPEN SOURCE LICNECE


function PARTICLE_FONTAN (  GO , PARAMETERS ){

var FONTAN = this; 
FONTAN.GO = GO;
FONTAN.GO_POS = GO.POSITION;
FONTAN.ANIMATION_ID = GO.ANIMATION.ID;
FONTAN.particles = {},
FONTAN.particleIndex = 0,


// LOAD DEFAULT VALUES 
FONTAN.settings = {
density: 10,
particleSize: 22,
startingX: function(){return FONTAN.GO_POS.X()},
startingY: function(){return FONTAN.GO_POS.Y()},
gravity: 0,
gravity_CIKLUS : 155 , 
gravity_index : 1,
bounceLevel: window.innerHeight    * 0.75
};


if (typeof PARAMETERS != 'undefined') {
	// polymorf here in future 
	
	
	
	
}



FONTAN.Particle = function () {
this.x = FONTAN.settings.startingX();
this.y = FONTAN.settings.startingY();
this.vx = Math.random() * 10 - 5;
this.vy = Math.random() * 10 - 5; 
if (Math.random() > 0.98) {this.vy *= 3;}
FONTAN.particleIndex ++;
FONTAN.particles[FONTAN.particleIndex] = this;
this.id = FONTAN.particleIndex;
this.life = 0;
this.maxLife = Math.random() * 120;
};

FONTAN.Particle.prototype.draw = function(s) {
this.x += this.vx;
this.y += this.vy;
if (this.y > FONTAN.settings.bounceLevel) {
this.vy *= -0.6;
this.vx *= 0.75;
this.y = FONTAN.settings.bounceLevel;
}
this.vy += FONTAN.settings.gravity;
this.life++;
if (this.life >= this.maxLife) {
delete FONTAN.particles[this.id];
}

//s.fillRect(this.x, this.y, FONTAN.settings.particleSize, FONTAN.settings.particleSize)
s.drawImage(  window["f_"+FONTAN.ANIMATION_ID +FONTAN.GO.ANIMATION.CURRENT_FRAME]  , this.x, this.y, FONTAN.settings.particleSize, FONTAN.settings.particleSize)


};

FONTAN.DRAW = function(s) {
// Draw the particles
for (var i = 0; i < FONTAN.settings.density; i++) {
new FONTAN.Particle();
}

for (var i in FONTAN.particles) {
FONTAN.particles[i].draw(s);
}

if (  FONTAN.settings.gravity_index > FONTAN.settings.gravity_CIKLUS ) {

FONTAN.settings.gravity_index = 1;
FONTAN.settings.gravity = 0;

//setTimeout(function() {FONTAN.settings.gravity = 1} , 1000); ORI
setTimeout(function() {FONTAN.settings.gravity = 0} , 1000);


}
else {
FONTAN.settings.gravity_index++
}
};

} 
   //new part        
//###############################################//###############################################
//###############################################//###############################################
// MULTILANGUAGE Plugin
// SYSTEMS PLUGIN COMES WITH FREE SERVICES
//###############################################//###############################################
//###############################################//###############################################
var ML = "multiLangauage system not loaded.";

if (APPLICATION.MULTILANGUAGE == true) {

 ML = {
     
	 ROOT : this,
	 
     DATA :  SYS.XML.READ("res/system/ml/ml.xml" , "CONVER_TO_OBJ") ,
	 
	 CURRENT_LANGUAGE : "English" ,
	 
	 get : function(alias ) {
	 
	   this.DATA.NewDataSet.lang.forEach(function(i) {
		
		if (alias == i.ALIAS["#text"]) {
		eval (  ' var RESULT = i.'+ML.CURRENT_LANGUAGE+'["#text"]; ');
		console.log(    RESULT    );
		return RESULT;
	
		}  
	   });
	 
	 
	 },
  
};

} 
   //new part        
/*

*/
//###############################################//###############################################
//###############################################//###############################################
// EVENTS  Atach this class to every modul
//###############################################//###############################################
//###############################################//###############################################
 
function  EVENTS( canvas , ROOT_ENGINE ){

var ROOT_EVENTS = this;
this.ROOT_ENGINE = ROOT_ENGINE;

 //Mobile device
if (NOMOBILE == 0)
{

	canvas.addEventListener("touchstart" , function(e) {	
	
	e.preventDefault();	
	
	var touchList = e.changedTouches;
	
	//SYS.MOUSE.PRESS = true;
	
	SYS.MOUSE.x = touchList[0].pageX;
	SYS.MOUSE.y = touchList[0].pageY;
	
	
	ROOT_EVENTS.CALCULATE_TOUCH_OR_CLICK();
	
	} , false);
	
		
	canvas.addEventListener("touchend" , function(e) {

	e.preventDefault();

	var touchList = e.changedTouches;

	SYS.MOUSE.PRESS = false;

	SYS.MOUSE.x = touchList[0].pageX;
	SYS.MOUSE.y = touchList[0].pageY;

	
	ROOT_EVENTS.CALCULATE_TOUCH_UP_OR_MOUSE_UP();
	} , false);
	
	
	
	canvas.addEventListener("touchcancel" , function(e) {

	e.preventDefault();

	var touchList = e.changedTouches;

	SYS.MOUSE.PRESS = false;
	
	SYS.MOUSE.x = touchList[0].pageX;
	SYS.MOUSE.y = touchList[0].pageY;

	ROOT_EVENTS.CALCULATE_TOUCH_UP_OR_MOUSE_UP();
	} , false);
	
	
	canvas.addEventListener("touchmove" , function(e) {

	e.preventDefault();

	var touchList = e.changedTouches;

	//SYS.MOUSE.PRESS = true;
	
	SYS.MOUSE.x = touchList[0].pageX;
	SYS.MOUSE.y = touchList[0].pageY;

	ROOT_EVENTS.CALCULATE_TOUCH_MOVE_OR_MOUSE_MOVE();
	} , false);
	
	
}
else
{

   //Desktop device  
	canvas.addEventListener("click" , function(e) {
	
	//SYS.MOUSE.PRESS = true;
	
	
	
	SYS.MOUSE.x = e.layerX;
	SYS.MOUSE.y = e.layerY;
	
	ROOT_EVENTS.CALCULATE_TOUCH_OR_CLICK();
	//SYS.DEBUG.LOG("SYS : CLICK EVENT " + canvas);
	
	} , false);
	
	
  canvas.addEventListener("mouseup" , function(e) {
	
	SYS.MOUSE.PRESS = false;
	SYS.MOUSE.BUTTON_PRESSED = null;
	
	SYS.MOUSE.x = e.layerX;
	SYS.MOUSE.y = e.layerY;


	ROOT_EVENTS.CALCULATE_TOUCH_UP_OR_MOUSE_UP();


	} , false);
	
	
  canvas.onmousemove = function(e) {
	
	
	SYS.MOUSE.x = e.layerX;
	SYS.MOUSE.y = e.layerY;
	
	
	
	ROOT_EVENTS.CALCULATE_TOUCH_MOVE_OR_MOUSE_MOVE();

	};

 canvas.onmousedown = function(e) {
	
	SYS.MOUSE.PRESS = true;
	
	 if(e.which == 3)
      {
         	SYS.MOUSE.BUTTON_PRESSED = "RIGHT";
            SYS.DEBUG.LOG("Right button clicked");
      }
	  else if (e.which == 2){
	        SYS.MOUSE.BUTTON_PRESSED = "MID";
			SYS.DEBUG.LOG("Mid button clicked");
	  }
	  else if (e.which == 1){
	        SYS.MOUSE.BUTTON_PRESSED = "LEFT";
			SYS.DEBUG.LOG("Left button clicked");
	  } 
	  
	
	
	SYS.MOUSE.x = e.layerX;
	SYS.MOUSE.y = e.layerY;
	
		
	ROOT_EVENTS.CALCULATE_TOUCH_DOWN_OR_MOUSE_DOWN();

	};
	

	//console.log("This is PC desktop device.");
}

//Calculate touch or click event
this.CALCULATE_TOUCH_OR_CLICK = function(){


	for (var x=0;x<this.ROOT_ENGINE.MODULES.length;x++){
	
		for (var z=0;z<ROOT_EVENTS.ROOT_ENGINE.MODULES[x].GAME_OBJECTS.length;z++){	
				 
				var local_go = ROOT_EVENTS.ROOT_ENGINE.MODULES[x].GAME_OBJECTS[z];
				if ( SYS.MOUSE.x > local_go.POSITION.X()  && SYS.MOUSE.x < local_go.POSITION.X()  + local_go.DIMENSION.WIDTH() && SYS.MOUSE.y > local_go.POSITION.Y() && SYS.MOUSE.y < local_go.POSITION.Y() + local_go.DIMENSION.HEIGHT() ) {
		
		         
				 
                if (ROOT_EVENTS.ROOT_ENGINE.ENGINE_EDITOR == false && local_go.VISIBLE !=  false ){
					
				 SYS.DEBUG.LOG( "SYS : touch or click event on game object : " + local_go.NAME);
				 local_go.FOCUS = true;
				 local_go.TAP();
				 
				 }
				 
				}

	    }
   
    }
	
	

};

// CALCULATE MOUSE MOVE OR TOUCH MOVE
this.CALCULATE_TOUCH_MOVE_OR_MOUSE_MOVE = function(){


    for (var x=0;x<this.ROOT_ENGINE.MODULES.length;x++){
	
	 var first_pass = false;
	
		for (var z=0;z<ROOT_EVENTS.ROOT_ENGINE.MODULES[x].GAME_OBJECTS.length;z++){	
				 
				 //-------------------------------//-------------------------------//-------------------------------
				var local_go = ROOT_EVENTS.ROOT_ENGINE.MODULES[x].GAME_OBJECTS[z];
				if ( SYS.MOUSE.x > local_go.POSITION.X()  && SYS.MOUSE.x < local_go.POSITION.X()  + local_go.DIMENSION.WIDTH() && SYS.MOUSE.y > local_go.POSITION.Y() && SYS.MOUSE.y < local_go.POSITION.Y() + local_go.DIMENSION.HEIGHT() ) {
				  
		         //SYS.DEBUG.LOG( "SYS : touchmove event on game object : " + local_go.NAME);
				// EVENT ONLY OUT OF EDITOR
				 if (ROOT_EVENTS.ROOT_ENGINE.ENGINE_EDITOR == false && local_go.VISIBLE == true){
					 
				 local_go.TOUCH_MOVE()
				 
				 		if(SYS.MOUSE.PRESS == true && local_go.DRAG == true && first_pass == false && local_go.DRAG_STATUS == true){
					
					 first_pass =true;
					
					local_go.DRAG_DELTA  =  ( local_go.DRAG_START_X    );
					var local_ = CONVERTOR.PIX_TO_PER(  parseFloat(local_go.DRAG_DELTA.toFixed(2)) );
					local_go.POSITION.TRANSLATE_BY_X(  parseFloat(CONVERTOR.PIX_TO_PER( SYS.MOUSE.x ).toFixed(2) )  -  Math.abs(local_)  )

					local_go.DRAG_DELTA  =  ( local_go.DRAG_START_Y  );
					var local_ = CONVERTOR.PIY_TO_PER(  parseFloat(local_go.DRAG_DELTA.toFixed(2)) );
					local_go.POSITION.TRANSLATE_BY_Y(  parseFloat(CONVERTOR.PIY_TO_PER( SYS.MOUSE.y ).toFixed(2) )  -  Math.abs(local_)  )
					
					
					}
					
				 
				 
				 
				 }
				  
				}else {

                 
				
				 
				}
				//-------------------------------//-------------------------------//-------------------------------
				

				
				//-------------------------------//-------------------------------//-------------------------------
				//EDITOR 
				//-------------------------------//-------------------------------//-------------------------------
				if (local_go.EDITOR.ENABLE == true) {
				
				//-------------------------------//-------------------------------//-------------------------------
				// DRAG in EDITOR 
				//-------------------------------//-------------------------------//-------------------------------
					
					if(SYS.MOUSE.PRESS == true && local_go.EDITOR.ACTOR_DRAG == true && first_pass == false){
					
					 first_pass =true;
					
					
					local_go.EDITOR.ACTOR_DELTA  =  ( local_go.EDITOR.ACTOR_START_X   + local_go.EDITOR.ACTORS_AREA_HEIGHT );
					var local_ = CONVERTOR.PIX_TO_PER(  parseFloat(local_go.EDITOR.ACTOR_DELTA.toFixed(2)) );
					local_go.POSITION.TRANSLATE_BY_X(  parseFloat(CONVERTOR.PIX_TO_PER( SYS.MOUSE.x ).toFixed(2) )  -  Math.abs(local_)  )

					local_go.EDITOR.ACTOR_DELTA  =  ( local_go.EDITOR.ACTOR_START_Y  + local_go.EDITOR.ACTORS_AREA_HEIGHT  );
					var local_ = CONVERTOR.PIY_TO_PER(  parseFloat(local_go.EDITOR.ACTOR_DELTA.toFixed(2)) );
					local_go.POSITION.TRANSLATE_BY_Y(  parseFloat(CONVERTOR.PIY_TO_PER( SYS.MOUSE.y ).toFixed(2) )  -  Math.abs(local_)  )
					
					
					}
 	
				//-------------------------------//-------------------------------//-------------------------------
				//-------------------------------//-------------------------------//-------------------------------
				
				
				//-------------------------------//-------------------------------//-------------------------------
				// OBJECT MOVE
				// ACTOR X
				if (local_go.EDITOR.ACTOR_X_IN_MOVE == true) {
					local_go.EDITOR.ACTOR_DELTA  =  ( local_go.EDITOR.ACTOR_START_X   );
					var local_ = CONVERTOR.PIX_TO_PER(  parseFloat(local_go.EDITOR.ACTOR_DELTA.toFixed(1)) );
					local_go.POSITION.TRANSLATE_BY_X(  parseFloat(CONVERTOR.PIX_TO_PER( SYS.MOUSE.x ).toFixed(1) )  -  Math.abs(local_)  )
				}
				// ACTOR Y
				if (local_go.EDITOR.ACTOR_Y_IN_MOVE == true) {
					local_go.EDITOR.ACTOR_DELTA  =  ( local_go.EDITOR.ACTOR_START_Y  );
					var local_ = CONVERTOR.PIY_TO_PER(  parseFloat(local_go.EDITOR.ACTOR_DELTA.toFixed(1)) );
					local_go.POSITION.TRANSLATE_BY_Y(  parseFloat(CONVERTOR.PIY_TO_PER( SYS.MOUSE.y ).toFixed(1) )  -  Math.abs(local_)  )
				}
							
				//-------------------------------//-------------------------------//-------------------------------
				
	
				//HOVER
				//-------------------------------//-------------------------------//-------------------------------
				if ( SYS.MOUSE.x > local_go.POSITION.X() + local_go.EDITOR.ACTORS_AREA_HEIGHT  && SYS.MOUSE.x < local_go.POSITION.X()  + local_go.EDITOR.ACTORS_AREA_HEIGHT*15 && SYS.MOUSE.y > local_go.POSITION.Y()  && SYS.MOUSE.y < local_go.POSITION.Y() + local_go.EDITOR.ACTORS_AREA_HEIGHT) {
					
				 local_go.EDITOR.ACTOR_BLUE_HOVER = true;

 								 
				}else { 
				
				 local_go.EDITOR.ACTOR_BLUE_HOVER = false;
				 
				}
				//-------------------------------//-------------------------------//-------------------------------
				
				 
				
				//-------------------------------//-------------------------------//-------------------------------
				if ( SYS.MOUSE.x > local_go.POSITION.X() && SYS.MOUSE.x < local_go.POSITION.X()  + local_go.EDITOR.ACTORS_AREA_HEIGHT && SYS.MOUSE.y > local_go.POSITION.Y() + local_go.EDITOR.ACTORS_AREA_HEIGHT && SYS.MOUSE.y < local_go.POSITION.Y() + local_go.EDITOR.ACTORS_AREA_HEIGHT*15 ) {
		
		         local_go.EDITOR.ACTOR_GREEN_HOVER = true;
		         //SYS.DEBUG.LOG( "SYS : green Y-ACTOR event on game object : " + local_go.NAME);

				}else {
					
					local_go.EDITOR.ACTOR_GREEN_HOVER = false;
					
				}
				//-------------------------------//-------------------------------//-------------------------------
				
				//-------------------------------//-------------------------------//-------------------------------
				}// END OF EDITOR
				
				
				
				
					     if (	local_go.EDITOR.GAME_OBJECT_MENU.VISIBLE == true ) {
			 
			 		local_go.EDITOR.ACTOR_DRAG = false;
					
				 for (var q=0;q<local_go.EDITOR.BUTTONS.length;q++){
				
				    if ( SYS.MOUSE.x > local_go.EDITOR.BUTTONS[q].POSITION.x    && SYS.MOUSE.x < local_go.EDITOR.BUTTONS[q].POSITION.x  +  local_go.EDITOR.BUTTONS[q].DIMENSION.WIDTH() && SYS.MOUSE.y > local_go.EDITOR.BUTTONS[q].POSITION.y  + local_go.EDITOR.BUTTONS[q].Y_OFFSET&& SYS.MOUSE.y < local_go.EDITOR.BUTTONS[q].POSITION.y + local_go.EDITOR.BUTTONS[q].Y_OFFSET + local_go.EDITOR.BUTTONS[q].DIMENSION.HEIGHT() ) {
				  
				    local_go.EDITOR.BUTTONS[q].HOVER = true; 
				  
					}else {
					
					local_go.EDITOR.BUTTONS[q].HOVER = false; 
					
					}

				 }
			  
		}
				//-------------------------------//-------------------------------//-------------------------------
				
				
				
	    }
   
    }

			
			
	 if(ROOT_ENGINE.GUI.VISIBLE == true) {
				
				 for (var x=0;x<ROOT_ENGINE.GUI.BUTTONS.length;x++){
				
				    if ( SYS.MOUSE.x > ROOT_ENGINE.GUI.BUTTONS[x].POSITION.x    && SYS.MOUSE.x < ROOT_ENGINE.GUI.BUTTONS[x].POSITION.x  +  ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.WIDTH() && SYS.MOUSE.y > ROOT_ENGINE.GUI.BUTTONS[x].POSITION.y  + ROOT_ENGINE.GUI.BUTTONS[x].Y_OFFSET&& SYS.MOUSE.y < ROOT_ENGINE.GUI.BUTTONS[x].POSITION.y + ROOT_ENGINE.GUI.BUTTONS[x].Y_OFFSET + ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.HEIGHT() ) {


					ROOT_ENGINE.GUI.BUTTONS[x].HOVER = true;
					
					
					
					}else {ROOT_ENGINE.GUI.BUTTONS[x].HOVER = false;}

				 }
				 
				
			}
			
			
			//
			
				 if(ROOT_ENGINE.GUI.VISIBLE == true) {
				
				 for (var x=0;x<ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES.length;x++){
				
				    if ( SYS.MOUSE.x > ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.x    && SYS.MOUSE.x < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.x  +  ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.WIDTH() && SYS.MOUSE.y > ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.y  + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].Y_OFFSET&& SYS.MOUSE.y < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.y + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].Y_OFFSET + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.HEIGHT() ) {


					ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].HOVER = true;
					
					
					
					}else {ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].HOVER = false;}

				 }
				 
				
			}
			//
			
			
 
};

// CALCULATE_TOUCH_UP_OR_MOUSE_UP
this.CALCULATE_TOUCH_UP_OR_MOUSE_UP = function(){

 
    for (var x=0;x<this.ROOT_ENGINE.MODULES.length;x++){
	
		for (var z=0;z<ROOT_EVENTS.ROOT_ENGINE.MODULES[x].GAME_OBJECTS.length;z++){	
				 
  		   var local_go = ROOT_EVENTS.ROOT_ENGINE.MODULES[x].GAME_OBJECTS[z];

		   local_go.EDITOR.ACTOR_X_IN_MOVE = false;
		   local_go.EDITOR.ACTOR_Y_IN_MOVE = false;
			
			//-------------------------------//-------------------------------//-------------------------------
			// EDITOR
			//-------------------------------//-------------------------------//-------------------------------
			if (local_go.EDITOR.ENABLE == true) {
			
			 local_go.EDITOR.ACTOR_DRAG = false;
			  
			
			//-------------------------------//-------------------------------//-------------------------------
			}// end of EDITOR
			//-------------------------------//-------------------------------//-------------------------------
             
			 // EVENT ONLY OUT OF EDITOR
			 if (ROOT_EVENTS.ROOT_ENGINE.ENGINE_EDITOR == false){
				 		
				if ( SYS.MOUSE.x > local_go.POSITION.X()  && SYS.MOUSE.x < local_go.POSITION.X()  + local_go.DIMENSION.WIDTH() && SYS.MOUSE.y > local_go.POSITION.Y() && SYS.MOUSE.y < local_go.POSITION.Y() + local_go.DIMENSION.HEIGHT() ) {
		        
			    if (local_go.VISIBLE == true) {	
		       local_go.TOUCH_UP()
		       SYS.DOM.E(SYS.RUNNING_PROGRAMS[0]).style.cursor = "auto";
				}
			 
			   }
			 
			 
			 }

			
		 }
				 
   }


};

this.CALCULATE_TOUCH_DOWN_OR_MOUSE_DOWN = function(){

    var selected_something = false;

		for (var x=0;x<this.ROOT_ENGINE.MODULES.length;x++){

 
			for (var z=0;z<ROOT_EVENTS.ROOT_ENGINE.MODULES[x].GAME_OBJECTS.length;z++){	
			
							 
				var local_go = ROOT_EVENTS.ROOT_ENGINE.MODULES[x].GAME_OBJECTS[z];
				
				
				if ( SYS.MOUSE.x > local_go.POSITION.X()  && SYS.MOUSE.x < local_go.POSITION.X()  + local_go.DIMENSION.WIDTH() && SYS.MOUSE.y > local_go.POSITION.Y() && SYS.MOUSE.y < local_go.POSITION.Y() + local_go.DIMENSION.HEIGHT() ) {
		
		         
				 local_go.EDITOR.SELECTED = true;
				
                 selected_something = true;
				 
				 if (local_go.TYPE_OF_GAME_OBJECT == "TEXT_BOX" && local_go.TEXTBOX.EDIT == true  && local_go.VISIBLE == true) {
 				 
                  if (NOMOBILE == 1) { // for desktop mouse		HARD CODE 0/1		 
				 
   
				if ( APPLICATION.ACCESSIBILITY.VIRTUAL_KEYBOARD_FOR_DESKTOP  == true ){
				ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.TARGET_MODUL =  local_go.PARENT;
				 ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.TARGET = local_go.NAME;
				 SHOW_KEYBOARD(local_go.NAME)
		
				}
				else{//normal for desktop
				 local_go.FOCUS = true;
				 ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.CAPTURE_CHAR = local_go.TEXTBOX.TEXT;
				 ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.TARGET_MODUL =  local_go.PARENT;
				 ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.TARGET = local_go.NAME;
				}
				
				
				  }
				  else { // for mobile VirtualKeyboard
			     ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.TARGET_MODUL =  local_go.PARENT;
				 ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.TARGET = local_go.NAME;
				 SHOW_KEYBOARD(local_go.NAME)
					  
				  }
				 
				 }
				 
				 // EVENT ONLY OUT OF EDITOR
				 if (ROOT_EVENTS.ROOT_ENGINE.ENGINE_EDITOR == false  && local_go.VISIBLE == true){
					 
				 local_go.FOCUS = true;	 
				 local_go.TOUCH_DOWN()
				 SYS.DEBUG.LOG( "SYS : touchDown or mouseDown event on game object : " + local_go.NAME); 
				 
							// if drag is enabled 
				             if (local_go.DRAG == true) {
							 //$$$$$$$$
							 
		//if (  SYS.MOUSE.x > local_go.POSITION.X()    && SYS.MOUSE.x < local_go.POSITION.X() +  local_go.DIMENSION.WIDTH()  && SYS.MOUSE.y > local_go.POSITION.Y()&&SYS.MOUSE.y < local_go.POSITION.Y() +    local_go.DIMENSION.HEIGHT()) {
			
			if (SYS.MOUSE.BUTTON_PRESSED == "LEFT") {
				
			 SYS.DOM.E(local_go.PROGRAM_NAME).style.cursor = "MOVE";
			local_go.DRAG = true;
			local_go.DRAG_START_X =  parseFloat(    SYS.MOUSE.x.toFixed(2)  - local_go.POSITION.X()   ); 
			local_go.DRAG_START_Y =  parseFloat(    SYS.MOUSE.y.toFixed(2)  - local_go.POSITION.Y()   ); 
		    }
 
			 
	//	}
							 
							 
							 //$$$$$$$$
							 }
				 
				 
				 }
				 
				 
				 
				}
				else {
			 
				 local_go.FOCUS = false; 	
			  
				}
				
			//-------------------------------//-------------------------------//-------------------------------
			// EDITOR
			//-------------------------------//-------------------------------//-------------------------------
	if (local_go.EDITOR.ENABLE == true) {
		
			//################
		     if (	local_go.EDITOR.GAME_OBJECT_MENU.VISIBLE == true ) {
			 
			 		local_go.EDITOR.ACTOR_DRAG = false;
					
				 for (var q=0;q<local_go.EDITOR.BUTTONS.length;q++){
				
				    if ( SYS.MOUSE.x > local_go.EDITOR.BUTTONS[q].POSITION.x    && SYS.MOUSE.x < local_go.EDITOR.BUTTONS[q].POSITION.x  +  local_go.EDITOR.BUTTONS[q].DIMENSION.WIDTH() && SYS.MOUSE.y > local_go.EDITOR.BUTTONS[q].POSITION.y  + local_go.EDITOR.BUTTONS[q].Y_OFFSET&& SYS.MOUSE.y < local_go.EDITOR.BUTTONS[q].POSITION.y + local_go.EDITOR.BUTTONS[q].Y_OFFSET + local_go.EDITOR.BUTTONS[q].DIMENSION.HEIGHT() ) {
						
						//-----------------------------------------------------------------------------//-----------------------------------------------------------------------------
					 if (local_go.EDITOR.BUTTONS[q].IAM == "1") {
						    // DESTROY OBJECT
							ROOT_EVENTS.ROOT_ENGINE.MODULES[x].DESTROY_OBJECT(local_go.NAME);
						    //DESTROY( name , canvas.id  , local_go.PARENT )
							DESTROY( local_go.NAME );
						    SYS.DEBUG.LOG('DESTROY_OBJECT')
						 
					 }
					 //-----------------------------------------------------------------------------//-----------------------------------------------------------------------------
					 else if (local_go.EDITOR.BUTTONS[q].IAM == "2") {
						
						var local_res = prompt("Destroy game_object ( Time not count in editor ):" , "10" );
						if (!isNaN(parseFloat(local_res.charAt(0)))){
							var _name = local_go.NAME;
				 
							local_go.DESTROY_ME_AFTER_X_SECUND(  local_res , _name , x  , ROOT_EVENTS );
					 
							
						}else{alert("ERROR MSG: ADD_ANIMATION not success.");}
						
						SYS.DEBUG.LOG('test2')	
							
					 }
					 //-----------------------------------------------------------------------------//-----------------------------------------------------------------------------
					else if (local_go.EDITOR.BUTTONS[q].IAM == "3") {
							var resource_list = "";
							for (var key in RESOURCE) {
							if (RESOURCE.hasOwnProperty(key) && key != "SUM") {
								resource_list += "  " + key + ", "; 
							}
							}
							
						 var local_res = prompt("Full list of images source : \n "+resource_list+"   \n \n Enter name of animation resource object :" , "demo1" );
						if (isNaN(parseFloat(local_res.charAt(0)))){
						ADD_ANIMATION( local_go.NAME  , local_go.PROGRAM_NAME , local_go.PARENT , local_res  );
						}else{alert("ERROR MSG: ADD_ANIMATION not success.");}
						
						 
					SYS.DEBUG.LOG('add animation....')	
					
					}
					//-----------------------------------------------------------------------------
					else if (local_go.EDITOR.BUTTONS[q].IAM == "4") {
					if (local_go.COLLISION == null) {
					////////////////////////////
					// ADD COLLIDER
					///////////////////////////
						 var local_res = prompt("Enter outline margin collider." , "1.02" );
						if (!isNaN(parseFloat(local_res.charAt(0)))){
						
						ADD_COLLISION( local_go.NAME  , local_go.PROGRAM_NAME , local_go.PARENT , local_res  );
						local_go.EDITOR.BUTTONS[q].text = "Remove collision";
						
						//local_go.REMOVE_COLLISION(local_go.NAME  , local_go.PROGRAM_NAME , local_go.PARENT);
					     SYS.DEBUG.LOG('add collider')		
						}else{alert("ERROR MSG: ADD_COLLISION not success.");}
					//////////////////////////
					}
					else if ( local_go.EDITOR.BUTTONS[q].text == "Remove collision" ) {
					
					REMOVE_COLLISION();
					local_go.COLLISION = null;
					local_go.EDITOR.BUTTONS[q].text = "Add collision";
					SYS.DEBUG.LOG('remove collider')		
					
					
					}
					
						 
					
					
					}
					//-----------------------------------------------------------------------------
					else if (local_go.EDITOR.BUTTONS[q].IAM == "5") {
					
					if (typeof PLAYER === 'undefined') {
					
						var local_res = prompt("Enter player type : " , "NORMAL" );
						if (isNaN(parseFloat(local_res.charAt(0)))){
						CREATE_PLAYER( local_go.NAME  , local_go.PROGRAM_NAME , local_go.PARENT , local_res , q);
						local_go.EDITOR.BUTTONS[q].text = "Deatach player";
				        SYS.DEBUG.LOG('atach player');
							
					
					  }
					  
					  }
					  else if ( typeof local_go.PLAYER != 'undefined'){
					  
					  DEATACH_PLAYER( local_go.NAME  , local_go.PROGRAM_NAME , local_go.PARENT  );
					  delete(local_go.PLAYER);
					  delete(PLAYER);
					  local_go.EDITOR.BUTTONS[q].text = "Atach player";
					  SYS.DEBUG.LOG('deatach player , also destroy PLAYER global object.');
					  
					 }
					 
					}
					//-----------------------------------------------------------------------------
					//-----------------------------------------------------------------------------
					else if (local_go.EDITOR.BUTTONS[q].IAM == "6") {
					
					if ( local_go.PARTICLE == null) {
					
						var local_res = prompt("Enter particle type : " , "FONTAN" );
						if (isNaN(parseFloat(local_res.charAt(0)))){
				
						ADD_PARTICLE( local_go.NAME  , local_go.PROGRAM_NAME , local_go.PARENT , local_res );
						local_go.CREATE_PARTICLE(local_res)
						local_go.EDITOR.BUTTONS[q].text = "Remove particle";
						SYS.DEBUG.LOG('atach player');	
					
					  }
					  
					  }
					  else if (typeof local_go.PARTICLE != null ){
					  
					  REMOVE_PARTICLE( local_go.NAME  , local_go.PROGRAM_NAME , local_go.PARENT  );
					  local_go.TYPE_OF_GAME_OBJECT="empty";
					  delete(local_go.PARTICLE);
					  local_go.PARTICLE = null;
					  local_go.EDITOR.BUTTONS[q].text = "Add particle";
					  SYS.DEBUG.LOG('particle removed from ' + local_go.NAME);
					  
					 }
					 
					}
					//-----------------------------------------------------------------------------
					//-----------------------------------------------------------------------------
					else if (local_go.EDITOR.BUTTONS[q].IAM == "7") {
					
							if ( local_go.TEXTBOX == null) {
					
						var local_res = prompt("Enter text value : " , "HELLO" );
						var local_color = prompt("Enter color value : " , "red" );
						var local_textcolor = prompt("Enter Text color value : " , "black" );
						var local_radius = prompt("Enter rect radius  value : " , 15 );
						local_res = "" + local_res.toString();
						ADD_TEXTBOX( local_go.NAME  , local_go.PROGRAM_NAME , local_go.PARENT , local_res ,  local_radius , local_color , local_textcolor);
						local_go.CREATE_TEXTBOX(local_res , local_radius , local_color ,local_textcolor);
						local_go.EDITOR.BUTTONS[q].text = "Remove textbox";
						SYS.DEBUG.LOG('atach textbox');	
				
					  
					  }
					  else if (typeof local_go.TEXTBOX != null ){
					  
					  REMOVE_TEXTBOX( local_go.NAME  , local_go.PROGRAM_NAME , local_go.PARENT  );
					  local_go.TYPE_OF_GAME_OBJECT="empty";
					  delete(local_go.TEXTBOX);
					  local_go.TEXTBOX = null;
					  local_go.EDITOR.BUTTONS[q].text = "Add textbox";
					  SYS.DEBUG.LOG('textbox removed from ' + local_go.NAME + " . And .TEXTBOX is :" + local_go.TEXTBOX);
					  
					 }

	
					
					}
    				//-----------------------------------------------------------------------------
								//-----------------------------------------------------------------------------
					else if (local_go.EDITOR.BUTTONS[q].IAM == "8") {
					
							if ( local_go.WEBCAM == null) {
					
						var local_res = prompt("Choose NORMAL if you wanna simple webcam view or enter value 'NUI' for motion detect component + webcam view : " , "NORMAL" );
						
						if (local_res == "NORMAL") {
							
						
						var local_type_of_dim = prompt("Just press enter to make video with the same dimensions like game_object , any other value set dimensions of webcam video. " , "GAME_OBJECT" );
						
						if (local_type_of_dim == "GAME_OBJECT") {
							
						local_go.CREATE_WEBCAM(local_res , local_type_of_dim);
						ADD_WEBCAM( local_go.NAME  , local_go.PROGRAM_NAME , local_go.PARENT , local_res ,  local_type_of_dim);
						
						local_go.EDITOR.BUTTONS[q].text = "Remove webcam";
						SYS.DEBUG.LOG('atach webcam');								
						}else {
							
							// DIMENSIONS_TYPE = WEBCAM_DIMENSION
						local_go.CREATE_WEBCAM(local_res , local_type_of_dim);
						ADD_WEBCAM( local_go.NAME  , local_go.PROGRAM_NAME , local_go.PARENT , local_res ,  "WEBCAM_DIMENSION");	
							
						local_go.EDITOR.BUTTONS[q].text = "Remove webcam";
						SYS.DEBUG.LOG('atach webcam');		
						}
						
							
						}else if (local_res == "NUI"){ 
							
						
						
						var local_type_of_dim = prompt("Just press enter to make video with the same dimensions like game_object , any other value set dimensions of webcam video. " , "GAME_OBJECT" );
						
						var detectPointByVer = prompt(" Sum of motion detect point for vertical line, 8 is optimal for max value and 1 is minimum . " , 6 );
						var detectPointByHor = prompt(" Sum of motion detect point for horizontal line, 8 is optimal for max value and 1 is minimum . " , 6 );
				
						if 	(!isNaN(detectPointByVer) && !isNaN(detectPointByHor)  && isNaN(local_type_of_dim) ){
				
						local_go.CREATE_WEBCAM(local_res , local_type_of_dim);
						ADD_WEBCAM( local_go.NAME  , local_go.PROGRAM_NAME , local_go.PARENT , local_res ,  local_type_of_dim , detectPointByVer , detectPointByHor);
						
						local_go.EDITOR.BUTTONS[q].text = "Remove webcam";
						SYS.DEBUG.LOG('atach webcam');								
							
						}else {
							
							SYS.DEBUG.WARNING(" Error in CREATE_WEBCAM procedure Description : type of dimensions must be string , Sum of point must be number.")
							
						}
						 
						
							
						}
						
					  }else {
				
						  local_go.DESTROY_WEBCAM();
                          REMOVE_WEBCAM( local_go.NAME  , local_go.PROGRAM_NAME , local_go.PARENT);
					  }
					
	
					
					}
    				//-----------------------------------------------------------------------------
					
					
					
					}
					else {
					
					local_go.EDITOR.GAME_OBJECT_MENU.VISIBLE = false; 
					
					}

				 }
			  
		}
		
		//################
	
		
		
		if (  SYS.MOUSE.x > local_go.EDITOR.ACTOR_DRAG_RECT_POS.X()   + local_go.EDITOR.ACTORS_AREA_HEIGHT && SYS.MOUSE.x < local_go.EDITOR.ACTOR_DRAG_RECT_POS.X() +  local_go.EDITOR.ACTOR_DRAG_RECT_DIM.WIDTH() +local_go.EDITOR.ACTORS_AREA_HEIGHT && SYS.MOUSE.y > local_go.EDITOR.ACTOR_DRAG_RECT_POS.Y() +local_go.EDITOR.ACTORS_AREA_HEIGHT   && SYS.MOUSE.y < local_go.EDITOR.ACTOR_DRAG_RECT_POS.Y() +    local_go.EDITOR.ACTOR_DRAG_RECT_DIM.HEIGHT() +local_go.EDITOR.ACTORS_AREA_HEIGHT) {
			
			if (SYS.MOUSE.BUTTON_PRESSED == "LEFT") {
			local_go.EDITOR.ACTOR_DRAG = true;
			local_go.EDITOR.ACTOR_START_X =  parseFloat(    SYS.MOUSE.x.toFixed(2)  - local_go.POSITION.X()  - local_go.EDITOR.ACTORS_AREA_HEIGHT ); 
			local_go.EDITOR.ACTOR_START_Y =  parseFloat(    SYS.MOUSE.y.toFixed(2)  - local_go.POSITION.Y()  - local_go.EDITOR.ACTORS_AREA_HEIGHT ); 
		    }
			else if (SYS.MOUSE.BUTTON_PRESSED == "RIGHT") {
			
			  if (	local_go.EDITOR.GAME_OBJECT_MENU.VISIBLE == false ) {
			  
			  		for (var w=0;w<local_go.EDITOR.BUTTONS.length;w++){

						local_go.EDITOR.BUTTONS[w].POSITION.x =  SYS.MOUSE.x;
						local_go.EDITOR.BUTTONS[w].POSITION.y =  SYS.MOUSE.y;
			  
					}
					local_go.EDITOR.GAME_OBJECT_MENU.VISIBLE = true;
					
			  } 
			
			
			
			}
			
			
			
		}
				
			
			// HOVER  ACTORS  
				 if ( local_go.EDITOR.ACTOR_BLUE_HOVER == true ){
				 
				 local_go.EDITOR.ACTOR_X_IN_MOVE = true;
				 local_go.EDITOR.ACTOR_START_X =  parseFloat(    SYS.MOUSE.x.toFixed(2)  -   local_go.POSITION.X() ); 
				 
				 
				 }
				 else if (local_go.EDITOR.ACTOR_GREEN_HOVER == true ) {
				 
				 local_go.EDITOR.ACTOR_Y_IN_MOVE = true;
				 local_go.EDITOR.ACTOR_START_Y =  parseFloat(    SYS.MOUSE.y.toFixed(2)  -   local_go.POSITION.Y() ); 
				 
				 }
				



                           if (selected_something == false){
						   
						   local_go.DESELECT_ALL();
						   
						   }

				
			
			//-------------------------------//-------------------------------//-------------------------------
			}// end of EDITOR
			//-------------------------------//-------------------------------//-------------------------------
				
				
				
				if (selected_something == false && local_go.NAME.indexOf("___VIRTUALKEYBOARD") == -1	) {
				 ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.TARGET_MODUL =  undefined;
				 ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.TARGET = undefined;
				}
			// local_go 
			
			}
			
			
		}
		

		
		
			if (ROOT_ENGINE.ENGINE_EDITOR == true ){
		
		    
		
		    if (ROOT_ENGINE.GUI.VISIBLE == false && selected_something == false  && 	SYS.MOUSE.BUTTON_PRESSED == "RIGHT" ) {
				
				  for (var x=0;x<ROOT_ENGINE.GUI.BUTTONS.length;x++){
					  
				  ROOT_ENGINE.GUI.BUTTONS[x].POSITION.x =  SYS.MOUSE.x;
				  ROOT_ENGINE.GUI.BUTTONS[x].POSITION.y =  SYS.MOUSE.y;
					  
				  }
				  
				 
				ROOT_ENGINE.GUI.VISIBLE = true;
				
			}
			else if(ROOT_ENGINE.GUI.VISIBLE == true) {
				

				 for (var x=0;x<ROOT_ENGINE.GUI.BUTTONS.length;x++){
				
				    if ( SYS.MOUSE.x > ROOT_ENGINE.GUI.BUTTONS[x].POSITION.x    && SYS.MOUSE.x < ROOT_ENGINE.GUI.BUTTONS[x].POSITION.x  +  ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.WIDTH() && SYS.MOUSE.y > ROOT_ENGINE.GUI.BUTTONS[x].POSITION.y  + ROOT_ENGINE.GUI.BUTTONS[x].Y_OFFSET&& SYS.MOUSE.y < ROOT_ENGINE.GUI.BUTTONS[x].POSITION.y + ROOT_ENGINE.GUI.BUTTONS[x].Y_OFFSET + ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.HEIGHT() ) {
				 
					 if (ROOT_ENGINE.GUI.BUTTONS[x].IAM == "1") {
					 
						// ADD NEW OBJECT
						var sign_name = prompt("Enter gameObject name :" , "noname" );
						if (isNaN(parseFloat(sign_name.charAt(0)))){
						var sign_name2 = prompt("Enter gameObject parent modul :" , "STARTER" );						
						if (isNaN(parseFloat(sign_name.charAt(0)))){

						ADD( sign_name , 45 , 45, 10, 10 , canvas.id , sign_name2 )

						}else{alert("ERROR MSG: GameObject name created not success.");}
						}else{alert("ERROR MSG: GameObject name created not success.");}
						 
					 }
					 else if (ROOT_ENGINE.GUI.BUTTONS[x].IAM == "2") {
						 	for (var z=0;z<SYS.RUNNING_PROGRAMS.length;z++){
								window[SYS.RUNNING_PROGRAMS[z]].ENGINE.EXIT_EDIT_MODE();
							}
					 }
					 else if (ROOT_ENGINE.GUI.BUTTONS[x].IAM == "3") {
						 	
						//runtime only 
						// change draw interval and update
						var sign_name = prompt("Enter   program DRAW_INTERVAL :" , 15 );
						if (!isNaN(parseFloat(sign_name))){
						var sign_name2 = prompt("Enter  program UPDATE_INTERVAL :" , 15 );						
						if (!isNaN(parseFloat(sign_name2))){

						 SYS.DEBUG.LOG("Program interval now is   " + sign_name + "  . best range is [1 , 70]  ");
						 
						 window[ROOT_ENGINE.PROGRAM_ID].DRAW_INTERVAL = parseFloat(sign_name);
						 window[ROOT_ENGINE.PROGRAM_ID].UPDATE_INTERVAL = parseFloat(sign_name2);
						 
						  SET_MAIN_INTERVAL(  ROOT_ENGINE.PROGRAM_ID , sign_name , sign_name2 );

						}else{alert("ERROR MSG: Program interval not success changed.");}
						}else{alert("ERROR MSG: Program interval not success changed.");}
						
							
					 }
					 else if (ROOT_ENGINE.GUI.BUTTONS[x].IAM == "4") {
						 	
						
						if (APPLICATION.ACCOUNT_SERVICE_AUTO_RUN == true){
						APPLICATION.ACCOUNT_SERVICE_AUTO_RUN = false;
						ROOT_ENGINE.GUI.BUTTONS[3].text = "Switch AutoConnect to true";
 
						}
						else{
						APPLICATION.ACCOUNT_SERVICE_AUTO_RUN = true;
						ROOT_ENGINE.GUI.BUTTONS[3].text = "Switch AutoConnectt to false";		
 
						}
						
						SAVE("Application" , APPLICATION)
							
					 }
					 else if (ROOT_ENGINE.GUI.BUTTONS[x].IAM == "5") {
						 	
						
						if (APPLICATION.EDITOR_AUTORUN == true){
						APPLICATION.EDITOR_AUTORUN = false;
						ROOT_ENGINE.GUI.BUTTONS[4].text = "Switch editorAutoRun to true";
 
						}
						else{
						APPLICATION.EDITOR_AUTORUN = true;
						ROOT_ENGINE.GUI.BUTTONS[4].text = "Switch editorAutoRun to false";		
 
						}
						
						SAVE("Application" , APPLICATION)
							
					 }
					 
					 
					 
					
					}

				 }
				 
				ROOT_ENGINE.GUI.VISIBLE = false;
				
			}
		
		
					//
			
				 if(ROOT_ENGINE.GUI.LIST_OF_OBJECTS.VISIBLE == true) {
				
				 for (var x=0;x<ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES.length;x++){
				
				    if ( SYS.MOUSE.x > ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.x    && SYS.MOUSE.x < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.x  +  ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.WIDTH() && SYS.MOUSE.y > ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.y  + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].Y_OFFSET&& SYS.MOUSE.y < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.y + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].Y_OFFSET + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.HEIGHT() ) {


					ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].TAP()
					
					
					}

				 }
				 
				
			}
			//
		
		
	        }
		
		
};


  
} 
   //new part        
/**
Copyright 2016, zlatnaspirala@gmail.com
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

    * Redistributions of source code must retain the above copyright
notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above
copyright notice, this list of conditions and the following disclaimer
in the documentation and/or other materials provided with the
distribution.
    * Neither the name of zlatnaspirala@gmail.com nor the names of its
contributors may be used to endorse or promote products derived from
this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


/**
Constructor 
GAME_OBJECT ( name  , modul , x , y , w , h , speed , PROGRAM_NAME)
Type : Class

Program create instance of this class  from  class modul :
HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_OBJECT("STOSKE" , 22, 42, 22 , 22 , "DIAMETRIC");

*/

function GAME_OBJECT ( name  , modul , x , y , w , h , speed , PROGRAM_NAME) {
		
	
	var ROOT_GAME_OBJECT = this;
	
		
	//alias global access
	
	if ( name == 'system' || name.indexOf('___VIRTUALKEYBOARD_') != -1) {
		
		ROOT_GAME_OBJECT.VISIBLE = true;
		window["" + name] = this;
	}
	else {
		
		window["" + name] = this;
		ROOT_GAME_OBJECT.VISIBLE = true;
	
	
	}
	
	
	
	this.ID = parseFloat(Math.random()*4560000+Math.random()*1230000).toFixed(0);
	this.PARENT = modul;
	this.PROGRAM_NAME = PROGRAM_NAME;
	this.NAME = name;
	
	
	
	
	this.AUTO_UPDATE = true;
	this.FOCUS = false; // similar SELECTED but for runtime mode only
	this.TYPE_OF_GAME_OBJECT = 'empty';
	this.ENUMERATION = [ 'empty' , "ANIMATION" , "TEXT_BOX" , "PATRICLE" , "NO_RENDER"  , "ANIMATION_TEXT_BOX" , "ANIMATION_PATRICLE" ];
    this.DESTROY_ON_GAMEMAP_EXIT = true;
	this.DRAG_STATUS = true;
	this.DRAG = true;
	this.DRAG_START_X = 0;
	this.DRAG_START_Y = 0;
    this.DRAG_DELTA = 0;
	
	this.zoom_scale = 0;
	this.globalAlpha = 1;
	
	
	if ( (typeof x && typeof y )  === 'number' ) {
	
		if (typeof speed === 'number' ){
		
		this.POSITION = new POSITION( x , y , x ,  y , speed );
		
		}else{
		
		this.POSITION = new POSITION( x , y , x ,  y , 1 );
		
		}
	
	}
	else {
	this.POSITION = new POSITION(10, 10 , 200 , 200 , 1 );
	}
	
  
	if ( ( typeof w && typeof h)  === 'number' ) {

		this.DIMENSION = new DIMENSION ( w , h );
	
	}else {

		this.DIMENSION = new DIMENSION ( 10 , 10 );
	
	}
	
    //this.ON_TARGET_POSITION = function(){};
	this.POSITION.parentModul = modul;
	this.POSITION.parentGameObject = name;
	this.POSITION.PROGRAM_NAME = PROGRAM_NAME;
	this.POSITION.DIMENSION = this.DIMENSION;
	//this.POSITION.ON_TARGET_POSITION = this.ON_TARGET_POSITION;
	
	
    this.ANIMATION = null;
	this.CREATE_ANIMATION = function( surf ,TYPE_, FrameIndex ,source  , ID , blink_ , min_ , max_ , step , speed_ , opacity_ ){
	
	    this.ANIMATION = new  ANIMATION ( surf ,TYPE_, FrameIndex ,source  , ROOT_GAME_OBJECT , ID , blink_ , min_ , max_ , step , speed_ , opacity_ );
		this.TYPE_OF_GAME_OBJECT = 'ANIMATION';
		//SYS.DEBUG.LOG("images added in memory.... ID " + ID);
	
	    };
	
 
	
	
	this.CREATE_PLAYER = function(type_ ){
		
	ROOT_GAME_OBJECT.PLAYER = {
		
		TYPE : type_,
		X : ROOT_GAME_OBJECT.POSITION.x, // for platform
		Y : ROOT_GAME_OBJECT.POSITION.y,
		SPEED : 1,
		CONTROL : {
			RIGHT : false,
			LEFT : false,
			JUMP : false,
			DOWN : false,
		},
		POSITION : ROOT_GAME_OBJECT.POSITION,
		BREAK_AT_MOMENT_STATUS : false,
		
	};
		window["PLAYER"] = ROOT_GAME_OBJECT.PLAYER;
		this.POSITION.PLAYER= ROOT_GAME_OBJECT.PLAYER;
		
		if (type_ == "PLATFORMER"){
			
		window[PROGRAM_NAME].ENGINE.GAME_TYPE = "PLATFORMER";
		//ROOT_GAME_OBJECT.POSITION.TYPE = "PLAYER";
		//ROOT_GAME_OBJECT.POSITION.SET_POSITION(45,45, "DIAMETRIC");
		
		}else {
		
		window[PROGRAM_NAME].ENGINE.GAME_TYPE = "NORMAL_CONTROL";
		//ROOT_GAME_OBJECT.POSITION.TYPE = "PLAYER";
		
		}
		
		
	};
	
	
	
	
	this.TEXTBOX = null;	
    this.TRACK_KEY = null;
	this.CREATE_TEXTBOX = function( text , radius , color , textColor){
		
	if ( (typeof text != 'undefined' && typeof radius!= 'undefined' && typeof color != 'undefined' && typeof textColor!= 'undefined') ) {
		
	this.TEXTBOX = new RECT( text ,  ROOT_GAME_OBJECT ,radius , color , textColor ); 
	this.TYPE_OF_GAME_OBJECT = "TEXT_BOX";
    this.TRACK_KEY = true;
	this.TEXTBOX.TEXT  = text;
	this.TEXTBOX.TEXT += window[ROOT_GAME_OBJECT.PROGRAM_NAME].ENGINE.KEYBOARD.CAPTURE_CHAR;
	this.FOCUS = true;
	this.TEXTBOX.ON_PRESS_ENTER = function(){};
	ROOT_GAME_OBJECT.EDITOR.BUTTONS[6].text = "Remove textbox";
	
	}	
	else {
	
	SYS.DEBUG.WARNING("TEXT_BOX error in constructor : ( text , radius , color, textColor) cant be undefined.")
		
	}	
	};
	
	
	
	
	this.DESTROY_AFTER = null;
	this.DESTROY_ME_AFTER_X_SECUND = function( sec , name  , x  , ROOT_EVENTS ){
	
	this.DESTROY_AFTER = sec*20;      
	if (APPLICATION.EDITOR == true){
	DESTROY_DELAY ( name ,  sec , ROOT_GAME_OBJECT.PARENT ,  ROOT_GAME_OBJECT.PROGRAM_NAME );
	}
	
	};
	
	
	
	this.COLLISION = null;
	this.POSITION.STATIC = false;
	this.COLIDER = function(type__ , margin ){
		
		this.TYPE = type__;
		
		if ( typeof margin === 'number' )
		{
			this.margin = margin;
			
		}else {
			
			this.margin = 1.02;
			
		}
		 
	};
	
	this.CREATE_COLLISION = function(type__, margin ){
		
	ROOT_GAME_OBJECT.COLLISION =  new ROOT_GAME_OBJECT.COLIDER(type__ , margin );	
	ROOT_GAME_OBJECT.EDITOR.BUTTONS[3].text = "Remove collision";
	
	};
	

	this.EDITOR = {
		
		SELECTED : false , 
		ENABLE : HELLO_WORLD.ENGINE.ENGINE_EDITOR , 
        ACTORS_AREA_HEIGHT : 10 , 
		ACTOR_BLUE_HOVER : false,
		ACTOR_GREEN_HOVER : false,
		ACTOR_CENTER_OSCILATOR : new SYS.MATH.OSCILLATOR( 0 , 2 , 0.01),
		ACTOR_START_X : 0,
		ACTOR_START_Y : 0,
		ACTOR_DELTA : 0,
		ACTOR_X_IN_MOVE : false, 
		ACTOR_Y_IN_MOVE : false, 
		ACTOR_DRAG_RECT_DIM : new  DIMENSION (5,5),
		//ACTOR_DRAG_RECT_POS : SYS.ARRAY_OPERATION.DEEP_COPY.getCloneOfObject( this.POSITION ) ,
		ACTOR_DRAG_RECT_POS : this.POSITION  ,
		ACTOR_DRAG : false , 
	    BUTTONS :  [
			new RIGHT_MENU_BUTTON( "Destroy gameObject" , 0 , "1" ) ,
			new RIGHT_MENU_BUTTON( "Destroy after secund " , 20 , "2") , 
		    new RIGHT_MENU_BUTTON( "Add animation " , 40 , "3") , 
			new RIGHT_MENU_BUTTON( "Add collision " , 60 , "4") , 
			new RIGHT_MENU_BUTTON( "Atach player " , 80 , "5" , "res/system/images/html5/plus.png") , 
			new RIGHT_MENU_BUTTON( "Add particle " , 100 , "6" , "res/system/images/html5/particle.png") , 
			new RIGHT_MENU_BUTTON( "Add textbox " , 120 , "7" , "res/system/images/html5/textbox.png") , 
			new RIGHT_MENU_BUTTON( "Add webcam  " , 140 , "8" , "res/system/images/html5/HTML5-Device-Access.png" ) , 
		],
		GAME_OBJECT_MENU : {
		VISIBLE : false , 
		},
	};
	
	
	
	
	this.WEBCAM = null;
	this.SET_WEBCAM_VIEW = function(type_ , DIMENSIONS_TYPE){
			// just webcam view
			ROOT_GAME_OBJECT.WEBCAM = new Object();
			ROOT_GAME_OBJECT.WEBCAM.VIDEO = SYS.DOM.E('webcam');
	        SET_STREAM(ROOT_GAME_OBJECT.WEBCAM.VIDEO);
			
			if (DIMENSIONS_TYPE == 'GAME_OBJECT' ) {
			
			ROOT_GAME_OBJECT.WEBCAM.DIMENSIONS_TYPE  = 'GAME_OBJECT';
			}
			else {
			
			ROOT_GAME_OBJECT.WEBCAM.DIMENSIONS_TYPE  = 'WEBCAM_DIMENSION';
			ROOT_GAME_OBJECT.DIMENSION.H = CONVERTOR.PIY_TO_PER(SYS.DOM.E('webcam').height);
			ROOT_GAME_OBJECT.DIMENSION.W = CONVERTOR.PIX_TO_PER(SYS.DOM.E('webcam').width);
			
			}
			
			if (type_ == 'NORMAL') {
	        ROOT_GAME_OBJECT.TYPE_OF_GAME_OBJECT = "WEBCAM";
			}
			else if (type_ == 'NUI') {
		
			SYS.DOM.E("canvas-blended").height = SYS.DOM.E('webcam').height;
			SYS.DOM.E("canvas-blended").width = SYS.DOM.E('webcam').width;
			SYS.DOM.E("canvas-render").height = SYS.DOM.E('webcam').height;
			SYS.DOM.E("canvas-render").width = SYS.DOM.E('webcam').width;
			ROOT_GAME_OBJECT.TYPE_OF_GAME_OBJECT = "WEBCAM_NUI";
			ROOT_GAME_OBJECT.WEBCAM.BLEND_CANVAS = SYS.DOM.E("canvas-blended");
			ROOT_GAME_OBJECT.WEBCAM.RENDER_CANVAS = SYS.DOM.E("canvas-render");
			ROOT_GAME_OBJECT.WEBCAM.NOTES = [];
			}
	};
	this.CREATE_WEBCAM = function( type_ , DIMENSIONS_TYPE , numFieldV , numFieldH ){
		
		if (typeof type_ != 'undefined') {
		
		if (type_ == "NUI") {
		
			ROOT_GAME_OBJECT.SET_WEBCAM_VIEW("NUI" , DIMENSIONS_TYPE )
			ROOT_GAME_OBJECT.WEBCAM.numFieldV = numFieldV;
			ROOT_GAME_OBJECT.WEBCAM.numFieldH = numFieldH;
			ROOT_GAME_OBJECT.WEBCAM.BS = ROOT_GAME_OBJECT.WEBCAM.BLEND_CANVAS.getContext('2d');
			ROOT_GAME_OBJECT.WEBCAM.RC = ROOT_GAME_OBJECT.WEBCAM.RENDER_CANVAS.getContext('2d');			
			ROOT_GAME_OBJECT.WEBCAM._N_ = new Array();
			CREATE_MOTION_PARAMETERS( ROOT_GAME_OBJECT)
			CREATE_MOTION_FIELDS( ROOT_GAME_OBJECT)
			ROOT_GAME_OBJECT.WEBCAM.HIDE_INDICATED_POINT = false;
	        ROOT_GAME_OBJECT.WEBCAM.DRAW = WEBCAM_DRAW;
		}
		else if ("NORMAL") {
			
			ROOT_GAME_OBJECT.SET_WEBCAM_VIEW("NORMAL" , DIMENSIONS_TYPE)
			
		}
		}
		else {SYS.DEBUG.WARNING("Pleas enter type of webcam component .  [ NUI , NORMAL ]  ");}
	};
	

	this.DESTROY_WEBCAM = function(){
	
	ROOT_GAME_OBJECT.TYPE_OF_GAME_OBJECT = "NO_RENDER";
	ROOT_GAME_OBJECT.WEBCAM.DRAW = function(){};
	ROOT_GAME_OBJECT.WEBCAM.NOTES = [];
	ROOT_GAME_OBJECT.WEBCAM.BS = null;
	ROOT_GAME_OBJECT.WEBCAM.RC = null;	
	ROOT_GAME_OBJECT.WEBCAM._N_ = [];
	delete ( ROOT_GAME_OBJECT.WEBCAM ) 
	ROOT_GAME_OBJECT.WEBCAM = null;
	 
	};
	
	
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$//$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$//$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	// MUTIRTC_PEER 
	
	this.ON_PEER_CREATED = { "DONE" : function(){ }/* MAIN_PEER.CHANNEL.SET('LEVEL1') }  */ };
	
	this.CREATE_PEER = function (port){
		
	if (typeof port != 'undefined') {
      window['MAIN_PEER'].PORT = port;
	}
	else 
	{
	  window['MAIN_PEER'].PORT = 12034;
	}
		
	if (typeof window['MAIN_PEER'].REMOTE_DATA == 'undefined') {
		 
		 ROOT_GAME_OBJECT.MAIN_PEER = window['MAIN_PEER'];
		 ROOT_GAME_OBJECT.MAIN_PEER.ADDRESS = 'localhost';
		 ROOT_GAME_OBJECT.MAIN_PEER.ON_PEER_CREATED = ROOT_GAME_OBJECT.ON_PEER_CREATED;
		 	 ROOT_GAME_OBJECT.MAIN_PEER.LOADED = function(){
			 
			 console.log("peer loaded2")
			 
		 };
	
		 
     if ( typeof window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER") == 'undefined' ) {
		 
	
	  setTimeout ( ROOT_GAME_OBJECT.CREATE_PEER , 50 );
      return;	  
		
		 
	 } 	 
	 else{
	 if ( typeof window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").NEW_OBJECT == 'function') {
			 
			 
		 }else{
		
   setTimeout ( ROOT_GAME_OBJECT.CREATE_PEER , 50 );
      return;		
			 
		 }
		 
	 }
	 
	 
	 window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").NEW_OBJECT("system_object_for_MAIN_peer" , 5 , 5 , 15 , 8 , 10);
	 var sys_btn_alias = window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS("system_object_for_MAIN_peer");
	 
	 sys_btn_alias.DIMENSION.W = ROOT_GAME_OBJECT.DIMENSION.W;
	 sys_btn_alias.CREATE_TEXTBOX("enter message" , 10 , "black" , "lime") ;
	 system_object_for_MAIN_peer.TEXTBOX.font = '18px Arial';
	 
	 
	 system_object_for_MAIN_peer.TEXTBOX.ON_PRESS_ENTER = function (){
	
	
	    SYS.DOM.E('SEND_BTN_').value = system_object_for_MAIN_peer.TEXTBOX.TEXT;
		SYS.DEBUG.LOG("SEND TEXT MSG TO CURRENT CHANNEL");
        system_object_for_MAIN_peer.TEXTBOX.TEXT = '';
		ROOT_GAME_OBJECT.MAIN_PEER.SEND_MSG ();

	 };
	 
	 
	 
	 
	 window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").NEW_OBJECT("system_object_for_MAIN_peer_BTN_connect" , 5 , 5 , 9 , 7 , 10);
	 var sys_btn_connect = window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS("system_object_for_MAIN_peer_BTN_connect");
	 sys_btn_connect.CREATE_TEXTBOX("Connect" , 10 , "black" , "lime") ;
	 sys_btn_connect.TEXTBOX.font = '18px Arial';
	 sys_btn_connect.TEXTBOX.EDIT = false;
	 sys_btn_connect.TAP  = function(){		 
		 if ( rtcMultiConnection.sessionDescription == null) {
			 
			MAIN_PEER.CONNECT_TO_CHANNEL()
			
		 }
		 
	 };
	
	 
	 
     ///////////////////////
	 ROOT_GAME_OBJECT.ON_UPDATE = function () {
		 
	 //sys_btn_alias.POSITION.x = ROOT_GAME_OBJECT.POSITION.x;
	 sys_btn_alias.POSITION.SET_POSITION (  ROOT_GAME_OBJECT.POSITION.x ,  ROOT_GAME_OBJECT.POSITION.y + ROOT_GAME_OBJECT.DIMENSION.H*1.1, 'DIAMETRIC') ;
	 sys_btn_connect.POSITION.SET_POSITION (  ROOT_GAME_OBJECT.POSITION.x + ROOT_GAME_OBJECT.DIMENSION.W/1.7 ,  ROOT_GAME_OBJECT.POSITION.y , 'DIAMETRIC') ;
		 
	 };
	 
	 
	// ROOT_GAME_OBJECT.
	//
		 
		 ROOT_GAME_OBJECT.MAIN_PEER.REMOTE_DATA = {
			 
			 OBJECTS : [],
			 
			 //SEND DATA
			 SHARE : function(object){
				 
				rtcMultiConnection.send( { 'shared_object' : object , 'operation' : 'share' } );
				object.PEER_SHARED = true;
				
			 },
			 SHARE_POSITION : function (object){
				 
				 object.POSITION.SHARE_POSITION = true;
				 
			 },
			 
			 NEW_POSITION : function(object){
				 
				rtcMultiConnection.send( { 'nameOfObject' : object.NAME , 'operation' : 'new_pos' , 'x' : object.POSITION.x , 'y' : object.POSITION.y   }  );
				 
			 },
			 
			 NEW_DIMENSION : function(object){
				 
				rtcMultiConnection.send( { 'nameOfObject' : object.NAME , 'operation' : 'new_dim' , 'x' : object.DIMENSION.W , 'y' : object.DIMENSION.H   }  );
				 
			 },
			 
			 
			 // DATA FROM SERVER
			 NETWORK_VIEW : function(e){
				 
			if (e.operation == 'share') {

				 window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_NETWORK_OBJECT(e.shared_object);

			 }
			 else if(e.operation == 'new_pos'){
				 
				  window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_NETWORK_POSITION(e);
				 
			 }
			 else if(e.operation == 'new_dim'){
				 
				 window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_NETWORK_DIMENSION(e);
				 
			 }
			 else if(e.operation == 'dimension&position'){
				 
				 
			 }
				 
				 
				 
			 },
			 
		 };
		 
		 
		 
		 ROOT_GAME_OBJECT.MAIN_PEER.CHANNEL = {
			 
			 GET : function(){
	 
				   return SYS.DOM.E('room-name').value;
			 
			 },
			 
			 SET : function (newvalue) {
			 
			      SYS.DOM.E('room-name').value = newvalue;
			 
			 } ,
			 
			 
		 };
		 
		 
		  ROOT_GAME_OBJECT.MAIN_PEER.LOCAL_USER = {
			 
			 GET : function(){
	 
				   return SYS.DOM.E('your-name').value;
			 
			 },
			 
			 SET : function (newvalue) {
			 
			      SYS.DOM.E('your-name').value = newvalue;
			 
			 } ,
			 
			 
		 };
		 
		 
		  ROOT_GAME_OBJECT.MAIN_PEER.SEND_MSG = function (){
		  
				if (typeof rtcMultiConnection != 'undefined') {

				rtcMultiConnection.send(SYS.DOM.E('SEND_BTN_').value);

				SYS.DOM.E('SEND_BTN_').value = '';
		        
				}
				
		  
		  },
		  
		  ROOT_GAME_OBJECT.MAIN_PEER.CONNECT_TO_CHANNEL = function() {
		  
		  
			 SYS.DOM.E('continue').onclick();
		  
		  
		  },
		  
	 ROOT_GAME_OBJECT.MAIN_PEER.LOGS = 'logs!';
  	 ROOT_GAME_OBJECT.TYPE_OF_GAME_OBJECT = "MAIN_PEER_OBJECT";
		  
		 
		 setTimeout( function(){
			 
			 MAIN_PEER.ON_PEER_CREATED.DONE();
			 
		 } , 200);
		 
		 
		 }
	else{
	
	 SYS.DEBUG.WARNING("from function CREATE_PEER -  MAIN PEER OBJECT ALREADY CREATED.");
	
	}	
	};
	
	
	
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$//$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$//$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	
	
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$//$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$//$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	this.GROUP = {

        ADD : function(name){
			
			var locx = window[ROOT_GAME_OBJECT.PROGRAM_NAME].ENGINE.MODULES.ACCESS_MODULE(ROOT_GAME_OBJECT.PARENT).GAME_OBJECTS.ACCESS(name).POSITION.x;
			var locy = window[ROOT_GAME_OBJECT.PROGRAM_NAME].ENGINE.MODULES.ACCESS_MODULE(ROOT_GAME_OBJECT.PARENT).GAME_OBJECTS.ACCESS(name).POSITION.y;
			
			var dx = ROOT_GAME_OBJECT.GROUP.MASTER_INITIALS.x - locx;
			var dy = ROOT_GAME_OBJECT.GROUP.MASTER_INITIALS.y - locy;
			
			ROOT_GAME_OBJECT.GROUP.GROUP_INITIALS.push( { x : dx , y : dy } );
			ROOT_GAME_OBJECT.GROUP.GROUP.push(name);
			
			delete(locx)
			delete(locy)
			
			//SYS.DEBUG.LOG(dx + "=============" + dy)
			
		},  	
        GROUP : [],
		GROUP_INITIALS : [],
		MASTER : ROOT_GAME_OBJECT.NAME,
		MASTER_INITIALS : { x : ROOT_GAME_OBJECT.POSITION.x  ,  y : ROOT_GAME_OBJECT.POSITION.y  },
		UPDATE : function(){
			
			
			
		},
	
	
	};
	
	
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$//$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$//$$$$$$$$$$$$$$$$$$$$$$$$$$$$

	this.EFFECTS = {
	
        FADE : {
		 IN : function(sec){
			
		var TIMER = setTimeout( function(){
		 
		 ROOT_GAME_OBJECT.globalAlpha += 0.02;
		 if (ROOT_GAME_OBJECT.globalAlpha < 1) {
		 ROOT_GAME_OBJECT.EFFECTS.FADE.IN();
		 }else {
		 ROOT_GAME_OBJECT.globalAlpha = 1;
		 }
		 
		 } , sec );
		 
		 },
		 OUT : function(sec){
		 
		 var TIMER = setTimeout( function(){
		 
		 ROOT_GAME_OBJECT.globalAlpha -= 0.02;
		 if (ROOT_GAME_OBJECT.globalAlpha > 0) {
		 ROOT_GAME_OBJECT.EFFECTS.FADE.OUT();
		 }else {
		 ROOT_GAME_OBJECT.globalAlpha = 0;
		 }
		 
		 } , sec );
		 
		  
		 },
			},
		ZOOM : {
		STATUS_FOR_IN : false,
		STATUS_FOR_OUT : false,
		ZOOM_IN_FINISHED : function(){ console.log("zoom in  ----finished.") },
		ZOOM_OUT_FINISHED : function(){ console.log("zoom out ----finished.") },
		VALUE : 0.5,
		IN : function(sec){
		var sec = sec;
		 
		this.STATUS_FOR_IN = true;
		
		var TIMER = setTimeout( function(){
		
		 if (ROOT_GAME_OBJECT.zoom_scale  <  ROOT_GAME_OBJECT.EFFECTS.ZOOM.VALUE) {
		 ROOT_GAME_OBJECT.zoom_scale  += 0.01;
		 ROOT_GAME_OBJECT.POSITION.SET_POSITION( ROOT_GAME_OBJECT.POSITION.x  - ROOT_GAME_OBJECT.zoom_scale , ROOT_GAME_OBJECT.POSITION.y - ROOT_GAME_OBJECT.zoom_scale , "DIAMETRIC" );
		 ROOT_GAME_OBJECT.DIMENSION.W = ROOT_GAME_OBJECT.DIMENSION.W + ROOT_GAME_OBJECT.zoom_scale*2;
		 ROOT_GAME_OBJECT.DIMENSION.H = ROOT_GAME_OBJECT.DIMENSION.H + ROOT_GAME_OBJECT.zoom_scale*2;
		 ROOT_GAME_OBJECT.EFFECTS.ZOOM.IN(sec);
		 
		 }else {
		  
		  ROOT_GAME_OBJECT.EFFECTS.ZOOM.ZOOM_IN_FINISHED();
		  ROOT_GAME_OBJECT.EFFECTS.ZOOM.STATUS_FOR_IN = false;
		   
		 }
		 
		 } , sec );
	 
		
		},
		OUT : function(sec){
		var sec = sec;
		this.STATUS_FOR_OUT = true;
		
		var TIMER = setTimeout( function(){
		 if (ROOT_GAME_OBJECT.POSITION.x < ROOT_GAME_OBJECT.GROUP.MASTER_INITIALS.x  ) {
		 ROOT_GAME_OBJECT.zoom_scale  -= 0.009;
		 ROOT_GAME_OBJECT.POSITION.SET_POSITION( ROOT_GAME_OBJECT.POSITION.x  + ROOT_GAME_OBJECT.zoom_scale , ROOT_GAME_OBJECT.POSITION.y + ROOT_GAME_OBJECT.zoom_scale , "DIAMETRIC" );
		 ROOT_GAME_OBJECT.DIMENSION.W = ROOT_GAME_OBJECT.DIMENSION.W - ROOT_GAME_OBJECT.zoom_scale*2;
		 ROOT_GAME_OBJECT.DIMENSION.H = ROOT_GAME_OBJECT.DIMENSION.H - ROOT_GAME_OBJECT.zoom_scale*2;
		 ROOT_GAME_OBJECT.EFFECTS.ZOOM.OUT(sec);
		 }else {
		 ROOT_GAME_OBJECT.zoom_scale = 0;
		 ROOT_GAME_OBJECT.EFFECTS.ZOOM.ZOOM_OUT_FINISHED();
		 ROOT_GAME_OBJECT.EFFECTS.ZOOM.STATUS_FOR_OUT = false;
		 }
		 
		 } , sec );
	 
		
		},
		},
		
		
	

	
	};

	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$//$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$//$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	this.PARTICLE = null;
	this.CREATE_PARTICLE = function(type_  ){
	// NEED to be created more particle system in future !!!
    ROOT_GAME_OBJECT.PARTICLE = new PARTICLE_FONTAN (ROOT_GAME_OBJECT);	
	ROOT_GAME_OBJECT.TYPE_OF_GAME_OBJECT="PATRICLE";
	
	};
	
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$//$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$//$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	this.CUSTOM	= function(){};
	 
	
	 this.DESELECT_ALL = function(){
	 
	 var exec_local = "" + ROOT_GAME_OBJECT.PROGRAM_NAME.toString();
	  for (var z=0;z<window[exec_local].ENGINE.MODULES.ACCESS(ROOT_GAME_OBJECT.PARENT).GAME_OBJECTS.length;z++){	
                  window[exec_local].ENGINE.MODULES.ACCESS(ROOT_GAME_OBJECT.PARENT).GAME_OBJECTS[z].EDITOR.SELECTED = false;
		}
		
	 };
	 
	 
    // For user override
	this.TOUCH_DOWN = function(){
		
		SYS.DEBUG.LOG("No atached event . EVENT_TOUCH_DOWN");
		
	};
	this.TAP = function(){
		
		SYS.DEBUG.LOG("No atached event . EVENT_TAP : similar click");
		
	};
	this.TOUCH_UP = function(){
		
		SYS.DEBUG.LOG("No atached event . EVENT_TOUCH_UP");
		
	};
	this.TOUCH_MOVE = function(){
		
		// SYS.DEBUG.LOG("No atached event . EVENT_TOUCH_MOVE");
		
	};
	 
	 
	this.UPDATE_STATUS = {
		
		STOP : function(){
		
		},
				
	};
	
	
	this.ROTATE = {
		
		ANGLE : 0 , //use for custum image drawing 
		RADIANS : 0, // fiktive
		ROTATE_ARROUNT_CENTER : function(){
			
	 	
			ORBIT ( 50 , 50 , ROOT_GAME_OBJECT.ROTATE.ANGLE , ROOT_GAME_OBJECT.POSITION );		
			
			
		},
		
		
	};		
			
	this.DRAW = function(s){

      if (ROOT_GAME_OBJECT.VISIBLE == true) { 
	  
     s.save()
	
		s.globalAlpha = ROOT_GAME_OBJECT.globalAlpha;
		
		if ( this.TYPE_OF_GAME_OBJECT == 'ANIMATION' ) {
		
		this.ANIMATION.DRAW();
		
		}
		else if (this.TYPE_OF_GAME_OBJECT == "TEXT_BOX") {
			
		this.TEXTBOX.DRAW(s);
		
		}
		else if (this.TYPE_OF_GAME_OBJECT == "TEXT_BOX_ANIMATION") {
			
		this.TEXTBOX.DRAW(s);
		this.ANIMATION.DRAW();
		
		}
		else if (this.TYPE_OF_GAME_OBJECT == "PATRICLE") {
		
		    this.PARTICLE.DRAW(s);
		}
		else if (this.TYPE_OF_GAME_OBJECT == "ANIMATION_TEXT_BOX") {
		 
			this.ANIMATION.DRAW()
			this.TEXTBOX.DRAW(s);
		}
		else if (this.TYPE_OF_GAME_OBJECT == "ANIMATION_PATRICLE") {
		    this.ANIMATION.DRAW()
		    this.PARTICLE.DRAW(s)	
		}
		else if (this.TYPE_OF_GAME_OBJECT == "WEBCAM") {
		
		if (ROOT_GAME_OBJECT.WEBCAM.DIMENSIONS_TYPE  = 'GAME_OBJECT'){
		s.drawImage(ROOT_GAME_OBJECT.WEBCAM.VIDEO ,  ROOT_GAME_OBJECT.POSITION.X() , ROOT_GAME_OBJECT.POSITION.Y() ,ROOT_GAME_OBJECT.DIMENSION.WIDTH() , ROOT_GAME_OBJECT.DIMENSION.HEIGHT() );
		}else {
		s.drawImage(ROOT_GAME_OBJECT.WEBCAM.VIDEO , ROOT_GAME_OBJECT.POSITION.X() , ROOT_GAME_OBJECT.POSITION.Y() , ROOT_GAME_OBJECT.WEBCAM.VIDEO.width, ROOT_GAME_OBJECT.WEBCAM.VIDEO.height);
		}
		
		}
		else if (this.TYPE_OF_GAME_OBJECT == "WEBCAM_NUI") {
	    
 		if (ROOT_GAME_OBJECT.WEBCAM.DIMENSIONS_TYPE  = 'GAME_OBJECT'){
		s.drawImage(ROOT_GAME_OBJECT.WEBCAM.VIDEO ,  ROOT_GAME_OBJECT.POSITION.X() , ROOT_GAME_OBJECT.POSITION.Y() ,ROOT_GAME_OBJECT.DIMENSION.WIDTH() , ROOT_GAME_OBJECT.DIMENSION.HEIGHT() );
		}else {
		s.drawImage(ROOT_GAME_OBJECT.WEBCAM.VIDEO , ROOT_GAME_OBJECT.POSITION.X() , ROOT_GAME_OBJECT.POSITION.Y() , ROOT_GAME_OBJECT.WEBCAM.VIDEO.width, ROOT_GAME_OBJECT.WEBCAM.VIDEO.height);
		}  
		blend(ROOT_GAME_OBJECT, s );
		checkAreas( ROOT_GAME_OBJECT );
		ROOT_GAME_OBJECT.WEBCAM.DRAW(s ,  ROOT_GAME_OBJECT.WEBCAM )
		
		}
		else if (this.TYPE_OF_GAME_OBJECT == "CUSTOM") {
		
		ROOT_GAME_OBJECT.CUSTOM(s);
		
		}
		else if (this.TYPE_OF_GAME_OBJECT == "NO_RENDER") {
			// nothing here
		}
		else if (this.TYPE_OF_GAME_OBJECT == "MAIN_PEER_OBJECT") {
			
		    s.fillStyle = "#192837";
			s.fillRect(this.POSITION.X() , this.POSITION.Y() ,  this.DIMENSION.WIDTH() , this.DIMENSION.HEIGHT() )			
			s.fillStyle = "lime";
			
			
			s.drawImage( image_system_8 , this.POSITION.X() + this.DIMENSION.WIDTH()/2, this.POSITION.Y() + 30 , 90 , 90 )			
			s.drawImage( image_system_conn , this.POSITION.X() + this.DIMENSION.WIDTH()/1.4, this.POSITION.Y() +30, 90 , 90 )			
			
			s.fillText( "Signaling IP Address : " + this.MAIN_PEER.ADDRESS , this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT , this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT * 4);
			s.fillText( "Name : " + this.MAIN_PEER.LOCAL_USER.GET() , this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT , this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT * 5);
			
			s.fillText( "Channel : " + this.MAIN_PEER.CHANNEL.GET() , this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT , this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT * 6);
			
			s.fillText( "peer logs : " + ROOT_GAME_OBJECT.MAIN_PEER.LOGS , this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT , this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT * 7);
			//ROOT_GAME_OBJECT.MAIN_PEER.LOGS = 'logs!';
		}
		
		
	
	s.restore()
	
	  }
		
	};
	
	
	this.DRAW_ACTOR = function(s){


	
	
s.save(); 

	s.font = '13px Arial';
	
	
	s.fillRect( 0 , this.POSITION.Y() ,  VIEW.W() , 1 )
	s.fillRect( this.POSITION.X(),  0 ,  1 , VIEW.H() )
	
	s.globalAlpha = 0.5;
	s.fillRect(this.POSITION.X() , this.POSITION.Y() ,  this.DIMENSION.WIDTH() , this.DIMENSION.HEIGHT() )
	s.globalAlpha = 0.9;
	
	if ( ROOT_GAME_OBJECT.EDITOR.SELECTED == true ) {
	
	s.fillText( "Name :" + this.NAME , this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT , this.POSITION.Y() - this.EDITOR.ACTORS_AREA_HEIGHT * 4);
	s.fillText( "Percent :" + CONVERTOR.PIX_TO_PER(this.POSITION.X().toString() ).toFixed(2)  + "%  y:" + CONVERTOR.PIY_TO_PER( this.POSITION.Y() ).toFixed(2) , this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT , this.POSITION.Y() - this.EDITOR.ACTORS_AREA_HEIGHT * 2.5);
	s.fillText( "Actor- x:" + this.POSITION.X().toFixed(2).toString() + " y:" + this.POSITION.Y().toFixed(2) , this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT , this.POSITION.Y() - this.EDITOR.ACTORS_AREA_HEIGHT);

	}
	//CONVERTOR.PIX_TO_PER( h );
	
	// actor rect for drag
	//ACTOR_DRAG_RECT
	s.strokeStyle = "blue";
	s.strokeRect( this.EDITOR.ACTOR_DRAG_RECT_POS.X() + this.EDITOR.ACTORS_AREA_HEIGHT , this.EDITOR.ACTOR_DRAG_RECT_POS.Y() + this.EDITOR.ACTORS_AREA_HEIGHT ,  this.EDITOR.ACTOR_DRAG_RECT_DIM.WIDTH() , this.EDITOR.ACTOR_DRAG_RECT_DIM.HEIGHT() );
	
	
	if ( this.EDITOR.ACTOR_BLUE_HOVER == true ) {
		s.fillStyle = "lime";
	}else {
		s.fillStyle = "blue";		
	}
	
    //BLU LINE ACTOR X-OSA
	s.fillRect(this.POSITION.X() , this.POSITION.Y() ,  this.EDITOR.ACTORS_AREA_HEIGHT*15 , this.EDITOR.ACTORS_AREA_HEIGHT )
	
    s.beginPath();
	s.moveTo(this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT*10 * 1.5 ,this.POSITION.Y() - 0.5 * this.EDITOR.ACTORS_AREA_HEIGHT );
	s.lineTo(this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT*10 * 1.5, this.POSITION.Y()  + 1.4 * this.EDITOR.ACTORS_AREA_HEIGHT );
	s.lineTo(this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT*12.5 * 1.5,this.POSITION.Y() + 1/2 * this.EDITOR.ACTORS_AREA_HEIGHT ); 
    s.closePath();
	s.fill();
	
	
	if ( this.EDITOR.ACTOR_GREEN_HOVER == true ) {
		
		s.fillStyle = "lime";
		
	} else {
		
		s.fillStyle = "green";
				
	}
	
	
	//BLU LINE ACTOR X-OSA
	s.fillRect(this.POSITION.X() , this.POSITION.Y() ,  this.EDITOR.ACTORS_AREA_HEIGHT , this.EDITOR.ACTORS_AREA_HEIGHT*15 )
	
    s.beginPath();
	s.moveTo(this.POSITION.X() - 0.5 * this.EDITOR.ACTORS_AREA_HEIGHT   ,this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT*10 * 1.5);
	s.lineTo(this.POSITION.X() + 1.4 * this.EDITOR.ACTORS_AREA_HEIGHT , this.POSITION.Y()  + this.EDITOR.ACTORS_AREA_HEIGHT*10 * 1.5 );
	s.lineTo(this.POSITION.X() + 1/2 * this.EDITOR.ACTORS_AREA_HEIGHT ,this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT*12.5 * 1.5); 
    s.closePath();
	s.fill();
	
	
	// fix color compositi near x i y 
	
	
	s.fillStyle = "red";
	s.beginPath();
	//s.strokeStyle = "rgba( 222 , " + this.PULSAR_G.VALUE + " , " + this.PULSAR_B.VALUE + " , " + this.PULSAR_A.VALUE + ")";
	s.arc(this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT/2 , this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT/2 , this.EDITOR.ACTORS_AREA_HEIGHT/2 ,  ( 0 )*Math.PI , ( 2 )*Math.PI );
	s.fill();
	s.closePath();
	
	s.beginPath();
	s.lineWidth = 1;
	s.strokeStyle = "white";
	s.arc(this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT/2 , this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT/2 , this.EDITOR.ACTORS_AREA_HEIGHT ,  ( this.EDITOR.ACTOR_CENTER_OSCILATOR.UPDATE() + 0.1 )*Math.PI , ( this.EDITOR.ACTOR_CENTER_OSCILATOR.UPDATE() - 0.1 )*Math.PI );
	s.stroke();
	
	s.closePath();
	
	
s.restore();

		
		
			
	if (ROOT_GAME_OBJECT.EDITOR.GAME_OBJECT_MENU.VISIBLE == true) {
	
	
		for (var x=0;x<ROOT_GAME_OBJECT.EDITOR.BUTTONS.length;x++){
	    
		//s.textBaseline = 'middle';
		s.save();
        s.globalAlpha = 1;
		if (ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].HOVER == false) {
		s.fillStyle = APPLICATION.SYSTEM.COLOR;
		s.fillRect( ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.X() , ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.Y() , ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.WIDTH() , ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.HEIGHT() );
		s.fillStyle = APPLICATION.SYSTEM.TEXT_COLOR;
		s.fillText( ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].text  , ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.X() , ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.Y() + ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.HEIGHT()/2 , ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.WIDTH());
		}else{
		s.fillStyle = APPLICATION.SYSTEM.HOVER_COLOR;
		s.fillRect( ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.X() , ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.Y() , ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.WIDTH() , ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.HEIGHT() );
		s.fillStyle = APPLICATION.SYSTEM.TEXT_COLOR;
		s.fillText( ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].text  , ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.X() , ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.Y() + ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.HEIGHT()/2 , ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.WIDTH());
		
		if (ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].icon == true) { 
         try{		
		 s.drawImage(  window["image_system_"+ ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].IAM]  , ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.X() + ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.WIDTH() - 30, ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.Y()  - 5 , 30 ,30);
		 }catch(e){/* Not nessesery */}
		}
		 
		}
	    s.restore();
		
		
		if (ROOT_GAME_OBJECT.WEBCAM != null) {
		
			//s.drawImage( , ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.X() , ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.Y() + ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.HEIGHT()/2 , ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.WIDTH());		
			
		}
		
	}
	
	
	
	}
	
	
	
	};
	
	this.ON_UPDATE = function(){};
	
	this.UPDATE = function(){
		
		if (this.AUTO_UPDATE == true) {
		ROOT_GAME_OBJECT.POSITION.UPDATE()
		}
		if (ROOT_GAME_OBJECT.EDITOR.ENABLE == false){
			
			if (ROOT_GAME_OBJECT.DESTROY_AFTER != null){
				if (ROOT_GAME_OBJECT.DESTROY_AFTER>0){ ROOT_GAME_OBJECT.DESTROY_AFTER--;}
			}
			
		}
			if (ROOT_GAME_OBJECT.GROUP.GROUP.length > 0 ){
				for (var s = 0;s<ROOT_GAME_OBJECT.GROUP.GROUP.length;s++){
					
			window[ROOT_GAME_OBJECT.PROGRAM_NAME].ENGINE.MODULES.ACCESS(ROOT_GAME_OBJECT.PARENT).GAME_OBJECTS.ACCESS(ROOT_GAME_OBJECT.GROUP.GROUP[s]).POSITION.x = ROOT_GAME_OBJECT.POSITION.x - ROOT_GAME_OBJECT.GROUP.GROUP_INITIALS[s].x;
			window[ROOT_GAME_OBJECT.PROGRAM_NAME].ENGINE.MODULES.ACCESS(ROOT_GAME_OBJECT.PARENT).GAME_OBJECTS.ACCESS(ROOT_GAME_OBJECT.GROUP.GROUP[s]).POSITION.y = ROOT_GAME_OBJECT.POSITION.y - ROOT_GAME_OBJECT.GROUP.GROUP_INITIALS[s].y;
					
					
				}
				
			}
			
			if ( ROOT_GAME_OBJECT.DESTROY_ON_GAMEMAP_EXIT == true && ROOT_GAME_OBJECT.POSITION.Y() < window[ROOT_GAME_OBJECT.PROGRAM_NAME].MAP.UP()  ){
				
				//alert("DESTROYED " + ROOT_GAME_OBJECT.NAME)
				window[ROOT_GAME_OBJECT.PROGRAM_NAME].ENGINE.MODULES.ACCESS_MODULE(ROOT_GAME_OBJECT.PARENT).DESTROY_OBJECT(ROOT_GAME_OBJECT.NAME)
			}
			
			ROOT_GAME_OBJECT.ON_UPDATE()
			
		
	};

	
	this.GAME_OBJECT_READY = function(){
		
	SYS.DEBUG.LOG("ready : " + ROOT_GAME_OBJECT.NAME);
/* 	if (OVERRIDE_DRAW_FOR_NETWORK == null){
		//ALLWAYS
		OVERRIDE_DRAW_FOR_NETWORK = ROOT_GAME_OBJECT.DRAW;
		OVERRIDE_UPDATE_FOR_NETWORK = ROOT_GAME_OBJECT.UPDATE; 
		OVERRIDE_POSITION_X = ROOT_GAME_OBJECT.POSITION.X;
		OVERRIDE_POSITION_Y = ROOT_GAME_OBJECT.POSITION.Y;
		OVERRIDE_DIMENSION_WIDTH = ROOT_GAME_OBJECT.DIMENSION.WIDTH;
		OVERRIDE_DIMENSION_HEIGHT = ROOT_GAME_OBJECT.DIMENSION.HEIGHT;
	}
	
	if (OVERRIDE_ANIMATION_DRAW == null) {
		//NOT ALWAYS
		OVERRIDE_ANIMATION_DRAW = ROOT_GAME_OBJECT.ANIMATION.DRAW;
		OVERRIDE_ANIMATION_X = ROOT_GAME_OBJECT.ANIMATION.X;
		OVERRIDE_ANIMATION_Y = ROOT_GAME_OBJECT.ANIMATION.Y;
		OVERRIDE_ANIMATION_W = ROOT_GAME_OBJECT.ANIMATION.W;
		OVERRIDE_ANIMATION_H = ROOT_GAME_OBJECT.ANIMATION.H;
	} */
	
	};
	
       setTimeout( ROOT_GAME_OBJECT.GAME_OBJECT_READY , 15 );
	
	} 
   //new part        




function MODUL(name , PROGRAM_NAME){

var ROOT_MODUL = this;
// ONE PROGRAM ONE ENGINE
//ENGINE WILL BE BIG SWITCHER 

this.PARENT = PROGRAM_NAME;
this.NAME = name;
this.GAME_OBJECTS = new Array();
	
	
this.NEW_OBJECT = function( name__ , x , y , w , h , speed) {

 ROOT_MODUL.GAME_OBJECTS.push( new GAME_OBJECT( name__ , ROOT_MODUL.NAME , x , y , w , h , speed , ROOT_MODUL.PARENT) ); 
	
};

///////////
// Netwotk object 
///////////
this.NEW_NETWORK_OBJECT = function( object_ ) {



 ROOT_MODUL.GAME_OBJECTS.push( new GAME_OBJECT( object_.NAME , ROOT_MODUL.NAME , object_.POSITION.x , object_.POSITION.y , object_.DIMENSION.W , object_.DIMENSION.H , object_.POSITION.thrust , ROOT_MODUL.PARENT) ); 
  
 if (  object_.TYPE_OF_GAME_OBJECT.indexOf('ANIMATION') != -1)  {
	 
	 window[object_.NAME].CREATE_ANIMATION( SURF , object_.ANIMATION.TYPE  ,0 , RESOURCE.Tiles  , 123423444 , "no" , 1,11,1,1,1) ;
       
 }
 
};

this.NEW_NETWORK_POSITION = function( object_ ) {

 if ( typeof object_.nameOfObject  !== 'undefined' )  {
	 
	 window[object_.nameOfObject].POSITION.SET_POSITION ( object_.x , object_.y , 'DIAMETRIC');
       
 }

 
};

this.NEW_NETWORK_DIMENSION = function( object_ ) {

 if ( typeof object_.nameOfObject  !== 'undefined' )  {
	 
	 window[object_.nameOfObject].DIMENSION.W = object_.W;
	 window[object_.nameOfObject].DIMENSION.H = object_.H; 
	 
       
 }

 
};

//////////////////
//
/////////////////

this.DESTROY_OBJECT = function( name__ ) {

 ROOT_MODUL.GAME_OBJECTS.forEach(function(item, index, object) {
	
	if (item.NAME == name__){
	if (index > -1) {
		ROOT_MODUL.GAME_OBJECTS.splice(index, 1);
		delete window[name__];
    }
	console.log("OBJ DELETED:" + ROOT_MODUL.GAME_OBJECTS.indexOf(name__) + "  ACCESS GLOBAL  : " + window["name__"])
	}
	
});
};


this.DRAW_GAME_OBJECTS = function(s){
	
	for (var x=0;x<ROOT_MODUL.GAME_OBJECTS.length;x++){
		
		
		ROOT_MODUL.GAME_OBJECTS[x].DRAW(s);
		
		if (ROOT_MODUL.GAME_OBJECTS[x].EDITOR.ENABLE == true) {
		ROOT_MODUL.GAME_OBJECTS[x].DRAW_ACTOR(s);
		}
		
	}
	
	
};	

ROOT_MODUL.BREAK_AT_MOMENT = false;


this.UPDATE_GAME_OBJECTS = function(){
	
	for (var x=0;x<ROOT_MODUL.GAME_OBJECTS.length;x++){
		
		
//==========================//==========================
//==========================//==========================
   if (  ROOT_MODUL.BREAK_AT_MOMENT == true ) {
    	
   ROOT_MODUL.BREAK_AT_MOMENT = false;
   console.log("BREAK")
    break;	 
   }
//==========================//==========================
//==========================//==========================
	
		
		if (ROOT_MODUL.GAME_OBJECTS[x].COLLISION!=null){
			
			
			
	     for (var z=0;z<ROOT_MODUL.GAME_OBJECTS.length;z++){

		 
		 
		 // FOR PLAYER EXIST REGIME
		 if (ROOT_MODUL.GAME_OBJECTS[z].COLLISION!=null && ROOT_MODUL.GAME_OBJECTS[z].NAME != ROOT_MODUL.GAME_OBJECTS[x].NAME && typeof PLAYER != 'undefined'  && 	window[ROOT_MODUL.PARENT].ENGINE.GAME_TYPE == "PLATFORMER" ){
			 
			
 					if ( typeof PLAYER != 'undefined'  ){ //&&   ROOT_MODUL.GAME_OBJECTS[z].PLAYER.TYPE == "PLATFORMER"
			 //Y by H
			
			 if ( (ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y()+ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.HEIGHT()) > ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y()  && (ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() <   ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() +    ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.HEIGHT()  ) ){
			 
			 if ( (ROOT_MODUL.GAME_OBJECTS[z].POSITION.X()+ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.WIDTH()) > ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() -2 && (ROOT_MODUL.GAME_OBJECTS[z].POSITION.X()+ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.WIDTH() <   ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() +  ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust*12  )   ) {
				  if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false&& ROOT_MODUL.GAME_OBJECTS[z].POSITION.IN_MOVE == true ){
				    
						 SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE right1 WITH:" +ROOT_MODUL.GAME_OBJECTS[x].NAME ) ;
						 ROOT_MODUL.GAME_OBJECTS[z].POSITION.x = ROOT_MODUL.GAME_OBJECTS[x].POSITION.x - ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.W* ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
						 ROOT_MODUL.GAME_OBJECTS[z].POSITION.targetX = ROOT_MODUL.GAME_OBJECTS[x].POSITION.x - ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.W* ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
					 
					
				  }
				  else{
					  
					  if ( typeof ROOT_MODUL.GAME_OBJECTS[z].PLAYER != 'undefined' &&   ROOT_MODUL.GAME_OBJECTS[z].PLAYER.TYPE == "PLATFORMER"  && ROOT_MODUL.GAME_OBJECTS[x].POSITION.STATIC == false ){
 				 
				 SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE rigth2 WITH:" +ROOT_MODUL.GAME_OBJECTS[x].NAME ) ;
				 ROOT_MODUL.GAME_OBJECTS[x].POSITION.x = ROOT_MODUL.GAME_OBJECTS[z].POSITION.x + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.W* ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
				 ROOT_MODUL.GAME_OBJECTS[x].POSITION.targetX = ROOT_MODUL.GAME_OBJECTS[z].POSITION.x + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.W* ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
				 
					  }
					  
				  }
				 
			 }
			 
			 
			 else if ( (ROOT_MODUL.GAME_OBJECTS[z].POSITION.X()) < ROOT_MODUL.GAME_OBJECTS[x].POSITION.X()+ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.WIDTH() +2 && (ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() >   ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() +ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.WIDTH()-  ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust*12  )   ) {
				  if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false&& ROOT_MODUL.GAME_OBJECTS[z].POSITION.IN_MOVE == true){
				 SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE left1 WITH:" +ROOT_MODUL.GAME_OBJECTS[x].NAME ) ;
				 ROOT_MODUL.GAME_OBJECTS[z].POSITION.x = ROOT_MODUL.GAME_OBJECTS[x].POSITION.x + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.W* ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
				 ROOT_MODUL.GAME_OBJECTS[z].POSITION.targetX = ROOT_MODUL.GAME_OBJECTS[x].POSITION.x + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.W* ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
				  }else
				  {
					  if ( typeof ROOT_MODUL.GAME_OBJECTS[z].PLAYER != 'undefined' &&   ROOT_MODUL.GAME_OBJECTS[z].PLAYER.TYPE == "PLATFORMER" && ROOT_MODUL.GAME_OBJECTS[x].POSITION.STATIC == false ){
						  
			     SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE left2 WITH:" +ROOT_MODUL.GAME_OBJECTS[x].NAME ) ;
			     ROOT_MODUL.GAME_OBJECTS[x].POSITION.x = ROOT_MODUL.GAME_OBJECTS[z].POSITION.x - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.W* ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
				 ROOT_MODUL.GAME_OBJECTS[x].POSITION.targetX = ROOT_MODUL.GAME_OBJECTS[z].POSITION.x - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.W* ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
				 
					  }
					  
				  }
				 
			 }
			 
			 
			 }
			 //
			  if (  ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.WIDTH() > ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() +  ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust*12  &&  ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() < ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() +ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.WIDTH()-  ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust*12 ){
			
                if ( ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.HEIGHT() > ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y()  &&ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.HEIGHT()  < ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() +  ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust*12){
					
				if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false&& ROOT_MODUL.GAME_OBJECTS[z].POSITION.IN_MOVE == true){
				
                 	//$$$$$$$$$$$$$$
					if ( typeof ROOT_MODUL.GAME_OBJECTS[z].PLAYER != 'undefined' &&   ROOT_MODUL.GAME_OBJECTS[z].PLAYER.TYPE == "PLATFORMER"){
  				 SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE TOP1 WITH:" +ROOT_MODUL.GAME_OBJECTS[x].NAME ) ;
				 ROOT_MODUL.GAME_OBJECTS[z].POSITION.y = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y - ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
				 ROOT_MODUL.GAME_OBJECTS[z].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y - ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
				 //ROOT_MODUL.GAME_OBJECTS[z].POSITION.y = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y - ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
				 //ROOT_MODUL.GAME_OBJECTS[z].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y -  ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
						
						PLAYER.FREEZ = true;
						PLAYER.Y = 0;
						PLAYER.CONTROL.JUMP = false;
						
						if (PLAYER.BREAK_AT_MOMENT_STATUS == false ) {ROOT_MODUL.BREAK_AT_MOMENT = true; PLAYER.BREAK_AT_MOMENT_STATUS = true;}
						
						break; 
					}
					//$$$$$$$$$$$$$$
									 
				 
				}else{
				
                 	//$$$$$$$$$$$$$$
					if ( typeof ROOT_MODUL.GAME_OBJECTS[z].PLAYER != 'undefined' &&   ROOT_MODUL.GAME_OBJECTS[z].PLAYER.TYPE == "PLATFORMER"){
				 
				 
				 SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE TOP2 WITH:" +ROOT_MODUL.GAME_OBJECTS[x].NAME ) ;
				 
				 ROOT_MODUL.GAME_OBJECTS[x].POSITION.y = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
				 ROOT_MODUL.GAME_OBJECTS[x].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
  				
				 		PLAYER.FREEZ = true;
						PLAYER.Y = 0;
						PLAYER.CONTROL.JUMP = false;
						
						if (PLAYER.BREAK_AT_MOMENT_STATUS == false ) {ROOT_MODUL.BREAK_AT_MOMENT = true; PLAYER.BREAK_AT_MOMENT_STATUS = true;}
			   
		 
				
						
						break; 
					}
					//$$$$$$$$$$$$$$
					

				
				}
					
				}
				else if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y()  < ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() +ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.HEIGHT()  &&ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() > ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() +ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.HEIGHT() -  ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust*12){
				
				if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false && ROOT_MODUL.GAME_OBJECTS[z].POSITION.IN_MOVE == true){
					
				SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE botton1 WITH:" +ROOT_MODUL.GAME_OBJECTS[x].NAME ) ;				
				ROOT_MODUL.GAME_OBJECTS[z].POSITION.y = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
				ROOT_MODUL.GAME_OBJECTS[z].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;	
				//ROOT_MODUL.GAME_OBJECTS[x].POSITION.y = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
				 //ROOT_MODUL.GAME_OBJECTS[x].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
				 
				
				}
				else{
				
				//$$$$$$$$$$$$$$
					if ( typeof ROOT_MODUL.GAME_OBJECTS[z].PLAYER != 'undefined' &&   ROOT_MODUL.GAME_OBJECTS[z].PLAYER.TYPE == "PLATFORMER"){
		
	           	SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE botton2 WITH:" +ROOT_MODUL.GAME_OBJECTS[x].NAME ) ;
			   	
				 ROOT_MODUL.GAME_OBJECTS[x].POSITION.y = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
				 ROOT_MODUL.GAME_OBJECTS[x].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
				 
						PLAYER.FREEZ = true;
						PLAYER.Y = 0;
						PLAYER.CONTROL.JUMP = false;
					
  		
						if (PLAYER.BREAK_AT_MOMENT_STATUS == false ) {ROOT_MODUL.BREAK_AT_MOMENT = true; PLAYER.BREAK_AT_MOMENT_STATUS = true;}
						
						
						break; 
					}
					//$$$$$$$$$$$$$$
				
				}
				
				}

			 }
			 
			 
			 
			 
			 
			 ////////
					}
					
			 
		 }
		 //##############################################################//##############################################################
		 //##############################################################//##############################################################
		 else if (ROOT_MODUL.GAME_OBJECTS[z].COLLISION!=null && ROOT_MODUL.GAME_OBJECTS[z].NAME != ROOT_MODUL.GAME_OBJECTS[x].NAME ) { //&& typeof PLAYER == 'undefined'
			 
			 
			  //Y by H
			
			 if ( (ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y()+ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.HEIGHT()) > ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y()  && (ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() <   ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() +    ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.HEIGHT()  ) ){
			 
			 if ( (ROOT_MODUL.GAME_OBJECTS[z].POSITION.X()+ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.WIDTH()) > ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() -2 && (ROOT_MODUL.GAME_OBJECTS[z].POSITION.X()+ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.WIDTH() <   ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() +  ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust*12  )   ) {
				  if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false&& ROOT_MODUL.GAME_OBJECTS[z].POSITION.IN_MOVE == true){
				 SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + " COLLIDE (noplayer) right WITH:" +ROOT_MODUL.GAME_OBJECTS[x].NAME ) ;
				 
				 ROOT_MODUL.GAME_OBJECTS[z].POSITION.x = ROOT_MODUL.GAME_OBJECTS[x].POSITION.x - ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.W* ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
				 ROOT_MODUL.GAME_OBJECTS[z].POSITION.targetX = ROOT_MODUL.GAME_OBJECTS[x].POSITION.x - ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.W* ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
				 
				 }else if(ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false){
				SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE (noplayer) rigth WITH:" +ROOT_MODUL.GAME_OBJECTS[x].NAME ) ;
				 ROOT_MODUL.GAME_OBJECTS[x].POSITION.x = ROOT_MODUL.GAME_OBJECTS[z].POSITION.x + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.W* ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
				 ROOT_MODUL.GAME_OBJECTS[x].POSITION.targetX = ROOT_MODUL.GAME_OBJECTS[z].POSITION.x + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.W* ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
					  
				  }
				 
			 }
			 
			 
			 else if ( (ROOT_MODUL.GAME_OBJECTS[z].POSITION.X()) < ROOT_MODUL.GAME_OBJECTS[x].POSITION.X()+ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.WIDTH() +2 && (ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() >   ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() +ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.WIDTH()-  ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust*12  )   ) {
				  if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false&& ROOT_MODUL.GAME_OBJECTS[z].POSITION.IN_MOVE == true){
				 SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE (noplayer) left WITH:" +ROOT_MODUL.GAME_OBJECTS[x].NAME ) ;
				 ROOT_MODUL.GAME_OBJECTS[z].POSITION.x = ROOT_MODUL.GAME_OBJECTS[x].POSITION.x + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.W* ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
				 ROOT_MODUL.GAME_OBJECTS[z].POSITION.targetX = ROOT_MODUL.GAME_OBJECTS[x].POSITION.x + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.W* ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
				  }else if(ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false){
			     SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE (noplayer) left WITH:" +ROOT_MODUL.GAME_OBJECTS[x].NAME ) ;
			     ROOT_MODUL.GAME_OBJECTS[x].POSITION.x = ROOT_MODUL.GAME_OBJECTS[z].POSITION.x - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.W* ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
				 ROOT_MODUL.GAME_OBJECTS[x].POSITION.targetX = ROOT_MODUL.GAME_OBJECTS[z].POSITION.x - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.W* ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
					  
				  }
				 
			 }
			 
			 
			 }
			 //
			  if (  ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.WIDTH() > ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() +  ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust*12  &&  ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() < ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() +ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.WIDTH()-  ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust*12 ){
			
                if ( ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.HEIGHT() > ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y()  &&ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.HEIGHT()  < ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() +  ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust*12){
					
				if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false&& ROOT_MODUL.GAME_OBJECTS[z].POSITION.IN_MOVE == true){
  				 SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE (noplayer) top WITH:" +ROOT_MODUL.GAME_OBJECTS[x].NAME ) ;
				 ROOT_MODUL.GAME_OBJECTS[z].POSITION.y = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y - ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
				 ROOT_MODUL.GAME_OBJECTS[z].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y - ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;

				}else if(ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false){
				 SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE (noplayer) botton WITH:" +ROOT_MODUL.GAME_OBJECTS[x].NAME ) ;
				 ROOT_MODUL.GAME_OBJECTS[x].POSITION.y = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
				 ROOT_MODUL.GAME_OBJECTS[x].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
				
				}
					
				}
				else if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y()  < ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() +ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.HEIGHT()  &&ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() > ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() +ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.HEIGHT() -  ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust*12){
				
				if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false && ROOT_MODUL.GAME_OBJECTS[z].POSITION.IN_MOVE == true){
					
				SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE (noplayer) onTop WITH:" +ROOT_MODUL.GAME_OBJECTS[x].NAME ) ;				
				ROOT_MODUL.GAME_OBJECTS[z].POSITION.y = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
				ROOT_MODUL.GAME_OBJECTS[z].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;	
				
				}else if(ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false){
				
				
				SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE (noplayer) onTop WITH:" +ROOT_MODUL.GAME_OBJECTS[x].NAME ) ;
				ROOT_MODUL.GAME_OBJECTS[x].POSITION.y = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
				ROOT_MODUL.GAME_OBJECTS[x].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;	
 
				
				}
				
				}

			 }
			 
			 
			 
			 
			 
		 }
		 
		 
		 
		 
		 
		 
		 }		 // FOR ( 
			
			
		}
		
		
		if (typeof ROOT_MODUL.GAME_OBJECTS[x] !== 'undefined'){
		
		
		if (ROOT_MODUL.GAME_OBJECTS[x].DESTROY_AFTER!=null){
		if (ROOT_MODUL.GAME_OBJECTS[x].DESTROY_AFTER<1){	
			ROOT_MODUL.DESTROY_OBJECT(ROOT_MODUL.GAME_OBJECTS[x].NAME) 
		}
		}
		if (typeof ROOT_MODUL.GAME_OBJECTS[x] !== 'undefined'){	ROOT_MODUL.GAME_OBJECTS[x].UPDATE(); }
		
		}
		
	}
	
};	

	
	
} 
   //new part        
 
function ENGINE(c){

var ROOT_ENGINE = this;
// ONE PROGRAM ONE ENGINE
//ENGINE WILL BE BIG SWITCHER 
this.PROGRAM_ID = c.id;
//Events are part of engine
this.EVENTS = new EVENTS(c , ROOT_ENGINE );// destroy mem IMPORTANT events must be deatached at first time than set up to undefined .
this.MODULES = new Array();
this.GAME_TYPE = "NO_PLAYER";
this.KEYBOARD = new KEYBOARD(c);

if (APPLICATION.EDITOR == true){

this.ENGINE_EDITOR = true;
	
}
else {
	
this.ENGINE_EDITOR = false;
	
}


this.EXIT_EDIT_MODE = function(){
	
   ROOT_ENGINE.ENGINE_EDITOR = false;
	
	for (var x=0;x<ROOT_ENGINE.MODULES.length;x++){
	
	    for (var y=0;y<ROOT_ENGINE.MODULES[x].GAME_OBJECTS.length;y++){

	    ROOT_ENGINE.MODULES[x].GAME_OBJECTS[y].EDITOR.ENABLE = false;

		}		
	
	}
	

};

this.GO_TO_EDIT_MODE = function(){
			
			
		ROOT_ENGINE.ENGINE_EDITOR = true;
		
	for (var x=0;x<ROOT_ENGINE.MODULES.length;x++){
	
	    for (var y=0;y<ROOT_ENGINE.MODULES[x].GAME_OBJECTS.length;y++){

	    ROOT_ENGINE.MODULES[x].GAME_OBJECTS[y].EDITOR.ENABLE = true;

		}		
	
	}

};


this.GUI = {
	
	VISIBLE : false,
	BUTTONS :  [
			new RIGHT_MENU_BUTTON( "Add new gameObject " , 0 , "1" ) ,
			new RIGHT_MENU_BUTTON( "Exit edit mode" , 20 , "2") ,
			new RIGHT_MENU_BUTTON( "Set render speed" , 40 , "3") ,
			new RIGHT_MENU_BUTTON( "Switch AutoConnect to true" , 60 , "4" , "res/system/images/html5/HTML5-Offline-Storage.png") ,
			new RIGHT_MENU_BUTTON( "Switch EditorAutoRun to true" , 80 , "5" , "res/system/images/html5/HTML5-Offline-Storage.png")] ,
	CHECK_ON_START : function(){
		
		if (LOAD("Application") == false ) {
			
		}
		else{
			
		APPLICATION = LOAD("Application");
		SYS.DEBUG.LOG("APPLICATION object was loaded from localstorage. " + APPLICATION.ACCOUNT_SERVICE_AUTO_RUN)	
		if (APPLICATION.ACCOUNT_SERVICE_AUTO_RUN == true){
			ROOT_ENGINE.GUI.BUTTONS[3].text = "Switch AutoConnect to false";
		}
		else{
			ROOT_ENGINE.GUI.BUTTONS[3].text = "Switch AutoConnect to true";		
		}
		
		if (APPLICATION.EDITOR_AUTORUN == true){
            ROOT_ENGINE.ENGINE_EDITOR = true;  
			ROOT_ENGINE.GUI.BUTTONS[4].text = "Switch editorAutoRun to false";
		}
		else{ 
		    ROOT_ENGINE.ENGINE_EDITOR = false;
			ROOT_ENGINE.GUI.BUTTONS[4].text = "Switch editorAutoRun to true";		
		}
		
		
		}
		
		
	},		
	GRID : {
	VISIBLE : true , 
	MAP_SIZE_X : 10,
	MAP_SIZE_Y : 10, 
	STEP : 10 ,
	COLOR : APPLICATION.SYSTEM.HOVER_COLOR,
	},
	
   LIST_OF_OBJECTS : {
   
   VISIBLE : true,
   LIST : ROOT_ENGINE.MODULES ,
   BUTTONS_MODULES :  [ ],
   BUTTONS_GAME_OBJECTS :  [ ],
   
   GET_MODULES : function () { 
   
       for (var s=0;s<ROOT_ENGINE.MODULES.length;s++){
	    
		 ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES.push(new RIGHT_MENU_BUTTON( ROOT_ENGINE.MODULES[s].NAME  , 10*s  , s+1 ) );
		 
		 ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[s].TAP = function(){
		//console.log(this.IAM)
		ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS = [];
		for (var w=0;w<ROOT_ENGINE.MODULES[this.IAM-1].GAME_OBJECTS.length;w++){

		 ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS.push( new RIGHT_MENU_BUTTON(  ROOT_ENGINE.MODULES[this.IAM-1].GAME_OBJECTS[w].NAME , 10*w  , w+1  )  );
		ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[w].POSITION.x += 100;
		}
	
		 };
		 
	   }
   
   
   },
   
   
   },	
	
	
};


this.GUI.LIST_OF_OBJECTS.GET_MODULES();
this.GUI.CHECK_ON_START();

	
this.DRAW_MODULES = function(s){
	
	
	if (ROOT_ENGINE.GUI.GRID.VISIBLE == true && ROOT_ENGINE.ENGINE_EDITOR == true ){
		
		
		s.fillStyle = ROOT_ENGINE.GUI.GRID.COLOR;
		for (var x=0; x< ROOT_ENGINE.GUI.GRID.MAP_SIZE_X*ROOT_ENGINE.GUI.GRID.STEP ; x+=ROOT_ENGINE.GUI.GRID.STEP  ) {
		
		s.fillRect(  VIEW.W(x)  , VIEW.H(0)    ,   1  ,    VIEW.H()  );
		s.fillRect(  VIEW.W(0)  , VIEW.H(x)    ,   VIEW.W()  ,  1  );
		
		}

		
	}
	
	for (var x=0;x<ROOT_ENGINE.MODULES.length;x++){
	 	ROOT_ENGINE.MODULES[x].DRAW_GAME_OBJECTS(s);	
	}
	
	
if (ROOT_ENGINE.ENGINE_EDITOR == true) {

	if (ROOT_ENGINE.GUI.VISIBLE == true){
	
	for (var x=0;x<ROOT_ENGINE.GUI.BUTTONS.length;x++){
	s.textBaseline = 'middle';

		if (ROOT_ENGINE.GUI.BUTTONS[x].HOVER == false) {
		s.fillStyle = APPLICATION.SYSTEM.COLOR;
		s.fillRect( ROOT_ENGINE.GUI.BUTTONS[x].POSITION.X() , ROOT_ENGINE.GUI.BUTTONS[x].POSITION.Y() , ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.WIDTH() , ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.HEIGHT() );
		s.fillStyle = APPLICATION.SYSTEM.TEXT_COLOR;
		s.fillText( ROOT_ENGINE.GUI.BUTTONS[x].text  , ROOT_ENGINE.GUI.BUTTONS[x].POSITION.X() , ROOT_ENGINE.GUI.BUTTONS[x].POSITION.Y() + ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.HEIGHT()/2 , ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.WIDTH());
		}else{
		s.fillStyle = APPLICATION.SYSTEM.HOVER_COLOR;
		s.fillRect( ROOT_ENGINE.GUI.BUTTONS[x].POSITION.X() , ROOT_ENGINE.GUI.BUTTONS[x].POSITION.Y() , ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.WIDTH() , ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.HEIGHT() );
		s.fillStyle = APPLICATION.SYSTEM.TEXT_COLOR;
		s.fillText( ROOT_ENGINE.GUI.BUTTONS[x].text  , ROOT_ENGINE.GUI.BUTTONS[x].POSITION.X() , ROOT_ENGINE.GUI.BUTTONS[x].POSITION.Y() + ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.HEIGHT()/2 , ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.WIDTH());
		
	     if (ROOT_ENGINE.GUI.BUTTONS[x].icon == true) { 
		 try{
		 s.drawImage(  window["image_system_"+ ROOT_ENGINE.GUI.BUTTONS[x].IAM]  , ROOT_ENGINE.GUI.BUTTONS[x].POSITION.X() + ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.WIDTH() - 30, ROOT_ENGINE.GUI.BUTTONS[x].POSITION.Y()  - 5 , 30 ,30);
		 }catch(e){/* Not nessesery */}
		 }
		
		}
	
	}
	

	  
	}
	
	//
		for (var x=0;x<ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES.length;x++){
	s.textBaseline = 'middle';

		if (ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].HOVER == false) {
		s.fillStyle = APPLICATION.SYSTEM.COLOR;
		s.fillRect( ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.X() , ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.Y() , ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.WIDTH() , ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.HEIGHT() );
		s.fillStyle = APPLICATION.SYSTEM.TEXT_COLOR;
		s.fillText( ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].text  , ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.X() , ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.Y() + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.HEIGHT()/2 , ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.WIDTH());
		}else{
		s.fillStyle = APPLICATION.SYSTEM.HOVER_COLOR;
		s.fillRect( ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.X() , ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.Y() , ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.WIDTH() , ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.HEIGHT() );
		s.fillStyle = APPLICATION.SYSTEM.COLOR;
		s.fillText( ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].text  , ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.X() , ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.Y() + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.HEIGHT()/2 , ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.WIDTH());
		}
	
	}
	
			for (var x=0;x<ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS.length;x++){
	s.textBaseline = 'middle';

		if (ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].HOVER == false) {
		s.fillStyle = APPLICATION.SYSTEM.COLOR;
		s.fillRect( ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.X() , ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.Y() , ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.WIDTH() , ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.HEIGHT() );
		s.fillStyle = APPLICATION.SYSTEM.TEXT_COLOR;
		s.fillText( ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].text  , ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.X() , ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.Y() + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.HEIGHT()/2 , ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.WIDTH());
		}else{
		s.fillStyle = APPLICATION.SYSTEM.HOVER_COLOR;
		s.fillRect( ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.X() , ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.Y() , ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.WIDTH() , ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.HEIGHT() );
		s.fillStyle = APPLICATION.SYSTEM.COLOR;
		s.fillText( ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].text  , ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.X() , ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.Y() + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.HEIGHT()/2 , ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.WIDTH());
		}
	
	}
	
	//
	
	
}
	
	
	
};
	

this.UPDATE_MODULES = function(){
	
	for (var x=0;x<ROOT_ENGINE.MODULES.length;x++){
    
    	ROOT_ENGINE.MODULES[x].UPDATE_GAME_OBJECTS();
		
	}
	
};	
	

this.CREATE_MODUL = function(name){
	
	//window[name] = new MODUL(name);

	ROOT_ENGINE.MODULES.push(new MODUL(name , ROOT_ENGINE.PROGRAM_ID ))
	
	
};
	
		
this.DESTROY_MODUL = function(name){
	
	//window[name] = new MODUL(name);

	 console.log( ROOT_ENGINE.MODULES.indexOf(name) );
	 
	
	ROOT_ENGINE.MODULES.forEach(function(item, index, object) {
	//(item, index, object)
	
	
	
	if (item.NAME == name){
	
	if (index > -1) {
    ROOT_ENGINE.MODULES.splice(index, 1);
    }
	
	console.log(ROOT_ENGINE.MODULES.indexOf(name))
	}
	
	
		
	});
	
	
	
	
};
	

	
	
	
	
	
} 
   //new part        
//###############################################//###############################################
//###############################################//###############################################




// CLASS ROOT 



//###############################################//###############################################
//###############################################//###############################################
function PROGRAM (s , c){
	
var PROGRAM_ROOT = this;	

this.DRAW_INTERVAL = APPLICATION.PROGRAM.RENDER_SPEED;
this.UPDATE_INTERVAL = 15;

this.BASELINE = "middle";

this.GLOBAL_TRANSLATE = 0;
this.DO_GLOBAL_TRANSLATE = false;

PROGRAM_ROOT.TRANSLATE = function(x){
	PROGRAM_ROOT.GLOBAL_TRANSLATE = x; 
	PROGRAM_ROOT.DO_GLOBAL_TRANSLATE = true;
};

this.GAME_MAP = function(){
	
	//screens
	var ROOT = this;
	this.TOTAL_LEFT = 2;
	this.TOTAL_RIGHT = 4;
	this.TOTAL_UP = 2 ;
	this.TOTAL_DOWN = 4;
	this.LEFT = function(){return ROOT.TOTAL_LEFT*-VIEW.W()};
	this.WIDTH = function(){return ROOT.TOTAL_RIGHT*VIEW.W()};
	this.UP = function(){return ROOT.TOTAL_UP*-VIEW.H()};
	this.HEIGHT = function(){return ROOT.TOTAL_DOWN*VIEW.W()};
	this.CLEAR_MAP = true;
	
};

PROGRAM_ROOT.MAP = new PROGRAM_ROOT.GAME_MAP();

this.AUTO_UPDATE = new Array();
this.ENGINE = new ENGINE(c  );	
	
s.textAlign = "start";
s.textBaseline = this.BASELINE;	

	
this.DRAW = function(){

//s.fillStyle = "orange";
//s.strokeStyle = "red";
if (PROGRAM_ROOT.MAP.CLEAR_MAP == true) {

s.clearRect( PROGRAM_ROOT.MAP.LEFT() , PROGRAM_ROOT.MAP.UP() ,PROGRAM_ROOT.MAP.WIDTH(),PROGRAM_ROOT.MAP.HEIGHT() );
 
}

if ( PROGRAM_ROOT.DO_GLOBAL_TRANSLATE == true){
PROGRAM_ROOT.DO_GLOBAL_TRANSLATE = false;
s.translate(PROGRAM_ROOT.GLOBAL_TRANSLATE , 0);
}


PROGRAM_ROOT.ENGINE.DRAW_MODULES(s);
setTimeout(function(){ PROGRAM_ROOT.UPDATE();} , this.UPDATE_INTERVAL );
};	

	
this.UPDATE = function(){
		
	PROGRAM_ROOT.ENGINE.UPDATE_MODULES()
	
	for (var x=0;x<this.AUTO_UPDATE;x++){
		
        ROOT.AUTO_UPDATE[x].UPDATE()

	}
	
setTimeout(function(){ PROGRAM_ROOT.DRAW();} , this.DRAW_INTERVAL );
};	
	
	
}
//###############################################//###############################################
//###############################################//############################################### 
   //new part        
//###############################################//###############################################
//###############################################//###############################################
/*
Created by Nikola Lukic zlatnaspirala@gmail.com
*/


 // onload from source removed . no need in build js ! 
   //new part        
//########################################################
// PLAYER CONTROL AND OTHER KEYBOARD STAFF 
//########################################################


function KEYBOARD( c ){

var ROOT = this;

ROOT.CAPTURE_CHAR = "";
ROOT.CLEAR_CAPTURE_ON_PRESS_ENTER = true;
ROOT.LAST_CAPTURE_CHAR = "";
ROOT.ENTER_PRESSED = false;
ROOT.SHIFT_PRESSED = false;
ROOT.ACTION_ON_KEY_DOWN = function(){};

this.CANVAS = c;
this.PROGRAM_NAME = c.id;


 
c.addEventListener('keydown', function(e)
{
    
	
	switch(e.keyCode)
		{
		case 8:
		e.preventDefault();
        SYS.DEBUG.LOG("prevent default for backspace.");   		
		
		}
	
	
	 SYS.DEBUG.LOG(" GAME RUNNING , key pressed: " + e.keyCode );
	 //SYS.SOUND.GEN( 50 , e.keyCode * 20 );
	 
	 if ( typeof PLAYER != 'undefined' ){ 
	 
	 if ( PLAYER.TYPE == "PLATFORMER" ){
	 
	 PLAYER.FREEZ = false;
	 
	switch(e.keyCode)
		{
		case 121:
        SYS.DEBUG.LOG("F10 command -->> Show command line ");   		
		
		case 69:
	 		
		case 37: // left
		    PLAYER.CONTROL.LEFT = true;
			PLAYER.X= PLAYER.SPEED; 
			 if (PLAYER.CONTROL.JUMP === false) {
			setTimeout( function(){PLAYER.POSITION.TRANSLATE_BY_Y(100)},50);
			 }
			 
		break;
		case 38: // up
		
		 if (PLAYER.CONTROL.JUMP === false) {
		 
		   PLAYER.BREAK_AT_MOMENT_STATUS = false;
		 
		    PLAYER.CONTROL.JUMP = true;
			
			PLAYER.Y= PLAYER.SPEED*10; 
			console.log(">>>>>>>" + PLAYER.Y);
			
			setTimeout( function(){
			  while (PLAYER.Y > 0){
			  
			PLAYER.Y = PLAYER.Y - PLAYER.SPEED/5; 
			  
		  }
			PLAYER.Y = -1;
			},100)	
				
				
			
		 }
		 
		break;
		case 39: // right
		
			PLAYER.CONTROL.RIGHT = true;
			PLAYER.X= -PLAYER.SPEED; 
			 if (PLAYER.CONTROL.JUMP === false) {
		 setTimeout( function(){PLAYER.POSITION.TRANSLATE_BY_Y(100)},50);
			 }
			 
		break;
		case 40: // down
		
		break;
		};

		}
	

		else if ( PLAYER.TYPE == "NORMAL" ){
	 
	 	switch(e.keyCode)
		{
		case 121:
        SYS.DEBUG.LOG("F10 command -->> Show command line ");   		
		
		case 69:
	 		
		case 37: // left
		PLAYER.X = PLAYER.X - PLAYER.SPEED;
		PLAYER.POSITION.TRANSLATE_BY_X ( PLAYER.X )
		
		break;
		case 38: // up
		
		PLAYER.Y= PLAYER.Y-PLAYER.SPEED; 
		PLAYER.POSITION.TRANSLATE_BY_Y ( PLAYER.Y )
		
		break;
		case 39: // right
		
		PLAYER.X= PLAYER.X+PLAYER.SPEED; 
		PLAYER.POSITION.TRANSLATE_BY_X ( PLAYER.X )
		
		break;
		case 40: // down
		
		PLAYER.Y= PLAYER.Y+PLAYER.SPEED; 
		PLAYER.POSITION.TRANSLATE_BY_Y ( PLAYER.Y )
		
		break;
		};
	 
	 }
	 
	 
	 
	 }
	 

//@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@
// SPECIAL FOR TEXTBOX
//@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@
SYS.DEBUG.LOG("KEYBOARD-->> Show users types : " + e.keyCode );   		
var keynum;
if(window.event){ keynum = e.keyCode;}else{if(e.which){ keynum = e.which;}}
//console.log(String.fromCharCode(keynum));

if (e.keyCode == 16){
ROOT.SHIFT_PRESSED = true;
}

if (e.keyCode == 8) {
SYS.DEBUG.LOG("textbox delete last char!");   		
ROOT.CAPTURE_CHAR = remove_last( ROOT.CAPTURE_CHAR );

}
else if(e.keyCode == 13){
ROOT.ENTER_PRESSED = true;
}
else {

if (ROOT.SHIFT_PRESSED == false) {

   if (e.keyCode == 189) {
    ROOT.CAPTURE_CHAR+="_";
	ROOT.LAST_CAPTURE_CHAR ="_";
  }
  else if (e.keyCode == 187) {
    ROOT.CAPTURE_CHAR+="+";
	ROOT.LAST_CAPTURE_CHAR ="+";
  }
  else if (e.keyCode == 187) {
    ROOT.CAPTURE_CHAR+="+";
	ROOT.LAST_CAPTURE_CHAR ="+";
  }
  else if (e.keyCode == 188) {
    ROOT.CAPTURE_CHAR+=",";
	ROOT.LAST_CAPTURE_CHAR =",";
  }
  else if (e.keyCode == 190) {
    ROOT.CAPTURE_CHAR+=".";
	ROOT.LAST_CAPTURE_CHAR =".";
  }
  else if (e.keyCode == 191) {
    ROOT.CAPTURE_CHAR+="/";
	ROOT.LAST_CAPTURE_CHAR ="/";
  }
  else if (e.keyCode == 186) {
    ROOT.CAPTURE_CHAR+=";";
	ROOT.LAST_CAPTURE_CHAR =";";
  }
  else if (e.keyCode == 222) {
    ROOT.CAPTURE_CHAR+="'";
	ROOT.LAST_CAPTURE_CHAR ="'";
  }
  else if (e.keyCode == 220) {
    ROOT.CAPTURE_CHAR+= "\\";
	ROOT.LAST_CAPTURE_CHAR ='\\';
  }
  else if (e.keyCode == 219) {
    ROOT.CAPTURE_CHAR+='[';
	ROOT.LAST_CAPTURE_CHAR ='[';
  }
  else if (e.keyCode == 221) {
    ROOT.CAPTURE_CHAR+=']';
	ROOT.LAST_CAPTURE_CHAR =']';
  }
  else{
  
	ROOT.CAPTURE_CHAR+=(String.fromCharCode(keynum).toLowerCase());
	ROOT.LAST_CAPTURE_CHAR = (String.fromCharCode(keynum).toLowerCase());
  
  }


}
else {

  if (e.keyCode == 50) {
    ROOT.CAPTURE_CHAR+="@";
	ROOT.LAST_CAPTURE_CHAR ="@";
  }
  else if (e.keyCode == 49) {
    ROOT.CAPTURE_CHAR+="!";
	ROOT.LAST_CAPTURE_CHAR ="!";
  }
  else if (e.keyCode == 51) {
    ROOT.CAPTURE_CHAR+="#";
	ROOT.LAST_CAPTURE_CHAR ="#";
  }
  else if (e.keyCode == 52) {
    ROOT.CAPTURE_CHAR+="$";
	ROOT.LAST_CAPTURE_CHAR ="$";
  }
  else if (e.keyCode == 53) {
    ROOT.CAPTURE_CHAR+="%";
	ROOT.LAST_CAPTURE_CHAR ="%";
  }
  else if (e.keyCode == 54) {
    ROOT.CAPTURE_CHAR+="^";
	ROOT.LAST_CAPTURE_CHAR ="^";
  }
  else if (e.keyCode == 55) {
    ROOT.CAPTURE_CHAR+="&";
	ROOT.LAST_CAPTURE_CHAR ="&";
  }
  else if (e.keyCode == 56) {
    ROOT.CAPTURE_CHAR+="*";
	ROOT.LAST_CAPTURE_CHAR ="*";
  }
  else if (e.keyCode == 57) {
    ROOT.CAPTURE_CHAR+="(";
	ROOT.LAST_CAPTURE_CHAR ="(";
  }
  else if (e.keyCode == 48) {
    ROOT.CAPTURE_CHAR+=")";
	ROOT.LAST_CAPTURE_CHAR =")";
  }
  else if (e.keyCode == 189) {
    ROOT.CAPTURE_CHAR+="_";
	ROOT.LAST_CAPTURE_CHAR ="_";
  }
  else if (e.keyCode == 187) {
    ROOT.CAPTURE_CHAR+="+";
	ROOT.LAST_CAPTURE_CHAR ="+";
  }
  else if (e.keyCode == 187) {
    ROOT.CAPTURE_CHAR+="+";
	ROOT.LAST_CAPTURE_CHAR ="+";
  }
  else if (e.keyCode == 188) {
    ROOT.CAPTURE_CHAR+="<";
	ROOT.LAST_CAPTURE_CHAR ="<";
  }
  else if (e.keyCode == 190) {
    ROOT.CAPTURE_CHAR+=">";
	ROOT.LAST_CAPTURE_CHAR =">";
  }
  else if (e.keyCode == 191) {
    ROOT.CAPTURE_CHAR+="?";
	ROOT.LAST_CAPTURE_CHAR ="?";
  }
  else if (e.keyCode == 186) {
    ROOT.CAPTURE_CHAR+=":";
	ROOT.LAST_CAPTURE_CHAR =":";
  }
  else if (e.keyCode == 222) {
    ROOT.CAPTURE_CHAR+='"';
	ROOT.LAST_CAPTURE_CHAR ='"';
  }
  else if (e.keyCode == 220) {
    ROOT.CAPTURE_CHAR+='|';
	ROOT.LAST_CAPTURE_CHAR ='|';
  }
  else if (e.keyCode == 219) {
    ROOT.CAPTURE_CHAR+='{';
	ROOT.LAST_CAPTURE_CHAR ='{';
  }
  else if (e.keyCode == 221) {
    ROOT.CAPTURE_CHAR+='}';
	ROOT.LAST_CAPTURE_CHAR ='}';
  }
  
  
  
  
  else {
  
	ROOT.CAPTURE_CHAR+=(String.fromCharCode(keynum).toUpperCase());
	ROOT.LAST_CAPTURE_CHAR = (String.fromCharCode(keynum).toUpperCase());
  
  }

}

}


ROOT.ACTION_ON_KEY_DOWN();


//@@@@@@@@@@@@@@@@@@@@@@@@@



if (typeof ROOT.TARGET_MODUL != 'undefined' && typeof ROOT.TARGET != 'undefined' ) {
	
	  ROOT.CAPTURE_CHAR = ROOT.CAPTURE_CHAR.replace(/[^\x00-\x7F]/g, "");
	  ROOT.CAPTURE_CHAR = ROOT.CAPTURE_CHAR.replace(/[^A-Za-z 0-9 \.,\?""!#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
	  
   window[ROOT.PROGRAM_NAME].ENGINE.MODULES.ACCESS(ROOT.TARGET_MODUL).GAME_OBJECTS.ACCESS(ROOT.TARGET).TEXTBOX.TEXT = ROOT.CAPTURE_CHAR;
	if (ROOT.ENTER_PRESSED == true) {
	
		window[ROOT.PROGRAM_NAME].ENGINE.MODULES.ACCESS(ROOT.TARGET_MODUL).GAME_OBJECTS.ACCESS(ROOT.TARGET).TEXTBOX.ON_PRESS_ENTER();
	   
	     if ( ROOT.CLEAR_CAPTURE_ON_PRESS_ENTER == true ) 
		 {
			 
			 ROOT.CAPTURE_CHAR = '';
			 
		 }
	}
}
ROOT.ENTER_PRESSED = false;
//local_go.TEXTBOX.TEXT =  ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.CAPTURE_CHAR;
//@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@


}, false);


//##############################################################################//##############################################################################
//##############################################################################//##############################################################################
c.addEventListener('keyup', function(e)
{
    
	 SYS.DEBUG.LOG(" GAME RUNNING , key up : " + e.keyCode );
	 //SYS.SOUND.GEN( 50 , e.keyCode * 20 );
	
	switch(e.keyCode)
		{
		case 121:
        SYS.DEBUG.LOG("F10 command -->> Show command line ");   		
		break;
		
		case 16:
		ROOT.SHIFT_PRESSED = false;
		break;
		
        }
		

	
	 
	 if ( typeof PLAYER != 'undefined' ){ 
	 
	 if ( PLAYER.TYPE == "PLATFORMER" ){
	 
	switch(e.keyCode)
		{
		case 121:
        SYS.DEBUG.LOG("F10 command -->> Show command line ");   		
		
		case 69:
	 		
		case 37: // left
 
           PLAYER.CONTROL.LEFT = false;
		   
		  while (PLAYER.X > 0 ){
			  
			PLAYER.X = PLAYER.X - PLAYER.SPEED/5; 
			  
		  }
			
			PLAYER.X = 0;
		
		break;
		case 38: // up
		
			  while (PLAYER.Y > 0){
			  
			PLAYER.Y = PLAYER.Y - PLAYER.SPEED/5; 
			  
		  }
			
			//PLAYER.Y = -1;
			
		    //PLAYER.POSITION.TRANSLATE_BY_Y(100)
		
		break;
		case 39: // right
            PLAYER.CONTROL.LEFT = false;			
		  while (PLAYER.X < 0){
			
			PLAYER.X = PLAYER.X + PLAYER.SPEED/5; 
			  
		  }
			
			PLAYER.X = 0;
		
		break;
		case 40: // down
		
		break;
		};

		}
	
	 
	 
	 
		else if ( PLAYER.TYPE == "NORMAL" ){
	 
	 	switch(e.keyCode)
		{
		case 121:
        SYS.DEBUG.LOG("F10 command -->> Show command line ");   		
		
		case 69:
	 		
		case 37: // left
		PLAYER.X = PLAYER.X - PLAYER.SPEED;
		PLAYER.POSITION.TRANSLATE_BY_X ( PLAYER.X )
		
		break;
		case 38: // up
		
		PLAYER.Y= PLAYER.Y-PLAYER.SPEED; 
		PLAYER.POSITION.TRANSLATE_BY_Y ( PLAYER.Y )
		
		break;
		case 39: // right
		
		PLAYER.X= PLAYER.X+PLAYER.SPEED; 
		PLAYER.POSITION.TRANSLATE_BY_X ( PLAYER.X )
		
		break;
		case 40: // down
		
		PLAYER.Y= PLAYER.Y+PLAYER.SPEED; 
		PLAYER.POSITION.TRANSLATE_BY_Y ( PLAYER.Y )
		
		break;
		};
	 
	 }
	 
	 
	 
	 }

}, false); 


} 
   //new part        
      
 var AUDIO_RESOURCE = new Object(); AUDIO_RESOURCE ={"source":['laser7.ogg' , 
'rabitup.ogg' , 
'spin.ogg' , 
'start_reel1.ogg' , 
'stop.ogg' , 
 ] }; 
SYS.DEBUG.LOG('Audio resources loaded. ' + 1); 
  AUDIO_RESOURCE.SUM = 1; 
  
  
  
   //new part        
 
function AUDIO_RES (res)  { 

var ROOT_AUDIO = this;


this.res = AUDIO_RESOURCE.source;
this.SOUNDS = [];
this.SOUNDS_NAMES = [];

this.CREATE_AUDIO_OBJECT_FROM_RESOURCE = function(){
	
	
	    for (var i=0; i<AUDIO_RESOURCE.source.length; i++) {
			
			var audio_ = new Audio("res/audio/" + AUDIO_RESOURCE.source[i] );
			var local1 = AUDIO_RESOURCE.source[i].replace(".ogg","");
			var local1 = local1.replace(".mp3","");
			window["audio_object_"+local1] = audio_;
			ROOT_AUDIO.SOUNDS_NAMES.push( window["play_"+local1] );
			ROOT_AUDIO.SOUNDS.push(audio_);
			//audio_.play();
			
		}
		
		ROOT_AUDIO.SOUNDS_NAMES.PLAY = function(name){
			
			
			
		};
	
};

ROOT_AUDIO.CREATE_AUDIO_OBJECT_FROM_RESOURCE()

}


  function LOAD_AUDIO () {
  
  setTimeout( function(){
  
   if (typeof AUDIO_RESOURCE != 'undefined') {
   
	SYS.SOUND.RES = new AUDIO_RES ();
   
   }
   else{
   
   LOAD_AUDIO ()
   
   }
  
  
  }, 200 )
  
  } 

	LOAD_AUDIO ()
	
	
	
	 
   //new part        
window.unload = function (e) {
  //critical call !!! 

 console.log("GLOBAL EVENT : BEFORE_UNLOAD")
 

};
 
   //new part        
window.onbeforeunload = function (e) {

 console.log("GLOBAL EVENT : BEFORE_UNLOAD")
 
    e = e || window.event;

    // For IE and Firefox prior to version 4
    if (e) {
        e.returnValue = 'Dont prevent alert msg box it is a main tool for visual js .\n Reload  Sure?';
    }

    // For Safari
    return 'Dont prevent alert msg box it is a main tool for visual js .\n  Reload Sure?';
	
}; 
   //new part        

function ONRESIZE(){};

window.onresize = function (e) {



if (SYS.DOM.RESIZE_TYPE == 'DIAMETRIC') {
  
SYS.DOM.c.width = window.innerWidth-1; //CONVERTOR.PER_TO_PIX( SYS.DOM.W_PIX );
SYS.DOM.c.height = window.innerHeight; //CONVERTOR.PER_TO_PIY( SYS.DOM.H_PIX );
//HARD CODE
}
  ONRESIZE();
 //console.log("GLOBAL EVENT : ONRESIZE ")

}; 
   //new part        
//###############################################//###############################################
//###############################################//###############################################
/*
Created by Nikola Lukic zlatnaspirala@gmail.com

MULTI_SCREENS

*/

var MULTI_SCREENS = {



START_UP : function(){




},




};








 
   //new part        
 


window.addEventListener('keydown', function(e)
{
    
	 SYS.DEBUG.LOG(" kaydown event fired for keyboard_editor . e.keyCode " + e.keyCode );
	 //SYS.SOUND.GEN( 50 , e.keyCode * 20 );
	 
	switch(e.keyCode)
		{
		case 121:
        SYS.DEBUG.LOG("F10 command -->> Show command line ");   		
		
		case 115:
		for (var z=0;z<SYS.RUNNING_PROGRAMS.length;z++){
			window[SYS.RUNNING_PROGRAMS[z]].ENGINE.GO_TO_EDIT_MODE();
		}		
		case 37: // left
		
		break;
		case 38: // up
		
		break;
		case 39: // right
		
		break;
		case 40: // down
		
		break;
		};


}, false);   
   //new part        
//////////////////////////
// NETWORKING
// used for  developing games 

var LOCAL_COMMUNICATOR = new Object();


if (APPLICATION.EDITOR_AUTORUN == true) {

	LOCAL_COMMUNICATOR = io.connect('http://'+APPLICATION.LOCAL_SERVER+':1013');

 
LOCAL_COMMUNICATOR.on('connect', function(){
console.log("CONNECTED WITH LOCAL_COMMUNICATOR" );  
});


LOCAL_COMMUNICATOR.on('realtime', function (user, data) {
	if (data != "") {
	console.log("chat data empty" , user , data);	
	}else{
	console.log("chat data empty");	
	}
});


 LOCAL_COMMUNICATOR.on('RETURN', function ( action ,  data) {
  
    if (action == "GET_ALL_GAME_OBJECTS") {
	
	console.log(data + "<<<<<<<<< from ")
 
	}
	
	else if (action == "LOAD_SCRIPT" ) {
	
	  console.log("LOAD_SCRIPT : " +  data);

	CALL_OR_WAIT(data)
	
	
	} 
	else if (action == "LOAD_SCRIPT_AFTER_F5"){
		
	}
	else if (action == "ERROR"){
	
	alert("Server says error:" + data);
	
	}
	
 
    // console view  DOM
	//$('#conversation').append('<div class="shadowDiv" >'+action + ': ' + data + '</div>');
	 //var objDiv = E("console");
	 //objDiv.scrollTop = objDiv.scrollHeight;
	  
});

}
//###############################################//###############################################
//###############################################//###############################################
// EDITOR ACTIONS 
//###############################################//###############################################
//###############################################//###############################################


    function CALL_OR_WAIT(data) {
		
		var data = data;
		  setTimeout( function(){
		  
		  SYS.DEBUG.LOG(data + "...........")
		  
		  if (SYS.READY == true && typeof data != 'undefined'){
			
			if (data.indexOf("a2") == -1){
			
					setTimeout( function(){SYS.SCRIPT.LOAD(data);SYS.DEBUG.LOG(" VISUAL SCRIPT EXECUTED ");},100)
					
			
			}else {
			
					SYS.SCRIPT.LOAD(data)
					SYS.DEBUG.LOG(" VISUAL SCRIPT EXECUTED ");
			
			}
			
			  
		  }else {
			  
			  setTimeout( function(){CALL_OR_WAIT(data)}, 50 );
			  
		  }
 		  
	  } , 1 )	
		
		
	}

 
	function ADD( name , x , y, w, h , PROGRAM_NAME , MODUL ){
	LOCAL_COMMUNICATOR.emit('ADD_NEW_GAME_OBJECT',  name , x , y, w, h , PROGRAM_NAME , MODUL);
	}	
	
	function GET_ALL_GAME_OBJECTS() {
	LOCAL_COMMUNICATOR.emit('GET_ALL_GAME_OBJECTS');
	}

	function DESTROY( name  ){
	LOCAL_COMMUNICATOR.emit('DESTROY_GAME_OBJECT',  name );
	}		
	
	function DESTROY_DELAY ( name , sec , MODUL, PROGRAM_NAME){
	LOCAL_COMMUNICATOR.emit('DESTROY_GAME_OBJECT_WITH_DELAY',  name  , sec , MODUL , PROGRAM_NAME);
	}		
	
	function SET_NEW_START_UP_POS( name  , PROGRAM_NAME , MODUL , newX , newY , w , h){
	LOCAL_COMMUNICATOR.emit('SET_NEW_START_UP_POSITION',  name , PROGRAM_NAME , MODUL , newX , newY  , w , h );
	}		
	
	function ADD_ANIMATION( name  , PROGRAM_NAME , MODUL , RES){
	LOCAL_COMMUNICATOR.emit('ADD_ANIMATION',  name , PROGRAM_NAME , MODUL , RES );
	}
	
	function ADD_COLLISION( name  , PROGRAM_NAME , MODUL , margin){
	LOCAL_COMMUNICATOR.emit('ADD_COLLISION',  name , PROGRAM_NAME , MODUL , margin );
	}
	
	function REMOVE_COLLISION( name  , PROGRAM_NAME , MODUL ){
	LOCAL_COMMUNICATOR.emit('REMOVE_COLLISION',  name , PROGRAM_NAME , MODUL  );
	}
	
	function CREATE_PLAYER( name  , PROGRAM_NAME , MODUL , type__ , index){
	LOCAL_COMMUNICATOR.emit('ATACH_PLAYER',  name , PROGRAM_NAME , MODUL   , type__ , index);
	}
	
	function DEATACH_PLAYER( name  , PROGRAM_NAME , MODUL , type__){
	LOCAL_COMMUNICATOR.emit('DEATACH_PLAYER',  name , PROGRAM_NAME , MODUL   , type__ );
	}
	
	function ADD_PARTICLE( name  , PROGRAM_NAME , MODUL , type__) {
	LOCAL_COMMUNICATOR.emit('ADD_PARTICLE',  name , PROGRAM_NAME , MODUL   , type__ );
	}
	
	function REMOVE_PARTICLE( name  , PROGRAM_NAME , MODUL ) {
	LOCAL_COMMUNICATOR.emit('REMOVE_PARTICLE',  name , PROGRAM_NAME , MODUL);
	}
	
	function ADD_TEXTBOX( name  , PROGRAM_NAME , MODUL , text , radius , color , textcolor) {
	LOCAL_COMMUNICATOR.emit('ADD_TEXTBOX',  name , PROGRAM_NAME , MODUL , text , radius , color , textcolor);
	}
	
	function REMOVE_TEXTBOX( name  , PROGRAM_NAME , MODUL ) {
	LOCAL_COMMUNICATOR.emit('REMOVE_TEXTBOX',  name , PROGRAM_NAME , MODUL);
	}
	
	function ADD_WEBCAM( name  , PROGRAM_NAME , MODUL , type_ , type_of_dim , byV , byH) {
	LOCAL_COMMUNICATOR.emit('ADD_WEBCAM',  name , PROGRAM_NAME , MODUL , type_ , type_of_dim , byV , byH);
	}
	
	function REMOVE_WEBCAM( name  , PROGRAM_NAME , MODUL ) {
	LOCAL_COMMUNICATOR.emit('REMOVE_WEBCAM',  name , PROGRAM_NAME , MODUL);
	}
	
	function SET_MAIN_INTERVAL( name  , PROGRAM_NAME , MODUL , d , u ){
	LOCAL_COMMUNICATOR.emit('SET_MAIN_INTERVAL',  PROGRAM_NAME  , d , u );
	}
	
//###############################################//###############################################
//###############################################//###############################################	
	
//###############################################//###############################################
//###############################################//############################################### 
   //new part        


var NUI_CONTROLER = new Object();

function WEB_CAM_NUI_MAP(ee , ALL_POINTS){

try{
if (ee ) {
eval ( " NUI_CONTROLER.point"+ee+"();" );
//console.log("INDEX :" + ee + ">>>>>>" +ALL_POINTS )
}
}catch(e){}

}


    window.onload1 = function(){        
 
   //new part        
  



if (APPLICATION.MULTIRTC_PEER == true) {
	
	  TEST = new SYS.XML.READ ('lib/webrtc/public/index.html');
	
		SYS.SCRIPT.LOAD("lib/webrtc/public/RTCMultiConnection2.2.js")
		SYS.SCRIPT.LOAD("lib/webrtc/public/linkify.js")
	
	     window['MAIN_PEER'] = new Object();
		 window['MAIN_PEER'] = new Object();
		 window['MAIN_PEER'].ADDRESS = 'localhost';
		 
		 
	  ACTIVATE_PEER = function (){
		  
		  if (SYS.DOM.E('RTC_HELP').innerHTML == '') {
			  
		   SYS.DOM.E('RTC_HELP').innerHTML =  TEST.DONE();
			  
		  }
		   
 setTimeout (function(){
			
		
	 if ( typeof RTCMultiConnection == 'function'   &&  typeof rtcMultiConnection == 'undefined'  && typeof getElement == 'function' ) {
		
			
        SYS.SCRIPT.LOAD("lib/webrtc/public/ui.peer-connection.js")
		
		document.querySelector('#message-sound').src =  SYS.SOUND.RES.SOUNDS[0].src;

        SYS.SCRIPT.LOAD("lib/webrtc/public/ui.users-list.js")
        SYS.SCRIPT.LOAD("lib/webrtc/public/ui.settings.js")
        SYS.SCRIPT.LOAD("lib/webrtc/public/ui.share-files.js")
		
		 
		}
		else{
				
		SYS.SCRIPT.LOAD("lib/webrtc/public/ui.main.js");
		ACTIVATE_PEER()
			
		}

		}, 150);

	};

}


document.body.style.WebkitTransform = 'scale(1)';
document.body.style.overflow = "hidden";


function system_ready_check(){
	
if (typeof GET_ALL_GAME_OBJECTS !== 'undefined' && typeof SYS.SOUND.RES.SOUNDS != 'undefined') {
	
setTimeout(function(){

	//################################################################
	// IMPORTANT - make stable system 100%
	//################################################################
	while(RESOURCE.SUM == 0 && typeof KEYBOARD != 'function')
	{console.log("res not ready");}
	
    SYS.DEBUG.LOG("SYS : DOM readyState is load.")
	SYS.READY = true;
	
if (APPLICATION.STATUS == "production" )
{
	SYS.DEBUG.LOG("APPLICATION.STATUS : production")
	SYS.SCRIPT.LOAD("starter/visual.js")
}
else if (APPLICATION.STATUS == "develop"  &&  APPLICATION.EDITOR == true )
{
   SYS.DEBUG.LOG("APPLICATION.STATUS : develop" );
   GET_ALL_GAME_OBJECTS()
}	
	

if (APPLICATION.ACCOUNT_SERVICE_AUTO_RUN == true){
	ACCOUNT_SYSTEM.CONNECT();	
}

	
}, 10);

}else {
	
	setTimeout( system_ready_check , 25 );
	
}


}


system_ready_check()
 

 
 
 
 
   //new part        
//###############################################//###############################################
//###############################################//###############################################

// PROCEDURE , last level of system GUI SUPPORT

//###############################################//###############################################
//###############################################//###############################################

 SYS.RES.CREATE_IMG( 'system_conn' ,  'res/system/images/html5/HTML5-Connectivity.png');
 
 
function CREATE_SYSTEM_BUTTONS() {

if ( typeof CREATE_VIRTUAL_KEYBOARD != 'undefined' && typeof window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]] !== 'undefined' &&  typeof window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE !== 'undefined'  ) {

	
//HELLO_WORLD.ENGINE.CREATE_MODUL("GUI_STARTER");

 window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.CREATE_MODUL("GUI_STARTER");
if (NOMOBILE == 0) {
	
	 CREATE_VIRTUAL_KEYBOARD ()
	 HIDE_KEYBOARD()
	 
}
else {
	
	if ( APPLICATION.ACCESSIBILITY.VIRTUAL_KEYBOARD_FOR_DESKTOP  == true ){
		
     CREATE_VIRTUAL_KEYBOARD ()
	 HIDE_KEYBOARD()
	 
	}
	
	
}


}else{

setTimeout(function(){
	
  //console.log(":program not ready in first pass:");
  CREATE_SYSTEM_BUTTONS()
	
	
},250);

	
}


	
}


CREATE_SYSTEM_BUTTONS()

window['CREATE_VIRTUAL_KEYBOARD'] = function  (){
	
	________MAKE_VK( 11 , 5 , 7 , 7  , 10 )
	
// value 1 is speed !!
window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_OBJECT("___VIRTUALKEYBOARD_LABEL" , 18 , 32 , 60 , 10 , 1 );
window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("STARTER").GAME_OBJECTS.ACCESS("___VIRTUALKEYBOARD_LABEL").CREATE_TEXTBOX("" , 10 , "black" , "lime") ;
window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("STARTER").GAME_OBJECTS.ACCESS("___VIRTUALKEYBOARD_LABEL").TEXTBOX.EDIT = false;
 ___VIRTUALKEYBOARD_LABEL.TEXT_FOR = null;
 ___VIRTUALKEYBOARD_LABEL.DRAG = false;
 // caps handler 
 ___VIRTUALKEYBOARD_LABEL.CAPS = false;
 // backspace handler 
___VIRTUALKEYBOARD_LABEL.BACKSPACE_DOWN = false;  

___VIRTUALKEYBOARD_LABEL.SPEEDUPBACKSPACE = function(){
	setTimeout(function(){
		
    if ( ___VIRTUALKEYBOARD_LABEL.BACKSPACE_DOWN == true ) 
	{
 	  
		___VIRTUALKEYBOARD_LABEL.SPEED__BACKSPACE ()
		
	}		
		
	} , 1000)
	
};

___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE = 400;
___VIRTUALKEYBOARD_LABEL.SPEED__BACKSPACE = function(){
	
___VIRTUALKEYBOARD_LABEL.SPEED__BACKSPACE__TIMER = setInterval(function(){
		
    if ( ___VIRTUALKEYBOARD_LABEL.BACKSPACE_DOWN == true ) 
	{
	  	
		___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT=___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.substring(0,___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.length - 1);
		
		if (___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE < 300){
			
		___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT=___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.substring(0,___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.length - 1);
		
		}
		
		
		if (___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE < 100){
			
		___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT=___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.substring(0,___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.length - 1);
        ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT=___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.substring(0,___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.length - 1);
		
		}
		
		if (___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE > 5){
		___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE = ___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE - 100;
		}
		else{
		___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE = 5;	
			
		}
		//console.log("___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE" + " " + ___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE)
	}
	else {
		
		clearInterval(___VIRTUALKEYBOARD_LABEL.SPEED__BACKSPACE__TIMER)
		___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE = 400;
	}
	
	
		
} , ___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE );
		
}
 
}

window['________MAKE_VK'] = function   ( H , V , step , w  , h ) {

for (var y=0;y<V;y = y + 1){
for (var x=0;x<H;x = x + 1){

var name = "___VIRTUALKEYBOARD_" + x + y;
var PASS_VK_CODE_ = '';
var width_extra = 0;
var SPECIAL_COMMAND = null;

var LETTER = 0;
if (x == 0 && y == 1) {
	LETTER = 16;	//q
	PASS_VK_CODE_ = "q";
}
else if (x == 1 && y == 1) {
	LETTER = 22;  //w
	PASS_VK_CODE_ = "w";
}
else if (x == 2 && y == 1) {
	LETTER = 4;  //e
	PASS_VK_CODE_ = "e";
}
else if (x == 3 && y == 1) {
	LETTER = 17;  //r
	PASS_VK_CODE_ = "r";
}
else if (x == 4 && y == 1) {
	LETTER = 19;  //t
	PASS_VK_CODE_ = "t";
}
else if (x == 5 && y == 1) {
	LETTER = 25;  //z
	PASS_VK_CODE_ = "z";
}
else if (x == 6 && y == 1) {
	LETTER = 20;  //u
	PASS_VK_CODE_ = "u";
}
else if (x == 7 && y == 1) {
	LETTER = 8;  //i
	PASS_VK_CODE_ = "i";
}
else if (x == 8 && y == 1) {
	LETTER = 14;  //o
	PASS_VK_CODE_ = "o";
}
else if (x == 9 && y == 1) {
	LETTER = 15;  //p
	PASS_VK_CODE_ = "p";
}

else if (x == 10 && y == 1) {
	LETTER = 28;  //m UBACI ZA TACKU
	PASS_VK_CODE_ = "[";
}

else if (x == 10 && y == 0) {
	
	LETTER = 25;  //Backspace
	width_extra = 10;
	PASS_VK_CODE_ = "Backspace";
}
//line 2
else if (x == 0 && y == 2) {
	LETTER = 0;  //a
	PASS_VK_CODE_ = "a";
}
else if (x == 1 && y == 2) {
	LETTER = 18;  //s
	PASS_VK_CODE_ = "s";
}
else if (x == 2 && y == 2) {
	LETTER = 3;  //d
	PASS_VK_CODE_ = "d";
}
else if (x == 3 && y == 2) {
	LETTER = 5;  //f
	PASS_VK_CODE_ = "f";
}
else if (x == 4 && y == 2) {
	LETTER = 6;  //g
	PASS_VK_CODE_ = "g";
}
else if (x == 5 && y == 2) {
	LETTER = 7;  //h
	PASS_VK_CODE_ = "h";
}
else if (x == 6 && y == 2) {
	LETTER = 9;  //j
	PASS_VK_CODE_ = "j";
}
else if (x == 7 && y == 2) {
	LETTER = 10;  //k
	PASS_VK_CODE_ = "k";
}
else if (x == 8 && y == 2) {
	LETTER = 11;  //l
	PASS_VK_CODE_ = "l";
}
else if (x == 9 && y == 2) {
	
	LETTER = 28;  // SPECIAL : ENTER
	//width_extra = 10;
	PASS_VK_CODE_ = ";";
	
}
else if (x == 10 && y == 2) {
	
	LETTER = 28;  // SPECIAL : ENTER
	//width_extra = 10;
	PASS_VK_CODE_ = "'";
	
}


else if (x == 11 && y == 2) {
	
	LETTER = 0;  // enter 
	width_extra = 10;
	PASS_VK_CODE_ = "enter2";
}
//line 3
else if (x == 0 && y == 3) {
	LETTER = 24;  //y
	PASS_VK_CODE_ = "y";
}
else if (x == 1 && y == 3) {
	LETTER = 23;  //x
	PASS_VK_CODE_ = "x";
}
else if (x == 2 && y == 3) {
	LETTER = 2;  //c
	PASS_VK_CODE_ = "c";
}
else if (x == 3 && y == 3) {
	LETTER = 21;  //v
	PASS_VK_CODE_ = "v";
}
else if (x == 4 && y == 3) {
	LETTER = 1;  //b
	PASS_VK_CODE_ = "b";
}
else if (x == 5 && y == 3) {
	LETTER = 13;  //n
	PASS_VK_CODE_ = "n";
}
else if (x == 6 && y == 3) {
	LETTER = 12;  //m
	PASS_VK_CODE_ = "m";
}
 
else if (x == 7 && y == 3) {
	LETTER = 27;  //m
	PASS_VK_CODE_ = ",";
}
else if (x == 8 && y == 3) {
	LETTER = 27;  //m UBACI ZA TACKU
	PASS_VK_CODE_ = ".";
}
else if (x == 9 && y == 3) {
	LETTER = 30;  //m UBACI ZA TACKU
	PASS_VK_CODE_ = "/";
}
else if (x == 10 && y == 3) {
	LETTER = 31;  //m UBACI ZA TACKU
	PASS_VK_CODE_ = "Caps";
}



//down line 
else if (x == 0 && y == 4) {
	LETTER = 24;  //y 
	PASS_VK_CODE_ = "_";
}
else if (x == 1 && y == 4) {
	LETTER = 23;  //x
	PASS_VK_CODE_ = "-";
}
else if (x == 2 && y == 4) {
	LETTER = 2;  //c
	PASS_VK_CODE_ = "+";
}
else if (x == 3 && y == 4) {
	LETTER = 21;  //v
	PASS_VK_CODE_ = "=";
}
else if (x == 4 && y == 4) {
	LETTER = 1;  //b
	PASS_VK_CODE_ = "space";
	width_extra = 24;
}
else if (x == 5 && y == 4) {
 
}
else if (x == 6 && y == 4) {
 
}
 
else if (x == 7 && y == 4) {
 
}
else if (x == 8 && y == 4) {
	LETTER = 27;  //m UBACI ZA TACKU
	PASS_VK_CODE_ = ".com";
}
else if (x == 9 && y == 4) {
	LETTER = 30;  //m UBACI ZA TACKU
	PASS_VK_CODE_ = "hide";
	SPECIAL_COMMAND = 'hide';
}
else if (x == 10 && y == 4) {
	LETTER = 31;  //m UBACI ZA TACKU
	PASS_VK_CODE_ = "Enter";
	width_extra = 12;
}


// NUMBERS
else if (x == 0 && y == 0) {
	LETTER = 33;  // o  
	PASS_VK_CODE_ = '0';
}
else if (x == 1 && y == 0) {
	LETTER = 34;  // o  
	PASS_VK_CODE_ = '1';
}
else if (x == 2 && y == 0) {
	LETTER = 35;  // o
PASS_VK_CODE_ = '2';	
}
else if (x == 3 && y == 0) {
	LETTER = 36;  // o  
	PASS_VK_CODE_ = '3';
}
else if (x == 4 && y == 0) {
	LETTER = 37;  // o  
	PASS_VK_CODE_ = '4';
}
else if (x == 5 && y == 0) {
	LETTER = 38;  // o
PASS_VK_CODE_ = '5';	
}
else if (x == 6 && y == 0) {
	LETTER = 39;  // o  
	PASS_VK_CODE_ = '6';
}
else if (x == 7 && y == 0) {
	LETTER = 40;  // o  
	PASS_VK_CODE_ = '7';
}
else if (x == 8 && y == 0) {
	LETTER = 41;  // o  
	PASS_VK_CODE_ = '8';
}
else if (x == 9 && y == 0) {
	LETTER = 42;  // o
PASS_VK_CODE_ = '9';	
}
else if (x == 10 && y == 0) {
	LETTER = 32;  // o  
	PASS_VK_CODE_ = '0';
}



/////////////////////////
// CREATING SYS KEYBOARD
// eliminate rigth of space 
if (   !(  ( x >= 5 && y == 4 ) && ( x <= 7 && y == 4 ) ) )  {

var ___ID = Math.random();
window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").NEW_OBJECT( name , x+(step*x) , y+(step*1.5*y) + 40 , w + width_extra , h , 10)
//window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).CREATE_ANIMATION( SURF , "DRAW_FRAME" , LETTER , RESOURCE.imagesFont1  , ___ID , "no" , 1,11,1,1,1) 
window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).CREATE_TEXTBOX( PASS_VK_CODE_  , 10 , "black" , "lime") ;
window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).DRAG = false;
window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.EDIT = false; 
window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).PASS_VK_CODE = PASS_VK_CODE_ ;

window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TOUCH_UP = function(){ 
___VIRTUALKEYBOARD_LABEL.BACKSPACE_DOWN = false;  
___VIRTUALKEYBOARD_LABEL.SPEEDUP = false;

};
  
window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TOUCH_DOWN = function(){  

if ( window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(this.NAME).TEXTBOX.TEXT == 'Backspace'){

___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT=___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.substring(0,___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.length - 1);
//console.log("VIRTUAL KEYBOARD : Backspace ")
___VIRTUALKEYBOARD_LABEL.BACKSPACE_DOWN = true;  
___VIRTUALKEYBOARD_LABEL.SPEEDUPBACKSPACE()

}

else if ( window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(this.NAME).TEXTBOX.TEXT == 'hide'){

HIDE_KEYBOARD()
//console.log("VIRTUAL KEYBOARD :  HIDE_KEYBOARD() ")

}
else if ( window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(this.NAME).TEXTBOX.TEXT == 'Enter'){

VK_ENTER()
//console.log("VIRTUAL KEYBOARD :  enter!! ")

}
else if ( window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(this.NAME).TEXTBOX.TEXT == 'Caps'){


VK_CAPS()
//console.log("VIRTUAL KEYBOARD :  caps !! ")

}
else if ( window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(this.NAME).TEXTBOX.TEXT == 'space'){


 HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").GAME_OBJECTS.ACCESS("___VIRTUALKEYBOARD_LABEL").TEXTBOX.TEXT += " ";
//console.log("VIRTUAL KEYBOARD :  caps !! ")

} 	
else {
	
HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").GAME_OBJECTS.ACCESS("___VIRTUALKEYBOARD_LABEL").TEXTBOX.TEXT += window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(this.NAME).TEXTBOX.TEXT;

}

};

}

// extra 
 if (y == 2 && x == 10) {
	 var name = "___VIRTUALKEYBOARD_" + (x+1) + y;
  x = 11;
    
PASS_VK_CODE_ = '\\' ;
var ___ID = Math.random();
window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").NEW_OBJECT( name , x +(step*x)   , y+(step*1.5*y) + 40 , w + width_extra , h , 10)

//window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).CREATE_ANIMATION( SURF , "DRAW_FRAME" , LETTER , RESOURCE.imagesFont1  , ___ID , "no" , 1,11,1,1,1) 
window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).CREATE_TEXTBOX( PASS_VK_CODE_  , 10 , "black" , "lime") ;
window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).DRAG = false;
window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.EDIT = false; 
window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TAP = function(){  
//console.log("VIRTUAL KEYBOARD : " + this.NAME);

};
	 
	x = 10; 
	 
 }
 
 // extra 
 if (y == 1 && x == 10) {
	 var name = "___VIRTUALKEYBOARD_" + (x+1) + y;
  x = 11;
  PASS_VK_CODE_ = "]";
var ___ID = Math.random();
window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").NEW_OBJECT( name , x +(step*x)   , y+(step*1.5*y) + 40 , w + width_extra , h , 10)
//window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).CREATE_ANIMATION( SURF , "DRAW_FRAME" , LETTER , RESOURCE.imagesFont1  , ___ID , "no" , 1,11,1,1,1) 
window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).CREATE_TEXTBOX( PASS_VK_CODE_  , 10 , "black" , "lime") ;
window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).DRAG = false;
window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.EDIT = false; 
  
window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TAP = function(){  
 
  
//console.log("VIRTUAL KEYBOARD : " + this.NAME);

};
	 
	x = 12; 
	 
 }

 ///////////////////////

}
}


}



///////////////
// HIDE KEYBOARD 


window['HIDE_KEYBOARD'] = function  (){
	
	
	___VIRTUALKEYBOARD_LABEL.VISIBLE = false;
	___KBSTATUS (11,5 , false)
	___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT = '';
	
}


window['SHOW_KEYBOARD'] = function  (textIsForThisNameObj){
	
	
	
	___VIRTUALKEYBOARD_LABEL.TEXT_FOR = window[textIsForThisNameObj];
	
	___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT = ___VIRTUALKEYBOARD_LABEL.TEXT_FOR.TEXTBOX.TEXT;
	
	___VIRTUALKEYBOARD_LABEL.VISIBLE = true;
	___KBSTATUS (11,5 , true)
	
	
}


window['VK_ENTER'] = function    (){
	    window[___VIRTUALKEYBOARD_LABEL.TEXT_FOR.NAME].TEXTBOX.TEXT  =  	___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT;
		___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT = '';
	    HIDE_KEYBOARD()
}


window['VK_CAPS'] = function  (){
	if ( ___VIRTUALKEYBOARD_LABEL.CAPS == false)
	{
		___KBSTATUS_CAPS_ON(11,5)
		___VIRTUALKEYBOARD_LABEL.CAPS = true;
	}
	else {
		___KBSTATUS_CAPS_OFF(11,5)
		___VIRTUALKEYBOARD_LABEL.CAPS = false;
	}
}

 

////////
// help hide keyb

window['___KBSTATUS'] = function   (H , V , WHAT ){
	
	
	
for (var y=0;y<V;y = y + 1){
for (var x=0;x<H;x = x + 1){


var name = "___VIRTUALKEYBOARD_" + x + y;
var PASS_VK_CODE_ = '';
var width_extra = 0;
var SPECIAL_COMMAND = null;

var LETTER = 0;
 
/////////////////////////
// CREATING SYS KEYBOARD

// eliminate rigth of space 
if (   !(  ( x >= 5 && y == 4 ) && ( x <= 7 && y == 4 ) ) )  {


window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).VISIBLE = WHAT;

 
 


}


// extra 
 if (y == 2 && x == 10) {
	 var name = "___VIRTUALKEYBOARD_" + (x+1) + y;
x = 11;
window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).VISIBLE = WHAT;
x = 10; 
	 
 }
 
 // extra 
if (y == 1 && x == 10) {
var name = "___VIRTUALKEYBOARD_" + (x+1) + y;
x = 11;
window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).VISIBLE = WHAT;	 
x = 12; 
	 
}

 ///////////////////////

}
}

	
}



// caps 


window['___KBSTATUS_CAPS_ON'] = function   (H , V , WHAT ){
	
	
	
for (var y=0;y<V;y = y + 1){
for (var x=0;x<H;x = x + 1){


var name = "___VIRTUALKEYBOARD_" + x + y;
var PASS_VK_CODE_ = '';
var width_extra = 0;
var SPECIAL_COMMAND = null;

var LETTER = 0;
 
/////////////////////////
// CREATING SYS KEYBOARD


if (name != "___VIRTUALKEYBOARD_44" && name != "___VIRTUALKEYBOARD_100" && name != "___VIRTUALKEYBOARD_103" && name != "___VIRTUALKEYBOARD_104" && name != "___VIRTUALKEYBOARD_94" ) {
	
	
// eliminate rigth of space 
if (   !(  ( x >= 5 && y == 4 ) && ( x <= 7 && y == 4 ) ) )  {


window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT = window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT.toUpperCase();

 


}







// extra 
 if (y == 2 && x == 10) {
	 var name = "___VIRTUALKEYBOARD_" + (x+1) + y;
x = 11;
window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT = window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT.toUpperCase()
x = 10; 
	 
 }
 
 // extra 
if (y == 1 && x == 10) {
var name = "___VIRTUALKEYBOARD_" + (x+1) + y;
x = 11;
window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT = window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT.toUpperCase()	 
x = 12; 
	 
}



//for special 
if (___VIRTUALKEYBOARD_101.TEXTBOX.TEXT != "{" ){
	___VIRTUALKEYBOARD_101.TEXTBOX.TEXT = "{";
}


if (___VIRTUALKEYBOARD_102.TEXTBOX.TEXT != '"' ){
___VIRTUALKEYBOARD_102.TEXTBOX.TEXT = '"';
}

 if (___VIRTUALKEYBOARD_93.TEXTBOX.TEXT != "?"){
___VIRTUALKEYBOARD_93.TEXTBOX.TEXT = "?";
}



if (name == "___VIRTUALKEYBOARD_111" ){
___VIRTUALKEYBOARD_111.TEXTBOX.TEXT = "}";
}
else if (name == "___VIRTUALKEYBOARD_92" ){
___VIRTUALKEYBOARD_92.TEXTBOX.TEXT = ":";
}

else if (name == "___VIRTUALKEYBOARD_112" ){
___VIRTUALKEYBOARD_112.TEXTBOX.TEXT = "|";
}
else if (name == "___VIRTUALKEYBOARD_73" ){
___VIRTUALKEYBOARD_73.TEXTBOX.TEXT = "<";
}
else if (name == "___VIRTUALKEYBOARD_83" ){
___VIRTUALKEYBOARD_83.TEXTBOX.TEXT = ">";
}
else if (name == "___VIRTUALKEYBOARD_10" ){ 
___VIRTUALKEYBOARD_10.TEXTBOX.TEXT = "!";
}
else if (name == "___VIRTUALKEYBOARD_20" ){
___VIRTUALKEYBOARD_20.TEXTBOX.TEXT = "@";
}
else if (name == "___VIRTUALKEYBOARD_30" ){
___VIRTUALKEYBOARD_30.TEXTBOX.TEXT = "#";
}
else if (name == "___VIRTUALKEYBOARD_40" ){
___VIRTUALKEYBOARD_40.TEXTBOX.TEXT = "$";
}
else if (name == "___VIRTUALKEYBOARD_50" ){
___VIRTUALKEYBOARD_50.TEXTBOX.TEXT = "%";
}
else if (name == "___VIRTUALKEYBOARD_60" ){
___VIRTUALKEYBOARD_60.TEXTBOX.TEXT = "^";
}
else if (name == "___VIRTUALKEYBOARD_70" ){
___VIRTUALKEYBOARD_70.TEXTBOX.TEXT = "&";
}
else if (name == "___VIRTUALKEYBOARD_80" ){
___VIRTUALKEYBOARD_80.TEXTBOX.TEXT = "*";
}
else if (name == "___VIRTUALKEYBOARD_90" ){
___VIRTUALKEYBOARD_90.TEXTBOX.TEXT = "(";
}
else if (name == "___VIRTUALKEYBOARD_00" ){
___VIRTUALKEYBOARD_00.TEXTBOX.TEXT = ")";
}




}

 

 ///////////////////////

}
}

	
}


window['___KBSTATUS_CAPS_OFF'] = function   (H , V , WHAT ){
	
	
	
for (var y=0;y<V;y = y + 1){
for (var x=0;x<H;x = x + 1){


var name = "___VIRTUALKEYBOARD_" + x + y;
var PASS_VK_CODE_ = '';
var width_extra = 0;
var SPECIAL_COMMAND = null;

var LETTER = 0;
 
/////////////////////////
// CREATING SYS KEYBOARD

if (name != "___VIRTUALKEYBOARD_44" && name != "___VIRTUALKEYBOARD_100" && name != "___VIRTUALKEYBOARD_103" && name != "___VIRTUALKEYBOARD_104" && name != "___VIRTUALKEYBOARD_94" ) {
	


// eliminate rigth of space 
if (   !(  ( x >= 5 && y == 4 ) && ( x <= 7 && y == 4 ) ) )  {


window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT = window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT.toLowerCase();

 
//console.log('caps OFF' + x + ' x y ' + y)


}


// extra 
 if (y == 2 && x == 10) {
	 var name = "___VIRTUALKEYBOARD_" + (x+1) + y;
x = 11;
window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT = window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT.toLowerCase()
x = 10; 
	 
 }
 
 // extra 
if (y == 1 && x == 10) {
var name = "___VIRTUALKEYBOARD_" + (x+1) + y;
x = 11;
window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT = window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT.toLowerCase()	 
x = 12; 
	 
}



//for special 
if (___VIRTUALKEYBOARD_101.TEXTBOX.TEXT != "[" ){
	___VIRTUALKEYBOARD_101.TEXTBOX.TEXT = "[";
}

if (___VIRTUALKEYBOARD_102.TEXTBOX.TEXT != "'" ){
___VIRTUALKEYBOARD_102.TEXTBOX.TEXT = "'";
}


 if (___VIRTUALKEYBOARD_93.TEXTBOX.TEXT != "/"){
___VIRTUALKEYBOARD_93.TEXTBOX.TEXT = "/";
}


//for special 
 
  if (name == "___VIRTUALKEYBOARD_111" ){
___VIRTUALKEYBOARD_111.TEXTBOX.TEXT = "]";
}
else if (name == "___VIRTUALKEYBOARD_93" ){
___VIRTUALKEYBOARD_92.TEXTBOX.TEXT = ";";
}
else if (name == "___VIRTUALKEYBOARD_112" ){
___VIRTUALKEYBOARD_112.TEXTBOX.TEXT = "\\";
}
else if (name == "___VIRTUALKEYBOARD_73" ){
___VIRTUALKEYBOARD_73.TEXTBOX.TEXT = ",";
}
else if (name == "___VIRTUALKEYBOARD_83" ){
___VIRTUALKEYBOARD_83.TEXTBOX.TEXT = ".";
}
else if (name == "___VIRTUALKEYBOARD_10" ){ 
___VIRTUALKEYBOARD_10.TEXTBOX.TEXT = "1";
}
else if (name == "___VIRTUALKEYBOARD_20" ){
___VIRTUALKEYBOARD_20.TEXTBOX.TEXT = "2";
}
else if (name == "___VIRTUALKEYBOARD_30" ){
___VIRTUALKEYBOARD_30.TEXTBOX.TEXT = "3";
}
else if (name == "___VIRTUALKEYBOARD_40" ){
___VIRTUALKEYBOARD_40.TEXTBOX.TEXT = "4";
}
else if (name == "___VIRTUALKEYBOARD_50" ){
___VIRTUALKEYBOARD_50.TEXTBOX.TEXT = "5";
}
else if (name == "___VIRTUALKEYBOARD_60" ){
___VIRTUALKEYBOARD_60.TEXTBOX.TEXT = "6";
}
else if (name == "___VIRTUALKEYBOARD_70" ){
___VIRTUALKEYBOARD_70.TEXTBOX.TEXT = "7";
}
else if (name == "___VIRTUALKEYBOARD_80" ){
___VIRTUALKEYBOARD_80.TEXTBOX.TEXT = "8";
}
else if (name == "___VIRTUALKEYBOARD_90" ){
___VIRTUALKEYBOARD_90.TEXTBOX.TEXT = "9";
}
else if (name == "___VIRTUALKEYBOARD_00" ){
___VIRTUALKEYBOARD_00.TEXTBOX.TEXT = "0";
}




}
//for special 
if (name == "___VIRTUALKEYBOARD_101" ){
	___VIRTUALKEYBOARD_101.TEXTBOX.TEXT = "["; 
}

 ///////////////////////

}
}

	
}



     };     

	 
	 
function LLLL () {

if (typeof document.body != 'undefined') {
		
if (  document.body != null ) {
	
	
	onload1()
	
}else {
	
			setTimeout(function(){LLLL()},300)
	
}

}	
	else{
		
		setTimeout(function(){LLLL()},300)
		
	}
	
}
	LLLL() 

	 
