const fs = require('fs');

const locationsPath = 'src/data/locations.json';
const questlinesPath = 'src/data/questlines.json';

const locations = JSON.parse(fs.readFileSync(locationsPath, 'utf8'));
const questlines = JSON.parse(fs.readFileSync(questlinesPath, 'utf8'));

const EXACT_COORDS = {
  "grace_first_step": [
    1290,
    2040
  ],
  "loc_varre_01_primer_paso": [
    1295,
    2040
  ],
  "dung_fringefolk_hero": [
    1290,
    2030
  ],
  "boss_tree_sentinel": [
    1330,
    2035
  ],
  "grace_church_elleh": [
    1375,
    2030
  ],
  "loc_ranni_01_elleh": [
    1375,
    2030
  ],
  "dung_groveside_cave": [
    1410,
    1990
  ],
  "dung_stormfoot_catacombs": [
    1450,
    1960
  ],
  "boss_crucible_stormhill": [
    1520,
    1950
  ],
  "grace_stormhill_shack": [
    1570,
    1960
  ],
  "loc_roderika_01_choza": [
    1570,
    1960
  ],
  "seed_stormhill_road": [
    1575,
    1970
  ],
  "grace_gatefront": [
    1490,
    2070
  ],
  "seed_fringe_tree": [
    1495,
    2075
  ],
  "weap_brass_shield": [
    1490,
    2065
  ],
  "grace_warmaster_shack": [
    1600,
    2050
  ],
  "boss_bell_hunter_warmaster": [
    1600,
    2050
  ],
  "boss_db_limgrave": [
    1605,
    2055
  ],
  "grace_saintsbridge": [
    1570,
    2220
  ],
  "dung_highroad_cave": [
    1600,
    2200
  ],
  "dung_deathtouched_catacombs": [
    1660,
    2160
  ],
  "weap_uchigatana": [
    1660,
    2160
  ],
  "loc_alexander_01_colina": [
    1610,
    2210
  ],
  "grace_summonwater_village": [
    1620,
    2350
  ],
  "boss_tibia_mariner_summonwater": [
    1620,
    2370
  ],
  "loc_d_01_mariner": [
    1620,
    2330
  ],
  "boss_nc_limgrave": [
    1490,
    2100
  ],
  "boss_agheel": [
    1400,
    2180
  ],
  "grace_agheel_lake_north": [
    1450,
    2180
  ],
  "grace_agheel_lake_south": [
    1320,
    2160
  ],
  "dung_limgrave_tunnels": [
    1390,
    2160
  ],
  "grace_seaside_ruins": [
    1310,
    2130
  ],
  "loc_yura_01_ruinas": [
    1310,
    2130
  ],
  "loc_boc_01_arbusto": [
    1450,
    2140
  ],
  "loc_boc_02_costa": [
    1270,
    1920
  ],
  "dung_murkwater_catacombs": [
    1500,
    2220
  ],
  "loc_patches_01_cueva": [
    1440,
    2210
  ],
  "loc_yura_02_nerijus": [
    1430,
    2210
  ],
  "weap_reduvia": [
    1430,
    2210
  ],
  "loc_sellen_01_posta": [
    1380,
    2320
  ],
  "grace_mistwood_outskirts": [
    1460,
    2400
  ],
  "loc_blaidd_01_bosque": [
    1350,
    2520
  ],
  "loc_kenneth_01_repisa": [
    1320,
    2500
  ],
  "tear_third_church": [
    1520,
    2590
  ],
  "grace_third_church_marika": [
    1520,
    2590
  ],
  "loc_kenneth_02_fuerte": [
    1220,
    2630
  ],
  "grace_fort_haight_west": [
    1220,
    2600
  ],
  "seed_fort_haight": [
    1220,
    2610
  ],
  "key_dectus_left": [
    1220,
    2630
  ],
  "boss_darriwil": [
    1220,
    2270
  ],
  "loc_blaidd_02_carcel": [
    1220,
    2270
  ],
  "weap_bloodhound_fang": [
    1220,
    2270
  ],
  "boss_margit": [1660, 1750],
  "grace_margit": [1665, 1755],
  "grace_stormveil_cliffside": [1715, 1690],
  "grace_rampart_tower": [1760, 1715],
  "grace_liftside_chamber": [1770, 1745],
  "grace_secluded_cell": [1805, 1735],
  "boss_godrick": [1815, 1740],
  "loc_nepheli_01_velo": [1775, 1765],
  "loc_nepheli_04_trono": [1835, 1740],
  "loc_kenneth_03_trono": [1835, 1740],
  "loc_rogier_01_castillo": [1755, 1740],
  "loc_rogier_02_cara": [1730, 1735],
  "seed_stormveil_courtyard": [1765, 1760],
  "spell_black_flame": [1755, 1750],
  "divine_tower_limgrave": [1770, 2200],
  "grace_bridge_sacrifice": [
    1120,
    2300
  ],
  "loc_morne_01_irina": [
    1115,
    2300
  ],
  "grace_church_pilgrimage": [
    1100,
    2100
  ],
  "tear_church_pilgrimage": [
    1100,
    2100
  ],
  "grace_fourth_church_marika": [
    990,
    1940
  ],
  "tear_fourth_church": [
    990,
    1940
  ],
  "weap_zweihander": [
    850,
    1940
  ],
  "grace_isolated_merchant_weeping": [
    850,
    1940
  ],
  "loc_sellen_04_cuerpo": [
    930,
    2040
  ],
  "tear_callu_church": [
    970,
    2230
  ],
  "spell_flame_of_frenzy": [
    970,
    2230
  ],
  "grace_castle_morne_rampart": [
    890,
    2230
  ],
  "seed_morne_castle": [
    900,
    2220
  ],
  "grace_morne_lift": [
    800,
    2170
  ],
  "loc_morne_02_edgar": [
    770,
    2150
  ],
  "grace_beside_the_rampart_gaol": [
    750,
    2180
  ],
  "weap_claymore": [
    750,
    2180
  ],
  "boss_leonine": [
    680,
    2130
  ],
  "grace_morne_trench": [
    680,
    2130
  ],
  "loc_morne_03_fantasma": [
    680,
    2130
  ],
  "loc_morne_03_leon": [
    680,
    2130
  ],
  "boss_erdtree_avatar_weeping": [
    910,
    2170
  ],
  "boss_deathbird_weeping": [
    1040,
    2160
  ],
  "boss_db_weeping": [
    920,
    2080
  ],
  "boss_nc_weeping": [
    920,
    2100
  ],
  "dung_tombsward_catacombs": [
    920,
    2080
  ],
  "ash_lhutel": [
    920,
    2080
  ],
  "dung_impaling_catacombs": [
    1020,
    2340
  ],
  "dung_earthbore_cave": [
    1040,
    2170
  ],
  "dung_morne_tunnel": [
    860,
    2160
  ],
  "grace_lake_facing_cliffs": [1920, 1660],
  "loc_hyetta_01_acantilados": [1920, 1660],
  "tear_church_irith": [1950, 1620],
  "grace_church_irith": [
    1950,
    1620
  ],
  "loc_thops_01_irith": [
    1950,
    1620
  ],
  "grace_liurnia_lake_shore": [1980, 1610],
  "dung_stillwater_cave": [
    1960,
    1680
  ],
  "dung_lakeside_crystal_cave": [
    2040,
    1500
  ],
  "grace_slumbering_wolf_shack": [
    2020,
    1480
  ],
  "loc_latenna_01_lobo": [
    2020,
    1480
  ],
  "ash_latenna": [
    2020,
    1480
  ],
  "grace_laskyar_ruins": [2120, 1380],
  "grace_purified_ruins": [
    2130,
    1550
  ],
  "loc_hyetta_02_purificadas": [2130, 1550],
  "grace_scenic_isle": [2200, 1290],
  "loc_patches_02_liurnia": [2200, 1290],
  "loc_rya_01_collar": [2180, 1380],
  "grace_boilprawn_shack": [2320, 1270],
  "loc_boggart_01_gambas": [
    2320,
    1270
  ],
  "grace_rose_church": [2330, 1120],
  "loc_varre_02_iglesia_rosa": [2330, 1120],
  "key_pureblood_medal": [2330, 1120],
  "grace_albinauric_village": [2120, 1040],
  "loc_nepheli_02_aldea": [2120, 1040],
  "loc_albus_01_jarron": [
    2170,
    1075
  ],
  "key_haligtree_secret_right": [2120, 1040],
  "boss_omenkiller_village": [
    2170,
    1070
  ],
  "grace_temple_quarter": [2400, 1180],
  "grace_academy_gate_town": [2450, 1330],
  "loc_diallos_02_lanya": [2450, 1330],
  "seed_academy_gate_town": [2450, 1330],
  "loc_hyetta_03_puente": [2450, 1330],
  "grace_south_raya_gate": [2480, 1240],
  "grace_main_academy_gate": [2700, 1200],
  "loc_yura_03_raya": [2700, 1200],
  "seed_raya_lucaria_bridge": [2700, 1200],
  "grace_church_of_the_cuckoo": [
    2550,
    1190
  ],
  "grace_schoolhouse_classroom": [
    2600,
    1200
  ],
  "grace_debate_parlor": [2600, 1190],
  "boss_red_wolf": [2600, 1190],
  "grace_grand_library": [2600, 1160],
  "boss_rennala": [2600, 1160],
  "loc_sellen_06_biblioteca": [2600, 1160],
  "weap_carian_regal_scepter": [2600, 1160],
  "boss_smarag": [2580, 1080],
  "key_academy_glintstone_key": [2580, 1080],
  "dung_raya_lucaria_crystal_tunnel": [
    2440,
    1580
  ],
  "cueva_cristal_academia": [
    2570,
    1180
  ],
  "dung_cueva_cristal_academia": [
    2570,
    1180
  ],
  "spell_terra_magica": [2570, 1180],
  "grace_carian_study_hall": [2440, 1640],
  "divine_tower_liurnia": [2440, 1850],
  "grace_jarburg": [2430, 1680],
  "loc_diallos_03_jarburg": [2430, 1680],
  "loc_jar_bairn_01_jarburg": [
    2430,
    1680
  ],
  "loc_alexander_04_aceite": [2440, 1640],
  "grace_church_vows": [2700, 1540],
  "boss_bell_hunter_church_vows": [2700, 1540],
  "dung_black_knife_catacombs": [
    2830,
    1670
  ],
  "dung_cliffbottom_catacombs": [
    2140,
    1710
  ],
  "spell_lightning_spear": [
    2250,
    1610
  ],
  "grace_four_belfries": [2770, 1040],
  "grace_road_to_manor": [2970, 1180],
  "loc_iji_01_herrero": [
    2970,
    1180
  ],
  "grace_caria_manor_gate": [3140, 1200],
  "seed_caria_manor": [3160, 1190],
  "weap_sword_of_night_and_flame": [3190, 1210],
  "boss_loretta_caria": [3200, 1200],
  "spell_lorettas_greatbow": [3200, 1200],
  "grace_royal_moongazing_grounds": [
    3200,
    1200
  ],
  "grace_ranni_rise": [3240, 1130],
  "loc_ranni_02_torre": [3240, 1130],
  "loc_blaidd_05_duelo": [3240, 1130],
  "loc_seluvis_01_torre": [3210, 1150],
  "loc_seluvis_02_bodega": [3220, 1160],
  "loc_sellen_05_titere": [3220, 1160],
  "ash_hoarfrost_stomp": [
    3180,
    1310
  ],
  "grace_ravine_veiled_village": [
    3200,
    1430
  ],
  "tear_bellum_church": [2940, 1480],
  "grace_bellum_church": [
    2940,
    1480
  ],
  "loc_hyetta_04_bellum": [2940, 1480],
  "grace_frenzied_flame_village": [
    3030,
    1630
  ],
  "tear_church_inhibition": [3070, 1660],
  "loc_varre_03_sangre": [3070, 1660],
  "loc_vyke_01_invasion": [
    3060,
    1650
  ],
  "grace_altar_south": [
    1990,
    1020
  ],
  "grace_moonlight_altar": [2000, 1070],
  "grace_cathedral_manus_celes": [
    2030,
    1100
  ],
  "loc_ranni_05_manus_celes": [2030, 1100],
  "weap_dark_moon_greatsword": [2030, 1100],
  "boss_adula": [2030, 1100],
  "boss_alecto": [2140, 1020],
  "ash_tiche": [2140, 1020],
  "spell_rannis_dark_moon": [1930, 1070],
  "boss_nc_liurnia_south": [
    2180,
    1600
  ],
  "boss_nc_liurnia_north": [
    2940,
    1480
  ],
  "boss_drb_liurnia": [2400, 1180],
  "spell_cannon_haima": [
    2120,
    1480
  ],
  "spell_flame_of_fell_god": [
    2020,
    1680
  ],
  "loc_morne_04_vengador": [
    2140,
    1260
  ],
  "grace_east_gate_raya": [2640, 1260],
  "grace_grand_lift_dectus": [3280, 1680],
  "loc_rya_02_dectus": [3280, 1680],
  "grace_altus_plateau": [
    3360,
    1860
  ],
  "grace_erdtree_gazing_hill": [3350, 1850],
  "seed_erdtree_gazing_hill": [
    3360,
    1790
  ],
  "loc_boc_02_altus": [
    3360,
    1790
  ],
  "loc_rya_02_altus": [
    3360,
    1790
  ],
  "grace_altus_highway_junction": [3420, 1980],
  "loc_boc_03_leyndell": [3470, 2360],
  "grace_outer_wall_phantom_tree": [3380, 2050],
  "seed_phantom_tree_1": [
    3380,
    2050
  ],
  "seed_phantom_tree_2": [
    3380,
    2055
  ],
  "seed_phantom_tree_double": [
    3380,
    2050
  ],
  "grace_outer_wall_battleground": [3470, 2100],
  "weap_giant_crusher": [
    3440,
    2080
  ],
  "boss_fallingstar_altus": [
    3380,
    2020
  ],
  "boss_tree_sentinel_duo": [3380, 2030],
  "grace_minor_erdtree_altus": [
    3630,
    1860
  ],
  "dung_altus_tunnel": [
    3450,
    1820
  ],
  "dung_old_altus_tunnel": [
    3490,
    1800
  ],
  "dung_perfumers_grotto": [
    3440,
    2020
  ],
  "dung_sages_cave": [
    3470,
    1710
  ],
  "dung_sainted_hero_grave": [
    3350,
    1910
  ],
  "dung_auriza_hero_grave": [
    3520,
    2260
  ],
  "grace_shaded_castle_ramparts": [3720, 1880],
  "boss_elemer": [3740, 1880],
  "loc_millicent_03_shaded": [3720, 1880],
  "weap_marais_executioner_sword": [3740, 1880],
  "grace_windmill_village": [3780, 2140],
  "boss_godskin_apostle_windmill": [3780, 2140],
  "loc_millicent_04_windmill": [3780, 2140],
  "weap_godskin_peeler": [
    3780,
    2030
  ],
  "tear_second_church_marika": [
    3420,
    1830
  ],
  "grace_second_church_marika": [
    3420,
    1830
  ],
  "loc_yura_04_eleonora": [
    3420,
    1830
  ],
  "weap_eleonoras_poleblade": [
    3420,
    1830
  ],
  "weap_nagakiba": [
    3420,
    1830
  ],
  "tear_stormcaller_church": [
    3630,
    2070
  ],
  "grace_draconic_tree_sentinel": [3520, 2300],
  "boss_draconic_sentinel": [3520, 2300],
  "grace_east_capital_rampart": [3440, 2380],
  "grace_avenue_balcony": [3380, 2380],
  "grace_west_capital_rampart": [3360, 2330],
  "grace_lower_capital_church": [
    3330,
    2370
  ],
  "grace_fortified_manor": [3320, 2330],
  "grace_erdtree_sanctuary": [3280, 2440],
  "boss_godfrey_shade": [3280, 2440],
  "grace_queens_bedchamber": [3240, 2460],
  "grace_elden_throne": [3220, 2470],
  "boss_morgott": [3220, 2470],
  "boss_godfrey_real": [3220, 2470],
  "boss_gideon": [
    3230,
    2410
  ],
  "boss_radagon_elden_beast": [
    3180,
    2480
  ],
  "boss_radagon_beast": [
    3180,
    2480
  ],
  "weap_sacred_relic_sword": [
    3180,
    2480
  ],
  "grace_underground_roadside": [
    3300,
    2340
  ],
  "grace_forsaken_depths": [
    3280,
    2360
  ],
  "boss_mohg_omen": [
    3280,
    2360
  ],
  "grace_frenzied_flame_proscription": [
    3270,
    2360
  ],
  "loc_hyetta_05_frenesi": [
    3270,
    2360
  ],
  "loc_hyetta_05_tres_dedos": [
    3270,
    2360
  ],
  "weap_fingerprint_shield": [
    3270,
    2360
  ],
  "loc_dung_01_celda": [
    3300,
    2340
  ],
  "loc_dung_02_foso": [
    3420,
    2280
  ],
  "loc_dung_03_runa": [
    3300,
    2340
  ],
  "divine_tower_west_altus": [3220, 2150],
  "divine_tower_east_altus": [3340, 2640],
  "grace_forbidden_lands": [
    3330,
    2600
  ],
  "boss_black_blade_kindred_rold": [
    3320,
    2650
  ],
  "grace_rold_lift": [
    3320,
    2770
  ],
  "weap_bolt_of_gransax": [
    3300,
    2330
  ],
  "boss_bell_hunter_leyndell": [
    3480,
    2120
  ],
  "loc_corhyn_03_puente": [3480, 1940],
  "loc_corhyn_04_estatua": [3300, 2350],
  "loc_corhyn_05_colina": [
    3360,
    1790
  ],
  "loc_goldmask_01_puente": [
    3440,
    1940
  ],
  "loc_seluvis_03_ambar": [
    3380,
    1950
  ],
  "talisman_erdtree_favor_2": [
    3310,
    2410
  ],
  "talisman_godfrey_icon": [
    3320,
    1880
  ],
  "boss_nc_altus": [
    3300,
    1920
  ],
  "boss_nc_forbidden": [
    3330,
    2600
  ],
  "grace_forest_spanning_bridge": [3480, 1940],
  "grace_bridge_iniquity": [
    3450,
    1630
  ],
  "grace_volcano_manor": [
    3550,
    1380
  ],
  "grace_prison_town_church": [
    3530,
    1360
  ],
  "grace_temple_of_eiglay": [
    3510,
    1350
  ],
  "boss_godskin_noble_volcano": [
    3510,
    1350
  ],
  "grace_audience_pathway": [
    3500,
    1340
  ],
  "boss_rykard": [
    3500,
    1340
  ],
  "grace_rykard_audience": [
    3500,
    1340
  ],
  "loc_tanith_01_mansion": [
    3550,
    1380
  ],
  "loc_tanith_02_devoracion": [
    3500,
    1340
  ],
  "loc_rya_03_mansion": [
    3550,
    1380
  ],
  "loc_rya_04_serpiente": [
    3520,
    1350
  ],
  "loc_bernahl_01_mansion": [
    3550,
    1380
  ],
  "loc_diallos_03_mansion": [
    3550,
    1380
  ],
  "loc_patches_03_mansion": [
    3550,
    1370
  ],
  "weap_blasphemous_blade": [
    3500,
    1340
  ],
  "weap_ghizas_wheel": [
    3550,
    1380
  ],
  "dung_volcano_cave": [
    3660,
    1460
  ],
  "dung_seethewater_cave": [
    3640,
    1540
  ],
  "dung_gelmir_hero_grave": [
    3400,
    1590
  ],
  "boss_magma_wyrm_makar": [
    3350,
    1560
  ],
  "grace_magma_wyrm_makar": [
    3350,
    1560
  ],
  "grace_primeval_sorcerer_azur": [
    3520,
    1470
  ],
  "loc_sellen_02_azur": [
    3520,
    1470
  ],
  "spell_comet_azur": [
    3520,
    1470
  ],
  "grace_ninth_mt_gelmir_campsite": [
    3560,
    1420
  ],
  "boss_fallingstar_beast_gelmir": [
    3560,
    1420
  ],
  "spell_golden_vow": [
    3480,
    1560
  ],
  "grace_smoldering_church": [1770, 2610],
  "grace_rotview_balcony": [1750, 2650],
  "grace_fort_gael_north": [
    1510,
    2710
  ],
  "grace_fort_gael": [
    1480,
    2710
  ],
  "ash_lions_claw": [1480, 2710],
  "spell_flame_grant_me_strength": [1480, 2710],
  "dung_gael_tunnel": [1490, 2740],
  "loc_alexander_02_gael": [1490, 2740],
  "weap_cross_naginata": [1490, 2740],
  "weap_moonveil": [1490, 2740],
  "grace_caelid_highway_south": [1420, 2730],
  "boss_nc_caelid": [1420, 2730],
  "grace_swamp_bank": [
    1570,
    2800
  ],
  "grace_southern_aeonia_bank": [1490, 2910],
  "boss_drb_caelid": [1490, 2910],
  "grace_inner_aeonia": [1630, 2900],
  "grace_heart_of_aeonia": [
    1660,
    2930
  ],
  "boss_commander_oneil": [1630, 2900],
  "key_unalloyed_gold_needle": [
    1660,
    2930
  ],
  "weap_meteorite_staff": [
    1680,
    2970
  ],
  "spell_rock_sling": [
    1680,
    2970
  ],
  "grace_gowry_shack": [1680, 3035],
  "loc_gowry_01_choza": [1680, 3035],
  "loc_millicent_01_choza": [
    1680,
    3030
  ],
  "grace_sellia_under_stair": [1720, 3050],
  "seed_sellia": [1730, 3060],
  "spell_night_comet": [1730, 3050],
  "weap_lusats_staff": [
    1710,
    3090
  ],
  "grace_church_of_the_plague": [1690, 3120],
  "tear_church_plague": [1690, 3120],
  "loc_millicent_02_plaga": [1690, 3120],
  "loc_sellen_03_lusat": [1790, 3160],
  "spell_stars_of_ruin": [1790, 3160],
  "grace_impassable_greatbridge": [1350, 3130],
  "grace_redmane_castle_plaza": [1380, 3250],
  "grace_chamber_outside_plaza": [1380, 3250],
  "loc_blaidd_04_radahn": [1380, 3250],
  "loc_alexander_03_radahn": [1380, 3250],
  "weap_ruins_greatsword": [1380, 3250],
  "boss_radahn": [1460, 3350],
  "grace_starscourge_radahn": [1460, 3350],
  "weap_starscourge_swords": [1460, 3350],
  "dung_war_dead_catacombs": [1460, 3380],
  "grace_dragonbarrow_west": [1940, 2820],
  "boss_bell_hunter_dragonbarrow": [1940, 2820],
  "weap_greatsword_guts": [1740, 2830],
  "seed_dragonbarrow": [1940, 3050],
  "grace_divine_tower_caelid": [2080, 2970],
  "weap_godslayer_greatsword": [2080, 2970],
  "grace_fort_faroth": [1880, 3180],
  "key_dectus_right": [1880, 3180],
  "talisman_radagon_soreseal": [
    1880,
    3180
  ],
  "talisman_radagons_soreseal": [1880, 3180],
  "boss_greyoll": [
    1860,
    3130
  ],
  "spell_greyolls_roar": [1860, 3130],
  "grace_farum_greatbridge": [2150, 3210],
  "boss_greyll": [2150, 3210],
  "grace_bestial_sanctum": [2260, 3250],
  "loc_gurranq_01_santuario": [2260, 3250],
  "boss_black_blade_kindred": [2230, 3230],
  "ash_bloodhound_step": [
    2060,
    3140
  ],
  "boss_nc_dragonbarrow": [
    2060,
    3140
  ],
  "dung_sellia_crystal_tunnel": [1770, 3030],
  "dung_abandoned_cave": [1640, 2850],
  "talisman_golden_scarab": [
    1640,
    2850
  ],
  "dung_caelid_catacombs": [1380, 2800],
  "grace_cathedral_dragon_communion": [
    1330,
    2870
  ],
  "grace_cathedral_dragon_caelid": [1330, 2870],
  "spell_rot_breath": [1330, 2870],
  "boss_ekzykes": [1440, 2900],
  "ash_flame_of_redmanes": [
    1510,
    2760
  ],
  "grace_zamor_ruins": [3400, 2900],
  "grace_ancient_snow_valley": [
    3720,
    3100
  ],
  "loc_corhyn_06_montana": [
    3720,
    3100
  ],
  "loc_goldmask_02_montana": [
    3720,
    3100
  ],
  "loc_millicent_05_montana": [
    3720,
    3100
  ],
  "grace_freezing_lake": [3880, 3350],
  "boss_borealis": [3880, 3350],
  "dung_spiritcaller_cave": [
    3880,
    3330
  ],
  "dung_spiritcallers_cave": [
    3880,
    3330
  ],
  "ash_seppuku": [
    3880,
    3330
  ],
  "boss_drb_mountaintops": [
    3780,
    3350
  ],
  "grace_first_church_marika": [
    3770,
    3440
  ],
  "tear_first_church_marika": [3750, 3450],
  "grace_castle_sol_main_gate": [4070, 3160],
  "grace_castle_sol_gate": [
    4040,
    3160
  ],
  "grace_church_of_the_eclipse": [
    4060,
    3160
  ],
  "grace_castle_sol_rooftop": [
    4070,
    3160
  ],
  "boss_commander_niall": [4070, 3160],
  "weap_eclipse_shotel": [
    4060,
    3160
  ],
  "key_haligtree_secret_left": [4080, 3160],
  "dung_giant_conquering_grave": [
    3530,
    3140
  ],
  "grace_giants_gravepost": [
    3450,
    3410
  ],
  "grace_foot_of_the_forge": [
    3470,
    3440
  ],
  "boss_fire_giant": [3480, 3380],
  "grace_forge_of_the_giants": [3470, 3470],
  "grace_church_of_repose": [
    3490,
    3380
  ],
  "tear_church_repose": [3500, 3380],
  "loc_okina_01_invasion": [
    3490,
    3380
  ],
  "weap_rivers_of_blood": [
    3490,
    3380
  ],
  "dung_giants_mountaintop_catacombs": [
    3460,
    3030
  ],
  "ash_blackflame_monk_amon": [
    3460,
    3030
  ],
  "grace_consecrated_snowfield": [
    3980,
    2780
  ],
  "boss_nc_duo_snowfield": [
    4080,
    2780
  ],
  "grace_ordina": [
    4220,
    2810
  ],
  "boss_drb_snowfield": [
    4250,
    2720
  ],
  "grace_apostate_derelict": [
    4320,
    2730
  ],
  "loc_latenna_02_apostata": [
    4320,
    2730
  ],
  "boss_astel_yelough": [4180, 2690],
  "dung_yelough_anix_tunnel": [
    4050,
    2580
  ],
  "weap_golden_order_greatsword": [
    4080,
    2730
  ],
  "boss_death_rite_snowfield": [
    4250,
    2720
  ],
  "dung_cave_of_the_forlorn": [
    4080,
    2730
  ],
  "grace_haligtree_canopy": [4240, 2950],
  "grace_haligtree_town": [4320, 2930],
  "grace_haligtree_promenade": [4420, 2950],
  "boss_loretta_haligtree": [4420, 2950],
  "grace_prayer_room": [4480, 3010],
  "loc_millicent_06_haligtree": [4480, 3010],
  "grace_elphael_inner_wall": [4530, 3030],
  "talisman_dragoncrest_greatshield": [4550, 3000],
  "grace_drainage_channel": [
    4530,
    2940
  ],
  "loc_millicent_07_hermanas": [
    4530,
    2940
  ],
  "talisman_marikas_soreseal": [4510, 3020],
  "talisman_marika_soreseal": [
    4510,
    2950
  ],
  "grace_haligtree_roots": [4490, 2920],
  "boss_malenia": [4480, 2920],
  "loc_millicent_08_aguja": [
    4480,
    2940
  ],
  "weap_hand_of_malenia": [4480, 2920],
  "grace_crumbling_beast_grave": [2650, 4320],
  "grace_dragon_temple": [2750, 4400],
  "grace_dragon_temple_altar": [
    2770,
    4390
  ],
  "boss_godskin_duo": [
    2770,
    4390
  ],
  "loc_alexander_05_farum": [
    2790,
    4400
  ],
  "talisman_shard_alexander": [
    2790,
    4400
  ],
  "grace_beside_the_great_bridge": [2850, 4450],
  "loc_bernahl_03_invasion": [
    2820,
    4420
  ],
  "boss_maliketh": [2850, 4450],
  "grace_dragonlord_placidusax": [
    2740,
    4410
  ],
  "boss_dragonlord_placidusax": [2750, 4500],
  "boss_placidusax": [
    2740,
    4410
  ],
  "spell_ancient_dragons_lightning": [
    2770,
    4380
  ],
  "isolated_divine_tower": [
    4200,
    3500
  ],
  "loc_nepheli_03_mesa": [750, 550],
  "loc_fia_01_mesa": [760, 540],
  "loc_corhyn_01_mesa": [740, 560],
  "loc_roderika_02_mesa": [755, 545],
  "loc_diallos_01_mesa": [745, 535],
  "loc_rogier_03_muerte": [765, 555],
  "loc_alexander_05_lava": [
    3500,
    1390
  ],
  "loc_alexander_06_farum": [
    2790,
    4400
  ],
  "loc_millicent_01_gowry": [1680, 3035],
  "loc_millicent_03_altus": [
    3360,
    1790
  ],
  "loc_millicent_04_dominula": [
    3770,
    2030
  ],
  "loc_millicent_05_picos": [
    3720,
    3100
  ],
  "loc_millicent_06_elphael": [4480, 3010],
  "loc_millicent_07_drenaje": [4560, 2980],
  "loc_yura_05_shabriri": [
    3420,
    2930
  ],
  "loc_corhyn_02_camino": [
    3380,
    1910
  ],
  "loc_corhyn_05_runa": [
    3190,
    2460
  ],
  "loc_patches_04_sombrio": [3720, 1880],
  "grace_manus_celes": [2030, 1100],
  'boss_tree_sentinels_altus': [3380, 2030],
  'grace_capital_rampart': [3470, 2360],
  'grace_ordina_liturgical_town': [4250, 2820],
  'loc_d_02_hermano': [1640, 2990],
};

