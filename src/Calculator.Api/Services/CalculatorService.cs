namespace Calculator.Api.Services;

public class CalculatorService : ICalculatorService
{
    public double Add(double a, double b) => (double)a + b;
    public double Subtract(double a, double b) => (double)a - b;
    public double Multiply(double a, double b) => (double)a * b;

    public double Divide(double a, double b)
    {
        if (b == 0) throw new DivideByZeroException("Cannot divide by zero.");
        return (double)a / b;
    }
}
