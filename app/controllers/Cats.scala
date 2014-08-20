package controllers

import play.api._
import play.api.mvc._

object Cats extends Controller {

 def index = Action {
	 Ok(views.html.Cats.index())
 }
 
 def game = Action {
	 Ok(views.html.Cats.game())
 }
}