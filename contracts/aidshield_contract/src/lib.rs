#![no_std]

use soroban_sdk::{contract, contractimpl, Env, BytesN, Map, Symbol, symbol_short};

const USED: Symbol = symbol_short!("USED");

#[contract]
pub struct AidShield;

#[contractimpl]
impl AidShield {

    pub fn init(env: Env) {
        let used: Map<BytesN<32>, bool> = Map::new(&env);
        env.storage().instance().set(&USED, &used);
    }

    pub fn claim(env: Env, nullifier: BytesN<32>, proof_valid: bool) -> bool {

        let mut used: Map<BytesN<32>, bool> =
            env.storage().instance().get(&USED).unwrap_or(Map::new(&env));

        if used.get(nullifier.clone()).unwrap_or(false) {
            panic!("Already claimed");
        }

        if !proof_valid {
            panic!("Invalid proof");
        }

        used.set(nullifier.clone(), true);
        env.storage().instance().set(&USED, &used);

        true
    }
}
