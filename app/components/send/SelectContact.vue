<template>
    <StackLayout>
        <GridLayout columns="40, *, 50" height="50" class="my-4 text-sm bg-gray-200 rounded-lg">
            <!-- <Image col="0" class="ml-4 mr-3 w-6 h-6" src="~/assets/images/search.png" /> -->
            <TextField col="1" class="pl-0 text-lg text-gray-700" :text="searchText" hint="@user or Ethereum address" />
            <StackLayout col="2" class="p-0 w-full h-full rounded-r-lg border-gray-500 align-middle">
                <Image class="m-auto w-8 h-8" src="~/assets/images/camera.png" />                    
            </StackLayout>
        </GridLayout>
        <ScrollView height="70%"> <!-- TODO: GridLayout above it all -->
            <ListView for="userSearched in searchList" separatorColor="transparent">
                <v-template>
                    <GridLayout class="py-4" rows="*" columns="auto, *">
                        <Image row="0" col="0" class="ml-6 w-12 h-12 rounded-full" :src="userSearched.profileSrc" stretch="none" />
                        <StackLayout row="0" col="1" class="ml-3 align-middle">
                            <Label class="text-base font-semibold text-gray-800" :text="userSearched.name" />
                            <Label class="text-sm font-normal text-gray-500" :text="userSearched.username" />
                        </StackLayout>
                    </GridLayout>
                </v-template>
            </ListView>
        </ScrollView>
	</StackLayout>
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
