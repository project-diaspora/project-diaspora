<template>
    <GridLayout class="align-middle" rows="auto" columns="*">
        <StackLayout row="0" col="0" class="my-auto mx-0 p-6 rounded-lg">
            <Label class="text-lg text-gray-800 uppercase font-semibold tracking-wide" text="Send" />
            <Label class="mb-16 text-5xl font-bold text-gray-800 tracking-wider" text="$12.44" />
            <Label class="text-lg text-gray-800 uppercase font-semibold tracking-wide" text="To" />
            <GridLayout rows="auto" columns="auto, *">
                <Image row="0" col="0" class="w-16 h-16 rounded-full" src="https://images.unsplash.com/photo-1521225099409-8e1efc95321d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&w=256&h=256&facepad=4" />
                <StackLayout row="0" col="1" class="ml-3 align-middle">
                    <Label class="text-3xl font-bold text-gray-800 lowercase" text="@tania" />
                    <Label class="text-lg font-normal text-gray-600" text="Tania El Hakim" />
                </StackLayout>
            </GridLayout>
        </StackLayout>
	</GridLayout>
</template>

<script>
export default {

    data() {
        return {
            searchText: null,
            searchList: [{
                name: "Habib Moukarzel",
                profileSrc: "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&w=64&h=64&facepad=4",
                username: "@habib"
            }, {
                name: "Tania El Hakim",
                profileSrc: "",
                username: "@tania"
            }, {
                name: "Habib Moukarzel",
                profileSrc: "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&w=64&h=64&facepad=4",
                username: "@habib"
            }, {
                name: "Tania El Hakim",
                profileSrc: "https://images.unsplash.com/photo-1521225099409-8e1efc95321d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&w=64&h=64&facepad=4",
                username: "@tania"
            }, {
                name: "Habib Moukarzel",
                profileSrc: "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&w=64&h=64&facepad=4",
                username: "@habib"
            }, {
                name: "Tania El Hakim",
                profileSrc: "https://images.unsplash.com/photo-1521225099409-8e1efc95321d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&w=64&h=64&facepad=4",
                username: "@tania"
            }]
        };
    },
    methods: {
    }
};
</script>

<style>
</style>
