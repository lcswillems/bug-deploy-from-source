#![no_std]

multiversx_sc::imports!();

#[multiversx_sc::contract]
pub trait Contract {
    #[init]
    fn init(&self) {}

    #[endpoint]
    fn issue1(&self) {
        self.send_raw().deploy_from_source_contract(
            self.blockchain().get_gas_left(),
            &BigUint::zero(),
            &self.blockchain().get_sc_address(),
            CodeMetadata::UPGRADEABLE,
            &ManagedArgBuffer::new(),
        );
    }

    #[payable("*")]
    #[endpoint]
    fn issue2(&self, address: ManagedAddress) {
        self.self_proxy(address).issue2_sub().execute_on_dest_context::<()>();
    }

    #[payable("*")]
    #[endpoint]
    fn issue2_sub(&self) {}

    #[endpoint]
    fn issue3(&self, token_identifier: TokenIdentifier) {
        self.send().esdt_nft_create_compact(&token_identifier, &BigUint::from(1u64), &ManagedBuffer::new());
    }

    #[payable("*")]
    #[endpoint]
    fn issue4(&self) {}

    #[proxy]
    fn self_proxy(&self, address: ManagedAddress) -> self::Proxy<Self::Api>;
}
