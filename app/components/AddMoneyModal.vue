<template>
    <GridLayout rows="50, *" columns="*" backgroundColor="white" class="p-20">
        <GridLayout rows="auto" columns="20, *, 20" class="text-center align-middle">
            <Label row="0" col="2" class=" text-xl font-bold" text="X" @tap="$modal.close()" />
            <Label row="0" col="1" v-if="page === 'paymentType'" class="text-xl font-bold" text="Add Money" />
            <Label row="0" col="1" v-if="page === 'ethereumAddress'" class="text-xl font-bold" text="Select Contact" />
        </GridLayout>

        <PaymentType row="1" v-if="page === 'paymentType'" />
    </GridLayout>
</template>

<script>
import PaymentType from "./addMoney/PaymentType";

export default {
    data() {
        return {
            page: 'paymentType'
        };
    },
    methods: {
    },
    components: {
        PaymentType,
    }
};
</script>

<style>
</style>
