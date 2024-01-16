import { test, beforeEach, afterEach } from "vitest";
import { assertAccount, SWorld, SWallet, SContract } from "xsuite";

let world: SWorld;
let deployer: SWallet;
let contract: SContract;

beforeEach(async () => {
  world = await SWorld.start();
  deployer = await world.createWallet();
  contract = await deployer.createContract({
    code: "file:output/contract.wasm",
  });
});

afterEach(async () => {
  await world.terminate();
});

test("Test", async () => {
  await deployer.callContract({
    callee: contract,
    funcName: "deploy_sc",
    gasLimit: 300_000_000,
  });
  assertAccount(await contract.getAccountWithKvs(), {
    balance: 0n,
    kvs: [],
  });
});
