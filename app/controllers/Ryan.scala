package controllers

import play.api._
import play.api.mvc._

object Ryan extends Controller {

 def index = Action {
   Ok(views.html.Ryan.index("Hello World"))
 }
}