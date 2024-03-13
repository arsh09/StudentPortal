<template>
	<div class="mt-3 shadow shadow-dark m-2 p-2">
		<b-card :title="title"  style="" class="mb-2  border border-0">
			<b-card-text>
                {{description}}
			</b-card-text>
            <b-card-body>
                <b-row>
                    <b-button variant="outline-dark" size="md" block @click="click_fn"> 
                        {{title}} 
                        <input v-if="isFileOrFolder" type="file" 
                            class="hidden-input" @change="handle_file_selection"
                        />
                    </b-button>
                </b-row>
            </b-card-body>
		</b-card>
	</div>
</template>


<script>
export default {
	name: "BasePage",

    props : {
        click_fn : {
            type : Function,
            default : ()=> { return console.log("Set the callback")}
        },
        title : {
            type : String, 
            default : "New Student"
        },
        description : {
            type : String, 
            default : "Enter a new student entry"
        },
        isFileOrFolder : {
            type : Boolean, 
            default : false, 
        },
        
    },

    methods : {
        handle_file_selection : function(event){
            console.log( event.target.files )
        }
    }
};
</script>



<style >

input[type=file]::-webkit-file-upload-button {
    visibility: hidden;
}

</style>