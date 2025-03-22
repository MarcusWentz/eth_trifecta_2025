//! A simple program that takes a number `n` as input, and writes the `n-1`th and `n`th fibonacci
//! number as an output.

// These two lines are necessary for the program to properly compile.
//
// Under the hood, we wrap your main function with some extra code so that it behaves properly
// inside the zkVM.
#![no_main]
sp1_zkvm::entrypoint!(main);

use alloy_primitives::keccak256;
use alloy_sol_types::SolType;
use fibonacci_lib::{check_target_user, PublicValuesStruct};

pub fn main() {
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
