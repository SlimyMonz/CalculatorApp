namespace Calculator.Api.Models;

public interface ICalculationRequest : IOperands { }

public interface ICalculationResult : IOperands
{
    string Operation { get; }
    double Result { get; }
}

public record CalculationRequest(double A, double B) : ICalculationRequest;

public record CalculationResult(string Operation, double A, double B, double Result) : ICalculationResult;
