<template>
    <Page>
        <TabView :selectedIndex="selectedIndex" selectedTabTextColor="#00A651" androidTabsPosition="bottom">
            <TabViewItem title="Wallets" iconSource="~/assets/images/wallet.png">
                <StackLayout>
                    <Label horizontalAlignment="center" text="$1,123.54" class="mt-16 mb-12 text-5xl" />
                    <StackLayout horizontalAlignment="center" orientation="horizontal" class="mx-4">
                        <Button width="50%" class="py-3 font-2xl mx-3 uppercase tracking-wider button-green rounded-lg bg-gray-200" @tap="openAddMoneyModal" text="Add money" />
                        <Button width="50%" class="py-3 font-2xl mx-3 uppercase tracking-wider button-green rounded-lg bg-gray-200" @tap="openSendModal" text="Send" />
                    </StackLayout>
                    <Label text="Transactions" class="ml-4 mt-10 mb-4 text-2xl font-semibold" />
                    <TransactionList />
                </StackLayout>
            </TabViewItem>
            <TabViewItem title="Settings" iconSource="~/assets/images/cog.png">
                <Settings />
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script>
    import SendModal from "./SendModal";
    import AddMoneyModal from "./AddMoneyModal";
    import TransactionList from "./TransactionList";
    import Settings from "./Settings";

    export default {
        data() {
            return {};
        },
        methods: {
            openSendModal() {
                this.$showModal(SendModal)
            },
            openAddMoneyModal() {
                this.$showModal(AddMoneyModal)
            },
        },
        components: {
            TransactionList,
            Settings,
        }
    };
</script>

<style scoped>
TabView {
   font-size: 12;
   font-weight: bold
}

Button {
    background-color: #00A651;
    color: white;
    font-size: 16;
}

</style>