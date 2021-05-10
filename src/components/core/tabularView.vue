<template>
    <v-layout row wrap >
       
       <v-flex xs12>
            
          <v-simple-table class="mt-3"
            fixed-header>
        <template v-slot:default>
                <thead>
                        <tr>
                        <th class="text-left" style="font-weight:bold">
                        Title
                        </th>
                            <th class="text-left" style="font-weight:bold">
                            Location
                        </th>
                         <th class="text-left" style="font-weight:bold">
                            Open Till
                        </th>
                        </tr>
                </thead>
                <tbody>
                        <tr
                        v-for="(item,i) in recentData"
                        :key="i"
                        @click="openJob(item)"
                        >
                        <td v-if="item.JOBTITLE">{{ item.JOBTITLE }}</td>
                        <td v-else>Title Not Available</td>
                        
                        <td v-if="item.LOCATION">{{item.LOCATION}} </td>
                        <td v-else>Not Defined </td>

                         <td v-if="item.POSTINGENDDATE">{{item.POSTINGENDDATE.substring(0,10)}} </td>
                        <td v-else>Not Available </td>
                        </tr>
                </tbody>
    </template>
  </v-simple-table>
  </v-flex>
    </v-layout>
</template>
<script>
export default {
    props:
    {
        recentData:
        {
            type:Array,
            default:[]
        }
    },

    methods:
    {
        openJob(item)
        {
            this.$emit("openJob",item)
        }
    }
}
</script>