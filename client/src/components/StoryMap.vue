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
            currentPageCoords: [4000,3000],
            map: undefined,
            rc: undefined,

        }
    },

    mounted(){
        eventBus.$on("page-turned", (page) => {
            this.currentPageCoords = page.map_coords
            this.map.flyTo(this.rc.unproject(this.currentPageCoords), 5, {
            animate: true,
            duration: 7
            });
        }),
        this.leafletInit()
    },   
    methods: {
            leafletInit(){
                const L = require('leaflet')
                L.RasterCoords = require('leaflet-rastercoords')
                const img = [
                    7932,  // original width of image (here from `example/karta.jpg`)
                    6228   // original height of image
                ]
                const pageCoords = this.currentPageCoords
                // create the map
                this.map = L.map('map', { zoomControl: false, attributionControl: false})
                // assign map and image dimensions
                this.rc = new L.RasterCoords(this.map, img)
                this.map.setMaxZoom(this.rc.zoomLevel())
                // all coordinates need to be unprojected using the `unproject` method
                // set the view in the lower right edge of the image
                this.map.setView(this.rc.unproject(pageCoords),9)
                this.map.on('click', function (event) {
                    // any position in leaflet needs to be projected to obtain the image coordinates
                    const coords = this.rc.project(event.latlng) 
                    const zoom_level = this.map.getZoom()
                    console.log(zoom_level)
                    const marker = L.marker(this.rc.unproject(coords))
                        .addTo(this.map)
                    marker.bindPopup('[' + Math.floor(coords.x) + ',' + Math.floor(coords.y) + ']')
                        .openPopup()
                })
                L.tileLayer("/assets/tiles/{z}/{x}/{y}.png", {
                noWrap: true
                }).addTo(this.map)            
        },
        

    }

}
</script>


<style scoped>

#map {
  
}

</style>