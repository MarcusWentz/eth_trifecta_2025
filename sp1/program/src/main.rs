//! A simple program that takes a number `n` as input, and writes the `n-1`th and `n`th fibonacci
//! number as an output.

// These two lines are necessary for the program to properly compile.
//
// Under the hood, we wrap your main function with some extra code so that it behaves properly
// inside the zkVM.

#![no_main]
use axum::{
    routing::{get, post},
    http::StatusCode,
    Json, Router,
    extract::State,
};
use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};
use tower_http::cors::{Any, CorsLayer};

#[derive(Debug, Serialize, Deserialize)]
struct UserData {
    age: u32,                      // Age is an unsigned 32-bit integer
    coordinates: [f64; 2],         // A fixed-size array of two f64 values
    history: Vec<String>,          // A vector of strings for browsing history
}
#[derive(Debug, Serialize)]
struct Response {
    status: String,
    processed_data: ProcessedData,
    timestamp: String,
}

#[derive(Debug, Serialize)]
struct ProcessedData {
    name_length: usize,
    message_length: usize,
    greeting: String,
}

#[derive(Debug, Default)]
struct AppState {
    request_count: Mutex<usize>,
}

sp1_zkvm::entrypoint!(main);

use alloy_primitives::keccak256;
use alloy_sol_types::SolType;
use ad_qualification_lib::{check_target_user, PublicValuesStruct};

#[tokio::main]
pub async fn main() {
     let app_state = Arc::new(AppState {
        request_count: Mutex::new(0),
    });

    // Configure CORS to allow requests from the React frontend
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    // Build our application with routes
    let app = Router::new()
        .route("/", get(health_check))
        .route("/api/process", post(process_json))
        .with_state(app_state)
        .layer(cors);

    // Run the server
    println!("🚀 Server starting on http://localhost:8080");
    axum::Server::bind(&"0.0.0.0:8080".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
    // Read an input to the program.
    //
    // Behind the scenes, this compiles down to a custom system call which handles reading inputs
    // from the prover.
    let user_data = sp1_zkvm::io::read::<String>();
    let user_data_hash = keccak256(user_data.as_bytes());
    let criteria = sp1_zkvm::io::read::<String>();
    let criteria_hash = keccak256(criteria.as_bytes());

    // Compute the n'th fibonacci number using a function from the workspace lib crate.
    check_target_user(user_data, criteria);

    // Encode the public values of the program.
    let bytes = PublicValuesStruct::abi_encode(&PublicValuesStruct {
        user_data_hash,
        criteria_hash,
    });

    // Commit to the public values of the program. The final proof will have a commitment to all the
    // bytes that were committed to.
    sp1_zkvm::io::commit_slice(&bytes);
}
async fn health_check() -> &'static str {
    "Rust backend is running!"
}

sync fn process_json(
    State(state): State<Arc<AppState>>,
    Json(payload): Json<Request>,
) -> (StatusCode, Json<Response>) {

    let mut count = state.request_count.lock().unwrap();
    *count += 1;
    println!("Request #{}: Processing data for {}", *count, payload.age);


    let processed = ProcessedData {
        name_length: payload.name.len(),
        message_length: payload.message.len(),
        greeting: format!("Hello, {}! We received your message.", payload.age),
    };

 
    let response = Response {
        status: "success".to_string(),
        processed_data: processed,
        timestamp: chrono::Utc::now().to_rfc3339(),
    };


    (StatusCode::OK, Json(response))
}