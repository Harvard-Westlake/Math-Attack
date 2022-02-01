# Math-Attack
Basic Gameplay
Intro:
A 2D megaman-like game where you go fight through several bosses, with each boss giving you items that will be helpful in the next boss fight. (Another similar example would be cuphead). The theme is math teachers at Harvard-Westlake, with the bosses being math teachers and the player being a student.


Damage:
Three hearts for the player, each time you get hit by anything you lose a heart and you get invincibility frames for a few seconds after taking damage
The bosses all have health bars, and whenever you hit the bosses you deal damage quantified by a number that reduces their health
It should take a LOT of hits to take down the boss (To put into context, the boss might have 10,000 hp and the base ranged attack might do ~70 damage and the base melee might do ~200 damage. However, this is just a basic guide for numbers, you are free to set health and damage to whatever seems right as long as the fights aren’t too short or too long. Suggested length is about 1-2 minutes as that’s what they do in cuphead).


Controls:
Arrow keys for movement
Z for jump
X for ranged attack
Shift for dash attack - teleport in direction
C for ability usage

Dash attack elaboration - 
Octogonal movement (choose one direction of the 8 to dash)
You basically aim where you are looking (which is one of the 8 directions you are holding down or left or right depending on where you were looking previously)
 
Instant teleportation that does damage based on what melee weapon you have and also the distance is based on what weapon you have (and also if you have a buff but that is explained later)
https://ssb.wiki.gallery/images/1/16/Sephiroth_Up_B_SSBU.gif
^ sort of the idea
Can dash attack in the air as well.
You have invulnerability frames while dashing and after dashing for about half a second IF AND ONLY IF you hit the boss.
Different weapons also have other aspects unique to that weapon.
Ranged attack elaboration -
Octogonal direction shooting (like the dash attack)
You basically aim where you are looking (which is one of the 8 directions you are holding down or left or right depending on where you were looking previously)
Different shooting times, different damage based on ranged weapon selected.
Different weapons also have other aspects unique to that weapon.
Abilities
Abilities are unique, you may only have one selected at a time for each boss fight.

How Different Weapons Work
For each of the melee and ranged weapons, they have different properties that don’t make one choice better than the other ones at first glance. They each have their own advantages and drawbacks to make you choose wisely for each boss. All numbers are not final and adjustable, but the relative strengths and weaknesses should be the same (Eg. one weapon should do less damage than the other, but by how much can change)
Melee
Meter stick (default)
Damage: 200
Dash attack distance: Move forward about 5 of your character length in the direction your facing
Golf Club
Damage: 50 (+ 250 with swing attack)
Dash attack distance: about 80% of the distance of meter stick so about 4 of your character length instead of 5
Special difference: Swing attack
After the initial dash attack, repress the dash attack button (shift) within the next tenth of a second to do a swing attack in front of you that deals 250 damage and also knocks the boss back about 5 of your character lengths. You are also invincible during this swing attack, but cannot act after it, putting you in a considerable amount of lag if you miss.
Ranged
Staple gun (default)
Damage: 70
Attack rate: 1 shot every 0.3 seconds
Boomerang markers
Damage: 50
Attack rate: 1 shot every 0.2 seconds
Unique: Bounces off ground and walls, and stays out for a bit before boomeranging back
Gun
Damage: 300
Attack rate: 1 shot every 1 second
Unique: Has significant recoil that sends you flying backwards
Ability
Dance buff
Cooldown: 25 sec
Buffs attack damage by 10%, speed by 15%, jump height by 10%, and increase dash attack distance by one character length unit for 10 seconds.
Truck attack
Cooldown: 10 sec
Makes you burst forward in a truck crossing the entire screen, dealing 500 damage and you being invincible during the entire attack.
Teleport Back
Cooldown: 20 sec
5 seconds after using the ability, you get sent back to where you were when you used the ability, with the same health you had before (can even bring you back to life!) The damage you did to the boss stays there though
Equipment (no drawbacks for this one, just nice)
Sneakers (Default)
Normal speed
Cowboy boots
5% speed boost

Inventory System

Inventory system has a space limit. Each item can be switched out for another in each category. This makes for a higher skill ceiling if you want to go into a boss fight under equipped or geared out. Cannot change the current weapon you have while in a boss fight (no switching between weapons and abilities!)
(potential achievements if you use default items for hardest boss for example)

Equipment
Cowboy boots
Sneakers (default)
Abilities
Dance buff
Truck attack
Melee
golf club
Meter stick (default)
Range
Gun
Staple gun (default)
Boomerang markers
Cosmetics
bowtie (bowtie does nothing)
Shop where you can buy cosmetic items - head item, torso item, feet item (shop and currency can be an add on for later, perhaps with currency being achieved through achievements)
Game pauses when inventory is open
Art
Room Designs (everything is pixelated)
Mr. Sim - Starter Area (Math classroom)
visual example
The room is 2d with a 3d background. The classroom should look something like this. There is a door at the right side of the room that is locked until the player defeats the boss. 
Mr. Varney - Western Area, dance room

