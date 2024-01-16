use lazy_static::lazy_static;
use std::{collections::HashMap, sync::Mutex};
use tauri;

use uuid::Uuid;

lazy_static! {
    static ref MPD_MAP: Mutex<HashMap<String, String>> = {
        let m: HashMap<String, String> = HashMap::new();
        Mutex::new(m)
    };
}

#[tauri::command]
pub fn save_mpd(mpd: &str) -> String {
    let code = Uuid::new_v4().to_string();
    let result = code.to_string();
    let mut map = MPD_MAP.lock().unwrap();
    map.insert(code, mpd.to_string());
    result
}

pub fn get_mpd(code: &str) -> Option<String> {
    let map = MPD_MAP.lock().unwrap();
    let mpd_content = map.get(code).cloned();
    mpd_content
}
