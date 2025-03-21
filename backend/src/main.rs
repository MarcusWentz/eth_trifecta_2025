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
    let data_example = include_str!("../res/example.json");

    // println!("Test read JSON file example.json");
    // println!("{:?}", data_example);

    let data_user = include_str!("../res/user.json");

    // println!("Test read JSON file user.json");
    // println!("{:?}", data_user);

    let outputs_example = search_json(data_example);
    println!();
    println!("  {:?}", outputs_example.hash);
    println!(
        "File example.json provably contains a field 'critical_data' with value {}",
        outputs_example.data
    );

    let outputs_user = search_json(data_user);
    println!();
    println!("  {:?}", outputs_user.hash);
    println!(
        "File user.json provably contains a field 'critical_data' with value {}",
        outputs_user.data
    );
}

fn search_json(data: &str) -> Outputs {
    let env = ExecutorEnv::builder()
        .write(&data)
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
        let data_example = include_str!("../res/example.json");
        let outputs_example = super::search_json(data_example);
        assert_eq!(
            outputs_example.data, 47,
            "Did not find the expected value in the critical_data field in example.json"
        );

        let data_user = include_str!("../res/user.json");
        let outputs_user = super::search_json(data_user);
        assert_eq!(
            outputs_user.data, 47,
            "Did not find the expected value in the critical_data field"
        );
    }
}
