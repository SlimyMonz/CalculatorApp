namespace Calculator.Api.Models;

public interface ICalculationRequest : IOperands {};

public record CalculationRequest(double A, double B) : ICalculationRequest;
