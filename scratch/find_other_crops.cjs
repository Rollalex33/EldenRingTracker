const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/TERREGO-56/.gemini/antigravity-ide/brain/e6d38c1b-0849-4643-a797-66ebe0f4732e/.system_generated/logs/transcript_full.jsonl')
});

rl.on('line', l => {
  if (l.includes('weeping_grid.jpg') || l.includes('liurnia_grid.jpg') || l.includes('altus_grid.jpg') || l.includes('caelid_grid.jpg')) {
    if (l.includes('RUN_COMMAND') || l.includes('PLANNER_RESPONSE')) {
      const obj = JSON.parse(l);
      if (obj.tool_calls) {
        obj.tool_calls.forEach(tc => {
          if (tc.args && tc.args.CommandLine) {
            console.log('--- COMMAND ---');
            console.log(tc.args.CommandLine);
          }
        });
      }
    }
  }
});
