// Copyright 2024 RISC Zero, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

use geo::{algorithm::contains::Contains, Point, Polygon};
use json::{parse, JsonValue};
use json_core::Outputs;
use risc0_zkvm::{
    guest::env,
    sha::{Impl, Sha256},
};

fn main() {
    let user_data: String = env::read();
    let criteria: String = env::read();

    let user_data_hash = *Impl::hash_bytes(user_data.as_bytes());
    let user_data = parse(&user_data).unwrap();
    let criteria_hash = *Impl::hash_bytes(criteria.as_bytes());
    let criteria = parse(&criteria).unwrap();

    // Gather user data from JSON
    let age: u32 = user_data["age"].as_u32().unwrap();
    let coordinates: Vec<f64> = match user_data["coordinates"].clone() {
        JsonValue::Array(c) => c.iter().map(|x| x.as_f64().unwrap()).collect(),
        _ => panic!("Coordinates not found."),
    };
    let history: Vec<String> = match user_data["history"].clone() {
        JsonValue::Array(h) => h.iter().map(|x| x.as_str().unwrap().to_string()).collect(),
        _ => panic!("History not found."),
    };

    // Gather criteria from JSON
    let age_range: Vec<u32> = match criteria["age_range"].clone() {
        JsonValue::Array(a) => a.iter().map(|x| x.as_u32().unwrap()).collect(),
        _ => panic!("Age range not found."),
    };
    let geofence: Vec<Vec<f64>> = match criteria["geofence"].clone() {
        JsonValue::Array(g) => g
            .iter()
            .map(|x| match x {
                JsonValue::Array(a) => a.iter().map(|y| y.as_f64().unwrap()).collect(),
                _ => panic!("Geofence not found."),
            })
            .collect(),
        _ => panic!("Geofence not found."),
    };
    let target_domains: Vec<String> = match criteria["target_domains"].clone() {
        JsonValue::Array(t) => t.iter().map(|x| x.as_str().unwrap().to_string()).collect(),
        _ => panic!("Target domains not found."),
    };

    // Check age range.
    if age < age_range[0] || age > age_range[1] {
        panic!(
            "Out of age range: {} not in {} to {}",
            age, age_range[0], age_range[1]
        );
    }

    // Check that user is in geofence.
    let polygon = Polygon::new(
        geofence.iter().map(|x| Point::new(x[0], x[1])).collect(),
        vec![],
    );
    let point = Point::new(coordinates[0], coordinates[1]);
    if !polygon.contains(&point) {
        panic!("User is not in geofence.");
    }

    // Check that user has visited target domains.
    for domain in target_domains {
        if !history.contains(&domain) {
            panic!("User has not visited domain: {}", domain);
        }
    }

    println!("All checks passed.");

    let out = Outputs {
        user_data_hash,
        criteria_hash,
    };
    env::commit(&out);
}
