<template>
	<div class="mt-3 shadow shadow-dark m-2 p-2">

		<base-button title="Export To CSV" description="Export students entry to CSV (Excel) file" v-on:click="this.handle_export">
		</base-button>

		<base-button title="Import From CSV" description="Import students entries from CSV (Excel) file" 
			v-on:click="this.handle_trigger_file_input"
		>
		
		<template v-slot:default>
			<input type="file" ref="ref_file_input" @change="handle_file_change" accept=".csv" style="display: none;" />
		</template>
		</base-button>

	</div>
</template>

<script>

import Papa from 'papaparse';
import BaseButton from "@/components/Fields/BaseButton.vue";

import MixinSql from '@/components/Mixins/MixinSql';
import { mapActions } from "vuex";

export default {
	name: "PageSoftwareSettings",
	mixins : [MixinSql],

	components: {
		BaseButton,
	},

	methods : {
		...mapActions("notifications", ["handleAddNotification"]),

		handle_export: function()
		{
			this.handle_select_student()
			.then(response =>{
				if ( response.data.response.status ) 
				{
					const data = response.data.response.data
					const mapped_data = data.map(row => {
						const newRow = {};
						for (let key in row) {
							const newKey = this.db_to_csv_keys[key] || key; // Use the mapped header or the original if not found
							newRow[newKey] = row[key];
						}
						return newRow;
					});

					const csv = Papa.unparse(mapped_data);

					// Create a Blob from the CSV data
					const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
					
					// Create a link to trigger the download
					const link = document.createElement("a");
					if (link.download !== undefined) {  
						const url = URL.createObjectURL(blob);
						link.setAttribute("href", url);
						link.setAttribute("download", "students_exported_data.csv");
						link.style.visibility = 'hidden';
						
						// Append the link to the DOM
						document.body.appendChild(link);
						
						// Trigger the download
						link.click();
						
						// Remove the link from the DOM
						document.body.removeChild(link);
					}

					this.handleAddNotification({
						msg : "All students data is exported to a CSV file."
					})
				}
			})
			.catch ( error => {
				this.handleAddNotification({
					msg : error.data.response.msg , 
					type : "danger"
				}) 
			})
		},

		handle_trigger_file_input() {
			this.$refs.ref_file_input.click();
		},

		handle_file_change(event) {
			const file = event.target.files[0];
			if (file) {
				this.handle_read_csv(file);
			}
		},

		handle_read_csv(file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				const csv_data = event.target.result;
				this.handle_parse_csv_columns(csv_data);
			};
			reader.readAsText(file);
		},
		
		handle_parse_csv_columns(csv_data) {
			Papa.parse(csv_data, {
				header: true, 
				complete: (results) => {
					const data = results.data;

					// Replace the headers based on the mapping
					const mapped_data = data.map(row => {
						const newRow = {};
						for (let key in row) {
						const newKey = this.csv_to_db_keys[key] || key; // Use the mapped header or the original if not found
						newRow[newKey] = row[key];
						}
						return newRow;
					});

					this.handle_add_student( mapped_data )
					.then( response => {
						if ( response.data.response.status ) {
							this.handleAddNotification({
								msg : "CSV file is successfully imported into the local database. "
							})
						} else { 
							this.handleAddNotification({
								msg : response.data.response.msg
							})
						}
					})
					.catch( error => {
						this.handleAddNotification({
							msg : error.data.response.msg, 
							type: "danger"
						})
					})
					
				},
				error: (error) => {
					console.error("Error parsing CSV:", error);
				}
			});
		}, 

    }
};
</script>

<style >

input[type=file]::-webkit-file-upload-button {
    visibility: hidden;
}

</style>