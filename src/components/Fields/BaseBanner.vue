<template>
	<div>
		<b-navbar toggleable="lg" type="dark" variant="dark">
			<b-navbar-brand class="ms-3">Student Portal</b-navbar-brand>

			<!-- Right aligned nav items -->
			<b-navbar-nav class="float-end ms-3">

                <b-nav-item class="float-end" @click="$router.push('/')">Home</b-nav-item>
                <b-nav-item class="float-end" @click="$router.push('/new-student')">New</b-nav-item>
                <b-nav-item class="float-end" @click="$router.push('/edit-student')">Edit</b-nav-item>
                <b-nav-item class="float-end" @click="$router.push('/remove-student')">Remove</b-nav-item>
                <b-nav-item class="float-end" @click="$router.push('/lookup-student')">Search</b-nav-item>
                <b-nav-item class="float-end" @click="$router.push('/software-settings')">Settings</b-nav-item>
                <b-nav-item class="float-end" @click="$router.push('/signout')">Sign Out</b-nav-item>

			</b-navbar-nav>
		</b-navbar>

	</div>
</template>


<script>
export default {
	name: "BaseBanner",
};
</script>