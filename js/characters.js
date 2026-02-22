const characters = {

  bastion: {
  name: "Bastion",
  icon: "images/bastionmini.png",
  moves: `
::NORMALS::
1 - 1330 []
11 - 2470 []
111 - 3510 [cancellable]
>>> DF1 [cancel]
>>> DF2 [cancel]
>>> DB2 [cancel]
>>> FF1 [cancel]
>>> DB4 [cancel]
13 - 2560 []
131 - 3680 [stun]
1311 - 4980 [soft knockdown]
13B1 - 3680 []
13B11 - 4940 [popup]
132 - 5260 [airseek]
13F2 - 3910 []
13F22 - 4690 []
13F222 - 5540 [airseek]
133 - 3680 []
1333 - 4730
13334 - 4730 [Note: last hit escapable]
12 - 2830 [cancellable]
DF1 [cancel]
DF2 [cancel]
DB2 [cancel]
FF1 [cancel]
DB4 [cancel]
12B1 - 3810 []
12B11 - 4890 []
122 - 3740 []
1222 - 4760 [airseek]
12F4 - 3805 []
14 - 2470 []
144 - 3750 [stun, cancellable]
>>> DB1 [cancel]
>>> DB2 [cancel]
>>> DB3 [cancel]
>>> DB4 [cancel]
1443 - 4800 [popup]

B1 - 1400 []
B11 - 3020 [popup]

F1 - 1300 []
F11 - 2470 []
> DB2
> DB4

2 - 1300 []
22 - 2830 [airseek]

F2 - 1710 []
F22 - 2750 []    
F222 - 3940 [airseek]

wr2 - 1200 []
wr2b1
wr2b11
wr2F2 - []
wr2F22 - []
wr2F222 - [airseek]
wr2F2B1
wr2F2B11
wr23
wr233
wr2333
wr23334
wr23F2
wr23F22
wr23F222 - [airseek]
wr24
wr244 - [stun]


3 - 1400 []
31 - 2660 [stun]
311 - 4160 [projectile]
312 - 3620 []
3121 - 4460 [juggle]
31212 - 5180 [juggle]
312121 - 6080 []
312F2 - 4790 [cancellable]
312F22 - 5440 []
312F222 - 6120 [airseek]
3123 - 4600 []
31232 - 6580 [airseek]
31233 - 5440 []
312333 - 6190 []
3123334 - 6190 [escapable last hit]
3124 - 4530 []
31244 - 5490 [juggle]
312443 - 6240 []
32 - 4460 [airSeek]
3F2 - 2930 []
3F22 - 3840 []
3F222 - 4860 [airseek]
3334 - 3860 [escapable]

F3 - 1400 []
F34 - 2750 [cancel]


4 - 1300 []
44 - 2740 [stun]
443 - 3940 [popup]
f4 - 1425
b4 - 1700 [knockdown]

::CROUCHING::

D1 - 1400 []
D1D2 - 2840 [cancellable]
D1D2D4 - 4200 [cancellable]
D1D2D4D4 - 5390 []
D1D3 - 2570 []
D1D3D2 - 3850 [cancellable]
D1D3D2D4 - 5040 [cancellable]
D1D3D2D4D4 - 6060 []
D1D3D3 - 3770 []
D1D3D3D2 - 4890 [cancellable]
D1D3D3D2D4 - 5910 [cancellable]
D1D3D3D2D4D4 - 6760 []
D1D3D4 - 3930 [cancellable]
D1D3D4D4 - 5120 []

D2 - 1600 [cancellable]
D24 - 3130 [cancellable]
D244 - 4490 []
D+F2 - 1400 [popup]

D3 - 1300 []
D32 - 2740 [cancellable]
D324 - 4100 [cancellable]
D3244 - 5290 []
D33 - 2650 []
D334 - 4010 [cancellable]
D3344 - 5200 []

D+F3 - 1500 []
D+F3D2 - 2940 []
D+F3D2D+F2 - 4060 [popup]
D+F3D24 - 4300 []
D+F3D2D4D4 - 5490 []
D+F3D+F2 - 2760 [popup]
D+F34 - 3030 []

D4 - 1700 [cancellable]
D44 - 3230 []
D+F4 - 1700 []

::JUMPING::
1 - 1200
D1 - 1500

2 - 1300
D2 - 1700

3 - 1200
D3 - 1400

4 - 1600
D4 - 1400

::SPECIALS::
ff1 - 2000 [popup]
ff11 - 3980 [soft knockdown]
ff12 - 3700 [projectile]
db1 - 1200 [projectile]
df2 - 2700 [projectile]
db2 - 3000
df3
> 1 - 1800 [popup]
> 2 - 1200 []
>> 2F2 - 2730 []
>> 2F22 - 3640 []
>> 2F222 - 4660 [airseek]
>> 2B1 - 2460 []
>> 2B11 - 3900 [popup]
> 4 - 1050 [airseek]
db3
> 1 - 1800 []
> 2 - 3000 []
ff2 - 3420 [airseek]
db4 - 2835 [airseek]
ff4 - 2200
AIR df1 - 2700 [projectile]
AIR db1 - 2700 [projectile]

::SUPERS::
1+2 - 7600 [Level 1]
f1+2 - 8550 [Level 2]
AIR 1+2 - 8580 [Level 2 air]
3+4 - 11340 [Level 3]
b1+2 - 13500 [Level 4]

::THROWS::
d+R1 - 4001
b+R1 - 3900
AIR R1 - 3750
R1 - 3501

::RECOVERY::
2 - 2600 [projectile]

::TAUNT::
2+3
`,
  combos: `
1112 AS 123 DF1 LVL1 - 1000 [LVL1]
`
},

  beast: {
    name: "Beast",
    icon: "images/beastmini.png",
    moves: [
      { command: "", damage: "", tags: [] }
    ]
  },

  betsy: {
    name: "Betsy",
    icon: "images/betsymini.png",
    moves: `
      
      `
  },

  bishop: {
    name: "Bishop",
    icon: "images/bastionmini.png",
    moves: [
      { command: "", damage: "", tags: [] }
    ]
  },

  blob: {
    name: "Blob",
    icon: "images/bastionmini.png",
    moves: `
      
      `
  },

  cyclops: {
    name: "Cyclops",
    icon: "images/cyclopsmini.png",
    moves: `112 - 3680 [stun]
1121 - 4400 [projectile]
1123 - 4460
11233 - 5185 [knockdown]
11234 - 5410 [knockdown]
11244 - 5710
1133 - 4100
1134 - 4550
11344 - 5500
122 - 4100 [stun]
124 - 4180
1244 - 5510 [knockdown]
132 - 3920
1321 - 4760 [projectile]
1322 - 5110 [juggle]
1323 - 4830
13233 - 5700 [knockdown]
13234 - 5970 [knockdown]
133 - 3920 [knockdown]
134 - 4000
1344 - 5330 [knockdown]
144 - 4440
f1 - 2500 [stun]
b11 - 2425
b112 - 3465 [stun]
b1121 - 4305 [projectile]
b11212 - 5025 [projectile]
b1121234 - 6255 [knockdown]
df1 - 2700 [projectile]
db1 - 3420 [projectile]
bf1 - 2700 [projectile]

22 - 3130 [stun]
221 - 5130 [airseek]
222 - 4090 [projectile]
24 - 3220
244 - 4740
f22 - 3130 [juggle]
d2d2 - 5470 [juggle]
ff2 - 2800 [juggle]
ff22 - 3880 [projectile]
b22 - 3230 [juggle]
b21 - 2780 [projectile]
b23 3 - 4030 [knockdown]
b23 4 - 4390 [knockdown]
b24 4 - 4840
bf2 - 2700 [projectile]
df2 - 2700 [projectile]
db2 - 3420 [projectile]

32 - 2930
321 - 3890 [projectile]
322 - 4290 [juggle]
323 - 3970
3233 - 4985 [knockdown]
3234 - 5300 [knockdown]
33 - 2930 [knockdown]
34 - 3020
344 - 4540 [knockdown]
f331 - 4285 [projectile]
f3313 - 5125 [projectile]
f33134 - 5845 [stun] [projectile]
f331342 - 6595 [projectile]
df3 - 2700
db3 - 3040

44 - 3510 [knockdown]
f44 - 3510 [knockdown]
ff4 - 2600
d41 - 2910 [projectile]
db4 - 3040 [airseek]
AIR df1 - 2700 [projectile]
AIR db1 - 2700 [projectile]

::SUPERS::

3+4 - 5990 [Level 1]
f1+2 - 7248 [Level 2]
1+2 - 10200 [Level 3] [projectile]
AIR 1+2 - 10098 [Level 3 air] [projectile]
b1+2 - 15542 [Level 4] [projectile]

::THROWS::

R1 - 3801
b+R1 - 3700
AIR R1 - 3200

::RECOVERY::

2 - 3200 [projectile]

::TAUNT::

2+3
D2+3`
  },

  darkphoenix: {
    name: "Dark Phoenix",
    icon: "images/dphoenixmini.png",
    moves: [
      { command: "", damage: "", tags: [] }
    ]
  },

  forge: {
    name: "Forge",
    icon: "images/forgemini.png",
    moves: [
      { command: "", damage: "", tags: [] }
    ]
  },

  gambit: {
    name: "Gambit",
    icon: "images/gambitmini.png",
    moves: [
      { command: "", damage: "", tags: [] }
    ]
  },

  havok: {
    name: "Havok",
    icon: "images/havokmini.png",
    moves: [
      { command: "", damage: "", tags: [] }
    ]
  },

  juggernaut: {
    name: "Juggernaut",
    icon: "images/juggernautmini.png",
    moves: [
      { command: "", damage: "", tags: [] }
    ]
  },

  ladyd: {
    name: "Lady Deathstrike",
    icon: "images/ladydmini.png",
    moves: [
      { command: "", damage: "", tags: [] }
    ]
  },

  magneto: {
    name: "Magneto",
    icon: "images/magnetomini.png",
    moves: [
      { command: "", damage: "", tags: [] }
    ]
  },

  mystique: {
    name: "Mystique",
    icon: "images/mystiquemini.png",
    moves: [
      { command: "", damage: "", tags: [] }
    ]
  },

  nightcrawler: {
    name: "Nightcrawler",
    icon: "images/nightcrawlermini.png",
    moves: [
      { command: "", damage: "", tags: [] }
    ]
  },

  phoenix: {
    name: "Phoenix",
    icon: "images/phoenixmini.png",
    moves: [
      { command: "2 4", damage: "", tags: [] },
      { command: "df2", damage: "", tags: [] }
    ]
  },

  psylocke: {
    name: "Psylocke",
    icon: "images/psylockemini.png",
    moves: [
      { command: "", damage: "", tags: [] }
    ]
  },

  pyro: {
    name: "Pyro",
    icon: "images/bastionmini.png",
    moves: [
      { command: "", damage: "", tags: [] }
    ]
  },

  rogue: {
    name: "Rogue",
    icon: "images/roguemini.png",
    moves: [
      { command: "df 1", damage: "", tags: [] },
      { command: "d+f 2", damage: "", tags: [] },
      { command: "ff 3", damage: "", tags: [] }
    ]
  },

  sabretooth: {
    name: "Sabretooth",
    icon: "images/sabretoothmini.png",
    moves: [
      { command: "", damage: "", tags: [] }
    ]
  },

  sentinela: {
    name: "Sentinel A",
    icon: "images/sentinelamini.png",
    moves: [
      { command: "", damage: "", tags: [] }
    ]
  },

  sentinelb: {
    name: "Sentinel B",
    icon: "images/sentinelbmini.png",
    moves: [
      { command: "", damage: "", tags: [] }
    ]
  },

  storm: {
    name: "Storm",
    icon: "images/stormmini.png",
    moves: [
      { command: "", damage: "", tags: [] }
    ]
  },

  toad: {
    name: "Toad",
    icon: "images/toadmini.png",
    moves: [
      { command: "", damage: "", tags: [] }
    ]
  },

  wolverine: {
    name: "Wolverine",
    icon: "images/wolverinemini.png",
    moves: [
      { command: "", damage: "", tags: [] }
    ]
  },

};
