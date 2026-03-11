function _1(md){return(
md`# [DRAFT] 2026 Aotearoa/New Zealand Data Processing`
)}

function _electorate_names(){return(
[
  // General
  "Northland",
  "Whangārei",
  "Kaipara ki Mahurangi",
  "Whangaparāoa",
  "East Coast Bays",
  "Upper Harbour",
  "North Shore",
  "Northcote",
  "Henderson",
  "Glendene",
  "Waitākere",
  "Mt Roskill",
  "Mt Albert",
  "Auckland Central",
  "Epsom",
  "Maungakiekie",
  "Tāmaki",
  "Pakuranga",
  "Botany",
  "Ōtahuhu",
  "Māngere",
  "Manurewa",
  "Takanini",
  "Papakura",
  "Port Waikato",
  "Waikato",
  "Hamilton East",
  "Hamilton West",
  "Coromandel",
  "Tauranga",
  "Mt Maunganui",
  "Rotorua",
  "East Cape",
  "Napier",
  "Taupō",
  "Taranaki-King Country",
  "New Plymouth",
  "Whanganui",
  "Rangitīkei",
  "Tukituki",
  "Wairarapa",
  "Palmerston North",
  "Kapiti",
  "Remutaka",
  "Hutt South",
  "Kenepuru",
  "Wellington North",
  "Wellington Bays",
  "Nelson",
  "Kaikōura",
  "West Coast-Tasman",
  "Waimakariri",
  "Christchurch East",
  "Christchurch Central",
  "Ilam",
  "Wigram",
  "Banks Peninsula",
  "Selwyn",
  "Rangitata",
  "Waitaki",
  "Dunedin",
  "Taieri",
  "Southland",
  "Invercargill",
  
  // Māori
  "Te Tai Tokerau",
  "Tāmaki Makaurau",
  "Hauraki-Waikato",
  "Waiariki",
  "Te Tai Hauāuru",
  "Ikaroa-Rāwhiti",
  "Te Tai Tonga"
]
)}

function _vote_data(electorate_names){return(
electorate_names.sort().reduce((acc, name) => {
  acc[name] = {
    party_votes: null,
    party_vote_lean: null,
    candidate_votes: null
  };
  return acc;
}, {})
)}

function _national_lean(){return(
{
  left_votes: null,
  right_votes: null,
  other_votes: null,
  total: null,
  total_all: null,
  lean: null,
  normalised_lean: null
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("electorate_names")).define("electorate_names", _electorate_names);
  main.variable(observer("vote_data")).define("vote_data", ["electorate_names"], _vote_data);
  main.variable(observer("national_lean")).define("national_lean", _national_lean);
  return main;
}
