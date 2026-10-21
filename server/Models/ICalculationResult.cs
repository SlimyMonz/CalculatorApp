namespace Calculator.Api.Models;

public interface ICalculationResult
{
    double Result { get; }
}

public record CalculationResult(double Result) : ICalculationResult;
