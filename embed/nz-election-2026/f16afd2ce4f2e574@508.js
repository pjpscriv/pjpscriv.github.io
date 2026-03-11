import define1 from "./c05b7b08bc1bf956@45.js";

function _1(md){return(
md`# 2023 NZ Election Data Processing`
)}

function _2(md){return(
md`This is a notebook to do data pre-processing for this [Aotearoa/New Zealand Electorate Hexamap](https://observablehq.com/@pjpscriv/nz-electorate-hexmap) data viz, using the results of the 2023 NZ General Election.`
)}

function _3(toc){return(
toc({ selector: "h2, h3", heading: "" })
)}

function _4(md){return(
md`## Fetching the Raw Data

Ideally this notebook would be able to pull the results CSV files directly from the Electoratal Commission election results website with something like this:`
)}

function _data(){return(
fetch("https://www.electionresults.govt.nz/electionresults_2023/statistics/csv/votes-for-registered-parties-by-electorate.csv").then((response) => response)
)}

function _6(md){return(
md`Unfortunately as you can see, this doesn't work 💔. It looks like \`electionresults.govt.nz\` blocks these types of requests as a protective measure. The workaround is to go to the website, manually download the necessary files, and upload them here to Observable. 

<details >
  <summary>ℹ️ <i>Note on automatically pulling data</i></summary>
  <p style="background: #eeeefc; border-radius: 8px; padding-left: 8px;">
  It might be possible to programatically pull from \`electionresults.govt.nz\` but it would involve setting up and running a script locally on a server or personal machine, and at moment the it feels like manually downloading the data works fine.
  </p>
</details>


See the paperclip 📎 icon to the right for a full list of files attached to this notebook (Top of page > **...** > **View** > **📎 Show files** in the mobile view).`
)}

function _7(md){return(
md`### Party Vote Data

The raw party vote data used is the **4.1 Votes for Registered Parties by Electorate** data - https://www.electionresults.govt.nz/electionresults_2023/statistics/votes-for-registered-parties-by-electorate.html. 

This can be downloaded as a CSV [here](https://www.electionresults.govt.nz/electionresults_2023/statistics/csv/votes-for-registered-parties-by-electorate.csv). The CSV has been uploaded manually to the notebook below:`
)}

function _party_vote_data_raw(FileAttachment){return(
FileAttachment("votes-for-registered-parties-by-electorate.csv").csv({array: true})
)}

function _9(md){return(
md`Here is a table view of this data. It isn't quite in the best shape to work with: the first header row causes issues, and it contains some aggregate rows to get rid of ("General Electorate Totals", etc) - so it needs to be processed a bit before it can be used.`
)}