Mr. Stout - Wizard, Dungeons and Dragons type beat


Mr. Chien and Mr. Weis - Math Office Castle (Queen and King respectively)

Mr. Nealis - War area 


Mr. Theiss - Final area (space-like, you’re fighting God)
See above 

Music / Sound Design
Player
Normal movement → footsteps
Dashing → woosh 
Jump → character grunt when first jumping, sound effect for landing
https://youtu.be/B18DEXPeFoU
User Interface
Regular interface buttons → button 5 https://youtu.be/B18DEXPeFoU (0:23)
Open Inventory → https://www.youtube.com/watch?v=TYkzuDDD8Q4 sound from 0:18 to 0:19
Hallways


Boss roons
No music until boss appears.


Boss Designs
Boss Design Template
Placement
The boss will start at one end of the room and then move whenever they perform a “movement” attack (defined below)
The placement should never be too close to the edge, there must be room for the player to dash through the boss and have enough room on the other side to play
Touching the boss at any point does damage to the player
3 Attacks
Ranged
Randomly triggers a ranged attack every couple seconds (random timing)
Melee
Can randomly trigger after a movement attack
Trigger: when the player gets close up the melee attack automatically triggers
Each melee attack is a timing challenge
We incentivize the player to do melee attacks because it does more damage, but in order to make it happen you must figure out the right timing to make a dash attack so that you don't get hit
Each boss has a different windup and execution for timing
Movement
Randomly triggers every couple seconds (random timing), also happens automatically if you hit the boss with too many ranged attacks (like 2000 ranged damage)
The movement attack moves the boss towards the general vicinity of where the player is located (random location near the player)
Pauses between attacks
Pauses between attacks get smaller as you get to harder and harder phases
Phases
3 phases per boss, each corresponding to a ⅓ of their health
Each third decreases pauses between attacks,increases the amount of movement attacks, and makes the windup timing for the melee attacks by the bosses faster
The goal is to make it more frantic and fast paced
Boss Rooms
Boss rooms are flat, rectangular rooms where you are trapped
You enter from the left of the room and when you get in a gate closes behind you (the gate can be changed to match the theme of the level) 
You exit the boss room on the right, when you finish the boss a gate opens on the right wall
Here is an approximation for what it should look like:

Drawing to show rough sizes and layout of the stage
Sizing of boss relative to player can change based off theming or whatever you want, this is just a rough guide


Boss 1 - Mr. Sim
Ranged attack: camera shutter that does damage and stuns you for a few seconds
A rectangle that tracks your movement for a bit then stops, and then takes a picture after about a second that does damage in that rectangular area.
https://www.youtube.com/watch?v=SJ9QRztQvLU&t=116s&ab_channel=GameXplain 
Very much like  this attack at 1:56
Melee attack: golf swing
Swings golf club towards the player - not too much range on it
Timing: Winds up, pauses, then swings
Make the timing not too hard as this is the first boss
Movement: bikes towards you 
Rides bike towards you, moderate pace not too fast
Player must dash over or through Mr. Sim to dodge
Reward: Golf club (melee) (All weapons and abilities highlighted above in weapons section)
Boss 2 - Mr. Varney
Ranged attack: Music notes come flying at you that do damage
Melee Attack: Jumps up and does the splits
Bends down, jumps up and simultaneously kicks out legs in both directions
Timing: Bends down, pauses for a bit, then jumps and attacks
Movement attack: spins towards you in a dance move
Whirls around and moves towards you 
Reward: Dance boots (equipment), Dance buff (ability) (All weapons and abilities highlighted above in weapons section)
Boss 3 - Stout the Dragon
Ranged attack: Throws out 3 random magic cards all with different possibilities out of 5 (based on the lands)
Swamp (Black): Slow and big
Forest (Green): Throws on the ground and bounces 
Island (Blue): Oscillation movement, like a wave
Volcano (Red): fast and with a fire trail behind it (not too long of a trail)
Plains (White): Flies a certain distance (random) and then pauses for a sec, explodes into a beam of light reaching up to to the top and bottom of the room
Melee Attack: Stout breathes fire around him
Does it in a circle starting in front of him to behind him
Timing - a slow moving circle, startup is pretty fast but there is an indicator with an animation (face turns into a dragons face)
Movement Attack: Like a wizard, he teleports to random locations 5 times and then does a small area of effect damage around him, then finally teleports to you and does a small area of effect damage.
Death animation: Tries to use the Chaos Orb magic card to kill you, by throwing it on the ceiling. But teleports underneath it without realizing it, it falls on him and he disintegrates
Reward: Teleport Back (ability) (All weapons and abilities highlighted above in weapons section)
Boss 4 - Chien and Weis
Ranged attack: Chien is always attacking with emotional damage throughout the fight (insults that debuff), Weis however does the normal ranged attack that is on a timer
Weis: Throws out boomerang markers at differing heights and/or angles in rapid fashion (but not at the same time)
Chien: Shoots out text bubbles that are insults at differing heights as well (but not at the same time) 
If hit by an insult, there is a random debuff chosen from these options (these do not stack on each other):
1. Movement Speed decreased by 50%
2. Dash Distance decreased by 1 character length
3. Jump height decreased by 10%
4. Attacks do 20% less damage
These hits DO NOT do damage, and do not stun the player
Melee Attack:
Chien keeps shooting
Weis: Swings his mohawk at you (sharp)
Timing - There is a  startup that is moderately slow, 2 rapid swings right after one another
Movement Attack: Weis picks up Chien in a princess hold, then jumps around and gets to the other side of the screen.
Chien and Weis want to run away, not get close up
Boss 5 - Nealis
Ranged attack: shoots down homing missiles from the sky
The missiles are not very fast, but they home in on you
Fairly large amount of missiles, depends on the size of them but it should feel kind of like a lot 
They don’t all shoot at the same time but they do come very close together
They come in from the top randomly
They stop homing in after a like 6 seconds
This goes up to 7s and 8s when you reach the 2nd and 3rd phases respectively
Melee attack: Shotgun blast
Timing - cock the gun, then shoot 
Area in front of him, small range horizontally but big blast
Movement attack: truck attack
Drives an army truck towards you. fairly big and somewhat fast
Boss 6 - Theiss (shirtless)
Ranged attack: 
Attack 1: Snaps and creates pillars of dark fire that are at angles, telegraphed with lines and then the pillars follow those lines.
Player has to find areas between the lines
Attack 2: Goes on the ground and 
Movement attack: Constant Slow teleporting on the ground, but the teleportation doesn’t do damage, this one is not random 





