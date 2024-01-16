use actix_web::{get, web, App, HttpServer, Responder};

#[get("/proxy/m4s")]
pub async fn greet(name: web::Path<String>) -> impl Responder {
    format!("Hello {name}!")
}
