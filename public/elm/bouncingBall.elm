import Keyboard
import Text
import Window

 
-- Inputs

type Input = { space:Bool, dir:Int, delta:Time, dim:(Int,Int) }

delta = inSeconds <~ fps 35

input = sampleOn delta (Input <~ Keyboard.space
                               ~ lift .y Keyboard.arrows
                               ~ delta
                               ~ Window.dimensions)

-- Model

data State = Play | Pause

type Dimensions = { width:Float, height:Float }
type Ball = { x:Float, y:Float, vx:Float, vy:Float }
type Game = { state:State, ball:Ball, dimensions:Dimensions}

defaultGame : Game
defaultGame = { state = Pause, ball = { x=0, y=0, vx=800, vy=800 }, dimensions = { width = 1200, height = 800 } }


-- Updates

wallMargin = 7

stepObj t ({x,y,vx,vy} as obj) =
    { obj | x <- x + vx*t, y <- y + vy*t }

stepV v lowerCollision upperCollision =
  if | lowerCollision -> abs v
     | upperCollision -> 0 - abs v
     | otherwise      -> v

stepBall : Time -> (Int,Int) -> Ball -> Ball
stepBall t (w,h) ({x,y,vx,vy} as ball) =
  let (halfWidth,halfHeight) = ((toFloat w)/2, (toFloat h)/2)
  in stepObj t { ball | vx <- stepV vx (x < wallMargin-halfWidth) (x > halfWidth-wallMargin) ,
         vy <- stepV vy (y < wallMargin-halfHeight) (y > halfHeight-wallMargin) }


stepGame : Input -> Game -> Game
stepGame {space,dir,delta,dim} ({state,ball,dimensions} as game) =
  let (w,h) = dim
  in { game| state  <- if | space && state == Pause    -> Play
                        | space && state == Play     -> Pause
                        | otherwise        -> state
         , ball   <- if state == Pause then ball else
                         stepBall delta dim ball
         , dimensions <- { dimensions | width <- toFloat w, height <- toFloat h } }

gameState = foldp stepGame defaultGame input


-- Display

pongGreen = rgb 60 100 60
textGreen = rgb 160 200 160
txt f = leftAligned . f . monospace . Text.color textGreen . toText
msg = "SPACE to start, &larr;&uarr;&darr;&rarr; to move"

make obj shape =
    shape |> filled white
          |> move (obj.x,obj.y)

display : (Int,Int) -> Game -> Element
display (w,h) {state,ball,dimensions} =
  container w h middle <| collage w h
       [ rect dimensions.width dimensions.height |> filled pongGreen
       , oval 15 15 |> make ball
       , toForm (if state == Play then spacer 1 1 else txt id msg)
           |> move (0, 40 - dimensions.height/2)
       ]

main = lift2 display Window.dimensions gameState
