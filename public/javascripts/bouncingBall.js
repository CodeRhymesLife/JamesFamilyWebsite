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
   var stepBall = F3(function (t,
   _v2,
   _v3) {
      return function () {
         return function () {
            switch (_v2.ctor)
            {case "_Tuple2":
               return function () {
                    var $ = {ctor: "_Tuple2"
                            ,_0: Basics.toFloat(_v2._0) / 2
                            ,_1: Basics.toFloat(_v2._1) / 2},
                    halfWidth = $._0,
                    halfHeight = $._1;
                    return A2(stepObj,
                    t,
                    _U.replace([["vx"
                                ,A3(stepV,
                                _v3.vx,
                                _U.cmp(_v3.x,
                                wallMargin - halfWidth) < 0,
                                _U.cmp(_v3.x,
                                halfWidth - wallMargin) > 0)]
                               ,["vy"
                                ,A3(stepV,
                                _v3.vy,
                                _U.cmp(_v3.y,
                                wallMargin - halfHeight) < 0,
                                _U.cmp(_v3.y,
                                halfHeight - wallMargin) > 0)]],
                    _v3));
                 }();}
            _E.Case($moduleName,
            "between lines 43 and 45");
         }();
      }();
   });
   var Game = F3(function (a,b,c) {
      return {_: {}
             ,ball: b
             ,dimensions: c
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
   var Dimensions = F2(function (a,
   b) {
      return {_: {}
             ,height: b
             ,width: a};
   });
   var Pause = {ctor: "Pause"};
   var defaultGame = {_: {}
                     ,ball: {_: {}
                            ,vx: 800
                            ,vy: 800
                            ,x: 0
                            ,y: 0}
                     ,dimensions: {_: {}
                                  ,height: 800
                                  ,width: 1200}
                     ,state: Pause};
   var Play = {ctor: "Play"};
   var stepGame = F2(function (_v8,
   _v9) {
      return function () {
         return function () {
            return function () {
               var $ = _v8.dim,
               w = $._0,
               h = $._1;
               return _U.replace([["state"
                                  ,_v8.space && _U.eq(_v9.state,
                                  Pause) ? Play : _v8.space && _U.eq(_v9.state,
                                  Play) ? Pause : _v9.state]
                                 ,["ball"
                                  ,_U.eq(_v9.state,
                                  Pause) ? _v9.ball : A3(stepBall,
                                  _v8.delta,
                                  _v8.dim,
                                  _v9.ball)]
                                 ,["dimensions"
                                  ,_U.replace([["width"
                                               ,Basics.toFloat(w)]
                                              ,["height",Basics.toFloat(h)]],
                                  _v9.dimensions)]],
               _v9);
            }();
         }();
      }();
   });
   var display = F2(function (_v12,
   _v13) {
      return function () {
         return function () {
            switch (_v12.ctor)
            {case "_Tuple2":
               return A3(Graphics.Element.container,
                 _v12._0,
                 _v12._1,
                 Graphics.Element.middle)(A3(Graphics.Collage.collage,
                 _v12._0,
                 _v12._1,
                 _L.fromArray([Graphics.Collage.filled(pongGreen)(A2(Graphics.Collage.rect,
                              _v13.dimensions.width,
                              _v13.dimensions.height))
                              ,make(_v13.ball)(A2(Graphics.Collage.oval,
                              15,
                              15))
                              ,Graphics.Collage.move({ctor: "_Tuple2"
                                                     ,_0: 0
                                                     ,_1: 40 - _v13.dimensions.height / 2})(Graphics.Collage.toForm(_U.eq(_v13.state,
                              Play) ? A2(Graphics.Element.spacer,
                              1,
                              1) : A2(txt,
                              Basics.id,
                              msg)))])));}
            _E.Case($moduleName,
            "between lines 74 and 79");
         }();
      }();
   });
   var delta = A2(Signal._op["<~"],
   Time.inSeconds,
   Time.fps(35));
   var Input = F4(function (a,
   b,
   c,
   d) {
      return {_: {}
             ,delta: c
             ,dim: d
             ,dir: b
             ,space: a};
   });
   var input = A2(Signal.sampleOn,
   delta,
   A2(Signal._op["~"],
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
   delta),
   Window.dimensions));
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
                      ,Dimensions: Dimensions
                      ,Ball: Ball
                      ,Game: Game};
   return _elm.Main.values;
};