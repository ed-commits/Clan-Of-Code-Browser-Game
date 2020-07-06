<template>
    <div id="map">

    </div> 
  
</template>

<script>

import { eventBus } from "../main.js";

export default {
    props: ["pages"],
    data(){
        return {

            currentPageCoords: [2000,700]

        }
    },
    mounted(){
        eventBus.$on("page-turned", (page) => {
            this.currentPageCoords = page.map_coords
        }),
        this.leafletInit()
    },
    
 
 methods: {
        leafletInit(){
            var L = require('leaflet')
            L.RasterCoords = require('leaflet-rastercoords')
            var img = [
                7932,  // original width of image (here from `example/karta.jpg`)
                6228   // original height of image
            ]
            var pageCoords = this.currentPageCoords
            console.log(pageCoords)
            // create the map
            var map = L.map('map')
            // assign map and image dimensions
            var rc = new L.RasterCoords(map, img)
            map.setMaxZoom(rc.zoomLevel())
            // all coordinates need to be unprojected using the `unproject` method
            // set the view in the lower right edge of the image
            map.setView(rc.unproject(pageCoords),9)
            map.on('click', function (event) {
                 // any position in leaflet needs to be projected to obtain the image coordinates
                var coords = rc.project(event.latlng) 
                var zoom_level = map.getZoom()
                console.log(zoom_level)
                var marker = L.marker(rc.unproject(coords))
                    .addTo(map)
                marker.bindPopup('[' + Math.floor(coords.x) + ',' + Math.floor(coords.y) + ']')
                    .openPopup()
            })
            L.tileLayer("/assets/tiles/{z}/{x}/{y}.png", {
            noWrap: true
            }).addTo(map)            

        },
        

    }

}
</script>


<style scoped>

#map {
  
}

</style>