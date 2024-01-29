<template>
	<div class="home">

		<b-container fluid>
			<b-row>
				<b-col>
					<base-page page='new-student' description="Enter details about new student" title="New Student" />
				</b-col>
				<b-col>
					<base-page page='edit-student' description="Edit details about existing student" title="Edit Student" />
				</b-col>

			</b-row>

			<b-row>
				<b-col>
					<base-page page='remove-student' description="Remove student entry" title="Remove Student" />
				</b-col>
				<b-col>
					<base-page page='lookup-student' description="Search and print student details" title="Search Student" />
				</b-col>

			</b-row>

			<b-row>
				<b-col>
					<base-page page='software-settings' description="Export database and setup a new computer" title="Setup Software" />
				</b-col>
				<b-col>
					<base-page page='signout' description="Sign out from the software" title="Sign Out" />
				</b-col>
			</b-row>

		</b-container>
	</div>

</template>

<script>
// @ is an alias to /src
import BasePage from "@/components/Fields/BasePage.vue";

export default {
	name: "PageHome",
	components: {
		BasePage,
	},
};
</script>
