<template>
    <StackLayout>
        <StackLayout class="my-3" orientation="horizontal">
            <Image class="ml-6 w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1521225099409-8e1efc95321d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&w=64&h=64&facepad=4" stretch="none" />
            <StackLayout width="50%" class="ml-3 align-middle">
                <Label class="text-base font-semibold text-gray-800" text="Tania El Hakim" />
                <Label class="text-sm font-normal text-gray-500" text="two hours ago" />
            </StackLayout>
            <Label width="20%" class="mr-4 text-base text-right font-semibold green align-middle" text="+$5" />
        </StackLayout>
        <StackLayout class="my-3" orientation="horizontal">
            <Image class="ml-6 w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&w=64&h=64&facepad=4" stretch="none" />
            <StackLayout width="50%" class="ml-3 align-middle">
                <Label class="text-base font-semibold text-gray-800" text="Habib Moukarzel" />
                <Label class="text-sm font-normal text-gray-500" text="yesterday" />
            </StackLayout>
            <Label width="20%" class="mr-4 text-base text-right font-semibold red align-middle" text="-$21.44" />
        </StackLayout>
	</StackLayout>
</template>

<script>
export default {
    data() {
        return {};
    }
};
</script>

<style>
</style>
