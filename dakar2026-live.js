/*
 * dakar2026-live.js — Dakar 2026 Youth Olympic Games live session player.
 * Source: OBS/Olympic Channel Services embed sheet "Dakar 2026 live sessions
 * embed codes.xlsx" (V. Drille, 28 Oct 2026). Used on oceanianoc.org (all sports,
 * 17 Oceania NOCs badged) and fasanoc.org.fj (focus mode, Fiji time).
 *
 * Mount: <div id="dakar-live"></div>. If absent, inserts before the first <footer>.
 * Optional attributes on the mount:
 *   data-focus-sports  comma list of sports to show first, e.g. "Futsal,Boxing"
 *   data-focus-noc     code(s), comma separated; sessions naming one get a badge, e.g. "FIJ"
 *                      With codes but no data-focus-sports, the widget opens on all sports and
 *                      puts sessions naming those teams first (used by ONOC for its 17 NOCs).
 *   data-focus-label   label for the team, e.g. "Team Fiji"
 *   data-title         page heading override
 *   data-tz            IANA zone to show times in, e.g. "Pacific/Fiji" (default: viewer's zone)
 *   data-tz-label      label for that zone, e.g. "Fiji Standard Time"
 * Times use a 12-hour clock. A session can be linked with #s=<slug stem>.
 * Row: [startDakar, endDakar, sport, name, slug stem]; Dakar = GMT.
 */
