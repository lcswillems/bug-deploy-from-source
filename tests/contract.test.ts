import { test, beforeEach, afterEach } from "vitest";
import { SContract, SWallet, SWorld } from "xsuite";

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

test("Issue 1 - Fails", async () => {
  await deployer.callContract({
    callee: contract,
    funcName: "issue1",
    gasLimit: 300_000_000,
  });
});

test("Issue 2 - Fails", async () => {
  const contract2 = world.newContract("erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq02vfge");
  await contract2.setAccount({
    code: "file:output/contract.wasm"
  });
  await deployer.callContract({
    callee: contract,
    funcName: "issue2",
    funcArgs: [contract2],
    gasLimit: 300_000_000,
  });
});

test("Issue 2 - Passes", async () => {
  const contract2 = world.newContract("erd1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqs0fgdz0");
  await contract2.setAccount({
    code: "file:output/contract.wasm"
  });
  await deployer.callContract({
    callee: contract,
    funcName: "issue2",
    funcArgs: [contract2],
    gasLimit: 300_000_000,
  });
});
