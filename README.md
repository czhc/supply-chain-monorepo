# supply-chain-monorepo

Supply Chain smart contract dApp demo

## Concepts:

* Using Struct to model a list of entities
* Replacing Struct entities with parent-child contracts:
  * `ItemManager` creates new contract for each new `Item` to allow independent events
  * `ItemManager` tracks collection state.
  * `Item` (child) contract uses [external function calls](https://docs.soliditylang.org/en/v0.8.6/control-structures.html#external-function-calls) to update parent state.
* Testing child contract functions using Remix IDE low-level calldata
* Using Remix IDE static security and gas analysis
* Import third-party(open-zeppelin) contracts
* Unit testing using truffle/mocha