use fighting_fantasy;
db.dropDatabase();
db.pages.insertMany([
    {
        name: "intro",
        narrative_text: "You are Johnny the eldest child of the Crach an Code. The Code clan resides in a newly built village of Riverdale, a tranquil place where the most exciting thing that has ever happened was the previous winter; when a goblin trader tried to sell everyone Griffin Balls! (everyone knows Griffin Balls aren't in season until summer).Your father Crache is an elderly man now but at one point he was a famous monster hunter. However now he looks the same as any old man, the only thing that sets him aside from the rest is his insistence to wear his plate codpiece to bed. Something about \"ensuring his legacy\" you and the rest of the village do your best to ignore his weirdness. Life is dull. Until...",
        buttons: [{button_text: "Continue", button_destination: "intro_part_2", button_style: "xyz"}],
        gain_health_from_narrative: 0, //this should be filled with integer if something happens in narrative to add health
        map_coords: [18,96],
        map_marker_icon: "/inn.svg"
    },
    {
        name: "intro_part_2",
        narrative_text: "''CRASH BANG WALLOP'' You're awoken by a crescendo of sounds. Unable to identify what's causing the loud clanging, you rush to the window and draw back the curtains! With eyes still blurry you see what seems to be a small man running into the bushes with a bag over his shoulder, chased by your father Crache with a slipper in hand! However he soon gives up the chase and hangs his head in defeat. You decide to get dressed and find out what has happened. You approach Crache sitting on the grass shirtless with his head in his hands and ask him \"what happened?\". Then like a bolt of lightning he jumps up (faster than you've ever seen him move) and with a twinkle in his eye grabs you by the arms \"Listen boy that creature just stole our clans most precious artifact! The one thing that has kept this village safe!\" he exclaims, you try to inquire what he is refering to but he interjects \"There's no time to explain it's getting away! Look take this sword and retrieve the artifact.\" Looking down at the sword just thrusted into your hands you see it is infact a wooden training sword. Before you can complain and ask for a better blade your father has pushed you into the bushes where the creature had just fled through not minutes ago.",
        buttons: [{button_text: "Continue", button_destination: "on_the_trail", button_style: "xyz"}],
        gain_health_from_narrative: 0, //this should be filled with integer if something happens in narrative to add health
        map_coords: [18,96],
        map_marker_icon: "/bridge.svg"
    },
    {
        name: "on_the_trail",
        narrative_text: "Scrambling to your feet you take a second to get your barings. behind you is your village and in front is about 20 feet of bushes and trees which lead to a path. Looking down you see what seem to be small feet, perhaps those of a child but you can't be sure. However you can be sure that these are the tracks of your theif so you follow them to the path. The path is a simple trodden path through some woods. Looking down at the tracks you see the tracks head north uphill.After following the tracks for a few hours you see they cross a rickety bridge that should be able to hold your weight. Do you?",
        buttons: [{button_text: "Cross The Bridge", button_destination: "cross_the_bridge", button_style: "xyz"}, {button_text: "Wade through the water and go around the bridge", button_destination: "around_bridge", button_style: "zzz"}],
        gain_health_from_narrative: 5, //this should be filled with integer if something happens in narrative to add health
        map_coords: [68,76],
        map_marker_icon: "/romance.svg"
    },
    {
        name: "cross_the_bridge",
        narrative_text: "Whilst crossing the old wooden bridge it seems to hold your weight fine. After a couple shakes and wobbles you make it accross and carry on your path.",
        buttons: [{button_text: "Back on the creatures trail", button_destination: "back_on_trail", button_style: "xyz"}],
        gain_health_from_narrative: 0, //this should be filled with integer if something happens in narrative to add health
        map_coords: [68,76],
        map_marker_icon: ""
    },
    {
        name: "around_bridge",
        narrative_text: "The creature you're after was much smaller than you, and you know better than to cross a bridge that is in such disrepair. Looking down stream you see a possible crossing point where the water is shallow enough to cross. Whilst wading through the water you feel something brush against your leg. At that moment you remember something about this river, and the tales of the merman! Quickly you rush to solid ground. You have successfully made it across the river however now something beckons you back...",
        buttons: [{button_text: "Ready your sword!", button_destination: "merman_combat", button_style: "xyz"}],
        gain_health_from_narrative: 0, //this should be filled with integer if something happens in narrative to add health
        map_coords: [68,76],
        map_marker_icon: ""
    },
    {
        name: "merman_combat",
        narrative_text: "",
        fight_monster: "Merman", 
        destination_after_fight: "back_on_trail",
        map_coords: [18,96],
        map_marker_icon: "/bridge.svg"
    },
    {
        name: "back_on_trail",
        narrative_text: "With the bridge behind you you carry on tracking the creature. after a while you see a well on your right. Listening carefully you hear what sounds like whistling coming from the well.",
        buttons: [{button_text: "Ignore the Well", button_destination: "after_well_trail", button_style: "xyz"}, {button_text: "Investigate the well", button_destination: "the_well", button_style: "zzz"}],
        gain_health_from_narrative: 0, //this should be filled with integer if something happens in narrative to add health
        map_coords: [68,76],
        map_marker_icon: ""
    }, 
    {
        name: "the_well",
        narrative_text: "As you approach the well the sound of whistling starts to fade. as you peer into the well you expect the worst. However all you see is the well bucket within arms reach. Inside the bucket you see a ''loaf of bread 5HP UP!''",
        buttons: [{button_text: "You return to the trail", button_destination: "after_well_trail", button_style: "xyz"}],
        gain_health_from_narrative: 5, //this should be filled with integer if something happens in narrative to add health
        map_coords: [68,76],
        map_marker_icon: ""
    }, 
    {
        name: "after_well_trail",
        narrative_text: "After walking along the path for about 4 hours the scenery has started to change, now the path has started become more steep, the hills are higher and where there were trees before now there are larger and larger rocks. ''The tracks are still fresh, I can't be that far behind this creature now'' you think to yourself. A few more minutes pass but suddenly something stops you in your tracks. It's a menacing Draugr. They often patrol mountain trails like this!",
        buttons: [{button_text: "Ready your sword!", button_destination: "draugr_combat", button_style: "xyz"}],
        gain_health_from_narrative: 0, //this should be filled with integer if something happens in narrative to add health
        map_coords: [68,76],
        map_marker_icon: ""
    }, 

    {
        name: "draugr_combat",
        narrative_text: "",
        fight_monster: "Draugr", 
        destination_after_fight: "mountain_trail",
        map_coords: [18,96],
        map_marker_icon: "/bridge.svg"
    },
    {
        name: "mountain_trail",
        narrative_text: "With the Draugr dead you dust yourself off and resume your search. Eventually the hill you have been climbing levels off into a calm open area. Looking north-east into the opening you see a single tree and consider that you have been walking all day and should maybe consider making a camp for the night. Do you?",
        buttons: [{button_text: "Set up camp under the tree", button_destination: "tree_camp", button_style: "xyz"}, {button_text: "Try find somewhere more secluded to rest", button_destination: "spooky_house", button_style: "zzz"}],
        gain_health_from_narrative: 0, //this should be filled with integer if something happens in narrative to add health
        map_coords: [68,76],
        map_marker_icon: ""
    },
    {
        name: "tree_camp",
        narrative_text: "You set up camp under the tree. You rest your eyes and before you know it it's morning! that fight with the troll must have tired you out! Panicked you gather your things when you see the creature you've been tracking picking berries in the clearing not 10 yards away from you!",
        buttons: [{button_text: "Sword in hand you rush towards it!", button_destination: "creature_capture", button_style: "xyz"}],
        gain_health_from_narrative: 0, //this should be filled with integer if something happens in narrative to add health
        map_coords: [68,76],
        map_marker_icon: ""
    },
    {
        name: "spooky_house",
        narrative_text: "Deciding that camping by the tree would be far too open you search around for a more secluded spot. After an hour search you find what seems to be a small abandoned cabin, you can feel your eyes getting heavier and decide you aren't going to find anywhere better. The door to the cabin opens with a creak, a spider or two scurry accross the floor. Looking around you see this whole house has been abandoned not a single piece of furniture remains. The only notable feature in this single room cabin in a dusty old fireplace. After about 20 minutes you've made the place as hospitable as possible. Laying on the floor you rest your eyes... BUT just before you drift off to sleep you awaken with an ice cold weight on your chest! Your gasp almost freezes solid, you reach for your sword and scurry to your feet! Before you hovers a ghastly ghost! Now you see why this cabin was abandonned.",
        buttons: [{button_text: "Ready your sword", button_destination: "ghost_combat", button_style: "xyz"}],
        gain_health_from_narrative: 0, //this should be filled with integer if something happens in narrative to add health
        map_coords: [68,76],
        map_marker_icon: ""
    },

    {
        name: "ghost_combat",
        narrative_text: "",
        fight_monster: "Ghost", 
        destination_after_fight: "spooky_house_2",
        map_coords: [18,96],
        map_marker_icon: "/bridge.svg"
    },
    {
        name: "spooky_house_2",
        narrative_text: "With that final swing the spectre vanishes and in its place falls a ''steel blade +5 DMG!''Exausted you slump to your knees and fall asleep... A bright light awakens you, you quickly grab your steel sword ready to fight. But realise its just the morning light coming through the window, it's going to be a long time before you get over last nights encounter. Collecting your things you head out the house. After about 10 minutes of walking you reach the clearing from yesterday. You cast a glance at the tree you considered resting under last night which almost mockingly has a herd of deer underneath, peacefully resting and grazing. Angrily you turn away and continue your search when... You see the creature! Not 30 yards from you it seems to be forraging for berries. You break into a sprint towards the creature!",
        buttons: [{button_text: "Sword in hand you rush towards it!", button_destination: "creature_capture", button_style: "xyz"}],
        gain_item: "Steel Blade", //this should be filled with item page name
        gain_health_from_narrative: 0, //this should be filled with integer if something happens in narrative to add health
        map_coords: [68,76],
        map_marker_icon: ""
    },
    {
        name: "creature_capture",
        narrative_text: "Before the creature realizes you're already on top of it. You pin the creature up against a tree. It's a pathetic little thing, somewhere between a Goblin and a Gnome, it's wearing nothing but a loin cloth. You can't tell if it's malnourished or that's just how this creature looks. Your clans artifact is nowhere to be seen. \"Where is the my clans artifact!\" You shout while shaking the creature, \"No Please sirs! I swear Grodge only took it because it was needed!\" the creature now known as Grodge gestures to his right through some bushes. \"Please it is most definitely needed for master!\" Grodge exclaims desperatley with spittle on his lips\" Through the woods in the direction Grodge gestured you see something glinsteing. Do you?",
        buttons: [{button_text: "Knock Grodge out and investigate the glistening", button_destination: "knockout_grodge", button_style: "xyz"}, {button_text: "Question Grodge about why he stole it and who his master is", button_destination: "question_grodge", button_style: "zzz"}],
        gain_health_from_narrative: 0, //this should be filled with integer if something happens in narrative to add health
        map_coords: [68,76],
        map_marker_icon: ""
    },
    {
        name: "knockout_grodge",
        narrative_text: "Knocking out Grodge and leaving him on the floor, you investigate the Glistening. After about 30 seconds you stand in a 2nd clearing much smaller than the last however in the center there is a 10ft tall pile of what seems to be numerous trinkets, trash, coins and god knows what else. Grodge clearlly was insane making somekind of monument of knicks-knacks. \"Oh well better start looking for the artifact\" you say while rolling your sleeves up. When all of a sudden you hear ''ROAAAR!'' startled you stand back.",
        buttons: [{button_text: "Ready your sword!", button_destination: "dragon_combat", button_style: "xyz"}],
        gain_health_from_narrative: 0, //this should be filled with integer if something happens in narrative to add health
        map_coords: [68,76],
        map_marker_icon: ""
    },    
       {
        name: "question_grodge",
        narrative_text: "Loosening your grip on Grodge you ask \"But why would you steal from my village?\", Grodge matter-of-factly \"Everyone knows the horrible Master likes shiny things! One day he flew down and with his treasures and and and...\" Grodge stammers his words \"He said he'd cook and eat me if I didn't get him the shiniest thing I'd ever seen! So I did I remembered travelling through your village last winter and it was only for a second but I knew I saw something beautiful!\" Grodge calms down \"Listen I'll make you a deal kill the Master take your artifact but let me keep his treasures!\". After a few seconds you realise you don't actually care about Grodge or the treasures so you agree. \"Wonderful!\" Grodge dances to his feet here eat this! it'll make you powerful enough to fight the master!\" Grodge passes you some ''Griffin Balls! +50HP'' Leaving Grodge behind you investigate the Glistening. After about 30 seconds you stand in a 2nd clearing much smaller than the last however in the center there is a 10ft tall pile of what seems to be numerous trinkets, trash, coins and god knows what else. This must be the masters treasures better stay ready. When all of a sudden you hear ''ROAAAR!'' ",
        buttons: [{button_text: "Ready your sword", button_destination: "dragon_combat", button_style: "xyz"}],
        gain_item: "Griffin Balls", //this should be filled with item page name
        gain_health_from_narrative: 50, //this should be filled with integer if something happens in narrative to add health
        map_coords: [68,76],
        map_marker_icon: ""
    },
    {
        name: "dragon_combat",
        narrative_text: "",
        fight_monster: "Dragon", 
        destination_after_fight: "finale",
        map_coords: [18,96],
        map_marker_icon: "/dragon.png"
    },
    {
        name: "finale",
        narrative_text: "The dragon lays dead at your feet! Shocked that you not only survived but won you almost forget why you're here. \"The Artifact!\" you start to scour the pile of knick-knacks in search of the Artifcat, when something catches your eye... at the top of the pile. Sleeves rolled up you find some safe places to fit your feet and climb. At the top you look around but nothing looks like... then you see it. You take the Artifact in your hands and hold it up to the light. \"Oh I see ''The one thing that has kept this village safe''\" with a sigh you place your fathers plate codpiece in your bag and set off home for the village. ",
        buttons: [{button_text: "THE END", button_destination: "credits", button_style: "xyz"}],
        gain_health_from_narrative: 0, //this should be filled with integer if something happens in narrative to add health
        map_coords: [68,76],
        map_marker_icon: ""
    },
    {
        name: "credits",
        narrative_text: "Created by Keith Nimmo, Ollie Boyd, Edward Cant and Jack Morris. Thanks for playing!",
        buttons: [{button_text: "New Game +", button_destination: "intro", button_style: "xyz"}],
        gain_health_from_narrative: 0, //this should be filled with integer if something happens in narrative to add health
        map_coords: [68,76],
        map_marker_icon: ""
    },
    {
        name: "died",
        narrative_text: "You have died.",
        buttons: [{button_text: "Retry", button_destination: "intro", button_style: "xyz"}]
    }
]);

db.items.insertMany([
    {
        name: "Steel Blade",
        damage_modifier: 5,
        img_file: "/assets/Sword_icon"
    },
    {
        name: "Griffin Balls",
        health_modifier: 50,
        img_file: "/griffin_balls"
    }
]);

db.monsters.insertMany([
    {
        name: "Merman",
        taunt: "Glub glub!",
        health: 30,
        img_file: "assets/Merman.png"
    },
    {
        name: "Draugr",
        taunt: "My orders are as follows!",
        health: 50,
        img_file: "assets/Draugr.png"
    },
    {
        name: "Ghost",
        taunt: "This is my house!",
        health: 30,
        img_file: "assets/Ghost.png"
    },
    {
        name: "Dragon",
        taunt: "GET AWAY FROM MY TREASURES!",
        health: 100,
        img_file: "assets/Dragon.png"
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


