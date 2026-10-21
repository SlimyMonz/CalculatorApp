using Calculator.Api.Models;
using Calculator.Api.Services;

namespace Calculator.Api.Endpoints;

public static class CalculatorEndpoints
{
    public static IEndpointRouteBuilder MapCalculatorEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api").WithTags("Calculator");

        group.MapPost("/add", Add);
        group.MapPost("/subtract", Subtract);
        group.MapPost("/multiply", Multiply);
        group.MapPost("/divide", Divide);

        return app;
    }

    private static IResult Add(CalculationRequest r, ICalculatorService calc) =>
        Run("add", r, () => calc.Add(r.A, r.B));

    private static IResult Subtract(CalculationRequest r, ICalculatorService calc) =>
        Run("subtract", r, () => calc.Subtract(r.A, r.B));

    private static IResult Multiply(CalculationRequest r, ICalculatorService calc) =>
        Run("multiply", r, () => calc.Multiply(r.A, r.B));

    private static IResult Divide(CalculationRequest r, ICalculatorService calc) =>
        Run("divide", r, () => calc.Divide(r.A, r.B));

    private static IResult Run(string op, ICalculationRequest r, Func<double> compute)
    {
        try { return Results.Ok(new CalculationResult(op, r.A, r.B, compute())); }
        catch (DivideByZeroException ex) { return Results.BadRequest(new { error = ex.Message }); }
    }
}