namespace Calculator.Api.Models;

/// <summary>The two numbers every operation works on.</summary>
public interface IOperands
{
    double A { get; }
    double B { get; }
}

/// <summary>What the client sends to an endpoint.</summary>
public interface ICalculationRequest : IOperands { }

/// <summary>What the API sends back.</summary>
public interface ICalculationResult : IOperands
{
    string Operation { get; }
    double Result { get; }
}

public record CalculationRequest(double A, double B) : ICalculationRequest;

public record CalculationResult(string Operation, double A, double B, double Result) : ICalculationResult;
