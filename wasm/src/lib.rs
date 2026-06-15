use gravity_interaction_calc::{
    body::Body,
    solver::{integrate, IntegrationData},
};
use nalgebra::MatrixXx1;
use serde::{Deserialize, Serialize};
use serde_wasm_bindgen::to_value;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct BodyInput {
    x: f64,
    y: f64,
    z: f64,
    vel_x: f64,
    vel_y: f64,
    vel_z: f64,
    mass: f64,
    radius: f64,
}

#[wasm_bindgen]
impl BodyInput {
    #[wasm_bindgen(constructor)]
    pub fn new(
        x: f64,
        y: f64,
        z: f64,
        vel_x: f64,
        vel_y: f64,
        vel_z: f64,
        mass: f64,
        radius: f64,
    ) -> Self {
        Self {
            x,
            y,
            z,
            vel_x,
            vel_y,
            vel_z,
            mass,
            radius,
        }
    }
}

#[derive(Serialize, Deserialize)]
#[wasm_bindgen]
struct IntegrationDataJson {
    x: Vec<f64>,
    y: Vec<Vec<f64>>,
}

impl From<IntegrationData> for IntegrationDataJson {
    fn from(data: IntegrationData) -> Self {
        let y = data
            .y
            .into_iter()
            .map(|col: MatrixXx1<f64>| col.iter().copied().collect::<Vec<f64>>())
            .collect();

        Self { x: data.x, y }
    }
}

#[wasm_bindgen]
pub fn integrate_wasm(bodies: Vec<BodyInput>) -> Result<JsValue, JsValue> {
    let b: Vec<Body> = bodies
        .iter()
        .map(|b| Body::new(b.x, b.y, b.z, b.vel_x, b.vel_y, b.vel_z, b.mass, b.radius))
        .collect();
    let result = integrate(&b, None, None);

    match result {
        Ok(stats) => {
            let json: IntegrationDataJson = stats.into();
            to_value(&json).map_err(|e| JsValue::from_str(&e.to_string()))
        }
        Err(e) => Err(JsValue::from_str(&e.to_string())),
    }
}
