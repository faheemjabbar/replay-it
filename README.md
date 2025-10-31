# 🔁 replayit

Record and replay HTTP requests with zero configuration.

## Install
```bash
npm install -g replayit
```

Or use without installing:
```bash
npx replayit
```

## Usage

### Record Requests (as Express middleware)
```javascript
import express from 'express';
import { recordRequests } from 'replayit';

const app = express();

// ✅ That's it! All requests are now recorded
app.use(recordRequests());

app.listen(3000);
```

**Requests are saved to `requests.json` by default.**

### Replay Requests
```bash
# Replay to localhost
replayit replay requests.json http://localhost:3000

# Replay to staging
replayit replay requests.json https://staging.myapp.com

# Replay to production
replayit replay requests.json https://api.myapp.com
```

### List Recorded Requests
```bash
replayit list requests.json
```

## Features

✅ **Zero config** - just plug it in  
✅ **Auto-redacts** sensitive data (passwords, tokens, cookies)  
✅ **Works with any Node.js server** (Express, Fastify, etc.)  
✅ **Pretty logging** with timestamps  
✅ **Git-friendly** JSON format  

## Advanced Usage

### Custom file name
```javascript
app.use(recordRequests({ file: './logs/api-calls.json' }));
```

### Use in specific routes
```javascript
// Only record API routes
app.use('/api', recordRequests({ file: 'api-requests.json' }));
```

## Example: Debugging a Bug

1. **Record the bug in production:**
```javascript
   app.use(recordRequests({ file: 'bug-500.json' }));
```

2. **Reproduce locally:**
```bash
   replayit replay bug-500.json http://localhost:3000
```

3. **Fix and verify:**
   - Fix the bug
   - Replay again to confirm it's fixed

## What Gets Redacted?

**Headers:**
- `authorization`
- `cookie`
- `x-api-key`
- `x-auth-token`

**Body fields:**
- `password`
- `token`
- `secret`
- `apiKey`
- `creditCard`
