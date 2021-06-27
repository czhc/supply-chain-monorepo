const ItemManager = artifacts.require("./ItemManager.sol");

contract("ItemManager", accounts => {
    describe('create Item', async () => {
        before (async() => {
            const itemManagerInstance = await ItemManager.deployed();
            const itemName = "test1";
            const itemPrice = 500;

            this.result = await itemManagerInstance.createItem(itemName, itemPrice, { from: accounts[0] });
            this.item = await itemManagerInstance.items(0);

        })

        it("should create new Items.", async () => {
            assert.equal(this.result.logs[0].args._itemIndex, 0, "There should be one item index in there")
        });

        it('create correct identifier', async() => {
            assert.equal(this.item._identifier, 'test1', "The item has a different identifier");
        });

    })

});