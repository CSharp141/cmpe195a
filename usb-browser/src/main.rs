use tao::{
    event::{DeviceEvent, ElementState, Event, WindowEvent},
    event_loop::{ControlFlow, EventLoop},
    keyboard::KeyCode,
    window::WindowBuilder,
};

use wry::webview::WebViewBuilder;

fn main() -> anyhow::Result<()> {
    let event_loop = EventLoop::new();
    let window = WindowBuilder::new()
        .with_title("USB Secure Proctor")
        .with_fullscreen(Some(tao::window::Fullscreen::Borderless(None)))
        .build(&event_loop)?;

    let webview = WebViewBuilder::new(window)?
        .with_url("https://usbproctor.com")?
        .with_devtools(false)
        .build()?;

    event_loop.run(move |event, _, control_flow| {
        *control_flow = ControlFlow::Wait;

        match event {
            Event::DeviceEvent {
                device_id: _,
                event,
                ..
            } => match event {
                DeviceEvent::Key(key) => {
                    if key.state == ElementState::Pressed && key.physical_key == KeyCode::Space {
                        webview.load_url("https://usbproctor.com");
                    }
                }
                _ => (),
            },
            Event::WindowEvent {
                event: WindowEvent::CloseRequested,
                ..
            } => *control_flow = ControlFlow::Exit,
            _ => (),
        }
    });
}
