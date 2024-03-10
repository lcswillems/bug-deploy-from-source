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

    #[endpoint]
    fn issue2_sub(&self) {}

    #[payable("*")]
    #[endpoint]
    fn issue3(&self) {}

    #[endpoint]
    fn issue4(&self, domain_name: ManagedBuffer) {
        self.user_builtin_proxy(self.blockchain().get_caller())
            .set_user_name(&domain_name)
            .with_gas_limit(10_000_000)
            .async_call_promise()
            .with_callback(self.callbacks().issue4_callback())
            .with_extra_gas_for_callback(1_000_000u64)
            .register_promise()
    }

    #[promises_callback]
    fn issue4_callback(&self) {
        require!(false, "callback not called");
    }

    #[proxy]
    fn self_proxy(&self, address: ManagedAddress) -> self::Proxy<Self::Api>;

    #[proxy]
    fn user_builtin_proxy(&self, to: ManagedAddress) -> user_builtin::Proxy<Self::Api>;
}

mod user_builtin {
    #[multiversx_sc::derive::proxy]
    pub trait UserBuiltin {
        #[endpoint(SetUserName)]
        fn set_user_name(&self, name: &ManagedBuffer);
    }
}
