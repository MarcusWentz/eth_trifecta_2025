use sp1_sdk::{include_elf, HashableKey, Prover, ProverClient};

/// The ELF (executable and linkable format) file for the Succinct RISC-V zkVM.
pub const AD_QUALIFICATION_ELF: &[u8] = include_elf!("ad-qualification-program");

fn main() {
    let prover = ProverClient::builder().cpu().build();
    let (_, vk) = prover.setup(AD_QUALIFICATION_ELF);
    println!("{}", vk.bytes32());
}
