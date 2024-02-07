import { test, beforeEach, afterEach } from "vitest";
import { SContract, SWallet, SWorld, e } from "xsuite";

let world: SWorld;
let deployer: SWallet;
let contract: SContract;

beforeEach(async () => {
  world = await SWorld.start();
  deployer = await world.createWallet();
  contract = await deployer.createContract({
    code: "file:output/contract.wasm",
    kvs: [
      e.kvs.Esdts([
        {
          id: "SFT-abcdef",
          roles: ["ESDTRoleNFTCreate", "ESDTRoleNFTAddQuantity"],
        },
      ]),
    ]
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
  const contract2 = world.newContract("erd1qqqqqqqqqqqqqpgqfnarkmhu6tgjgtpenya0dek54jcwkak23g6su00nwn");
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

test("Issue 3", async () => {
  await deployer.callContract({
    callee: contract,
    funcName: "issue3",
    funcArgs: [e.Str("SFT-abcdef")],
    gasLimit: 300_000_000,
  });
});

test("Issue 4", async () => {
  await deployer.setAccount({
    kvs: [
      e.kvs.Esdts([{ id: "FFT-abcdef", amount: 10 }]),
    ],
  });
  const { contract: contract2 } = await deployer.deployContract({
    code: "file:output/contract.wasm",
    codeMetadata: [],
    gasLimit: 100_000_000,
  });
  await deployer.callContract({
    callee: contract2,
    funcName: "issue4",
    funcArgs: [],
    esdts: [{ id: "FFT-abcdef", amount: 10 }],
    gasLimit: 300_000_000,
  });
});
