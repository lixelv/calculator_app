#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
  )]
  
  use tauri::Manager;
  
  fn main() {
    tauri::Builder::default()
      .setup(|app| {
        let window = app.get_window("main").unwrap();
        
        // Устанавливаем свойства окна
        window.set_decorations(false).unwrap();
        window.set_always_on_top(true).unwrap();
        // Запрещаем изменение размера окна
        window.set_resizable(false).unwrap();
        Ok(())
      })
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
  }