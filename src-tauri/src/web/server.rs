use std::sync::Mutex;

use actix_cors::Cors;
use actix_web::{get, http::header::ContentType, middleware, web, App, HttpResponse, HttpServer};
use tauri::AppHandle;

use crate::mpd;

struct TauriAppState {
    app: Mutex<AppHandle>,
}

#[get("/mpd/{code}")]
async fn get_mpd_file(code: web::Path<String>) -> HttpResponse {
    let content = mpd::get_mpd(code.as_str());
    println!("{:?}: {:?}", code, content);
    HttpResponse::Ok()
        .content_type("application/dash+xml")
        .body(content.unwrap())
}

#[get("/test")]
async fn test() -> HttpResponse {
    HttpResponse::Ok().body("hello")
}

#[actix_web::main] // or #[tokio::main]
pub async fn start_server(app: AppHandle) -> std::io::Result<()> {
    let tauri_app = web::Data::new(TauriAppState {
        app: Mutex::new(app),
    });
    HttpServer::new(move || {
        let cors = Cors::default().allowed_origin("http://localhost:1420");
        App::new()
            .app_data(tauri_app.clone())
            .wrap(middleware::Logger::default())
            .wrap(cors)
            .service(web::scope("api").service(test).service(get_mpd_file))
    })
    .bind(("127.0.0.1", 11451))?
    .run()
    .await
}
