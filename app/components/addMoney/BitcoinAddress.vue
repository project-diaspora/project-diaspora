<template>
    <GridLayout rows="*, 50" columns="*">
        <StackLayout row="0" col="0" class="align-middle">
            <Label class="text-xl font-bold text-center" text="My Bitcoin Address" textWrap="true" />
            <Image class="mt-6 w-2/3" src="~/assets/images/qr.png" />
            <Label class="mt-4 text-center" :text="btcAddress" textWrap="true" />
        </StackLayout>
        <Button row="1" col="0" class="button-green align-bottom py-3 px-6 font-2xl mx-3 uppercase font-bold tracking-wider rounded-lg" @tap="copy" :text="copyButtonText" />
	</GridLayout>
</template>

<script>
import { getTextSync, setTextSync } from "nativescript-clipboard";

export default {
    data() {
        return {
            btcAddress: '1andreas3batLhQa2FawWjeyjCqyBzypd',
            copyButtonText: 'Copy'
        };
    },
    methods: {
        copy() {
            setTextSync(this.btcAddress)
            console.log(getTextSync())
            this.copyButtonText = 'Copied!'
        }
    }
};
</script>

<style>
</style>
