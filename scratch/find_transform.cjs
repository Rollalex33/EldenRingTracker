const controlPoints = [
  // Limgrave
  { name: 'Elleh', old: [1440, 2090], exact: [1375, 2030] },
  { name: 'Gatefront', old: [1560, 2080], exact: [1490, 2070] },
  { name: 'First Step', old: [1370, 2090], exact: [1290, 2040] },
  { name: 'Margit', old: [1720, 1930], exact: [1670, 1880] },
  { name: 'Stormhill Shack', old: [1660, 1990], exact: [1570, 1960] },
  { name: 'Warmaster Shack', old: [1680, 2070], exact: [1600, 2050] },
  { name: 'Saintsbridge', old: [1660, 2280], exact: [1570, 2220] },
  { name: 'Waypoint Ruins', old: [1420, 2330], exact: [1380, 2320] },
  { name: 'Forlorn Evergaol', old: [1260, 2240], exact: [1220, 2270] },
  { name: 'Agheel', old: [1450, 2200], exact: [1400, 2180] },

  // Weeping
  { name: 'Castle Morne', old: [740, 2240], exact: [780, 2160] },
  { name: 'Leonine', old: [720, 2240], exact: [680, 2130] },
  { name: 'Church Pilgrimage', old: [1080, 2060], exact: [1100, 2100] },
  { name: 'Fourth Church', old: [960, 1970], exact: [990, 1940] },
  { name: 'Bridge Sacrifice', old: [1160, 2340], exact: [1120, 2300] },
  { name: 'Witchbane Ruins', old: [860, 2040], exact: [930, 2040] },

  // Liurnia
  { name: 'Lake Facing Cliffs', old: [1940, 1780], exact: [1920, 1660] },
  { name: 'Church Irith', old: [1970, 1750], exact: [1950, 1620] },
  { name: 'Carian Study Hall', old: [2440, 1850], exact: [2410, 1640] },
  { name: 'Academy Gate Town', old: [2460, 1580], exact: [2430, 1310] },
  { name: 'Purified Ruins', old: [2160, 1720], exact: [2120, 1620] },
  { name: 'Rose Church', old: [2230, 1420], exact: [2180, 1320] },
  { name: 'Boilprawn Shack', old: [2280, 1530], exact: [2260, 1390] },
  { name: 'Village Albinaurics', old: [2130, 1370], exact: [2150, 1220] },
  { name: 'Caria Manor', old: [3320, 1320], exact: [3200, 1220] },
  { name: 'Ranni Rise', old: [3350, 1270], exact: [3240, 1150] },
  { name: 'Church of Vows', old: [2780, 1620], exact: [2730, 1520] },
  { name: 'Raya Lucaria Debate', old: [2780, 1360], exact: [2720, 1230] },

  // Altus
  { name: 'Phantom Tree', old: [3420, 2180], exact: [3350, 1970] },
  { name: 'Battleground', old: [3500, 2220], exact: [3440, 2080] },
  { name: 'Draconic Sentinel', old: [3520, 2370], exact: [3470, 2290] },
  { name: 'Avenue Balcony', old: [3310, 2440], exact: [3330, 2320] },
  { name: 'Elden Throne', old: [3210, 2480], exact: [3240, 2340] },
  { name: 'Dectus Lift', old: [3180, 1720], exact: [3250, 1680] },
  { name: 'Windmill Village', old: [3720, 2030], exact: [3680, 2120] },
  { name: 'Shaded Castle', old: [3680, 1850], exact: [3650, 1640] },
  { name: 'Volcano Manor', old: [3580, 1480], exact: [3550, 1380] },

  // Caelid
  { name: 'Redmane Castle', old: [1420, 3140], exact: [1420, 3220] },
  { name: 'Commander Oneil', old: [1660, 2960], exact: [1630, 2900] },
  { name: 'Gowry Shack', old: [1720, 3120], exact: [1680, 3040] },
  { name: 'Fort Faroth', old: [1930, 3210], exact: [1930, 3210] },
  { name: 'Fort Gael', old: [1490, 2740], exact: [1490, 2740] },

  // Mountaintops
  { name: 'Castle Sol', old: [4020, 3080], exact: [4070, 3110] },
  { name: 'Freezing Lake', old: [3850, 3340], exact: [3900, 3410] },
  { name: 'Fire Giant', old: [3480, 3420], exact: [3500, 3400] },
];

console.log('Total control points:', controlPoints.length);
controlPoints.forEach(cp => {
  const dLat = cp.exact[0] - cp.old[0];
  const dLng = cp.exact[1] - cp.old[1];
  console.log(`${cp.name.padEnd(20)}: Old: [${cp.old}], Exact: [${cp.exact}] -> dLat: ${dLat}, dLng: ${dLng}`);
});
