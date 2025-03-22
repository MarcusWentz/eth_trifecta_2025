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

use json::{parse, JsonValue};
use json_core::Outputs;
use risc0_zkvm::{
    guest::env,
    sha::{Impl, Sha256},
};

fn main() {
    let user_data: String = env::read();
    let criteria: String = env::read();

    // // Error: called `Result::unwrap()` on an `Err` value: DeserializeUnexpectedEnd
    // let data2: String = env::read();

    println!("GUEST PROGRAM START DEBUG");
    println!("{:?}", user_data);
    println!("{:?}", criteria);

    // // Error: called `Result::unwrap()` on an `Err` value: DeserializeUnexpectedEnd
    // println!("{:?}", data2);

    println!("GUEST PROGRAM END DEBUG");

    let sha = *Impl::hash_bytes(&user_data.as_bytes());
    let data = parse(&user_data).unwrap();
    let criteria = parse(&criteria).unwrap();
    println!("{:?}", data);

    // Gather user data from JSON
    let age: u32 = data["age"].as_u32().unwrap();
    let coordinates: Vec<f64> = match data["coordinates"].clone() {
        JsonValue::Array(c) => c.iter().map(|x| x.as_f64().unwrap()).collect(),
        _ => panic!("Coordinates not found."),
    };
    let history: Vec<String> = match data["history"].clone() {
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
        // panics if age is out of range
        println!(
            "Out of age range: {} not in {} to {}",
            age, age_range[0], age_range[1]
        );
        panic!();
    }

    // TODO: Check that user is in geofence.

    // Check that user has visited target domains.
    for domain in target_domains {
        if !history.contains(&domain) {
            panic!("User has not visited domain: {}", domain);
        }
    }

    println!("All checks passed.");

    let out = Outputs { age, hash: sha };
    env::commit(&out);
}
