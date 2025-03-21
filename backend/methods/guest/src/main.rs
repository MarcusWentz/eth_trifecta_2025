use json::parse;
use json_core::Outputs;
use risc0_zkvm::{
    guest::env,
    sha::{Impl, Sha256},
};

fn main() {
    let data: String = env::read();

    println!("GUEST PROGRAM START DEBUG");
    println!("{:?}", data);
    println!("GUEST PROGRAM END DEBUG");

    let sha = *Impl::hash_bytes(&data.as_bytes());

    let parsed: Value = serde_json::from_str(&data).expect("JSON parsing failed");

    println!("Parsed JSON: {:?}", parsed);

    let boolean_field: bool = parsed.get("boolean_field").and_then(Value::as_bool).unwrap_or(false);
    let proven_val: u32 = parsed.get("critical_data").and_then(Value::as_u64).unwrap_or(0) as u32;
    let age: u32 = parsed.get("age").and_then(Value::as_u64).unwrap_or(0) as u32;

    let latitude: f32 = parsed.get("latitude").and_then(Value::as_f64).unwrap_or(-1.0) as f32;
    let longitude: f32 = parsed.get("longitude").and_then(Value::as_f64).unwrap_or(-1.0) as f32;

    if let Some(websites) = parsed.get("websites").and_then(Value::as_object) {
        println!("Found {} websites:", websites.len());
        for (key, value) in websites.iter().take(3) {
            println!("{}. {}", key, value.as_str().unwrap_or("Unknown"));
        }
    } else {
        println!("No websites found.");
    }

    let obj_field = parsed.get("obj_field").and_then(Value::as_object);
    let string_subfield: &str = obj_field
        .and_then(|obj| obj.get("string_subfield"))
        .and_then(Value::as_str)
        .unwrap_or("");

    let array_subfield = obj_field
        .and_then(|obj| obj.get("array_subfield"))
        .and_then(Value::as_array);

    println!("Extracted values:");
    println!("boolean_field: {}", boolean_field);
    println!("proven_val: {}", proven_val);
    println!("age: {}", age);
    println!("latitude: {}", latitude);
    println!("longitude: {}", longitude);
    println!("string_subfield: {}", string_subfield);

    if let Some(array) = array_subfield {
        println!("array_subfield contains:");
        for value in array {
            if let Some(text) = value.as_str() {
                println!("- {}", text);
            }
        }
    } else {
        println!("array_subfield is missing or empty.");
    }

    if !(20..=40).contains(&age) {
        println!("Out of age range: 20 to 40.");
        panic!();
    }

    if !(48.0..=50.0).contains(&latitude) {
        println!("Out of latitude range: 48 to 50.");
        panic!();
    }

    if !(1.0..=3.0).contains(&longitude) {
        println!("Out of longitude range: 1 to 3.");
        panic!();
    }

    let out = serde_json::json!({
        "data": proven_val,
        "hash": sha,
    });

    env::commit(&out);
}