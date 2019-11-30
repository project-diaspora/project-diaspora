<template>
    <GridLayout rows="auto, *, 50" columns="*">
        <Label row="0" col="0" class="mt-6 text-5xl font-bold text-center" textWrap="true">
            <FormattedString>
                <Span text="$" />
                <Span :text="integer" />
                <Span v-if="showDecimal" :text="decimals" />
            </FormattedString>
        </Label>
	    <GridLayout row="1" col="0" class="mt-6 justify-center" rows="auto, auto, auto, auto" columns="*, *, *">
            <Button row="0" col="0" class="px-12 py-6 green text-3xl font-semibold text-center" text="1" @tap="add('1')" />
            <Button row="0" col="1" class="px-12 py-6 green text-3xl font-semibold text-center" text="2" @tap="add('2')" />
            <Button row="0" col="2" class="px-12 py-6 green text-3xl font-semibold text-center" text="3" @tap="add('3')" />
            <Button row="1" col="0" class="px-12 py-6 green text-3xl font-semibold text-center" text="4" @tap="add('4')" />
            <Button row="1" col="1" class="px-12 py-6 green text-3xl font-semibold text-center" text="5" @tap="add('5')" />
            <Button row="1" col="2" class="px-12 py-6 green text-3xl font-semibold text-center" text="6" @tap="add('6')" />
            <Button row="2" col="0" class="px-12 py-6 green text-3xl font-semibold text-center" text="7" @tap="add('7')" />
            <Button row="2" col="1" class="px-12 py-6 green text-3xl font-semibold text-center" text="8" @tap="add('8')" />
            <Button row="2" col="2" class="px-12 py-6 green text-3xl font-semibold text-center" text="9" @tap="add('9')" />
            <Button row="3" col="0" class="px-12 py-6 green text-3xl font-semibold text-center" text="." @tap="addDecimal"/>
            <Button row="3" col="1" class="px-12 py-6 green text-3xl font-semibold text-center" text="0" @tap="add('0')"/>
            <Image row="3" col="2" class="h-10 w-10 px-12 py-8 green text-3xl font-semibold text-center" src="~/assets/images/backspace.png" @tap="backspace"/>
	    </GridLayout>
        <Button row="2" col="0" class="button-green align-bottom py-3 px-6 font-2xl mx-3 uppercase font-bold tracking-wider rounded-lg" @tap="openWyre" text="Next" />
	</GridLayout>
</template>

<script>
import * as utils from "tns-core-modules/utils/utils";

export default {

    data() {
        return {
            integer: '0',
            showDecimal: false,
            decimals: null
        };
    },
    methods: {
        add(number) {
            if (this.decimals) {
                if (this.decimals && this.decimals.length < 3) {
                    this.decimals = this.decimals.concat(number)
                } else if (this.decimals && this.decimals.length === 3 ) {
                    this.decimals = this.decimals
                } else {
                    this.decimals = number
                }
            } else {
                if (this.integer === '0') {
                    this.integer = number
                } else {
                    this.integer = this.integer.concat(number)
                }
            }
        },
        addDecimal() {
            this.showDecimal = true
            this.decimals = '.'
        },
        backspace() {
            if (this.decimals) {
                if (this.decimals.length === 3) {
                    this.decimals = this.decimals.slice(0, 2)
                } else {
                    this.decimals = null
                }
            } else if (this.integer !== '0') {
                if (this.integer.length === 1) {
                    this.integer = '0'
                } else {
                    this.integer = this.integer.slice(0, this.integer.length-1)
                }
            }
        },
        openWyre() {
            let amountInUsd = Number(this.integer)
            if (this.decimals) {
                amountInUsd += parseFloat(this.decimals)
            }
            console.log(amountInUsd)
            confirm({
                title: "Pay with Apple Pay",
                message: "We're about to send you to Wyre to process your transactions. All details on the following page have been pre-filled and should not be changed.",
                okButtonText: "Let's go",
                cancelButtonText: "Cancel"
            })
            .then(result => {
                if (result) {
                    utils.openUrl("https://pay.sendwyre.com/purchase?destCurrency=BTC&sourceAmount=" + amountInUsd + "&dest=bitcoin:1andreas3batLhQa2FawWjeyjCqyBzypd&paymentMethod=apple-pay")
                }
            });
        }
    }
};
</script>

<style>
</style>
