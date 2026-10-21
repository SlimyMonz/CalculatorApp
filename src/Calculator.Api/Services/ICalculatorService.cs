namespace Calculator.Api.Services;

/// <summary>Business logic. Each HTTP endpoint maps to exactly one method.</summary>
public interface ICalculatorService
{
    double Add(double a, double b);
    double Subtract(double a, double b);
    double Multiply(double a, double b);
    /// <exception cref="DivideByZeroException">When b is 0.</exception>
    double Divide(double a, double b);
}
