using Calculator.Api.Controllers;
using Calculator.Api.Services;
using Calculator.Api.Handler;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddSingleton<ICalculatorService, CalculatorService>();
builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();

var app = builder.Build();
if (app.Environment.IsDevelopment()) app.MapOpenApi();
app.UseExceptionHandler();
app.MapControllers();

app.Run();