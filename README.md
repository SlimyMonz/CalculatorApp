# Calculator (React + .NET 10)

## Purpose
This is an over-engineered calculator app that uses the full stack of development aside from a database. Made this in <10 hours to display coding style and technical skill.

```
server/Calculator.Api       ASP.NET Core 10 Server API
tests/Calculator.Tests      xUnit tests for CalculatorService
web/                        React + TypeScript + Vite
```

## Requirements
1) .NET 10
2) Node

## Run
This will automatically install packages and run both web and server:
```bash
npm run both
```

To run tests:
```bash
dotnet test
```

Request:  `POST /api/add` with `{ "a": 2, "b": 3 }`
Response: `{ "operation": "add", "a": 2, "b": 3, "result": 5 }`
Divide by zero returns `400 { "error": "Cannot divide by zero." }`.