(function () {
  var SUFFIX = "-dakar-2026-summer-youth-olympic-games";
  var EMBED = "https://olympics.com/static/js/syndicated/v1/embed.js";
  var S = [["2026-10-30T09:55","2026-10-30T14:47","Baseball5","Mixed CUB-TUR and TPE-SEN Opening round","mixed-cub-tur-and-tpe-sen-opening-round-baseball5"],["2026-10-30T14:55","2026-10-30T19:47","Baseball5","Mixed MEX-SYR and FRA-KEN Opening round","mixed-mex-syr-and-fra-ken-opening-round-baseball5"],["2026-10-31T08:25","2026-10-31T16:17","Baseball5","Mixed TPE-TUR, SYR-FRA, MEX-KEN and SEN-CUB Opening round","mixed-tpe-tur-syr-fra-mex-ken-and-sen-cub-opening-round-baseball5"],["2026-10-31T08:25","2026-10-31T17:12","Beach Volleyball","Women's and Men's Pool round 1","women-s-and-men-s-pool-round-1-beach-volleyball"],["2026-10-31T09:55","2026-10-31T15:02","Table Tennis","Mixed Doubles Round of 32 - Session 1","mixed-doubles-round-of-32-session-1-table-tennis"],["2026-10-31T18:25","2026-10-31T22:02","Ceremonies","Opening Ceremony","opening-ceremony"],["2026-11-01T08:25","2026-11-01T18:52","Beach Volleyball","Women's and Men's Pool round 2","women-s-and-men-s-pool-round-2-beach-volleyball"],["2026-11-01T08:55","2026-11-01T14:25","Badminton","Men's and Women's Singles Group play stage - Session 1","men-s-and-women-s-singles-group-play-stage-session-1-badminton"],["2026-11-01T09:25","2026-11-01T14:25","Table Tennis","Women's and Men's Singles Preliminary stage 1","women-s-and-men-s-singles-preliminary-stage-1-table-tennis"],["2026-11-01T09:25","2026-11-01T13:17","Wushu","Men's Changquan, Women's Taijishan","men-s-changquan-women-s-taijishan-wushu"],["2026-11-01T09:55","2026-11-01T15:25","Futsal","Women's CRC-IRI and ITA-CMR Group stage","women-s-crc-iri-and-ita-cmr-group-stage-futsal"],["2026-11-01T09:55","2026-11-01T14:32","Judo","Women's -44kg, Men's -55kg, -66kg Preliminary rounds","women-s-44kg-men-s-55kg-66kg-preliminary-rounds-judo"],["2026-11-01T10:25","2026-11-01T14:55","Baseball5","Mixed KEN-SYR and FRA-MEX Opening round","mixed-ken-syr-and-fra-mex-opening-round-baseball5"],["2026-11-01T10:25","2026-11-01T13:05","Rugby Sevens","Men's Pool round 1","men-s-pool-round-1-rugby-sevens"],["2026-11-01T10:55","2026-11-01T14:55","Swimming","Men's and Women's Heats 1","men-s-and-women-s-heats-1-swimming"],["2026-11-01T13:05","2026-11-01T19:32","Rugby Sevens","Men's Pool round 2","men-s-pool-round-2-rugby-sevens"],["2026-11-01T14:25","2026-11-01T20:57","Badminton","Men's and Women's Singles Group play stage - Session 2","men-s-and-women-s-singles-group-play-stage-session-2-badminton"],["2026-11-01T14:25","2026-11-01T21:32","Table Tennis","Women's and Men's Singles Preliminary stage, Women's Quarterfinals 1","women-s-and-men-s-singles-preliminary-stage-women-s-quarterfinals-1-table-tennis"],["2026-11-01T14:25","2026-11-01T18:17","Wushu","Women's Gunshu, Men's Taijiquan","women-s-gunshu-men-s-taijiquan-wushu"],["2026-11-01T14:55","2026-11-01T19:47","Baseball5","Mixed CUB-TPE and TUR-SEN Opening round","mixed-cub-tpe-and-tur-sen-opening-round-baseball5"],["2026-11-01T14:55","2026-11-01T18:57","Swimming","Women's and Men's Fastest Heat and Finals 1","women-s-and-men-s-fastest-heat-and-finals-1-swimming"],["2026-11-01T15:25","2026-11-01T21:32","Futsal","Women's VEN-UKR and SEN-FIJ Group stage","women-s-ven-ukr-and-sen-fij-group-stage-futsal"],["2026-11-01T15:55","2026-11-01T19:42","Judo","Women's -44kg, Men's -55kg, -66kg Final block","women-s-44kg-men-s-55kg-66kg-final-block-judo"],["2026-11-02T08:55","2026-11-02T14:25","Badminton","Men's and Women's Singles Group play stage - Session 3","men-s-and-women-s-singles-group-play-stage-session-3-badminton"],["2026-11-02T08:55","2026-11-02T12:55","Beach Volleyball","Women's and Men's Lucky Loser round","women-s-and-men-s-lucky-loser-round-beach-volleyball"],["2026-11-02T09:25","2026-11-02T13:17","Wushu","Men's Gunshu, Women's Taijiquan","men-s-gunshu-women-s-taijiquan-wushu"],["2026-11-02T09:55","2026-11-02T15:25","Futsal","Men's SOL-PAR and POR-MAR Group stage","men-s-sol-par-and-por-mar-group-stage-futsal"],["2026-11-02T09:55","2026-11-02T14:32","Judo","Women's -52kg, -63kg, Men's -81kg Preliminary rounds","women-s-52kg-63-kg-men-s-81kg-preliminary-rounds-judo"],["2026-11-02T09:55","2026-11-02T14:22","Table Tennis","Women's and Men's Singles Preliminary stage 2","women-s-and-men-s-singles-preliminary-stage-2-table-tennis"],["2026-11-02T10:25","2026-11-02T14:55","Baseball5","Mixed Quarterfinal 1","mixed-quarterfinal-1-baseball5"],["2026-11-02T10:55","2026-11-02T14:55","Swimming","Men's and Women's Heats 2","men-s-and-women-s-heats-2-swimming"],["2026-11-02T11:25","2026-11-02T19:57","Rugby Sevens","Women's Pool round, Men's placing 5-8, Semifinals, Finals","women-s-pool-round-men-s-placing-5-8-semifinals-finals-rugby-sevens"],["2026-11-02T12:55","2026-11-02T19:02","Beach Volleyball","Women's and Men's Round of 16","women-s-and-men-s-round-of-16-beach-volleyball"],["2026-11-02T14:25","2026-11-02T20:57","Badminton","Men's and Women's Singles Group play stage - Session 4","men-s-and-women-s-singles-group-play-stage-session-4-badminton"],["2026-11-02T14:25","2026-11-02T20:32","Table Tennis","Women's and Men's Singles Preliminary stage, Mixed Doubles Semifinals 2","women-s-and-men-s-singles-preliminary-stage-mixed-doubles-semifinals-2-table-tennis"],["2026-11-02T14:25","2026-11-02T18:17","Wushu","Women's Changquan, Men's Taijishan","women-s-changquan-men-s-taijishan-wushu"],["2026-11-02T14:55","2026-11-02T19:47","Baseball5","Mixed Quarterfinal 2","mixed-quarterfinal-2-baseball5"],["2026-11-02T14:55","2026-11-02T18:12","Swimming","Women's and Men's Finals 2","women-s-and-men-s-finals-2-swimming"],["2026-11-02T15:25","2026-11-02T21:32","Futsal","Men's PAN-AFG and SEN-ARG Group stage","men-s-pan-afg-and-sen-arg-group-stage-futsal"],["2026-11-02T15:55","2026-11-02T19:42","Judo","Women's -52kg, -63kg, Men's -81kg Final block","women-s-52kg-63-kg-men-s-81kg-final-block-judo"],["2026-11-03T08:55","2026-11-03T14:25","Badminton","Men's and Women's Singles Group play stage - Session 6","men-s-and-women-s-singles-group-play-stage-session-6-badminton"],["2026-11-03T08:55","2026-11-03T19:02","Beach Volleyball","Women's and Men's Quarterfinals and Semifinals","women-s-and-men-s-quarterfinals-and-semifinals-beach-volleyball"],["2026-11-03T08:55","2026-11-03T12:32","Equestrian","Jumping Individual, Qualifier Round A","jumping-individual-qualifier-round-a-equestrian"],["2026-11-03T08:55","2026-11-03T13:22","Wushu","Men's Changquan, Women's Gunshu, Men's Taijiquan, Women's Taijishan","men-s-changquan-women-s-gunshu-men-s-taijiquan-women-s-taijishan-wushu"],["2026-11-03T09:35","2026-11-03T13:00","Rugby Sevens","Women's Pool round","women-s-pool-round-rugby-sevens"],["2026-11-03T09:55","2026-11-03T15:25","Futsal","Women's ITA-CRC and IRI-CMR Group stage","women-s-ita-crc-and-irn-cmr-group-stage-futsal"],["2026-11-03T09:55","2026-11-03T14:02","Judo","Women's -78kg, Men's -100kg Preliminary rounds","women-s-78kg-men-s-100kg-preliminary-rounds-judo"],["2026-11-03T09:55","2026-11-03T14:10","Table Tennis","Women's and Men's Singles Round of 16","women-s-and-men-s-singles-round-of-16-table-tennis"],["2026-11-03T10:25","2026-11-03T14:55","Baseball5","Mixed Placement games","mixed-placement-games-baseball5"],["2026-11-03T10:55","2026-11-03T14:55","Swimming","Men's and Women's Heats 3","men-s-and-women-s-heats-3-swimming"],["2026-11-03T13:00","2026-11-03T19:57","Rugby Sevens","Women's placing 5-8, Semifinals, Finals","women-s-placing-5-8-semifinals-finals-rugby-sevens"],["2026-11-03T14:10","2026-11-03T21:12","Table Tennis","Women's and Men's Singles Round of 16, Mixed Doubles Finals","women-s-and-men-s-singles-round-of-16-mixed-doubles-finals-table-tennis"],["2026-11-03T14:25","2026-11-03T20:57","Badminton","Men's and Women's Singles Group play stage - Session 7","men-s-and-women-s-singles-group-play-stage-session-7-badminton"],["2026-11-03T14:25","2026-11-03T19:52","Wushu","Men's Gunshu, Women's Changquan, Men's Taijishan, Women's Taijiquan","men-s-gunshu-women-s-changquan-men-s-taijishan-women-s-taijiquan-wushu"],["2026-11-03T14:55","2026-11-03T20:07","Baseball5","Mixed Bronze and Gold Medal games","mixed-bronze-and-gold-medal-games-baseball5"],["2026-11-03T14:55","2026-11-03T18:57","Swimming","Women's and Men's Fastest Heat and Finals 3","women-s-and-men-s-fastest-heat-and-finals-3-swimming"],["2026-11-03T15:25","2026-11-03T21:32","Futsal","Women's UKR-FIJ and SEN-VEN Group stage","women-s-ukr-fij-and-sen-ven-group-stage-futsal"],["2026-11-03T15:55","2026-11-03T19:17","Judo","Women's -78kg, Men's -100kg Final block","women-s-78kg-men-s-100kg-final-block-judo"],["2026-11-04T08:55","2026-11-04T14:25","Badminton","Men's and Women's Singles Quarterfinal 1","men-s-and-women-s-singles-quarterfinal-1-badminton"],["2026-11-04T09:55","2026-11-04T15:25","Futsal","Men's POR-SOL and PAR-MAR Group stage","men-s-por-sol-and-par-mar-group-stage-futsal"],["2026-11-04T09:55","2026-11-04T14:55","Table Tennis","Men's and Women's Singles Quarterfinals 1","men-s-and-women-s-singles-quarterfinals-1-table-tennis"],["2026-11-04T10:55","2026-11-04T18:22","Beach Volleyball","Women's and Men's Bronze Finals-Break-Gold Finals","women-s-and-men-s-bronze-finals-break-gold-finals-beach-volleyball"],["2026-11-04T10:55","2026-11-04T14:55","Swimming","Men's and Women's Heats 4","men-s-and-women-s-heats-4-swimming"],["2026-11-04T12:40","2026-11-04T15:55","Skateboarding","Men's Street Preliminary Heats 1 and 2","men-s-street-preliminary-heats-1-and-2-skateboarding"],["2026-11-04T14:25","2026-11-04T20:47","Badminton","Men's and Women's Singles Quarterfinal 2","men-s-and-women-s-singles-quarterfinal-2-badminton"],["2026-11-04T14:55","2026-11-04T18:52","Swimming","Women's and Men's Finals 4","women-s-and-men-s-finals-4-swimming"],["2026-11-04T14:55","2026-11-04T20:02","Table Tennis","Men's and Women's Singles Quarterfinals 2","men-s-and-women-s-singles-quarterfinals-2-table-tennis"],["2026-11-04T15:25","2026-11-04T21:32","Futsal","Men's AFG-ARG and SEN-PAN Group stage","men-s-afg-arg-and-sen-pan-group-stage-futsal"],["2026-11-04T15:55","2026-11-04T19:02","Skateboarding","Men's Street Final","men-s-street-final-skateboarding"],["2026-11-05T08:55","2026-11-05T13:02","Equestrian","Jumping Individual, Qualifier Round B","jumping-individual-qualifier-round-b-equestrian"],["2026-11-05T09:55","2026-11-05T15:25","Futsal","Women's IRI-ITA and CMR-CRC Group stage","women-s-iri-ita-and-cmr-crc-group-stage-futsal"],["2026-11-05T09:55","2026-11-05T15:02","Table Tennis","Women's and Men's Singles Semifinals","women-s-and-men-s-singles-semifinals-table-tennis"],["2026-11-05T10:55","2026-11-05T14:55","Swimming","Men's and Women's Heats 5","men-s-and-women-s-heats-5-swimming"],["2026-11-05T12:40","2026-11-05T15:55","Skateboarding","Women's Street Preliminary Heats 1 and 2","women-s-street-preliminary-heats-1-and-2-skateboarding"],["2026-11-05T13:55","2026-11-05T21:02","Badminton","Men's and Women's Singles Finals","men-s-and-women-s-singles-finals-badminton"],["2026-11-05T14:55","2026-11-05T18:12","Swimming","Men's and Women's Finals 5","men-s-and-women-s-finals-5-swimming"],["2026-11-05T15:25","2026-11-05T21:32","Futsal","Women's FIJ-VEN and UKR-SEN Group stage","women-s-fij-ven-and-ukr-sen-group-stage-futsal"],["2026-11-05T15:55","2026-11-05T19:02","Skateboarding","Women's Street Final","women-s-street-final-skateboarding"],["2026-11-05T15:55","2026-11-05T21:22","Table Tennis","Women's and Men's Singles Finals","women-s-and-men-s-singles-finals-table-tennis"],["2026-11-06T08:55","2026-11-06T14:02","Equestrian","Jumping Individual, Final","jumping-individual-final-equestrian"],["2026-11-06T09:55","2026-11-06T14:42","3x3 Basketball","Women's and Men's Pool round - Session 1","women-s-and-men-s-pool-round-session-1-3x3-basketball"],["2026-11-06T10:55","2026-11-06T15:02","Swimming","Men's and Women's Heats 6","men-s-and-women-s-heats-6-swimming"],["2026-11-06T14:55","2026-11-06T19:42","3x3 Basketball","Women's and Men's Pool round - Session 2","women-s-and-men-s-pool-round-session-2-3x3-basketball"],["2026-11-06T15:25","2026-11-06T19:32","Swimming","Women's and Men's Finals 6","women-s-and-men-s-finals-6-swimming"],["2026-11-07T08:55","2026-11-07T13:55","Archery","Women's and Men's Elimination rounds 1","women-s-and-men-s-elimination-rounds-1-archery"],["2026-11-07T09:55","2026-11-07T14:42","3x3 Basketball","Women's and Men's Pool round - Session 3","women-s-and-men-s-pool-round-session-3-3x3-basketball"],["2026-11-07T09:55","2026-11-07T13:55","Artistic Gymnastics","Men's Qualification Session 1","men-s-qualification-session-1-artistic-gymnastics"],["2026-11-07T09:55","2026-11-07T15:25","Futsal","Men's PAR-POR and MAR-SOL Group stage","men-s-par-por-and-mar-sol-group-stage-futsal"],["2026-11-07T10:25","2026-11-07T14:32","Beach Wrestling","Women's 55kg, 75kg & Men's 60kg, 80kg Group stage rounds","women-s-55kg-75kg-men-s-60kg-80kg-group-stage-rounds-beach-wrestling"],["2026-11-07T11:55","2026-11-07T16:32","Boxing","Women's and Men's Preliminaries - Session 1","women-s-and-men-s-preliminaries-session-1-boxing"],["2026-11-07T13:55","2026-11-07T19:47","Archery","Women's and Men's Elimination rounds 2","women-s-and-men-s-elimination-rounds-2-archery"],["2026-11-07T13:55","2026-11-07T18:32","Artistic Gymnastics","Men's Qualification Session 2","men-s-qualification-session-2-artistic-gymnastics"],["2026-11-07T14:55","2026-11-07T19:42","3x3 Basketball","Women's and Men's Pool round - Session 4","women-s-and-men-s-pool-round-session-4-3x3-basketball"],["2026-11-07T14:55","2026-11-07T19:57","Beach Wrestling","Women's 55kg, 75kg & Men's 60kg, 80kg Group stage rounds and Finals","women-s-55kg-75kg-men-s-60kg-80kg-group-stage-rounds-and-finals-beach-wrestling"],["2026-11-07T15:25","2026-11-07T21:32","Futsal","Men's ARG-PAN and AFG-SEN Group stage","men-s-arg-pan-and-afg-sen-group-stage-futsal"],["2026-11-07T16:55","2026-11-07T21:32","Boxing","Women's and Men's Preliminaries - Session 2","women-s-and-men-s-preliminaries-session-2-boxing"],["2026-11-08T08:55","2026-11-08T15:27","Cycling Road","Women's and Men's Cycling Road","women-s-and-men-s-cycling-road-cycling-road"],["2026-11-08T08:55","2026-11-08T13:55","Fencing","Women's Foil Ind. Pool round, Table of 16, Table of 8","women-s-foil-ind-pool-round-table-of-16-table-of-8-fencing"],["2026-11-08T09:55","2026-11-08T13:55","Archery","Elimination rounds","elimination-rounds-archery"],["2026-11-08T09:55","2026-11-08T15:10","Artistic Gymnastics","Women's Qualification Session 1","women-s-qualification-session-1-artistic-gymnastics"],["2026-11-08T10:25","2026-11-08T14:32","Beach Wrestling","Women's 45kg, 65kg & Men's 70kg, 90kg Group stage rounds","women-s-45kg-65kg-men-s-70kg-90kg-group-stage-rounds-beach-wrestling"],["2026-11-08T10:55","2026-11-08T14:55","Futsal","Women's 1B-2A Semifinals","women-s-1b-2a-semifinals-futsal"],["2026-11-08T10:55","2026-11-08T15:27","Taekwondo","Women's -44kg, Men's -48kg Elimination round of 16, Quarter-Finals","women-s-44kg-men-s-48kg-elimination-round-of-16-quarter-finals-taekwondo"],["2026-11-08T11:25","2026-11-08T14:55","3x3 Basketball","Women's and Men's Quarterfinals 1","women-s-and-men-s-quarterfinals-1-3x3-basketball"],["2026-11-08T11:55","2026-11-08T16:32","Boxing","Women's and Men's Preliminaries - Session 3","women-s-and-men-s-preliminaries-session-3-boxing"],["2026-11-08T13:55","2026-11-08T18:12","Archery","Men's Quarterfinals, Semifinals and Finals","men-s-quarterfinals-semifinals-and-finals-archery"],["2026-11-08T13:55","2026-11-08T18:02","Fencing","Women's Foil Ind. Semifinals and Finals","women-s-foil-ind-semifinals-and-finals-fencing"],["2026-11-08T14:25","2026-11-08T19:57","Athletics","Men's and Women's Finals and Semifinals - Session 1","men-s-and-women-s-finals-and-semifinals-session-1-athletics"],["2026-11-08T14:55","2026-11-08T18:42","3x3 Basketball","Women's and Men's Quarterfinals 2","women-s-and-men-s-quarterfinals-2-3x3-basketball"],["2026-11-08T14:55","2026-11-08T19:57","Beach Wrestling","Women's 45kg, 65kg & Men's 70kg, 90kg Group stage rounds and Finals","women-s-45kg-65kg-men-s-70kg-90kg-group-stage-rounds-and-finals-beach-wrestling"],["2026-11-08T14:55","2026-11-08T19:32","Futsal","Women's 1A-2B Semifinals","women-s-1a-2b-semifinals-futsal"],["2026-11-08T15:10","2026-11-08T19:02","Artistic Gymnastics","Women's Qualification Session 2","women-s-qualification-session-2-artistic-gymnastics"],["2026-11-08T15:55","2026-11-08T19:47","Taekwondo","Women's -44kg, Men's -48kg Semifinals and Finals","women-s-44kg-men-s-48kg-semifinals-and-finals-taekwondo"],["2026-11-08T16:55","2026-11-08T21:32","Boxing","Women's and Men's Preliminaries - Session 4","women-s-and-men-s-preliminaries-session-4-boxing"],["2026-11-09T08:55","2026-11-09T13:55","Fencing","Men's Foil Ind. Pool round, Table of 16, Table of 8","men-s-foil-ind-pool-round-table-of-16-table-of-8-fencing"],["2026-11-09T09:25","2026-11-09T14:52","Beach Handball","Women's and Men's Preliminary round - Session 1","women-s-and-men-s-preliminary-round-session-1-beach-handball"],["2026-11-09T09:55","2026-11-09T13:55","Archery","Women's Elimination rounds","women-s-elimination-rounds-archery"],["2026-11-09T09:55","2026-11-09T16:37","Athletics","Men's and Women's Finals and Semifinals - Session 2","men-s-and-women-s-finals-and-semifinals-session-2-athletics"],["2026-11-09T10:25","2026-11-09T12:42","Artistic Gymnastics","Men's Team Final","men-s-team-final-artistic-gymnastics"],["2026-11-09T10:55","2026-11-09T14:55","Futsal","Men's 1B-2A Semifinals","men-s-1b-2a-semifinals-futsal"],["2026-11-09T10:55","2026-11-09T15:27","Taekwondo","Women's -49kg, Men's -55kg Elimination round of 16, Quarter-Finals","women-s-49kg-men-s-55kg-elimination-round-of-16-quarter-finals-taekwondo"],["2026-11-09T11:25","2026-11-09T14:55","3x3 Basketball","Women's and Men's Semifinals","women-s-and-men-s-semifinals-3x3-basketball"],["2026-11-09T11:55","2026-11-09T16:02","Boxing","Men's Quarterfinal 1","men-s-quarterfinal-1-boxing"],["2026-11-09T13:55","2026-11-09T18:12","Archery","Women's Quarterfinals, Semifinals and Finals","women-s-quarterfinals-semifinals-and-finals-archery"],["2026-11-09T13:55","2026-11-09T18:02","Fencing","Men's Foil Ind. Semifinals and Finals","men-s-foil-ind-semifinals-and-finals-fencing"],["2026-11-09T14:55","2026-11-09T19:07","3x3 Basketball","Women's and Men's Finals","women-s-and-men-s-finals-3x3-basketball"],["2026-11-09T14:55","2026-11-09T19:32","Beach Handball","Women's and Men's Preliminary round - Session 2","women-s-and-men-s-preliminary-round-session-2-beach-handball"],["2026-11-09T14:55","2026-11-09T19:32","Futsal","Men's 1A-2B Semifinals","men-s-1a-2b-semifinals-futsal"],["2026-11-09T15:55","2026-11-09T19:47","Taekwondo","Women's -49kg, Men's -55kg Semifinals and Finals","women-s-49kg-men-s-55kg-semifinals-and-finals-taekwondo"],["2026-11-09T16:55","2026-11-09T20:37","Artistic Gymnastics","Women's Team Final","women-s-team-final-artistic-gymnastics"],["2026-11-09T16:55","2026-11-09T21:02","Boxing","Women's Quarterfinal 1","women-s-quarterfinal-1-boxing"],["2026-11-10T08:55","2026-11-10T13:55","Fencing","Women's Epee Ind. Pool round, Table of 16, Table of 8","women-s-epee-ind-pool-round-table-of-16-table-of-8-fencing"],["2026-11-10T09:25","2026-11-10T13:55","Archery","Mixed Team Elimination rounds","mixed-team-elimination-rounds-archery"],["2026-11-10T09:55","2026-11-10T16:17","Athletics","Men's and Women's Finals and Semifinals - Session 3","men-s-and-women-s-finals-and-semifinals-session-3-athletics"],["2026-11-10T09:55","2026-11-10T15:22","Beach Handball","Men's and Women's Preliminary round - Session 3","men-s-and-women-s-preliminary-round-session-3-beach-handball"],["2026-11-10T10:55","2026-11-10T15:55","Taekwondo","Women's -55kg, Women's -63kg, Men's -63kg Elimination round of 16, Quarterfinals","women-s-55kg-women-s-63kg-men-s-63kg-elimination-round-of-16-quarterfinals-taekwondo"],["2026-11-10T11:25","2026-11-10T16:02","Artistic Gymnastics","Men's All Around Final","men-s-all-around-final-artistic-gymnastics"],["2026-11-10T11:55","2026-11-10T16:55","Boxing","Men's Quarterfinal 2","men-s-quarterfinal-2-boxing"],["2026-11-10T13:55","2026-11-10T19:12","Archery","Mixed Team Quarterfinals, Semifinals and Finals","mixed-team-quarterfinals-semifinals-and-finals-archery"],["2026-11-10T13:55","2026-11-10T18:02","Fencing","Women's Epee Ind. Semifinals and Finals","women-s-epee-ind-semifinals-and-finals-fencing"],["2026-11-10T15:55","2026-11-10T20:37","Taekwondo","Women's -55kg, Women's -63kg, Men's -63kg Semifinals and Finals","women-s-55kg-women-s-63kg-men-s-63kg-semifinals-and-finals-taekwondo"],["2026-11-10T16:10","2026-11-10T20:47","Artistic Gymnastics","Women's All Around Final","women-s-all-around-final-artistic-gymnastics"],["2026-11-10T16:55","2026-11-10T22:02","Boxing","Women's Quarterfinal 2","women-s-quarterfinal-2-boxing"],["2026-11-11T08:55","2026-11-11T13:55","Fencing","Men's Epee Ind. Pool round, Table of 16, Table of 8","men-s-epee-ind-pool-round-table-of-16-table-of-8-fencing"],["2026-11-11T09:55","2026-11-11T14:32","Beach Handball","Women's and Men's Quarterfinals","women-s-and-men-s-quarterfinals-beach-handball"],["2026-11-11T10:55","2026-11-11T14:25","Futsal","Women's Bronze medal Final","women-s-bronze-medal-final-futsal"],["2026-11-11T10:55","2026-11-11T15:55","Taekwondo","Women's +63kg, Men's -73kg, Men's +73kg Elimination round of 16, Quarterfinals","women-s-63kg-men-s-73kg-men-s-73kg-elimination-round-of-16-quarterfinals-taekwondo"],["2026-11-11T11:55","2026-11-11T16:32","Boxing","Women's and Men's Semifinal 1","women-s-and-men-s-semifinal-1-boxing"],["2026-11-11T13:55","2026-11-11T18:02","Fencing","Men's Epee Ind. Semifinals and Finals","men-s-epee-ind-semifinals-and-finals-fencing"],["2026-11-11T14:25","2026-11-11T19:02","Futsal","Women's Gold medal Final","women-s-gold-medal-final-futsal"],["2026-11-11T15:25","2026-11-11T19:12","Beach Handball","Women's and Men's Placement matches 5-8","women-s-and-men-s-placement-matches-5-8-beach-handball"],["2026-11-11T15:55","2026-11-11T20:37","Taekwondo","Women's +63kg, Men's -73kg, Men's +73kg Finals","women-s-63kg-men-s-73kg-men-s-73kg-finals-taekwondo"],["2026-11-11T16:55","2026-11-11T21:02","Artistic Gymnastics","Mixed Team Final","mixed-team-final-artistic-gymnastics"],["2026-11-11T16:55","2026-11-11T21:32","Boxing","Women's and Men's Semifinal 2","women-s-and-men-s-semifinal-2-boxing"],["2026-11-12T09:55","2026-11-12T15:22","Beach Handball","Women's and Men's Semifinals","women-s-and-men-s-semifinals-beach-handball"],["2026-11-12T10:25","2026-11-12T13:55","Fencing","Women's Sabre Ind. Pool round, Table of 16, Table of 8 (Red piste)","women-s-sabre-ind-pool-round-table-of-16-table-of-8-red-piste-fencing"],["2026-11-12T10:55","2026-11-12T14:55","Breaking","B-Girls Pre-Selection and Round Robin","b-girls-pre-selection-and-round-robin-breaking"],["2026-11-12T10:55","2026-11-12T14:25","Futsal","Men's Bronze medal Final","men-s-bronze-medal-final-futsal"],["2026-11-12T10:55","2026-11-12T14:55","Taekwondo","Mixed Team Quarterfinals","mixed-team-quarterfinals-taekwondo"],["2026-11-12T11:55","2026-11-12T16:07","Boxing","Women's and Men's Final 1","women-s-and-men-s-final-1-boxing"],["2026-11-12T13:55","2026-11-12T17:57","Fencing","Women's Sabre Ind. Semifinals and Finals","women-s-sabre-ind-semifinals-and-finals-fencing"],["2026-11-12T14:25","2026-11-12T19:02","Futsal","Men's Gold medal Final","men-s-gold-medal-final-futsal"],["2026-11-12T14:55","2026-11-12T19:32","Breaking","B-Boys Pre-Selection and Round Robin","b-boys-pre-selection-and-round-robin-breaking"],["2026-11-12T14:55","2026-11-12T19:32","Taekwondo","Mixed Team Semi-Finals, Repechage and Finals","mixed-team-semi-finals-repechage-and-finals-taekwondo"],["2026-11-12T15:25","2026-11-12T19:12","Beach Handball","Women's and Men's Placement matches 5-6 and 7-8","women-s-and-men-s-placement-matches-5-6-and-7-8-beach-handball"],["2026-11-12T16:55","2026-11-12T21:07","Boxing","Women's and Men's Final 2","women-s-and-men-s-final-2-boxing"],["2026-11-13T08:55","2026-11-13T14:47","Fencing","Men's Sabre Ind. Pool round, Table of 16, Table of 8, Semifinals and Finals","men-s-sabre-ind-pool-round-table-of-16-table-of-8-semifinals-and-finals-fencing"],["2026-11-13T09:25","2026-11-13T15:57","Beach Handball","Women's and Men's Finals","women-s-and-men-s-finals-beach-handball"],["2026-11-13T09:55","2026-11-13T14:37","Breaking","B-Girls/B-Boys Quarterfinals, Semifinals and Finals","b-girls-b-boys-quarterfinals-semifinals-and-finals-breaking"],["2026-11-13T17:55","2026-11-13T20:32","Ceremonies","Closing Ceremony","closing-ceremony"]];
  function t(s) { return new Date(s + ":00Z").getTime(); }
  var rows = S.map(function (r, i) { return { i: i, a: t(r[0]), b: t(r[1]), sport: r[2], name: r[3], stem: r[4], slug: r[4] + SUFFIX }; });

  var css = ".dk{--dk-ink:#001E3C;--dk-acc:#0095DA;--dk-line:#D5E8F0;--dk-mist:#EDF5F9;--dk-red:#C8102E;font:inherit;color:var(--dk-ink);max-width:1100px;margin:40px auto;padding:0 16px;box-sizing:border-box}" +
    ".dk *{box-sizing:border-box}.dk h2{margin:0 0 6px;font-size:1.9rem;line-height:1.15}.dk .dk-sub{margin:0 0 20px;opacity:.75}" +
    ".dk .dk-stage{background:#000;aspect-ratio:16/9;width:100%;position:relative;border-radius:6px;overflow:hidden;scroll-margin-top:110px}" +
    ".dk .dk-stage iframe{position:absolute;inset:0;width:100%!important;height:100%!important;border:0}" +
    ".dk .dk-now{display:flex;gap:10px 14px;align-items:center;flex-wrap:wrap;margin:14px 0 20px;padding:16px 20px;background:var(--dk-mist);border-radius:6px}" +
    ".dk .dk-now strong{font-size:1.1rem}.dk .dk-when{opacity:.8}" +
    ".dk .dk-badge{display:inline-block;line-height:1.2;font-size:.72rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:6px 10px;border-radius:3px;background:#fff;color:var(--dk-ink);white-space:nowrap;border:1px solid var(--dk-line)}" +
    ".dk .dk-badge.is-live{background:var(--dk-red);border-color:var(--dk-red);color:#fff}.dk .dk-badge.is-team{background:var(--dk-acc);border-color:var(--dk-acc);color:#fff}" +
    ".dk .dk-next{margin:0 0 28px}.dk .dk-next h3,.dk .dk-label{margin:0 0 10px;font-size:.8rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;opacity:.7}" +
    ".dk .dk-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:12px}" +
    ".dk .dk-card{font:inherit;text-align:left;color:var(--dk-ink);background:#fff;border:1px solid var(--dk-line);border-radius:6px;padding:14px 16px;cursor:pointer;display:flex;flex-direction:column;gap:6px;line-height:1.35}" +
    ".dk .dk-card:hover,.dk .dk-card:focus-visible{border-color:var(--dk-acc);outline:none}.dk .dk-card .dk-sport{margin:0}" +
    ".dk .dk-card .dk-in{font-size:.85rem;font-weight:700;color:var(--dk-acc)}" +
    ".dk .dk-mode{display:inline-flex;border:1px solid var(--dk-line);border-radius:999px;padding:4px;margin-bottom:16px}" +
    ".dk .dk-mode button{font:inherit;font-size:.95rem;line-height:1.2;border:0;background:none;color:var(--dk-ink);padding:10px 18px;border-radius:999px;cursor:pointer}" +
    ".dk .dk-mode button[aria-pressed=true]{background:var(--dk-ink);color:#fff}" +
    ".dk .dk-chips,.dk .dk-days{display:flex;gap:8px;overflow-x:auto;padding:2px 2px 10px;margin-bottom:12px;scrollbar-width:thin}" +
    ".dk .dk-chip,.dk .dk-day{font:inherit;font-size:.88rem;line-height:1.2;white-space:nowrap;border:1px solid var(--dk-line);background:#fff;color:var(--dk-ink);padding:10px 16px;border-radius:999px;cursor:pointer;flex:0 0 auto}" +
    ".dk .dk-chip[aria-pressed=true],.dk .dk-day[aria-pressed=true]{background:var(--dk-ink);border-color:var(--dk-ink);color:#fff}" +
    ".dk .dk-chip small{opacity:.65;margin-left:4px}.dk .dk-day.is-today:not([aria-pressed=true]){border-color:var(--dk-acc);color:var(--dk-acc);font-weight:700}" +
    ".dk .dk-list{list-style:none;margin:0;padding:0;border-top:1px solid var(--dk-line)}" +
    ".dk .dk-item{display:grid;grid-template-columns:170px 1fr auto;gap:16px;align-items:center;margin:0;padding:16px 18px;border-bottom:1px solid var(--dk-line);cursor:pointer}" +
    ".dk .dk-item:hover,.dk .dk-item:focus-visible{background:var(--dk-mist);outline:none}.dk .dk-item.is-on{background:var(--dk-mist);box-shadow:inset 4px 0 0 var(--dk-acc)}" +
    ".dk .dk-item.is-team{background:#E3F2FC;box-shadow:inset 6px 0 0 var(--dk-acc)}.dk .dk-item.is-team:hover,.dk .dk-item.is-team:focus-visible{background:#D2EAFA}.dk .dk-item.is-team.is-on{background:#C9E5F8}" +
    ".dk .dk-item.is-team .dk-name,.dk .dk-card.is-team .dk-name,.dk .dk-now.is-team strong{font-weight:700}" +
    ".dk .dk-team{display:inline-block;font-size:.75rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#0068A8;margin-left:8px}" +
    ".dk .dk-card.is-team{background:#E3F2FC;border-color:var(--dk-acc);box-shadow:inset 6px 0 0 var(--dk-acc);padding-left:22px}" +
    ".dk .dk-now.is-team{background:#D2EAFA;box-shadow:inset 6px 0 0 var(--dk-acc);padding-left:26px}" +
    ".dk .dk-item.is-done{opacity:.6}.dk .dk-tags{display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end;align-items:center}" +
    ".dk .dk-btn{font:inherit;font-size:.85rem;font-weight:700;line-height:1.2;padding:9px 14px;border-radius:4px;border:1px solid var(--dk-ink);background:var(--dk-ink);color:#fff;white-space:nowrap;cursor:pointer}" +
    ".dk .dk-btn.is-ghost{background:#fff;color:var(--dk-ink)}.dk .dk-btn.is-live{background:var(--dk-red);border-color:var(--dk-red)}" +
    ".dk .dk-time{font-variant-numeric:tabular-nums;font-size:.92rem;line-height:1.35}.dk .dk-sport{display:inline-block;margin-bottom:4px;font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;opacity:.7}" +
    ".dk .dk-empty{padding:18px;opacity:.7}.dk .dk-note{font-size:.82rem;opacity:.7;margin-top:14px}" +
    "@media (max-width:640px){.dk h2{font-size:1.5rem}.dk .dk-item{grid-template-columns:1fr;gap:8px;padding:14px}.dk .dk-tags{justify-content:flex-start}.dk .dk-now{padding:14px}.dk .dk-mode{display:flex}.dk .dk-mode button{flex:1}}";

  var tz, tzLabel; try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) {}
  function fmt(ms, o) { try { return new Intl.DateTimeFormat("en-GB", Object.assign({ timeZone: tz }, o)).format(ms); } catch (e) { return new Date(ms).toString(); } }
  function hm(ms) { return fmt(ms, { hour: "numeric", minute: "2-digit", hour12: true }).replace(/\s?(am|pm)$/i, function (m) { return " " + m.trim().toLowerCase(); }); }
  function dayKey(ms) { return fmt(ms, { year: "numeric", month: "2-digit", day: "2-digit" }).split("/").reverse().join("-"); }
  function dayLabel(ms) { return fmt(ms, { weekday: "short", day: "numeric", month: "short" }); }
  function span(r) { var s = hm(r.a) + " to " + hm(r.b); if (dayKey(r.b) !== dayKey(r.a)) s += " (" + fmt(r.b, { weekday: "short" }) + ")"; return s; }
  function until(ms, now) {
    var m = Math.round((ms - now) / 60000); if (m < 1) return "Starting now";
    var d = Math.floor(m / 1440), h = Math.floor((m % 1440) / 60), mm = m % 60;
    return ("Starts in " + (d ? d + "d " : "") + (h ? h + "h " : "") + (d ? "" : mm + "m")).trim();
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function status(r, now) { return now >= r.a && now < r.b ? "live" : now < r.a ? "next" : "done"; }

  function init() {
    var root = document.getElementById("dakar-live");
    if (!root) {
      root = document.createElement("div"); root.id = "dakar-live";
      var f = document.querySelector("footer");
      f ? f.parentNode.insertBefore(root, f) : document.body.appendChild(root);
    }
    var focusSports = (root.getAttribute("data-focus-sports") || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean);
    var nocs = (root.getAttribute("data-focus-noc") || "").toUpperCase().split(",").map(function (s) { return s.trim(); }).filter(Boolean);
    var teamLabel = root.getAttribute("data-focus-label") || nocs.join(", ");
    var nocOnly = nocs.length > 0 && !focusSports.length;
    var title = root.getAttribute("data-title") || "Dakar 2026 Youth Olympic Games: Watch Live";
    var fixedTz = root.getAttribute("data-tz");
    if (fixedTz) { try { new Intl.DateTimeFormat("en-GB", { timeZone: fixedTz }); tz = fixedTz; tzLabel = root.getAttribute("data-tz-label") || fixedTz; } catch (e) {} }
    rows.forEach(function (r) {
      r.nocs = nocs.filter(function (c) { return new RegExp("(^|[^A-Z])" + c + "([^A-Z]|$)").test(r.name); });
      r.team = r.nocs.length > 0;
      r.focus = nocOnly ? r.team : focusSports.indexOf(r.sport) >= 0;
    });
    var hasFocus = rows.some(function (r) { return r.focus; });
    var missing = focusSports.filter(function (s) { return !rows.some(function (r) { return r.sport === s; }); });
    var mode = hasFocus && !nocOnly ? "focus" : "all", sport = "", day = null, current = null, n = 0;
    var who = hasFocus ? teamLabel : "the Games";

    var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
    root.className += " dk";
    root.innerHTML =
      '<h2>' + esc(title) + '</h2>' +
      '<p class="dk-sub">Live coverage from Olympic Broadcasting Services, 31 October to 13 November 2026. ' +
      (tzLabel ? "All times are " + esc(tzLabel) + "." : "Times are shown in your local time" + (tz ? " (" + esc(tz) + ")" : "") + ".") +
      ' Tap any session to watch it.</p>' +
      '<div class="dk-stage" id="dkStage"></div>' +
      '<div class="dk-now" id="dkNow" aria-live="polite"></div>' +
      '<div class="dk-next" id="dkNext"></div>' +
      '<div class="dk-label">Schedule</div>' +
      (hasFocus ? '<div class="dk-mode" role="group" aria-label="Which sessions to show"><button type="button" data-m="focus">' + esc(teamLabel) + (nocOnly ? ' matches' : ' sports') + '</button><button type="button" data-m="all">All sports</button></div>' : '') +
      '<div class="dk-chips" id="dkChips" role="group" aria-label="Sport"></div>' +
      '<div class="dk-days" id="dkDays" role="group" aria-label="Day"></div>' +
      '<ul class="dk-list" id="dkList"></ul>' +
      (nocOnly ? '<p class="dk-note">Only team matches name countries in the Olympic Broadcasting Services schedule. ' + esc(teamLabel) + ' athletes also compete in sessions across all sports that are not tagged by country.</p>' : '') +
      (hasFocus && missing.length ? '<p class="dk-note">No live stream is listed for ' + esc(missing.join(", ")) + ' in the Olympic Broadcasting Services schedule.</p>' : '') +
      '<p class="dk-note">Video by Olympic Broadcasting Services via Olympics.com. Sessions play here when they go live; replays depend on the rights holder.</p>';

    var q = function (s) { return root.querySelector(s); };
    var stage = q("#dkStage"), nowEl = q("#dkNow"), nextEl = q("#dkNext"), modeEl = q(".dk-mode"), chips = q("#dkChips"), daysEl = q("#dkDays"), list = q("#dkList");

    var ready = new Promise(function (res) {
      if (window.OLYMPIC_CHANNEL) return res();
      var s = document.createElement("script"); s.src = EMBED; s.onload = res; s.onerror = res; document.head.appendChild(s);
    });

    function teamName(r) { return nocs.length > 1 ? r.nocs.join(" / ") : teamLabel; }
    function teamTag(r) { return r.team ? '<span class="dk-team">' + esc(teamName(r)) + '</span>' : ''; }
    function teamBadge() { return ''; }
    function play(r, scroll) {
      current = r;
      var id = "ocplayer_dk" + (++n);
      stage.innerHTML = '<div id="' + id + '"></div>';
      ready.then(function () {
        try { new window.OLYMPIC_CHANNEL.Syndicated(r.slug, { dimensions: [950, 534], id: id }); }
        catch (e) { stage.innerHTML = '<p style="color:#fff;padding:20px">Player unavailable. <a style="color:#fff" href="https://www.olympics.com/en/dakar-2026/videos/' + r.slug + '" target="_blank" rel="noopener">Watch on Olympics.com</a></p>'; }
      });
      try { history.replaceState(null, "", "#s=" + r.stem); } catch (e) {}
      day = dayKey(r.a);
      if (sport && sport !== r.sport) sport = "";
      if (mode === "focus" && !r.focus) mode = "all";
      renderNow(); renderNext(); refresh();
      if (scroll && stage.scrollIntoView) stage.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    function renderNow() {
      if (!current) return;
      var now = Date.now(), s = status(current, now);
      nowEl.className = "dk-now" + (current.team ? " is-team" : "");
      nowEl.innerHTML = (current.team ? '<span class="dk-team" style="margin:0">' + esc(teamName(current)) + '</span>' : '') + '<span class="dk-badge' + (s === "live" ? " is-live" : "") + '">' + (s === "live" ? "Live now" : s === "next" ? "Up next" : "Ended") + '</span>' + teamBadge(current) +
        '<strong>' + esc(current.sport) + ': ' + esc(current.name) + '</strong>' +
        '<span class="dk-when">' + esc(dayLabel(current.a)) + ', ' + span(current) + (s === "next" ? ' · ' + until(current.a, now) : '') + '</span>';
    }
    function renderNext() {
      var now = Date.now();
      var up = rows.filter(function (r) { return r.b > now && r !== current; }).sort(function (x, y) { return x.a - y.a || (y.team - x.team); });
      var pool = hasFocus ? up.filter(function (r) { return r.focus; }) : up;
      if (nocOnly) pool = pool.concat(up.filter(function (r) { return !r.focus; }));
      pool = pool.slice(0, 4);
      nextEl.innerHTML = pool.length ? '<h3>Coming up for ' + esc(who) + '</h3><div class="dk-cards">' + pool.map(function (r) {
        var s = status(r, now);
        return '<button type="button" class="dk-card' + (r.team ? ' is-team' : '') + '" data-i="' + r.i + '"><span class="dk-in">' + (s === "live" ? "Live now" : until(r.a, now)) + '</span>' +
          '<span><span class="dk-sport">' + esc(r.sport) + '</span>' + teamTag(r) + '</span><span class="dk-name">' + esc(r.name) + '</span><span class="dk-when">' + esc(dayLabel(r.a)) + ', ' + hm(r.a) + '</span></button>';
      }).join("") + '</div>' : '';
    }
    function pool() { return rows.filter(function (r) { return mode === "all" || r.focus; }); }
    function filtered() { return pool().filter(function (r) { return !sport || r.sport === sport; }); }
    function renderChips() {
      var counts = {}; pool().forEach(function (r) { counts[r.sport] = (counts[r.sport] || 0) + 1; });
      var sp = Object.keys(counts).sort();
      if (sp.indexOf(sport) < 0) sport = "";
      chips.innerHTML = '<button type="button" class="dk-chip" data-s="" aria-pressed="' + !sport + '">All</button>' +
        sp.map(function (s) { return '<button type="button" class="dk-chip" data-s="' + esc(s) + '" aria-pressed="' + (s === sport) + '">' + esc(s) + '<small>' + counts[s] + '</small></button>'; }).join("");
      if (modeEl) [].forEach.call(modeEl.querySelectorAll("button"), function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-m") === mode); });
    }
    function renderDays() {
      var keys = [], labels = {}, today = dayKey(Date.now()), tomorrow = dayKey(Date.now() + 864e5);
      filtered().forEach(function (r) { var k = dayKey(r.a); if (keys.indexOf(k) < 0) { keys.push(k); labels[k] = dayLabel(r.a); } });
      keys.sort();
      if (keys.indexOf(day) < 0) day = keys.indexOf(today) >= 0 ? today : (keys.filter(function (k) { return k >= today; })[0] || keys[keys.length - 1]);
      daysEl.innerHTML = keys.map(function (k) {
        var l = k === today ? "Today" : k === tomorrow ? "Tomorrow" : labels[k];
        return '<button type="button" class="dk-day' + (k === today ? " is-today" : "") + '" data-k="' + k + '" aria-pressed="' + (k === day) + '">' + esc(l) + '</button>';
      }).join("");
      var on = daysEl.querySelector("[aria-pressed=true]");
      if (on) daysEl.scrollLeft = Math.max(0, on.offsetLeft - daysEl.offsetLeft - 40);
    }
    function renderList() {
      var now = Date.now(), items = filtered().filter(function (r) { return dayKey(r.a) === day; }).sort(function (x, y) { return x.a - y.a; });
      list.innerHTML = items.length ? items.map(function (r) {
        var s = status(r, now), on = current === r;
        var btn = on ? '<span class="dk-badge">Now playing</span>' :
          '<span class="dk-btn' + (s === "live" ? " is-live" : s === "done" ? " is-ghost" : "") + '">' + (s === "live" ? "Watch live" : s === "next" ? "Watch" : "Replay") + '</span>';
        return '<li class="dk-item' + (r.team ? " is-team" : "") + (on ? " is-on" : "") + (s === "done" && !on ? " is-done" : "") + '" tabindex="0" role="button" aria-label="' + esc(r.sport + ", " + r.name + ", " + span(r)) + '" data-i="' + r.i + '">' +
          '<span class="dk-time">' + span(r) + '</span>' +
          '<span><span class="dk-sport">' + esc(r.sport) + '</span>' + teamTag(r) + '<br><span class="dk-name">' + esc(r.name) + '</span></span>' +
          '<span class="dk-tags">' + teamBadge(r) + btn + '</span></li>';
      }).join("") : '<li class="dk-empty">No sessions on this day for this selection.</li>';
    }
    function refresh() { renderChips(); renderDays(); renderList(); }

    if (modeEl) modeEl.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) { mode = b.getAttribute("data-m"); sport = ""; refresh(); } });
    chips.addEventListener("click", function (e) { var b = e.target.closest(".dk-chip"); if (b) { sport = b.getAttribute("data-s"); day = null; refresh(); } });
    daysEl.addEventListener("click", function (e) { var b = e.target.closest(".dk-day"); if (b) { day = b.getAttribute("data-k"); renderDays(); renderList(); } });
    function pick(e) { var el = e.target.closest("[data-i]"); if (el) play(rows[+el.getAttribute("data-i")], true); }
    list.addEventListener("click", pick); nextEl.addEventListener("click", pick);
    list.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(e); } });

    var now = Date.now();
    function first(f) { return rows.filter(f).sort(function (x, y) { return x.a - y.a || (y.team - x.team); })[0]; }
    var m = /[#&]s=([a-z0-9-]+)/.exec(location.hash || "");
    var start = (m && rows.filter(function (r) { return r.stem === m[1]; })[0]) ||
                first(function (r) { return r.team && status(r, now) === "live"; }) ||
                (nocOnly ? first(function (r) { return status(r, now) === "live"; }) : null) ||
                first(function (r) { return r.focus && status(r, now) === "live"; }) ||
                first(function (r) { return r.focus && r.a > now; }) ||
                first(function (r) { return status(r, now) === "live"; }) ||
                first(function (r) { return r.a > now; }) || rows[rows.length - 1];
    play(start, false);
    setInterval(function () { renderNow(); renderNext(); renderList(); }, 60000);
  }
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", init) : init();
})();
