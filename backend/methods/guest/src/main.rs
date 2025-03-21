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

use json::parse;
use json_core::Outputs;
use risc0_zkvm::{
    guest::env,
    sha::{Impl, Sha256},
};

fn main() {
    let data: String = env::read();

    // // Error: called `Result::unwrap()` on an `Err` value: DeserializeUnexpectedEnd
    // let data2: String = env::read();

    println!("GUEST PROGRAM START DEBUG");
    println!("{:?}", data);

    // // Error: called `Result::unwrap()` on an `Err` value: DeserializeUnexpectedEnd
    // println!("{:?}", data2);

    println!("GUEST PROGRAM END DEBUG");

    let sha = *Impl::hash_bytes(&data.as_bytes());
    let data = parse(&data).unwrap();

    let proven_val : u32 = data["critical_data"].as_u32().unwrap();
    let age : u32 = data["age"].as_u32().unwrap();
    let latitude : f32 = data["latitude"].as_f32().unwrap();
    let longitude : f32 = data["longitude"].as_f32().unwrap();
    let website : String = data["website"].to_string();

    println!("{}", proven_val);
    println!("{}", age);
    println!("{}", latitude);
    println!("{}", longitude);
    println!("{}", website);

    // Check JSON values with expected values.

    // Check age range.
    if age < 20 || age > 40  { 
        // Panics with age 19 and 41 as expected.
        println!("Out of age range: 20 to 40.");
        panic!();
    }

    // Louvre Museum in Paris, France coordinates:     
    // "latitude": 48.860294,
    // "longitude": 2.338629,

    // Check latitude range.
    if latitude < 48.0 || latitude > 50.0  { 
        // Panics with latitude 47.0 and 51.0 as expected.
        println!("Out of latitude range: 48 to 50.");
        panic!();
    }

    // Check longitude range.
    if longitude < 1.0 || longitude > 3.0  { 
        // Panics with longitude 0.0 and 4.0 as expected.
        println!("Out of longitude range: 1 to 3.");
        panic!();
    }

    // Check website URL string.
    if website != "https://www.google.com/" { 
        println!("Website does not match match expected website 'https://www.google.com/'.");
        panic!();
    }

    let out = Outputs {
        data: proven_val,
        hash: sha,
        // hash_1: sha_example,
        // hash_2: sha_user,
    };
    env::commit(&out);
}
