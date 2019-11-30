<template>
    <StackLayout>
        <Label class="mt-6 text-5xl font-bold text-center" textWrap="true">
            <FormattedString>
                <Span text="$" />
                <Span :text="integer" />
                <Span v-if="showDecimal" :text="decimals" />
            </FormattedString>
        </Label>
		<Button width="30%" class="py-3 px-6 font-2xl mx-3 uppercase green font-semibold tracking-wider rounded-lg" text="Max" />
	    <GridLayout class="mt-6" rows="auto, auto, auto, auto" columns="*, *, *">
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
        
	</StackLayout>
</template>

<script>
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
        }
    }
};
</script>

<style>
.button-green {
    background-color: #00A651;
    color: white;
    font-size: 16;
}
</style>
