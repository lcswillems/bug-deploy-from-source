#![no_std]

multiversx_sc::imports!();

#[multiversx_sc::contract]
pub trait Contract {
    #[init]
    fn init(&self) {}

    #[endpoint]
    fn deploy_sc(&self) {
        self.send_raw().deploy_from_source_contract(
            self.blockchain().get_gas_left(),
            &BigUint::zero(),
            &self.blockchain().get_sc_address(),
            CodeMetadata::UPGRADEABLE,
            &ManagedArgBuffer::new(),
        );
    }
}
