<template>
  <v-card style="height:100%">
    <v-navigation-drawer permanent>
      <v-list nav dense>
        <v-list-item link>
          <v-list-item-icon>
            <i class="fas fa-user text-center nav-icon-wrapper"></i>
          </v-list-item-icon>
          <v-list-item-title>My Profile</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <i class="fas fa-users text-center nav-icon-wrapper"></i>
          </v-list-item-icon>
          <v-list-item-title>Clearance Portlet</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <i class="fas fa-file text-center nav-icon-wrapper"></i>
          </v-list-item-icon>
          <v-list-item-title>Document Portlet</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <i class="fas fa-comments text-center nav-icon-wrapper"></i>
          </v-list-item-icon>
          <v-list-item-title>Ask HR</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {};
</script>

<style>
.nav-icon-wrapper {
  color: #717171;
  font-size: 18px;
  margin-left: auto;
  margin-right: auto;
}
</style>
