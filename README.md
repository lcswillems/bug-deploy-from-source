The current version of `mxpy` has a version of Mandos built with the VM 1.4. So issues are not present in it.

xSuite has built Mandos with the VM 1.5 and issues are now present.

To reproduce both errors:

```
npm install -g xsuite
xsuite test-scen scenarios
```

Error:

```
Scenario: scenarios/issue1.scen.json ...   FAIL: result code mismatch. Tx ''. Want: 0. Have: 5 (out of gas). Message: not enough gas
Scenario: scenarios/issue2.scen.json ...   FAIL: result code mismatch. Tx ''. Want: 0. Have: 5 (out of gas). Message: not enough gas
Done. Passed: 0. Failed: 2. Skipped: 0.
ERROR: some tests failed
Command failed with exit code 1.
```