_______________________________________




RPG


Metroidvania
Character Design


Gains a heart container after every boss
Regains full hearts after defeating a boss or dying
Inventory
Appearance / equipment
boss rush
side view
as you beat each boss you get better stuff
Base Game
shooter?
And melee
Changing weapons
Arrow keys for movement
Z for jump
X for ranged attack
Shift for dash attack - teleport in direction 
Jump dash
C for ability
S and D for ability change
Movement
Dashes that are attacks
maybe we hallway in between, could be short just to build up atmosphere
Starting weapons - stapler gun, meter stick
Health bar, numbers for bosses - players have hearts though 3 hearts (1 hit is a heart)
Theme: fighting our way through the math department
Mr. Theiss is the final boss
Bosses are pictures of actual people
pixel art for body, pngs for heads
Different areas
Starter area - normal school little crazy but nothing too bad yet
Mr. Sim
Western area (with disco ball at top) - line dancing
Mr varney is boss
Tech area - everything is all technology based and stuff and its like glitching out
mr stout is boss
math office castle area - king and queen 
We get to their throne room and they stand up and start fighting
Mr. Chien (queen) and Weis
war area - in like a battlefield or something
nealis is boss
Truck attack
Gives you a gun at the end (good work soldier, you’ll need this for the dangers ahead)
Final area - dark and scary and evil
ricky c fakeout
mr. theiss (shirtless version)
Boss Designs and rewards




Rewards:
Gets golf club as melee (initial dash attack into another swing attack with another press that does knockback)
Chien and Weis
Attacks:
Chien shoots bubbles of text at you that debuff you (slower, jump height lower, dash attack smaller, take more damage, deal less damage)
emotional damage
Weis throws markers that are boomerangs at you and limits
Rewards: 
Weis boomerang markers, Chien bowtie for custom +5 style
Stout
Attacks:
TBD
Throws magic cards across the screen
Throws out NFTs at you
Rewards:
Recall ability that when you click it you teleport back to where you were after 4 s with your original health 
Timer on the ability
Varney
Attacks:
Spin and moves towards you
Earthquake attack while dancing (need to air stall)
Forces you to dance, small rhythm game
Play the horse hurdle game (no copy and paste has to code it on its own)
Reward:
Gives you dancing boots, increases movement and jump speed - also shows up on your character +5 style
Ability dance: buffs your attack and dash attack range
Nealis
Attacks:
Truck attack
Nukes (warning areas flash and missiles rain from sky - bullet hell) 
Reward:
Gun for ranged attack (recoil backwards) a lot of damage
ability: Truck attack
Final Boss: Theiss (shirtless)
Attacks: TBD 
Reward: TBD
platformer	
grappling hook movement
Gambling
Kevin’s casino
Dating Sim
Mr. Theiss dating Sim?
Have to avoid the other math dept teachers
Strategy


Puzzle


