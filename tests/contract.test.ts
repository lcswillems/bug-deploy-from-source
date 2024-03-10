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

test("Issue 1", async () => {
  await deployer.callContract({
    callee: contract,
    funcName: "issue1",
    gasLimit: 300_000_000,
  });
});

test("Issue 2", async () => {
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

test("Issue 3", async () => {
  // TODO: integrate the fix in xSuite simulnet
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
    funcName: "issue3",
    funcArgs: [],
    esdts: [{ id: "FFT-abcdef", amount: 10 }],
    gasLimit: 300_000_000,
  });
});

test("Issue 4", async () => {
  await deployer.callContract({
    callee: contract,
    funcName: "issue4",
    funcArgs: [e.Str("lucas.mvx")],
    gasLimit: 100_000_000,
  }).assertFail({ code: 4 });
})