function _10(__query,party_vote_data_raw,invalidation){return(
__query(party_vote_data_raw,{from:{table:"party_vote_data_raw"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation,"party_vote_data_raw")
)}

function _11(md){return(
md`### Candidate Vote Data

The candidate vote data used is the **Candidate Votes** data from the **6.1 Votes Recorded at each Voting Place** dataset: https://www.electionresults.govt.nz/electionresults_2023/statistics/votes-by-voting-place-electorate-index.html.

Instead of being a single file, this is <u>72 seperate files</u> that have to be individually uploaded. 

For example, for **Auckland Central** you can view the data in the browser [here](https://www.electionresults.govt.nz/electionresults_2023/statistics/candidate-votes-by-voting-place-1.html), and the data can be downloaded from [here](https://www.electionresults.govt.nz/electionresults_2023/statistics/csv/candidate-votes-by-voting-place-1.csv) as a file called \`candidate-votes-by-voting-place-1.csv\`. We only need the last section of data from this file - "Electorate Candidate Valid Votes".

Manually downloading 72 files is a bit annoying, so this is a script to run in the Chrome Dev Tools [Snippets panel](https://developer.chrome.com/docs/devtools/javascript/snippets) on the [parent page](https://www.electionresults.govt.nz/electionresults_2023/statistics/votes-by-voting-place-electorate-index.html) to download them at one-per-second _(including a commented out break line for testing)_:

\`\`\`javascript
let count = 0;
const csvLinks = document.querySelectorAll('td:nth-child(3) a[href*=csv]')
for (let link of csvLinks) {
    console.log(link)
    link.click()
    await new Promise(resolve => setTimeout(resolve, 1000))
    // if (count++ > 4) break
}
\`\`\`

Once these files have been downloaded, they can be manually uploaded to this notebook. Below, they have been together into a single cell:`
)}

function _candidate_vote_data_raw(FileAttachment){return(
Promise.all([
  FileAttachment("candidate-votes-by-voting-place-1.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-2.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-3.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-4.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-5.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-6.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-7.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-8.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-9.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-10.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-11.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-12.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-13.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-14.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-15.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-16.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-17.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-18.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-19.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-20.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-21.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-22.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-23.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-24.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-25.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-26.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-27.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-28.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-29.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-30.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-31.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-32.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-33.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-34.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-35.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-36.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-37.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-38.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-39.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-40.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-41.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-42.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-43.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-44.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-45.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-46.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-47.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-48.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-49.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-50.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-51.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-52.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-53.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-54.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-55.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-56.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-57.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-58.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-59.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-60.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-61.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-62.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-63.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-64.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-65.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-66.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-67.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-68.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-69.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-70.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-71.csv").csv({array: true}),
	FileAttachment("candidate-votes-by-voting-place-72.csv").csv({array: true})
])
)}

function _13(md){return(
md`Trying to view this aggregated data candidate data as a table actually causes performance issues in this notebook😅, so I won't do that here - suffice it to say that in its raw form it isn't in a good shape to work with (the biggest issue being it contains a bunch of unnecessary data) and so it needs to be processed as well.`
)}

function _14(md){return(
md`## Processing the Data

### Party Votes

Below is the code used to process the party vote data, this creates a JSON object in a good shape to be used for the visualisation.

Because it's a nested JSON it's no longer viewable as a table, but if you click on the little triangle <span style="font-size: 1.2em; line-height: 1em;">▸</span> in the cell below you'll be able to expand the JSON and get a feel for its shape.`
)}

function _party_vote_data(party_vote_data_raw){return(
party_vote_data_raw.slice(2).reduce((acc, row) => {
  const region = row[0]

  // Skip aggregate rows
  if (region.includes("Totals")) return acc

  // Get all party votes for an electorate
  const partyNames = party_vote_data_raw[1]
  const item = []
  for (let i = 1; i < row.length - 3; i++) {
    const party = partyNames[i]
    const votes = parseInt(row[i])
    item.push({ party, votes })
  }
  
  // Get the informal votes
  item.push({ party: "Informal Votes", votes: parseInt(row[row.length-2]) })
  item.sort((a, b) => b.votes - a.votes)

  acc[region] = item
  return acc
}, {})
)}

function _16(md){return(
md`### Candidate Votes

The candidate vote data processing is a bit more involved, but is also has similarities to the party vote processing. 

The code below processes the data for a single electorate, discarding irrelvant data, reading relevant data, and parsing candidates names into a slightly nicer format.`
)}

function _parseElectorate(formatName){return(
function parseElectorate(data) {
  // Get electorate name
  const name_parts = data[1][0].split(" ")
  const name = name_parts.slice(0, name_parts.length-1).join(" ")
  
  // Extract only the last chunk of data 
  // (start from the end and work backwards until the first empty line)
  let index = 0
  for (let i = data.length-1; i > 0;  i--) {
    if (data[i].length === 1) {
      index = i
      break
    }
  }
  const candidates = data.slice(index + 2)

  // Get all candidate votes for an electorate
  const item = []
  for (let candidate of candidates) {
    const full_name = candidate[0]
    const party = candidate[1]
    const votes = parseInt(candidate[2])
    const percentage = parseFloat(candidate[3])
    const name = formatName(full_name)
    item.push({ party, name, full_name, votes, percentage })
  }

  // Get informal votes
  const totals_row = data[index - 3]
  item.push({ party: "Informal Votes", name: "Informal Votes", full_name: "N/A", votes: parseInt(totals_row[totals_row.length-1]) })
  item.sort((a, b) => b.votes - a.votes)
  
  return { electorate: name, candidate_votes: item }
}
)}

function _formatName(){return(
function formatName(full_name) {
  const name_parts = full_name.split(", ")
  let surname = name_parts[0]
  surname = surname[0] + surname.slice(1).toLowerCase()

  // Surname ' ', ',', '-'
  for (let delim of [' ', ',', '-', "'"]) {
    surname = surname.split(delim).map(w => w[0].toUpperCase() + w.slice(1)).join(delim)
  }
  
  const first_name = name_parts[1].split(" ")[0]
  const new_name = first_name + " " + surname
  return new_name
}
)}

function _19(md){return(
md`With this code written, we then simply iterate through the raw candidate vote data and apply this code to each row.

The output JSON is below. Again, you can click on the little triangle <span style="font-size: 1.2em; line-height: 1em;">▸</span> in the cell below to expand the JSON and see the shape of the data.`
)}

function _candidate_vote_data(candidate_vote_data_raw,parseElectorate){return(
candidate_vote_data_raw.reduce((acc, d) => {
  const parsed = parseElectorate(d)
  acc[parsed.electorate] = parsed.candidate_votes
  return acc
}, {})
)}

function _21(tex,md){return(
md`### Party Vote Leans

The code below is the calculation for the left / right lean of party votes.

The calculation takes the votes for Labour, Greens, Te Pati Māori ("left votes") and votes for National, ACT, NZ First ("right votes") and returns a "lean" value in 2 forms:
- \`lean\` - over a range from **-1** (100% left) to **1** (100% right)
- \`normalised_lean\` - over a range from **0** (100% left) to **1** (100% right)

The calculation for \`lean\` is:

${tex.block`lean = \frac{rightvotes - leftvotes}{rightvotes + leftvotes}`}

 ⚠️The calculation above ignores any votes not for these 6 main parties. It would be good to figure out a way to calculate lean that can include votes for other parties in the "lean" numbers.

The code below also calculates a "relative to national lean" value if the calculation is for an electorate. 

This relative lean value is given on a **-1** _(electorate voted 100% more left than nation)_ to **1** _(electorate voted 100% more right than the national level)_ range.

The calculation for this relative lean is:

${tex.block`relative\_lean = normalised\_lean_{electorate} - normalised\_lean_{national} `}`
)}

function _getPartyVoteLeanData(){return(
function getPartyVoteLeanData(parties, national_data = null) {
  const left_parties = ["Labour Party", "Green Party", "Te Pāti Māori"]
  const right_parties = ["National Party", "ACT New Zealand", "New Zealand First Party"]

  // Count the votes
  const left_votes = parties.reduce((arr, p) => left_parties.includes(p.party) ? arr + p.votes : arr, 0)
  const right_votes = parties.reduce((arr, p) => right_parties.includes(p.party) ? arr + p.votes : arr, 0)
  const total = left_votes + right_votes
  const total_all = parties.reduce((arr, p) => arr + p.votes, 0)
  const other_votes = total_all - total

  // Get the difference
  const diff = right_votes - left_votes
  const lean = diff / total
  const normalised_lean = (total + diff) / (2 * total)

  // Get lean incl. ignored votes
  const left_perc = left_votes / total_all
  const right_perc = right_votes / total_all
  const other_perc = other_votes / total_all

  const result = { left_votes, right_votes, other_votes, total, total_all, lean, normalised_lean }

  // Do relative-to-nation lean
  if (!!national_data) {
    result.relative_lean = normalised_lean - national_data.normalised_lean
  }
  
  return result
}
)}

function _23(md){return(
md`First of all we apply these calculations at a national level, so we can then calculate the "relative to national level" lean for each electorate.`
)}

function _national_lean(party_vote_data,getPartyVoteLeanData)
{
  // Aggregate national votes
  const agg_party_vote_map = Object.values(party_vote_data).reduce((acc, region) => {
    for (let p of region) {
      acc[p.party] = Object.keys(acc).includes(p.party) ? acc[p.party] + p.votes : p.votes
    }
    return acc
  }, {})
  const agg_party_votes = Object.entries(agg_party_vote_map).map(([k, v]) => ({ party: k, votes: v }))

  // Calculate national lean
  return getPartyVoteLeanData(agg_party_votes)
}


function _25(md){return(
md`The cell below applies this calculation to the party vote data of each electorate. Again, click on the little triangle ▸ in the cell below to see the shape of the resulting JSON data.`
)}

function _electorate_lean_data(party_vote_data,getPartyVoteLeanData,national_lean)
{
  // Calculate per-electorate lean
  const electorate_leans = Object.keys(party_vote_data).reduce((acc, key) => {
    const party_votes = party_vote_data[key]
    acc[key] = getPartyVoteLeanData(party_votes, national_lean)
    return acc
  }, {})

  return electorate_leans
}


function _27(md){return(
md`## Putting it all together

This final step just puts the three types of data together into a single object so it's easy to import into another notebook with:

\`\`\`javascript
import {vote_data} from "@pjpscriv/2023-nz-election-data"
\`\`\``
)}

function _vote_data(party_vote_data,candidate_vote_data,electorate_lean_data){return(
Object.keys(party_vote_data).reduce((acc, key) => {
  const party_votes = party_vote_data[key]
  const candidate_votes = candidate_vote_data[key]
  const party_vote_lean = electorate_lean_data[key]
  acc[key] = { party_votes, party_vote_lean, candidate_votes }
  return acc
}, {})
)}

function _29(md){return(
md`Also: _Importing notebooks may also want to import_ \`national_lean\` - _this can be done straightforwardly with:_

\`\`\`javascript
import {national_lean} from "@pjpscriv/2023-nz-election-data"
\`\`\``
)}

function _30(md){return(
md`###### Imports`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["votes-for-registered-parties-by-electorate.csv", {url: new URL("./files/b761ba9842aaac741d0dee2f05c7bdcb9f81ee12e89f6a954b6203df2b1615fe1a106dfcd512c1e45024a994597d5fd84e78457a0eb24efb5cbc05cd25976869.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-1.csv", {url: new URL("./files/a9dc44819fa77264465444ee0d4dbe53d0d45a3cf507fd21cfadcaea821205d4435c264465a97bce0c575cf1e498600ed712b1189fca3ea5473b164e6d91ddf3.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-65.csv", {url: new URL("./files/617cd5e3de5ea308c0acb39a650d1f89e6c91e03d3b38504c3d7e4813c96b7a54aec474d97660702f7e8855b6b14650acc969ae4eef99863891c6eb13729ca1d.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-36.csv", {url: new URL("./files/0dd073eb933571ddc26b595abba81473bf1782f0354818e79be3bb8544176202b422ccccc3f5b6a4dd50a9ec631ecd0ad5f37b15cebf0995b71b4af8180b8ebf.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-25.csv", {url: new URL("./files/c6b75bd929c04de89d05a3ad0a7b8f63f13efb6dc03e04d622a99d790b3a7c5428ef98575efcb7d7a9deba092ad9c047ae8bdaabd2bd0a1cb7190d8879dd84ef.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-35.csv", {url: new URL("./files/a274426d35d0936c57ac1d58ddc2cbb22fdfd23eb2b3ad0f3b6527d3fbc2a2969ceea5fffd6234af0d9b36814ac28fe780c0bba2d739cccf038adfc70bc5e5aa.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-26.csv", {url: new URL("./files/f9c96b78e590496a2e5b0ee5b83394e02b0040fc8ec0ff8ccf246d5c3fee9c9c6711eb697f61bc85a62e80f334040c41139dbb846aa52b474592ac7d189e392c.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-33.csv", {url: new URL("./files/f2f7247280a5efa436c47730ca5c99953e68203d27859f922d0dc9dece70cf46bebeaa8aa178e3c25cb619b4e685445619ae9803e3588f6ec44b84b76a84bf14.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-22.csv", {url: new URL("./files/a4e5c9f5924ad892566010e8a1e56e27023c91b57ef5fc97b765f68ee3ebde83dffd000082486b2a2c0833ee1a0d7f289cff6a36f0e12ac612a2a61977daf7a1.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-37.csv", {url: new URL("./files/9ad5f0ecc49932e5ddd17e75ca9bf2aecadc492f424c882edaf2fe001cea4d35a4daddd168320abb254850a838841c966a419e9031a88e0f3b22222173a3c20d.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-28.csv", {url: new URL("./files/98894fb899228631d525b64eef6a7c6b2a6cadad3a3d92c0532b19fa3ffbd4a7212a8af89a945225cbf5b5f9ac27744e9fe9999782296ed1a2db7ee50f9791db.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-30.csv", {url: new URL("./files/d74fe8fbffcef94c1a4f22c84e03c344f65b5dbe7a032b44ffa35bd214ee5099dd416dc00417f0cd616b7ab1303539a1b277c5e01a18f8f5860963c58f9606d4.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-2.csv", {url: new URL("./files/bf8a24b7edd8af54fe15c640d6e14d0931b1fe158fca444c7b00ca8ce4cc647d93464fc12b52239db02f69ce1683e3f14eadd12e17c86645ea98a76bfa09a633.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-27.csv", {url: new URL("./files/e6ae8dfa5f9a76aadd8657cf9e7578de24bbd2cff7a7a1f9ffe09fc8aee4e7333d6483e8162a70fbea3787721d3198be815d4111a5965f60e5faedd9517bdad4.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-23.csv", {url: new URL("./files/f57710c7b4b43d1fc7a9691c1ac88b8810db35c1f04fb4d5834df926d85b4fc734a05c795f71b9941b4f78d6fbe3d1009dbf339745cc6038de034abd68c21e0a.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-16.csv", {url: new URL("./files/ef7c929c97cb12db8975421501a571bddfaaab63c51312b9bfaca86ae535d0f01d25c9bab29233d05f2c7c1616025356692575abf0a2269d0f2c90d114c19db7.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-38.csv", {url: new URL("./files/3b807d6936c05d5b9c5d95d9fb429931ed530116f089ab285ab81d484dea2124ddea9de700c9b95a3200876dc2f56ebbbacdde1c42602916508914e55ae4f1cc.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-24.csv", {url: new URL("./files/ea3e7acff7ff553bc1fd957e5e26634cb33cfb894ce394d3275041139f010ebf71a79197572506922aaf735566f0ab6bcf8a1facbca57e3e44835a775fd10a43.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-58.csv", {url: new URL("./files/3aeb2b62ff2bb2fe870736ce90429f5b75cd824f99239f19aeb4302f8d0e54d95664d798a68b312f7450aa2b54c39fb6356616e0fb0f54fea28d53eacedcf1bd.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-29.csv", {url: new URL("./files/845769f2c59afd76a5f965d50c4ddd764f5b1ad55c444e2d715c6b282a8341b9c356cb12642f2cc3214da148d1f410c2c31006122f901ef9ec53590041ad3cd3.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-62.csv", {url: new URL("./files/11e504338a8a1065c33ac78d2abbe80bb5526d27478b30b4dea57b209a4434691c8e2e0003548d61f69179a84b4b25e86d58b67ba737bb9bd22df9952fd9f427.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-32.csv", {url: new URL("./files/831d5892dae831738b1638b509027309b0edb53d924e5e3ce412bc38dc779d1af98d076dd978f6cadd8ff8ec493d9dae0c2bfce6dfa395d8ed527d6ef1c8ec7a.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-3.csv", {url: new URL("./files/aca576689ff261e519a3e442979825a38a192ccf0dadd4989b735be231172a1c61ea985255f6351b158c9de82c49466ac053eaf980b9958675522a82e9eef0bf.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-54.csv", {url: new URL("./files/1bbe4310460e78ea79cc07a7a0006860a3b5484d1c39f2cbf5fffb48454b2690e2e478b7956579139e4f56a9cc9e3c08079082a7cc23bb288c302d606da79b6b.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-6.csv", {url: new URL("./files/68be7053529015afb5f72469a2fb9d31872ab242b7d79765b12e421b9af25e1b384f6afb0765074e639dff5a8631784e20a59b5d1a4604486125f8bbdf97ca20.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-5.csv", {url: new URL("./files/8a3b685d16af4cc3307cf55122e9dab6edd8f141dffcd82f21bd23f0fe40277ec27824685dede3550d2f0108219547281c5663c3e14affe20c3c6acc375c61a0.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-31.csv", {url: new URL("./files/e0a68edc468a06c4e2b9e10f5cb568a17c46c404d188607a5bb36a9e8be3d619466c7ecbf8a8b598a9b356cc13d6f888ca52e4f4b77911f2cda4c9a0f4c36d8c.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-47.csv", {url: new URL("./files/45b015c74e8e251514f99c58dc329a11aaee307d625067602a1883e7ff6bdbcbf8dda44fc9d24b9fc8d5a3f3c2cdc821e2cba9fdf0392e342627ba80cd347183.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-55.csv", {url: new URL("./files/96c0ec86efc99fcf1c4a5d4bb4e782726b38e27e3af0943a9123226e6d304197018ad9c7d4764122d8d86dc11e8d7de2e8173067aba5548b11d5aed422a214eb.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-42.csv", {url: new URL("./files/b7d57e3738953edd8bceae3d990f11f68d5e89106d919649ed2c37e906bffce8581f5dc8c3578e538b8e276e70e92b8e1d5ca0184b5f8e200f03ae44055886bc.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-8.csv", {url: new URL("./files/0ad4bbf4c69722c8f4e20653c5f1da7c06d1b90368d7e44fe523fbde36477b13887ccdcaa6b65d9504495da6073de4bf785f7e4d271998e7b8d0d2812559cdcc.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-11.csv", {url: new URL("./files/74028df05eec504d0ce7492917a2b9aebadd14a942203072cc2c4f303e5f970c5f1a1c00707df258f3b392a4171acc7957f5d1d603f667c765fc7b2a25410970.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-66.csv", {url: new URL("./files/684ba50feced6f0941c2d58d3bc9948fc147e502ae4e851e33fe3d5999ff754cbafab8eb01cd5f6523e388cff3bed26db1731a64dab8d2ef8ef66f7e48cfa853.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-50.csv", {url: new URL("./files/79a0f4a691a6d9e2494133a21f8d7cf1ac49373cc43090e6930073ffd0b3609bb52a03a9bc241a7ef405b2f66f7e714afe87a083c220b039e32a366ebdfb4203.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-12.csv", {url: new URL("./files/79427ee7d59809b8f78d49b55492c7af07923b43f1495afd7bcdd47137ef51487849dfeee1eb2f6754167d39b657b163f52ed5f8610a48767993cd29fda92b6d.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-52.csv", {url: new URL("./files/7bda8b88253479f11d36e8876dfa9b1ba7a2bf158bc122b092fb29d04679fca902d38b7ddd88e33ed2f73eacb892b7705228b1f6d3a6fe6bf0e8dd2e2c083174.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-21.csv", {url: new URL("./files/e0d067486f5bcc5e67a428cc28aff1269f5e54dfad8cfd9d354bc99f2034616ca03ed9a8e1466684daf2f13e5a85bc3758904aa6c6a89997028af6b24ac15122.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-51.csv", {url: new URL("./files/415f5732c3b99e55ca960b61f7640839b15ca704ef5a82d74a77be782bcac9b9a2686c235b99ea386099bce7f27a08a88113b22f5f0f4e4117962fbbce92e328.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-15.csv", {url: new URL("./files/085cdd426dea1d26b59a55b8adc7f3a36eeef74596813c002a5291df6ef170acb1a5b3ed2855fa41c9e5623920a134824ecd88df0e99409cdb57aeda38988a0c.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-13.csv", {url: new URL("./files/1e2718987497eb254f7cd9e67cd261dc9886849ad96430df1cb0442bd9343f5bd34ced8780c3e625951f0b4028f31693d3faa35d8262837148d85e7a12484711.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-4.csv", {url: new URL("./files/9c042a23f1381e2662e919b49eff0704cbfce7bcb04fdecf68ddda932b4b1cc43cae7b021ec3996b6570afb498af57d9cedbac72e8a35274ffe65df9c06337fe.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-19.csv", {url: new URL("./files/40f0781bede7c2913bd53006b2d0f47fdb2d7e2558faab9ea2781dfdc0f73f619ed9eb81a6c8424feb140d5734d0880c62bbd16ed18eceb2c0aad03b4a989b88.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-14.csv", {url: new URL("./files/570773c6c781a45b0499a5d883b3608314761d281b59a69739ff5f045bb771b06c8c216beee65bc58b4fd6d7326fbb49450a79116cffe925a26e877d47d072bc.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-40.csv", {url: new URL("./files/1fa9a529a377be7553621214863925077c74ae415f726a3617303bad1751d0744b011bad448dbc428e23b7c75ad2c05618bcac474843472004c51a60e535dbd0.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-41.csv", {url: new URL("./files/65df95e0d67762afe695fafe0c01a92df08882706705e27d9bf211a256ee5a6ed30f34d3300ead9b95f1c9879bb30b7e81c2c691cb0a4e6e67402acc784ec208.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-61.csv", {url: new URL("./files/69852155d6da0f337f2d1f64df7e7e09fdaba44e5b598a5da37c508b4e5133c7b1f35be4ab2f5ce25bb22733549cc5171a5f92318ed3bb19614c060107e80615.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-56.csv", {url: new URL("./files/f1b9d8fd86b290e603567b58ad71253184a83490c7dfe94b19b18c4591cadd9cc6208debea31f1c599b7d875c682ba81c39e51a3b7c208cb91808572f98d5444.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-63.csv", {url: new URL("./files/d4dce1e20f86fbbd947a323a692139618de2aa7245a9d7c7de16faec70b5390f7c1135800e83d19196e3779591deef625ce02a15a1d49afbdf59f2954ec40f17.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-17.csv", {url: new URL("./files/aa39521bcb4ac87907d4abde47bb7533e01c2ed4bee56a0ae80e9ce49876ace766bdfedd7e997b29ac4cf97f6cb5bd6b210bff646a5fdf8d031b2632088f9883.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-59.csv", {url: new URL("./files/5cb9b02c314247887deafdb5901733df0414699317909dc6a95aacfaf0aeca7d8238f93ae39e9f1c700bfa19719aa2e788d3e38fbc855e9be9f237141c13c02e.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-68.csv", {url: new URL("./files/5f17bff840f144158c0b3a1f9a3bc58d8400d78569d15415c6c4ab613efe6375f6cd37f9be12d0106462e8e0371c4e2d73f2c3b39c53a7b90a25c5f87cdf2d42.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-64.csv", {url: new URL("./files/66790dba0cea7a18ded99ba75e31826cf43fb177caf367aca5948046d92988390b0abe17450393704490804f63e9774bf8405297f59e8e92370500164f337c74.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-70.csv", {url: new URL("./files/2b8e300170508aa31d479b79032104f0124a50585cc9e7723ace368d079a9da82859f620a042ffedb7326449d90a61df1ccc482c0ac3fb28653053eb63c2de63.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-39.csv", {url: new URL("./files/52d1baa915a4c62b7d526b19acf0b2bc03cae93d961d5d094587128d78575e6e58e8aeee29d3c56d9a9939072ad5927b3705855d55866b3084fc5032b3feb8e6.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-71.csv", {url: new URL("./files/6f49c9a6e5eb45bcd19e2228c89c703dd7111b6ed3272c4e8abf48302c1172cf69824c0220ccf6c1b5d1c33f991f3e60a0be2a20b4ea935b83f3f3952ae91cf3.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-53.csv", {url: new URL("./files/cd6b44d7e8b295a7574980184b92dcf205e8fee175620cce2756d86ee41922cb203a4a6d1ae10bc04dc665ef42c9aba04001f475a549cc58df4d3d4e91b8a40a.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-9.csv", {url: new URL("./files/7cc18476cec1828774abd5150350ae09d43c93d543c2dc7c655d6ceff101ce2d8a3ea2806ab95dd50c194c885aa32f7b44dcd74b8bfca2a2b1f286afb3aeac16.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-60.csv", {url: new URL("./files/d0f0c9ba77c341963803d94f26c262db3845776e735fbaca7c4780199f5afe444dfaf9659092a5a0b6dfd022c99ba0228b3ca97bf5e40abccdb17625c2c0a802.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-10.csv", {url: new URL("./files/91466f7ef72bff58f339a406e61d734342a77781227f067c67c15bb7c347ab41addffd5bbf8380864a1398c09296b4b1abf63138dcb881bfb590bc7f3a52e4bf.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-46.csv", {url: new URL("./files/71c05e21c7bf525166913130943ab35f77614aabed382a3059ab371578df1c8c0564f2273da4560b31e63151f04fefee49aa8034766e586eb7188ac04fc51fc8.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-7.csv", {url: new URL("./files/655224d35526515acca924e65cc38012caf76d4b6b99bae39a4aa02e0f7ab84d9b0d3f71fa5e4fc7d2575e8ee4d6a7ff4198afb2c6ac4540eea41f3234b50edd.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-45.csv", {url: new URL("./files/61c6e2f1d130d7a7d31a9c1b5ab5b64a5cd7e69c684531460f3912114aee512ac879215f64ea89617a531ca3e0f323f9492fcf8b74508bfa413e3a801d6242f5.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-49.csv", {url: new URL("./files/859a6912ca4eb05d6bbdda67ad590c6d2b84b2ad6c57b973b5e7ee6d74781b10b94e1a1deaa93a64926da5acef9b87c7af1eef51701c720592fa0ddef390aecc.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-44.csv", {url: new URL("./files/fd35dcbf2b9c64a88cc907c2f43af418972a178f6317b260d3b1af897b39ebfc5bfbd1ff05f20adfe9db3270795dbc4ed7a1f126e1a24b8b8c417a24cc952c72.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-18.csv", {url: new URL("./files/50f6ac152a6f8e332d514f9568305474b990efe1e3632e7f9d6606677bc4ed1f206b51bfd6fcef08bd47f77a3a09907c0ae196580ceb510e319001a0a496a7c4.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-34.csv", {url: new URL("./files/1d8a0c14d2db2713615d570d89cc21326fec7696699fd91bf74503d141a6737564dc23e8541fbd9db0ec465204a303779adb0dc39e6d6a7dbbee7aee38fa4433.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-57.csv", {url: new URL("./files/2f065d6c3dadef22f8b4a9b1e497a350e7233b31e6cbdf7cf6d0e3d5fa105cc0d8961623e26baf20783dcec6ce6f79e2b1287c3c668601b55fd389ce8d908c32.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-48.csv", {url: new URL("./files/92af99a3576804db7463575eb15a304a5e011756b1759c3c6d171e622fc353df3fb1c23ec7bb28bb2bc96ee4e7ceabceeac9c045cdc722b8da0801ed7d26244c.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-43.csv", {url: new URL("./files/27af30f781e42e65c276914e14f1cf0068fc6db4e1bc2ed24f05e341717909358fd7dae0a721b1c3056ca870774f4b4232b101d7feb9daf7ed9e0e47af00d780.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-69.csv", {url: new URL("./files/a55836b5b02db884e5e3567942a91b47b91a1f1cae36fb005ea8655deb65dff8bfab68fdb45e2b4e9036d0aaa1969fbba23cb2bb79b4bd342273adcf3c51439f.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-20.csv", {url: new URL("./files/bcd6b57b537b6caf27c6482d5c8a2bf4c5ea2d3b7a5767e47d39c9d8e8588c13f48085a99c6173f772f456ddaf94598aa25e4486f13124cd57824d7a4a4570c5.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-67.csv", {url: new URL("./files/a528aaeda22868d7bdb12452eb9553535a65d7caac44fa69e4ede38ab285fc463d8af1ddda20813c6302db2d7d706a90016fcb1bf24b7bfbadecd91a29f41c9c.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["candidate-votes-by-voting-place-72.csv", {url: new URL("./files/8cd4a20998a97a2918a7ac6aee40cea87e36705be06fd3584e8a25726cf147e88e70da105b63b451caff1578cc7ccf3810cc4cefa41a9696b871d1e5bc76b4e1.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["toc"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("data")).define("data", _data);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("party_vote_data_raw")).define("party_vote_data_raw", ["FileAttachment"], _party_vote_data_raw);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["__query","party_vote_data_raw","invalidation"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("candidate_vote_data_raw")).define("candidate_vote_data_raw", ["FileAttachment"], _candidate_vote_data_raw);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("party_vote_data")).define("party_vote_data", ["party_vote_data_raw"], _party_vote_data);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("parseElectorate")).define("parseElectorate", ["formatName"], _parseElectorate);
  main.variable(observer("formatName")).define("formatName", _formatName);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("candidate_vote_data")).define("candidate_vote_data", ["candidate_vote_data_raw","parseElectorate"], _candidate_vote_data);
  main.variable(observer()).define(["tex","md"], _21);
  main.variable(observer("getPartyVoteLeanData")).define("getPartyVoteLeanData", _getPartyVoteLeanData);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("national_lean")).define("national_lean", ["party_vote_data","getPartyVoteLeanData"], _national_lean);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("electorate_lean_data")).define("electorate_lean_data", ["party_vote_data","getPartyVoteLeanData","national_lean"], _electorate_lean_data);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("vote_data")).define("vote_data", ["party_vote_data","candidate_vote_data","electorate_lean_data"], _vote_data);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer()).define(["md"], _30);
  const child1 = runtime.module(define1);
  main.import("toc", child1);
  return main;
}
