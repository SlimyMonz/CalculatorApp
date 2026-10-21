using Calculator.Api.Services;
using Xunit;

namespace Calculator.Tests;

public class CalculatorServiceTests
{
    private readonly ICalculatorService _calc = new CalculatorService();

    [Theory]
    [InlineData(2, 3, 5)]
    [InlineData(-2, 3, 1)]
    [InlineData(0, 0, 0)]
    [InlineData(int.MaxValue, 1, 2147483648)]
    public void Add_ReturnsSum(int a, int b, double expected) =>
        Assert.Equal(expected, _calc.Add(a, b));

    [Theory]
    [InlineData(5, 3, 2)]
    [InlineData(3, 5, -2)]
    [InlineData(0, 0, 0)]
    [InlineData(int.MinValue, 1, -2147483649)]
    public void Subtract_ReturnsDifference(int a, int b, double expected) =>
        Assert.Equal(expected, _calc.Subtract(a, b));

    [Theory]
    [InlineData(4, 3, 12)]
    [InlineData(-4, 3, -12)]
    [InlineData(5, 0, 0)]
    [InlineData(int.MaxValue, 2, 4294967294)]
    public void Multiply_ReturnsProduct(int a, int b, double expected) =>
        Assert.Equal(expected, _calc.Multiply(a, b));

    [Theory]
    [InlineData(10, 2, 5.0)]
    [InlineData(7, 2, 3.5)]
    [InlineData(-9, 3, -3.0)]
    [InlineData(0, 5, 0.0)]
    public void Divide_ReturnsQuotient(int a, int b, double expected) =>
        Assert.Equal(expected, _calc.Divide(a, b), precision: 10);

    [Fact]
    public void Divide_ByZero_Throws() =>
        Assert.Throws<DivideByZeroException>(() => _calc.Divide(1, 0));

    // This was made because my calculator couldn't add/subtract/multiply a non-integer at first!
    [Fact]
    public void Divide_Then_Add_ReturnsValue() {
        double division = _calc.Divide(5, 2);
        double addition = _calc.Add(division, 1);
        Assert.Equal(addition, 3.5);
    }
}
