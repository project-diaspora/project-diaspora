<template>
    <StackLayout>
        <StackLayout v-if="page === 'paymentType'">
            <Label text="Credit Card" class="mt-6 text-xl font-semibold" textWrap="true" />
            <GridLayout rows="auto" columns="auto, *" class="my-2 py-2 rounded-lg bg-gray-200 shadow-lg" @tap="page = 'cardAmount'">
                <Image row="0" col="0" class="mx-3 w-12" src="~/assets/images/card.png" />
                <Label row="0" col="1" class="text-lg font-semibold" text="Pay with Apple Pay" textWrap="true" />
            </GridLayout>
            <Label text="Cryptocurrencies" class="mt-6 text-xl font-semibold" textWrap="true" />
            <GridLayout rows="auto" columns="auto, *" class="my-2 py-2 rounded-lg bg-gray-200 shadow-lg" @tap="page = 'bitcoinAddress'">
                <Image row="0" col="0" class="mx-3 w-12" src="~/assets/images/btc.png" />
                <Label row="0" col="1" class="text-lg font-semibold" text="Add Bitcoin" textWrap="true" />
            </GridLayout>
            <GridLayout rows="auto" columns="auto, *" class="my-2 py-2 rounded-lg bg-gray-200 shadow-lg">
                <Image row="0" col="0" class="mx-3 w-12" src="~/assets/images/eth.png" />
                <Label row="0" col="1" class="text-lg font-semibold" text="Add Ethereum" textWrap="true" />
            </GridLayout>
            <GridLayout rows="auto" columns="auto, *" class="my-2 py-2 rounded-lg bg-gray-200 shadow-lg">
                <Image row="0" col="0" class="mx-3 w-12" src="~/assets/images/dai.png" />
                <Label row="0" col="1" class="text-lg font-semibold" text="Add Dai (USD)" textWrap="true" />
            </GridLayout>
        </StackLayout>
        <CardAmount row="1" v-if="page === 'cardAmount'" />
        <BitcoinAddress row="1" v-if="page === 'bitcoinAddress'" />
        <!-- <EthereumAddress row="1" v-if="page === 'ethereumAddress'" /> -->
	</StackLayout>
</template>

<script>
import CardAmount from "./CardAmount"
import BitcoinAddress from "./BitcoinAddress";
// import EthereumAddress from "./send/EthereumAddress";

export default {
    data() {
        return {
            page: 'paymentType'
        };
    },
    methods: {
    },
    components: {
        CardAmount,
        BitcoinAddress
    }
};
</script>

<style>
</style>
