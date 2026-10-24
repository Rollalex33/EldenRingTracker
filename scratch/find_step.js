const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/TERREGO-56/.gemini/antigravity-ide/brain/e6d38c1b-0849-4643-a797-66ebe0f4732e/.system_generated/logs/transcript_full.jsonl')
});

rl.on('line', l => {
  if (l.includes('"step_index":799')) {
    const obj = JSON.parse(l);
    fs.writeFileSync('scratch/crop_code.txt', obj.tool_calls[0].args.CommandLine);
    console.log('Saved crop code to scratch/crop_code.txt!');
    process.exit(0);
  }
});
