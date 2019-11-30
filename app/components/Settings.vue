<template>
    <ScrollView>
        <StackLayout>
            <Label class="mb-3 text-xl font-bold text-center" text="Settings" />
            <StackLayout orientation="horizontal" class="py-6 px-3 bg-green">
                <Image class="ml-3 w-16 h-16 border-2 border-gray-300 rounded-full" src="https://images.unsplash.com/photo-1484862149534-102beb3bd0ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&w=64&h=64&facepad=4" stretch="none" />
                <StackLayout width="50%" class="ml-3 align-middle">
                    <Label class="text-2xl font-semibold text-white" text="@nada" />
                    <Label class="mt-1 text-base font-normal text-green-100" text="Nada Khoury" />
                </StackLayout>
            </StackLayout>
            <Label text="Security" class="pl-3 mt-10 pb-2 border-b-2 border-gray-300 text-xl font-semibold" textWrap="true" />
            <Label text="Recovery Phrase" class="pl-6 font-normal py-4 text-base border-b border-gray-300 bg-gray-100" textWrap="true" />
            <Label text="App Lock" class="pl-6 font-normal py-4 text-base border-b border-gray-300 bg-gray-100" textWrap="true" />

            <Label text="Other" class="pl-3 mt-10 pb-2 border-b-2 border-gray-300 text-xl font-semibold" textWrap="true" />
            <GridLayout rows="auto" columns="*, 100">
                <Label row="0" col="0" text="Local Currency" class="pl-6 font-normal py-4 text-base border-b border-gray-300 bg-gray-100" textWrap="true" />              
                <Label row="0" col="1" text="USD" class="px-6 font-bold py-4 text-right text-base border-b border-gray-300 bg-gray-100" textWrap="true" />              
            </GridLayout>
            <Label text="Support" class="pl-6 font-normal py-4 text-base border-b border-gray-300 bg-gray-100" textWrap="true" />
            <Label text="Legal" class="pl-6 font-normal py-4 text-base border-b border-gray-300 bg-gray-100" textWrap="true" />
            <Label text="Log Out" class="pl-6 font-normal text-red-500 py-4 text-base border-b border-gray-300 bg-gray-100" textWrap="true" />

        </StackLayout>
    </ScrollView>
</template>

<script>

export default {
    data() {
        return {
        };
    },
    methods: {
    },
    components: {
    }
};
</script>

<style>
</style>
