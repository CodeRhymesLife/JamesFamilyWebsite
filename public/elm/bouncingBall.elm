import Keyboard
import Text
import Window

 
-- Inputs

type Input = { space:Bool, dir:Int, delta:Time }

delta = inSeconds <~ fps 35

input = sampleOn delta (Input <~ Keyboard.space

                               ~ lift .y Keyboard.arrows

                               ~ delta)
                    

-- Model

(gameWidth,gameHeight) = (600,400)
(halfWidth,halfHeight) = (300,200)

data State = Play | Pause

type Ball = { x:Float, y:Float, vx:Float, vy:Float }
type Game = { state:State, ball:Ball }

defaultGame : Game
defaultGame = { state = Pause, ball = { x=0, y=0, vx=200, vy=200 }}


-- Updates

wallMargin = 7

stepObj t ({x,y,vx,vy} as obj) =
    { obj | x <- x + vx*t, y <- y + vy*t }

stepV v lowerCollision upperCollision =
  if | lowerCollision -> abs v
     | upperCollision -> 0 - abs v
     | otherwise      -> v

stepBall : Time -> Ball -> Ball
stepBall t ({x,y,vx,vy} as ball) =
  stepObj t { ball | vx <- stepV vx (x < wallMargin-halfWidth) (x > halfWidth-wallMargin) ,
      vy <- stepV vy (y < wallMargin-halfHeight) (y > halfHeight-wallMargin) }

stepGame : Input -> Game -> Game
stepGame {space,dir,delta} ({state,ball} as game) =
  { game | state  <- if | space && state == Pause    -> Play
                        | space && state == Play     -> Pause
                        | otherwise        -> state
         , ball   <- if state == Pause then ball else
                         stepBall delta ball }
 

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
display (w,h) {state,ball} =
  container w h middle <| collage gameWidth gameHeight
       [ rect gameWidth gameHeight |> filled pongGreen
       , oval 15 15 |> make ball
       , toForm (if state == Play then spacer 1 1 else txt id msg)
           |> move (0, 40 - gameHeight/2)
       ]

main = lift2 display Window.dimensions gameState
