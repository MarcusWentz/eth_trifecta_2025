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

use json_core::Outputs;
use json_methods::SEARCH_JSON_ELF;
use risc0_zkvm::{default_prover, ExecutorEnv};

fn main() {
    let user_data = include_str!("../res/user.json");
    let criteria = include_str!("../res/criteria.json");

    let outputs_example = search_json(user_data, criteria);
    println!();
    println!("user_data_hash: {:?}", outputs_example.user_data_hash);
    println!("criteria_hash: {:?}", outputs_example.criteria_hash);
}

fn search_json(user_data: &str, criteria: &str) -> Outputs {
    let env = ExecutorEnv::builder()
        .write(&user_data)
        .unwrap()
        .write(&criteria)
        .unwrap()
        .build()
        .unwrap();

    // Obtain the default prover.
    let prover = default_prover();

    // Produce a receipt by proving the specified ELF binary.
    let receipt = prover.prove(env, SEARCH_JSON_ELF).unwrap().receipt;

    receipt.journal.decode().unwrap()
}

#[cfg(test)]
mod tests {
    #[test]
    fn main() {
        let user_data = include_str!("../res/user.json");
        let criteria = include_str!("../res/criteria.json");
        let outputs_example = super::search_json(user_data, criteria);

        print!("user_data_hash: {:?}\n", outputs_example.user_data_hash);
        print!("criteria_hash: {:?}\n", outputs_example.criteria_hash);
    }
}
