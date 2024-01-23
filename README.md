2 issues are reported in this repo:

1. a contract fails calling `deploy_from_source_contract`, leading to not enough gas error.
2. a contract fails calling another contract when the address of this other contract is of a special form, leading to not enough gas error.

To reproduce the issues:

```
cargo install multiversx-sc-meta
sc-meta install mx-scenario-go
mx-scenario-go run scenarios/
```

Error:

```
Scenario: scenarios/issue1.scen.json ...   FAIL: result code mismatch. Tx ''. Want: 0. Have: 5 (out of gas). Message: not enough gas
Scenario: scenarios/issue2.scen.json ...   FAIL: result code mismatch. Tx ''. Want: 0. Have: 5 (out of gas). Message: not enough gas
Done. Passed: 0. Failed: 2. Skipped: 0.
ERROR: some tests failed
```

[The code of the smart contract](src/lib.rs)
[The Mandos test for issue 1](scenarios/issue1.scen.json)
[The Mandos test for issue 2](scenarios/issue2.scen.json)