let updatedCount = 0;
let unchangedCount = 0;

locations.forEach(loc => {
  if (loc.mapaOrigen && loc.mapaOrigen !== 'surface') {
    return;
  }
  if (EXACT_COORDS[loc.id]) {
    loc.coords = EXACT_COORDS[loc.id];
    updatedCount++;
  } else {
    unchangedCount++;
    console.warn('STILL UNCHANGED:', loc.id, loc.titulo, loc.coords);
  }
});

console.log(`Updated ${updatedCount} surface locations directly from exact table. ${unchangedCount} unchanged.`);

let questStepsUpdated = 0;
questlines.forEach(q => {
  q.pasos.forEach(paso => {
    const directLocId = `loc_${q.id.replace('quest_', '')}_${paso.pasoId}`;
    if (EXACT_COORDS[directLocId]) {
      paso.coords = EXACT_COORDS[directLocId];
      questStepsUpdated++;
    } else {
      const matchedLoc = locations.find(l => 
        (l.questlineId === q.id && l.questlinePasoId === paso.pasoId) ||
        (l.id === paso.ubicacionId)
      );
      if (matchedLoc && matchedLoc.coords) {
        paso.coords = matchedLoc.coords;
        questStepsUpdated++;
      }
    }
  });
});

console.log(`Updated ${questStepsUpdated} quest steps.`);

fs.writeFileSync(locationsPath, JSON.stringify(locations, null, 2), 'utf8');
fs.writeFileSync(questlinesPath, JSON.stringify(questlines, null, 2), 'utf8');
console.log('Successfully saved locations.json and questlines.json!');
