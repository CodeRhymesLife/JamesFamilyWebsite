Elm.Main = Elm.Main || {};
Elm.Main.make = function (_elm) {
   "use strict";
   _elm.Main = _elm.Main || {};
   if (_elm.Main.values)
   return _elm.Main.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Main";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var Keyboard = Elm.Keyboard.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Window = Elm.Window.make(_elm);
   var _op = {};
   var make = F2(function (obj,
   shape) {
      return Graphics.Collage.move({ctor: "_Tuple2"
                                   ,_0: obj.x
                                   ,_1: obj.y})(Graphics.Collage.filled(Color.white)(shape));
   });
   var msg = "SPACE to start, &larr;&uarr;&darr;&rarr; to move";
   var textGreen = A3(Color.rgb,
   160,
   200,
   160);
   var txt = function (f) {
      return function ($) {
         return Text.leftAligned(f(Text.monospace(Text.color(textGreen)(Text.toText($)))));
      };
   };
   var pongGreen = A3(Color.rgb,
   60,
   100,
   60);
   var stepV = F3(function (v,
   lowerCollision,
   upperCollision) {
      return lowerCollision ? Basics.abs(v) : upperCollision ? 0 - Basics.abs(v) : v;
   });
   var stepObj = F2(function (t,
   _v0) {
      return function () {
         return _U.replace([["x"
                            ,_v0.x + _v0.vx * t]
                           ,["y",_v0.y + _v0.vy * t]],
         _v0);
      }();
   });
   var wallMargin = 7;
   var Game = F2(function (a,b) {
      return {_: {}
             ,ball: b
             ,state: a};
   });
   var Ball = F4(function (a,
   b,
   c,
   d) {
      return {_: {}
             ,vx: c
             ,vy: d
             ,x: a
             ,y: b};
   });
   var Pause = {ctor: "Pause"};
   var defaultGame = {_: {}
                     ,ball: {_: {}
                            ,vx: 200
                            ,vy: 200
                            ,x: 0
                            ,y: 0}
                     ,state: Pause};
   var Play = {ctor: "Play"};
   var $ = {ctor: "_Tuple2"
           ,_0: 300
           ,_1: 200},
   halfWidth = $._0,
   halfHeight = $._1;
   var stepBall = F2(function (t,
   _v2) {
      return function () {
         return A2(stepObj,
         t,
         _U.replace([["vx"
                     ,A3(stepV,
                     _v2.vx,
                     _U.cmp(_v2.x,
                     wallMargin - halfWidth) < 0,
                     _U.cmp(_v2.x,
                     halfWidth - wallMargin) > 0)]
                    ,["vy"
                     ,A3(stepV,
                     _v2.vy,
                     _U.cmp(_v2.y,
                     wallMargin - halfHeight) < 0,
                     _U.cmp(_v2.y,
                     halfHeight - wallMargin) > 0)]],
         _v2));
      }();
   });
   var stepGame = F2(function (_v4,
   _v5) {
      return function () {
         return function () {
            return _U.replace([["state"
                               ,_v4.space && _U.eq(_v5.state,
                               Pause) ? Play : _v4.space && _U.eq(_v5.state,
                               Play) ? Pause : _v5.state]
                              ,["ball"
                               ,_U.eq(_v5.state,
                               Pause) ? _v5.ball : A2(stepBall,
                               _v4.delta,
                               _v5.ball)]],
            _v5);
         }();
      }();
   });
   var $ = {ctor: "_Tuple2"
           ,_0: 600
           ,_1: 400},
   gameWidth = $._0,
   gameHeight = $._1;
   var display = F2(function (_v8,
   _v9) {
      return function () {
         return function () {
            switch (_v8.ctor)
            {case "_Tuple2":
               return A3(Graphics.Element.container,
                 _v8._0,
                 _v8._1,
                 Graphics.Element.middle)(A3(Graphics.Collage.collage,
                 gameWidth,
                 gameHeight,
                 _L.fromArray([Graphics.Collage.filled(pongGreen)(A2(Graphics.Collage.rect,
                              gameWidth,
                              gameHeight))
                              ,make(_v9.ball)(A2(Graphics.Collage.oval,
                              15,
                              15))
                              ,Graphics.Collage.move({ctor: "_Tuple2"
                                                     ,_0: 0
                                                     ,_1: 40 - gameHeight / 2})(Graphics.Collage.toForm(_U.eq(_v9.state,
                              Play) ? A2(Graphics.Element.spacer,
                              1,
                              1) : A2(txt,
                              Basics.id,
                              msg)))])));}
            _E.Case($moduleName,
            "between lines 75 and 80");
         }();
      }();
   });
   var delta = A2(Signal._op["<~"],
   Time.inSeconds,
   Time.fps(35));
   var Input = F3(function (a,
   b,
   c) {
      return {_: {}
             ,delta: c
             ,dir: b
             ,space: a};
   });
   var input = A2(Signal.sampleOn,
   delta,
   A2(Signal._op["~"],
   A2(Signal._op["~"],
   A2(Signal._op["<~"],
   Input,
   Keyboard.space),
   A2(Signal.lift,
   function (_) {
      return _.y;
   },
   Keyboard.arrows)),
   delta));
   var gameState = A3(Signal.foldp,
   stepGame,
   defaultGame,
   input);
   var main = A3(Signal.lift2,
   display,
   Window.dimensions,
   gameState);
   _elm.Main.values = {_op: _op
                      ,delta: delta
                      ,input: input
                      ,gameHeight: gameHeight
                      ,gameWidth: gameWidth
                      ,halfHeight: halfHeight
                      ,halfWidth: halfWidth
                      ,defaultGame: defaultGame
                      ,wallMargin: wallMargin
                      ,stepObj: stepObj
                      ,stepV: stepV
                      ,stepBall: stepBall
                      ,stepGame: stepGame
                      ,gameState: gameState
                      ,pongGreen: pongGreen
                      ,textGreen: textGreen
                      ,txt: txt
                      ,msg: msg
                      ,make: make
                      ,display: display
                      ,main: main
                      ,Play: Play
                      ,Pause: Pause
                      ,Input: Input
                      ,Ball: Ball
                      ,Game: Game};
   return _elm.Main.values;
};