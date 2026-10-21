using Calculator.Api.Endpoints;
using Calculator.Api.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenApi();
builder.Services.AddSingleton<ICalculatorService, CalculatorService>();

var app = builder.Build();
if (app.Environment.IsDevelopment()) app.MapOpenApi();

app.MapCalculatorEndpoints();

app.Run();