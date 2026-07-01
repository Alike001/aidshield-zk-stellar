#![no_std]

use soroban_sdk::{
    contract, contracterror, contractimpl, symbol_short, BytesN, Env, Map, Symbol,
};

const USED: Symbol = symbol_short!("USED");

#[contract]
pub struct AidShield;

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum ClaimError {
    AlreadyClaimed = 1,
    InvalidProof = 2,
}

#[contractimpl]
impl AidShield {

    pub fn init(env: Env) {
        let used: Map<BytesN<32>, bool> = Map::new(&env);
        env.storage().instance().set(&USED, &used);
    }

    pub fn claim(env: Env, nullifier: BytesN<32>, proof_valid: bool) -> Result<bool, ClaimError> {

        let mut used: Map<BytesN<32>, bool> =
            env.storage().instance().get(&USED).unwrap_or(Map::new(&env));

        if used.get(nullifier.clone()).unwrap_or(false) {
            return Err(ClaimError::AlreadyClaimed);
        }

        if !proof_valid {
            return Err(ClaimError::InvalidProof);
        }

        used.set(nullifier.clone(), true);
        env.storage().instance().set(&USED, &used);

        Ok(true)
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::Env;

    fn setup() -> (Env, AidShieldClient<'static>) {
        let env = Env::default();
        let contract_id = env.register_contract(None, AidShield);
        let client = AidShieldClient::new(&env, &contract_id);
        client.init();
        (env, client)
    }

    #[test]
    fn accepts_valid_claim_once() {
        let (env, client) = setup();
        let nullifier = BytesN::from_array(&env, &[7; 32]);

        assert!(client.claim(&nullifier, &true));
    }

    #[test]
    fn rejects_duplicate_nullifier() {
        let (env, client) = setup();
        let nullifier = BytesN::from_array(&env, &[11; 32]);

        assert!(client.claim(&nullifier, &true));
        assert!(client.try_claim(&nullifier, &true).is_err());
    }

    #[test]
    fn rejects_invalid_proof_flag() {
        let (env, client) = setup();
        let nullifier = BytesN::from_array(&env, &[19; 32]);

        assert!(client.try_claim(&nullifier, &false).is_err());
    }
}
