use fighting_fantasy;

db.pages.insertMany([
    {
        name: "starting inn",
        narrative_text: "You wake up in...bla bla bla...and now you must make the choice that will seal your fate.",
        buttons: [{button_text: "Follow the river path to meek Kate in the haunted gallows", button_destination: "river_romance_scene", button_style: "xyz"}, {button_text: "Wade under the bridge to seek the monster that has been bothering the villagers", button_destination: "bridge_fight", button_style: "zzz"}],
        fight_monster: "", //this should be filled with monster page name
        gain_item: "", //this should be filled with item page name
        gain_health_from_narrative: 0, //this should be filled with integer if something happens in narrative to add health
        map_coords: [18,96],
        map_marker_icon: "/inn.svg"
    },
    //example of fight chapter
    {
        name: "bridge_fight",
        narrative_text: "As you wade under the bridge the troll ambushes you and you must fight",
        fight_monster: "Horrible Troll", 
        gain_item: "", //this should be filled with item page name
        destination_after_fight: "road_to_candlekeep",
        map_coords: [18,96],
        map_marker_icon: "/bridge.svg"
    },
    {
        name: "river_romance_scene",
        narrative_text: "You see kate, bust bustling with vibrant joy",
        buttons: [{button_text: "Fight the bust", button_destination: "bust fight", button_style: "xyz"}, {button_text: "run away from the bust", button_destination: "bust_flee", button_style: "zzz"}],
        gain_item: "", //this should be filled with item page name
        gain_health_from_narrative: 5, //this should be filled with integer if something happens in narrative to add health
        map_coords: [68,76],
        map_marker_icon: "/romance.svg"
    }
]);

db.items.insertMany([
    {
        name: "Sword of Godarth",
        damage_modifier: 2,
        img_file: "/sword_of_godarth.svg"
    }
]);

db.monsters.insertMany([

    {
        name: "Horrible Troll",
        taunt: "You think you can fuck with my sweet bridge toll lil punk?",
        health: 120,
        img_file: "/troll.svg"
    }
]);

//DB PAGES

//narrative pages
//chapters: these come in two types: fight chapters where you don't have any buttons but you do have a monster and a destination after fight.
//type 2: plain narrative- where you have buttons and no monster/destination after fight.




//monster pages


//character

// {
//     name: "Shodon the paladin",
//     health: 20,
//     items: []
// }

//items


