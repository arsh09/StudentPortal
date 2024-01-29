<template>
	<div class="mt-3 shadow shadow-dark m-2 p-2">
		<b-card :title="title"  style="" class="mb-2  border border-0">
			<b-card-text>
                {{description}}
			</b-card-text>
            <b-card-body>
                <div>
                <b-button variant="dark" size="md" block @click="$router.push(page)">{{title}}</b-button>

                </div>
            </b-card-body>
		</b-card>
	</div>
</template>


<script>
export default {
	name: "BasePage",

    props : {
        page : {
            type : String,
            default : "/new-student" 
        },
        title : {
            type : String, 
            default : "New Student"
        },
        description : {
            type : String, 
            default : "Enter a new student entry"
        }
    }
};
</script>