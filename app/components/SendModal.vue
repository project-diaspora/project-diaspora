<template>
    <GridLayout rows="50, *, 50" columns="*" backgroundColor="white" class="p-20">
        <GridLayout rows="auto" columns="20, *, 20" class="text-center align-middle">
            <Label row="0" col="2" class=" text-xl font-bold" text="X" @tap="$modal.close()" />
            <Label row="0" col="1" v-if="page === 'selectAmount'" class="text-xl font-bold" text="Select Amount" />
            <Label row="0" col="1" v-if="page === 'selectContact'" class="text-xl font-bold" text="Select Contact" />
        </GridLayout>

        <SelectAmount row="1" v-if="page === 'selectAmount'" />
        <SelectContact row="1" v-if="page === 'selectContact'" />
        <ConfirmSend row="1" v-if="page === 'confirmSend'" />

        <Button row="2" v-if="page === 'selectAmount'" class="button-green align-bottom py-3 px-6 font-2xl mx-3 uppercase font-bold tracking-wider rounded-lg" @tap="page = 'selectContact'" text="Next" />
        <Button row="2" v-if="page === 'selectContact'" class="button-green align-bottom py-3 px-6 font-2xl mx-3 uppercase font-bold tracking-wider rounded-lg" @tap="page = 'confirmSend'" text="Next" />
        <Button row="2" v-if="page === 'confirmSend'" class="button-green align-bottom py-3 px-6 font-2xl mx-3 uppercase font-bold tracking-wider rounded-lg" @tap="page = 'selectAmount'" text="Send" />
    </GridLayout>
</template>

<script>
import SelectAmount from "./send/SelectAmount";
import SelectContact from "./send/SelectContact";
import ConfirmSend from "./send/ConfirmSend";

export default {
    data() {
        return {
            page: 'selectAmount'
        };
    },
    methods: {
    },
    components: {
        SelectAmount,
        SelectContact,
        ConfirmSend,
    }
};
</script>

<style>
</style>
