# Calculator (React + .NET 10)

```
server/Calculator.Api      ASP.NET Core 10 minimal API  (POST /api/add|subtract|multiply|divide)
tests/Calculator.Tests  xUnit tests for CalculatorService
web/                    React + TypeScript + Vite
```

## Run
```bash
# 1) API (http://localhost:5080)
dotnet run --project server --urls http://localhost:5080

# 2) Frontend (http://localhost:5173, proxies /api to the API)
cd web && npm install && npm run dev

# Tests
dotnet test
```

Request:  `POST /api/add` with `{ "a": 2, "b": 3 }`
Response: `{ "operation": "add", "a": 2, "b": 3, "result": 5 }`
Divide by zero returns `400 { "error": "Cannot divide by zero." }`.
